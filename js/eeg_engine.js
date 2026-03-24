// ─── EEG ENGINE ───────────────────────────────────────────────────────────────
// Tüm modüllerde kullanılan merkezi EEG sinyal üretim ve render kütüphanesi.
// v7 prototype'ından türetilmiştir.
//
// Public API:
//   EEGEngine.makeSignal(opts)              → Float32Array
//   EEGEngine.makeBurstSuppression(opts)    → Float32Array
//   EEGEngine.drawEEG(canvasId, channels, opts)
//   EEGEngine.renderBlock(containerId, preset, opts)  — hazır preset render

const EEGEngine = (() => {

    const FS       = 512;
    const DURATION = 10;

    // ── PINK NOISE ────────────────────────────────────────────────────────────
    function makePink(n) {
        const out = new Float32Array(n);
        const b   = [0,0,0,0,0,0,0];
        for (let i = 0; i < n; i++) {
            const w = Math.random()*2-1;
            b[0]=0.99886*b[0]+w*0.0555179; b[1]=0.99332*b[1]+w*0.0750759;
            b[2]=0.96900*b[2]+w*0.1538520; b[3]=0.86650*b[3]+w*0.3104856;
            b[4]=0.55000*b[4]+w*0.5329522; b[5]=-0.7616*b[5]-w*0.0168980;
            out[i]=(b[0]+b[1]+b[2]+b[3]+b[4]+b[5]+b[6]+w*0.5362)*0.11;
            b[6]=w*0.115926;
        }
        return out;
    }

    // ── LOW PASS FILTER ───────────────────────────────────────────────────────
    function lowPass(sig, alpha) {
        const out = new Float32Array(sig.length);
        out[0] = sig[0];
        for (let i = 1; i < sig.length; i++)
            out[i] = alpha * sig[i] + (1-alpha) * out[i-1];
        return out;
    }

    // ── STANDARD SIGNAL GENERATOR ─────────────────────────────────────────────
    function makeSignal(opts = {}) {
        const {
            components  = [],
            pinkAmp     = 2.0,
            whiteAmp    = 1.0,
            drift       = 1.0,
            driftF      = 0.05,
            jitter      = 0.18,
            smoothAlpha = 1.0,
        } = opts;

        const n     = Math.floor(DURATION * FS);
        const pink  = makePink(n);
        const sig   = new Float32Array(n);
        const seeds = components.map(() => Math.random()*6.28);

        for (let i = 0; i < n; i++) {
            const t = i / FS;
            let s = drift * Math.sin(2*Math.PI*driftF*t)
                  + drift*0.3 * Math.sin(2*Math.PI*driftF*1.6*t + 1.3);
            for (let ci = 0; ci < components.length; ci++) {
                const c   = components[ci];
                const mf  = 0.04 + ci*0.007;
                const mod = 1 + jitter * Math.sin(2*Math.PI*mf*t + seeds[ci]);
                s += c.amp * mod * Math.sin(2*Math.PI*c.freq*t + c.phase);
            }
            s += pinkAmp * pink[i];
            s += whiteAmp * (Math.random()*2-1);
            sig[i] = s;
        }
        return smoothAlpha < 1.0 ? lowPass(sig, smoothAlpha) : sig;
    }

    // ── BURST SUPPRESSION GENERATOR ───────────────────────────────────────────
    function makeBurstSuppression(opts = {}) {
        const {
            bsPeriod    = 2.5,
            bsDuty      = 0.40,
            burstAmp    = 40,
            suppressAmp = 0.4,
        } = opts;

        const n      = Math.floor(DURATION * FS);
        const pink   = makePink(n);
        const sig    = new Float32Array(n);
        const phases = [0, 0.8, 1.5, 0.3, 1.1, 0.6, 1.9, 0.4];

        for (let i = 0; i < n; i++) {
            const t        = i / FS;
            const cyclePos = (t % bsPeriod) / bsPeriod;

            if (cyclePos > bsDuty) {
                sig[i] = suppressAmp * (Math.random()-0.5)
                       + suppressAmp * 0.3 * pink[i];
            } else {
                const bp        = cyclePos / bsDuty;
                const riseWidth = 0.08;
                const env = bp < riseWidth
                    ? bp / riseWidth
                    : Math.exp(-3.5 * (bp - riseWidth));

                sig[i] =
                    burstAmp * 0.9  * env * Math.sin(2*Math.PI*2.5*t + phases[0])
                  + burstAmp * 0.5  * env * Math.sin(2*Math.PI*8*t   + phases[1])
                  + burstAmp * 0.4  * env * Math.sin(2*Math.PI*12*t  + phases[2])
                  + burstAmp * 0.3  * env * Math.sin(2*Math.PI*18*t  + phases[3])
                  + burstAmp * 0.25 * env * Math.sin(2*Math.PI*5*t   + phases[4])
                  - burstAmp * 0.3  * env * Math.sin(2*Math.PI*3*t   + phases[5] + 0.5)
                  + 4.0 * env * pink[i]
                  + 3.0 * env * (Math.random()-0.5);
            }
        }
        return sig;
    }

    // ── DRAW EEG ──────────────────────────────────────────────────────────────
    // canvasId  : string — canvas element id
    // channels  : [{signal, label, color}]
    // opts      : {scaleUV, gridColor, showScaleBar, show1sBar}
    function drawEEG(canvasId, channels, opts = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const W = canvas.offsetWidth || 860;
        canvas.width = W;
        const H   = canvas.height;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, W, H);

        const {
            scaleUV      = 50,
            gridColor    = 'rgba(255,255,255,0.035)',
            showScaleBar = true,
            show1sBar    = true,
        } = opts;

        const nCh      = channels.length;
        const chH      = H / nCh;
        const pixPerUV = (chH * 0.82) / scaleUV;

        // Dikey grid — her saniye
        ctx.strokeStyle = gridColor;
        ctx.lineWidth   = 0.5;
        for (let s = 0; s <= DURATION; s++) {
            const x = (s / DURATION) * W;
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }

        channels.forEach((ch, ci) => {
            const midY = chH * ci + chH/2;

            // Baseline
            ctx.strokeStyle = 'rgba(255,255,255,0.07)';
            ctx.lineWidth   = 0.5;
            ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(W, midY); ctx.stroke();

            // Sinyal
            const sig = ch.signal;
            ctx.beginPath();
            ctx.strokeStyle = ch.color || '#00c6a7';
            ctx.lineWidth   = 1.0;
            ctx.lineJoin    = 'round';
            ctx.lineCap     = 'round';
            for (let i = 0; i < sig.length; i++) {
                const x = (i / (sig.length-1)) * W;
                const y = midY - sig[i] * pixPerUV;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Kanal etiketi
            if (ch.label) {
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                ctx.font = '600 9px DM Sans, sans-serif';
                ctx.fillText(ch.label, 6, midY - chH*0.35);
            }
        });

        // Scale bar
        if (showScaleBar) {
            const barUV = scaleUV / 2;
            const barPx = barUV * pixPerUV;
            const barX  = W - 60;
            const barY0 = 14;
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(barX, barY0);         ctx.lineTo(barX, barY0+barPx);       ctx.stroke();
            ctx.beginPath(); ctx.moveTo(barX-3, barY0);       ctx.lineTo(barX+3, barY0);            ctx.stroke();
            ctx.beginPath(); ctx.moveTo(barX-3, barY0+barPx); ctx.lineTo(barX+3, barY0+barPx);     ctx.stroke();
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.font = '9px DM Sans, sans-serif';
            ctx.fillText(`${barUV}µV`, barX+6, barY0+barPx/2+3);

            // 1s çubuğu
            if (show1sBar) {
                const secPx = W / DURATION;
                const sx = barX - secPx - 16;
                const sy = barY0 + barPx + 14;
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(sx, sy);         ctx.lineTo(sx+secPx, sy);       ctx.stroke();
                ctx.beginPath(); ctx.moveTo(sx, sy-3);       ctx.lineTo(sx, sy+3);            ctx.stroke();
                ctx.beginPath(); ctx.moveTo(sx+secPx, sy-3); ctx.lineTo(sx+secPx, sy+3);     ctx.stroke();
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.font = '9px DM Sans, sans-serif';
                ctx.fillText('1s', sx+secPx/2-6, sy-5);
            }
        }
    }

    // ── PRESETS ───────────────────────────────────────────────────────────────
    // Her preset bir sinyal tanımı döner — {signal, color, label, scaleUV}
    const PRESETS = {

        propofol_maintenance: () => ({
            channels: [
                { signal: makeSignal({
                    components: [
                        { freq: 1.1,  amp: 9,  phase: 0.0 },
                        { freq: 1.8,  amp: 6,  phase: 1.4 },
                        { freq: 0.6,  amp: 4,  phase: 0.9 },
                        { freq: 10.1, amp: 5,  phase: 0.3 },
                        { freq: 9.5,  amp: 4,  phase: 2.1 },
                        { freq: 11.0, amp: 3,  phase: 1.6 },
                        { freq: 3.2,  amp: 3,  phase: 0.7 },
                    ],
                    pinkAmp: 2.5, whiteAmp: 1.8,
                    drift: 1.5, driftF: 0.05, jitter: 0.22, smoothAlpha: 0.6,
                }), label: 'Fp1', color: '#00c6a7' },
                { signal: makeSignal({
                    components: [
                        { freq: 1.1,  amp: 8,  phase: 0.5 },
                        { freq: 1.8,  amp: 6,  phase: 1.7 },
                        { freq: 0.6,  amp: 3,  phase: 1.2 },
                        { freq: 10.1, amp: 5,  phase: 0.6 },
                        { freq: 9.5,  amp: 3,  phase: 2.4 },
                        { freq: 11.0, amp: 3,  phase: 1.9 },
                        { freq: 3.2,  amp: 2,  phase: 1.0 },
                    ],
                    pinkAmp: 2.5, whiteAmp: 1.8,
                    drift: 1.2, driftF: 0.05, jitter: 0.22, smoothAlpha: 0.6,
                }), label: 'Fp2', color: '#009980' },
            ],
            scaleUV: 50,
        }),

        burst_suppression: () => ({
            channels: [
                { signal: makeBurstSuppression({
                    bsPeriod: 2.5, bsDuty: 0.40,
                    burstAmp: 40, suppressAmp: 0.4,
                }), label: 'Fp1', color: '#f87171' },
            ],
            scaleUV: 100,
        }),

        awake: () => ({
            channels: [
                { signal: makeSignal({
                    components: [
                        { freq: 10.0, amp: 0.8, phase: 0.0 },
                        { freq: 20.0, amp: 0.6, phase: 0.3 },
                        { freq: 35.0, amp: 0.4, phase: 0.7 },
                        { freq: 40.0, amp: 0.3, phase: 1.4 },
                    ],
                    pinkAmp: 1.2, whiteAmp: 2.2,
                    drift: 0.3, driftF: 0.1, jitter: 0.2, smoothAlpha: 0.35,
                }), label: 'Fp1', color: '#60a5fa' },
            ],
            scaleUV: 12,
        }),

        induction: () => ({
            channels: [
                { signal: makeSignal({
                    components: [
                        { freq: 20.0, amp: 5,  phase: 0.0 },
                        { freq: 18.0, amp: 4,  phase: 0.7 },
                        { freq: 1.5,  amp: 10, phase: 1.2 },
                        { freq: 2.5,  amp: 7,  phase: 0.4 },
                        { freq: 8.5,  amp: 4,  phase: 1.8 },
                    ],
                    pinkAmp: 2.8, whiteAmp: 2.0,
                    drift: 1.8, driftF: 0.07, jitter: 0.25, smoothAlpha: 0.55,
                }), label: 'Fp1', color: '#a78bfa' },
            ],
            scaleUV: 50,
        }),

        emergence: () => ({
            channels: [
                { signal: makeSignal({
                    components: [
                        { freq: 2.0,  amp: 6,  phase: 0.2 },
                        { freq: 9.0,  amp: 5,  phase: 0.6 },
                        { freq: 11.0, amp: 4,  phase: 1.3 },
                        { freq: 18.0, amp: 3,  phase: 0.9 },
                    ],
                    pinkAmp: 2.5, whiteAmp: 2.2,
                    drift: 1.2, driftF: 0.06, jitter: 0.28, smoothAlpha: 0.5,
                }), label: 'Fp1', color: '#fbbf24' },
            ],
            scaleUV: 40,
        }),

        // Modül 1 problem card'ları için özel presetler
        high_impedance: () => ({
            channels: [
                { signal: makeSignal({
                    components: [
                        { freq: 10.0, amp: 3, phase: 0.0 },
                        { freq: 50.0, amp: 6, phase: 0.0 }, // 50Hz gürültü simülasyonu
                    ],
                    pinkAmp: 5.0, whiteAmp: 6.0,  // çok fazla noise
                    drift: 4.0, driftF: 0.08, jitter: 0.4, smoothAlpha: 0.9,
                }), label: 'Fp1', color: '#f87171' },
            ],
            scaleUV: 40,
        }),

        electrode_displacement: () => {
            // Normal sinyal + ani flat line
            const n   = Math.floor(DURATION * FS);
            const sig = new Float32Array(n);
            const base = makeSignal({
                components: [
                    { freq: 1.2, amp: 8,  phase: 0.0 },
                    { freq: 10,  amp: 5,  phase: 0.3 },
                ],
                pinkAmp: 2.0, whiteAmp: 1.5, drift: 1.0, smoothAlpha: 0.6,
            });
            const cutoff = Math.floor(n * 0.45); // %45'te kes
            for (let i = 0; i < n; i++) {
                if (i < cutoff) {
                    sig[i] = base[i];
                } else if (i < cutoff + 80) {
                    // Ani büyük defleksiyon — düşme artefaktı
                    const p = (i - cutoff) / 80;
                    sig[i] = base[i] + 35 * Math.sin(Math.PI * p);
                } else {
                    // Flat line
                    sig[i] = (Math.random()-0.5) * 0.8;
                }
            }
            return {
                channels: [{ signal: sig, label: 'Fp1', color: '#f87171' }],
                scaleUV: 50,
            };
        },

        powerline_noise: () => ({
            channels: [
                { signal: makeSignal({
                    components: [
                        { freq: 1.5,  amp: 5,  phase: 0.0 },
                        { freq: 10.0, amp: 3,  phase: 0.5 },
                        { freq: 50.0, amp: 8,  phase: 0.0 }, // 50Hz baskın
                        { freq: 50.0, amp: 5,  phase: 1.57 },
                    ],
                    pinkAmp: 1.5, whiteAmp: 1.0,
                    drift: 1.0, driftF: 0.05, smoothAlpha: 0.95,
                }), label: 'Fp1', color: '#facc15' },
            ],
            scaleUV: 40,
        }),

        // Frekans bandı presetleri — Modül 3 için
        delta_band: () => ({
            channels: [
                { signal: makeSignal({
                    components: [
                        { freq: 1.5, amp: 12, phase: 0.0 },
                        { freq: 2.2, amp: 5,  phase: 0.9 },
                        { freq: 0.8, amp: 4,  phase: 1.4 },
                    ],
                    pinkAmp: 0.8, whiteAmp: 0.5, drift: 0.3, jitter: 0.12, smoothAlpha: 0.8,
                }), label: '', color: '#818cf8' },
            ],
            scaleUV: 30,
        }),

        theta_band: () => ({
            channels: [
                { signal: makeSignal({
                    components: [
                        { freq: 6.0, amp: 12, phase: 0.0 },
                        { freq: 5.0, amp: 6,  phase: 1.2 },
                        { freq: 7.0, amp: 5,  phase: 0.5 },
                    ],
                    pinkAmp: 1.2, whiteAmp: 1.0, drift: 0.4, smoothAlpha: 0.65,
                }), label: '', color: '#60a5fa' },
            ],
            scaleUV: 25,
        }),

        alpha_band: () => ({
            channels: [
                { signal: makeSignal({
                    components: [
                        { freq: 10.0, amp: 10, phase: 0.0 },
                        { freq: 9.5,  amp: 6,  phase: 1.3 },
                        { freq: 10.8, amp: 4,  phase: 0.6 },
                    ],
                    pinkAmp: 1.0, whiteAmp: 1.2, drift: 0.3, smoothAlpha: 0.6,
                }), label: '', color: '#00c6a7' },
            ],
            scaleUV: 20,
        }),

        beta_band: () => ({
            channels: [
                { signal: makeSignal({
                    components: [
                        { freq: 20.0, amp: 5,  phase: 0.0 },
                        { freq: 18.0, amp: 4,  phase: 0.8 },
                        { freq: 22.0, amp: 3,  phase: 1.5 },
                    ],
                    pinkAmp: 1.5, whiteAmp: 2.0, drift: 0.2, smoothAlpha: 0.5,
                }), label: '', color: '#fbbf24' },
            ],
            scaleUV: 15,
        }),

        gamma_band: () => ({
            channels: [
                { signal: makeSignal({
                    components: [
                        { freq: 38.0, amp: 1.5, phase: 0.0 },
                        { freq: 42.0, amp: 1.0, phase: 1.1 },
                    ],
                    pinkAmp: 0.8, whiteAmp: 2.8, drift: 0.1, smoothAlpha: 0.3,
                }), label: '', color: '#f87171' },
            ],
            scaleUV: 10,
        }),
    };

    // ── RENDER BLOCK ──────────────────────────────────────────────────────────
    // Bir container div'e canvas + header inject eder ve çizer.
    // opts: { label, scale, height, annotate }
    function renderBlock(containerId, presetName, opts = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const preset = PRESETS[presetName];
        if (!preset) {
            console.warn(`EEGEngine: unknown preset "${presetName}"`);
            return;
        }

        const {
            label    = '',
            height   = 90,
        } = opts;

        const canvasId = containerId + '-canvas';
        container.innerHTML = `
            <canvas id="${canvasId}" height="${height}"
                    style="width:100%;display:block;background:rgba(0,0,0,0.15);
                           border-radius:8px;"></canvas>
        `;

        const data = preset();

        setTimeout(() => {
            drawEEG(canvasId, data.channels, {
                scaleUV: opts.scaleUV || data.scaleUV,
                showScaleBar: opts.showScaleBar !== false,
                show1sBar:    opts.show1sBar    !== false,
            });
        }, 40);

        // Resize desteği
        window._eegEngineResizeTargets = window._eegEngineResizeTargets || [];
        window._eegEngineResizeTargets.push({ canvasId, channels: data.channels, scaleUV: opts.scaleUV || data.scaleUV });
    }

    // Global resize handler — bir kez bağla
    if (!window._eegEngineResizeInit) {
        window._eegEngineResizeInit = true;
        window.addEventListener('resize', () => {
            (window._eegEngineResizeTargets || []).forEach(t => {
                drawEEG(t.canvasId, t.channels, { scaleUV: t.scaleUV });
            });
        });
    }

    // ── PUBLIC API ────────────────────────────────────────────────────────────
    return {
        makeSignal,
        makeBurstSuppression,
        drawEEG,
        renderBlock,
        PRESETS,
        FS,
        DURATION,
    };

})();
