// ─── SIM_ANAESTHESIA_PHASES V4 ────────────────────────────────────────────────
// Slider = zaman ekseni. Tüm anestezi süreci tek uzun sinyal olarak üretilir.
// Slider sağa gidince EEG penceresi ilerler — gerçek cihaz kağıt akışı gibi.

function initAnaesthesiaPhasesSim(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (typeof EEGEngine === 'undefined') {
        container.innerHTML = '<p style="color:var(--muted);font-size:0.85rem;">EEGEngine not loaded.</p>';
        return;
    }

    // ── PARAMETRELER ──────────────────────────────────────────────────────────
    const FS          = EEGEngine.FS;      // 512 Hz
    const WIN_SEC     = 8;                 // canvas'ta görünen pencere (saniye)
    const WIN_SAMPLES = WIN_SEC * FS;

    // Toplam timeline — her faz kaç saniye sürsün
    const TIMELINE = [
        { label: 'Awake',       duration: 8,  color: '#60a5fa' },
        { label: 'Induction',   duration: 6,  color: '#a78bfa' },
        { label: 'Maintenance', duration: 10, color: '#00c6a7' },
        { label: 'Deep / BS',   duration: 8,  color: '#f87171' },
        { label: 'Maintenance', duration: 8,  color: '#00c6a7' },
        { label: 'Emergence',   duration: 6,  color: '#fbbf24' },
        { label: 'Awake',       duration: 6,  color: '#60a5fa' },
    ];

    const TOTAL_SEC = TIMELINE.reduce((s, p) => s + p.duration, 0); // toplam saniye

    // Faz bilgileri (açıklamalar)
    const PHASE_INFO = {
        'Awake':       {
            desc:     'Low-amplitude, mixed-frequency. Beta and gamma dominant. Neurons firing independently.',
            clinical: 'Patient awake and cooperative. No anaesthetic on board.',
        },
        'Induction':   {
            desc:     'Beta activation followed by rapid shift to slow waves. Alpha drops out. Theta and delta emerge.',
            clinical: 'Propofol bolus administered. Loss of verbal contact. Eyes closing.',
        },
        'Maintenance': {
            desc:     'Frontal alpha-delta pattern. Slow delta (1–2 Hz) with superimposed alpha (8–12 Hz). Continuous and symmetric.',
            clinical: 'Adequate surgical depth. BIS 40–60. Patient immobile and amnestic.',
        },
        'Deep / BS':   {
            desc:     'Burst suppression. High-amplitude bursts alternating with near-isoelectric suppression. BSR rising.',
            clinical: 'Excessive anaesthetic depth. Dose reduction warranted.',
        },
        'Emergence':   {
            desc:     'Slow waves decreasing. Faster frequencies returning. Signal continuity improving.',
            clinical: 'Propofol discontinued. Patient beginning to move.',
        },
    };

    // ── UZUN SİNYAL ÜRET ─────────────────────────────────────────────────────
    // Her faz için sinyal üret, geçişlerde crossfade uygula
    function buildFullSignal() {
        const CROSSFADE_SEC = 1.5; // geçiş süresi saniye
        const totalSamples  = Math.floor(TOTAL_SEC * FS);
        const full          = new Float32Array(totalSamples);

        // Her faz için sinyal üret
        const phaseSignals = TIMELINE.map(ph => {
            const n = Math.floor(ph.duration * FS);
            return buildPhaseSignal(ph.label, n);
        });

        // Fazları birleştir — crossfade ile
        let writePos = 0;
        for (let pi = 0; pi < TIMELINE.length; pi++) {
            const ph     = TIMELINE[pi];
            const sigA   = phaseSignals[pi];
            const sigB   = pi + 1 < TIMELINE.length ? phaseSignals[pi + 1] : null;
            const n      = Math.floor(ph.duration * FS);
            const cfLen  = Math.floor(CROSSFADE_SEC * FS);

            for (let i = 0; i < n; i++) {
                let val = sigA[Math.min(i, sigA.length - 1)];

                // Son cfLen sample'da sonraki fazla crossfade
                if (sigB && i >= n - cfLen) {
                    const t   = (i - (n - cfLen)) / cfLen; // 0→1
                    const bIdx = Math.min(t * cfLen, sigB.length - 1);
                    val = (1 - t) * val + t * sigB[Math.floor(bIdx)];
                }

                if (writePos < totalSamples) {
                    full[writePos++] = val;
                }
            }
        }

        return full;
    }

    function buildPhaseSignal(label, n) {
        // n sample'lık sinyal üret — EEGEngine kullan
        // Geçici DURATION override: n/FS saniye
        const origDur = EEGEngine.DURATION;

        // EEGEngine.makeSignal DURATION sabit kullandığı için
        // daha uzun sinyal için repeat ederiz
        const baseSamples = Math.floor(EEGEngine.DURATION * FS);

        let base;
        switch (label) {
            case 'Awake':
                base = EEGEngine.makeSignal({
                    components: [
                        { freq: 0.2, amp: 1.6, phase: 0.4 },
                        { freq: 10.0, amp: 2.8, phase: 0.0 },
                        { freq: 20.0, amp: 2.6, phase: 0.3 },
                        { freq: 35.0, amp: 2.4, phase: 0.7 },
                    ],
                    pinkAmp: 1.2, whiteAmp: 2.2,
                    drift: 0.3, driftF: 0.1, jitter: 0.2, smoothAlpha: 0.35,
                });
                break;
            case 'Induction':
                base = EEGEngine.makeSignal({
                    components: [
                        { freq: 18.0, amp: 4,  phase: 0.0 },
                        { freq: 1.5,  amp: 10, phase: 1.2 },
                        { freq: 2.5,  amp: 7,  phase: 0.4 },
                        { freq: 8.5,  amp: 4,  phase: 1.8 },
                    ],
                    pinkAmp: 2.8, whiteAmp: 2.0,
                    drift: 1.8, driftF: 0.07, jitter: 0.25, smoothAlpha: 0.55,
                });
                break;
            case 'Maintenance':
                base = EEGEngine.makeSignal({
                    components: [
                        { freq: 1.1,  amp: 9,  phase: Math.random()*6.28 },
                        { freq: 1.8,  amp: 6,  phase: Math.random()*6.28 },
                        { freq: 0.6,  amp: 4,  phase: Math.random()*6.28 },
                        { freq: 10.1, amp: 5,  phase: Math.random()*6.28 },
                        { freq: 9.5,  amp: 4,  phase: Math.random()*6.28 },
                        { freq: 11.0, amp: 3,  phase: Math.random()*6.28 },
                    ],
                    pinkAmp: 2.5, whiteAmp: 1.8,
                    drift: 1.5, driftF: 0.05, jitter: 0.22, smoothAlpha: 0.6,
                });
                break;
            case 'Deep / BS':
                base = EEGEngine.makeBurstSuppression({
                    bsPeriod: 2.5, bsDuty: 0.40,
                    burstAmp: 40, suppressAmp: 0.4,
                });
                break;
            case 'Emergence':
                base = EEGEngine.makeSignal({
                    components: [
                        { freq: 2.0,  amp: 6,  phase: 0.2 },
                        { freq: 9.0,  amp: 5,  phase: 0.6 },
                        { freq: 11.0, amp: 4,  phase: 1.3 },
                        { freq: 18.0, amp: 3,  phase: 0.9 },
                    ],
                    pinkAmp: 2.5, whiteAmp: 2.2,
                    drift: 1.2, driftF: 0.06, jitter: 0.28, smoothAlpha: 0.5,
                });
                break;
            default:
                base = new Float32Array(baseSamples);
        }

        // n > baseSamples ise tekrarla
        const out = new Float32Array(n);
        for (let i = 0; i < n; i++) {
            out[i] = base[i % baseSamples];
        }
        return out;
    }

    // Hangi saniyede hangi faz?
    function getPhaseAt(sec) {
        let elapsed = 0;
        for (const ph of TIMELINE) {
            if (sec < elapsed + ph.duration) return ph;
            elapsed += ph.duration;
        }
        return TIMELINE[TIMELINE.length - 1];
    }

    // ── SİNYALİ OLUŞTUR ───────────────────────────────────────────────────────
    let fullSignal = buildFullSignal();
    const maxOffset = fullSignal.length - WIN_SAMPLES;

    // ── HTML ──────────────────────────────────────────────────────────────────
    container.innerHTML = `
    <div class="aphase-wrap">

        <!-- TIMELINE BAR -->
        <div id="aphase-timeline-bar"
             style="position:relative;height:36px;margin-bottom:4px;border-radius:6px;
                    overflow:visible;"></div>

        <!-- SLIDER -->
        <div style="padding:0 2px;margin-bottom:16px;">
            <input type="range" id="aphase-slider"
                   min="0" max="100" step="0.5" value="0"
                   style="width:100%;"
                   oninput="aphaseOnSlider(parseFloat(this.value))">
        </div>

        <!-- PHASE BADGE + TRANSITION LABEL -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;min-height:24px;">
            <div id="aphase-badge"
                 style="font-size:0.7rem;font-weight:700;letter-spacing:0.1em;
                        text-transform:uppercase;padding:3px 12px;border-radius:99px;
                        border:1px solid;transition:all 0.25s;white-space:nowrap;"></div>
            <div id="aphase-sublabel"
                 style="font-size:0.75rem;color:var(--muted);font-style:italic;"></div>
        </div>

        <!-- EEG CANVAS -->
        <div style="background:rgba(0,0,0,0.2);border:1px solid var(--border);
                    border-radius:10px;overflow:hidden;margin-bottom:16px;">
            <div style="font-size:0.68rem;font-weight:700;letter-spacing:0.1em;
                        text-transform:uppercase;color:var(--muted);padding:7px 12px 0;">Fp1</div>
            <canvas id="aphase-canvas" height="110" style="width:100%;display:block;"></canvas>
        </div>

        <!-- INFO KARTLARI -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="background:var(--surface2);border:1px solid var(--border);
                        border-radius:10px;padding:16px 18px;transition:border-color 0.3s;"
                 id="aphase-eeg-card">
                <div style="font-size:0.68rem;font-weight:700;letter-spacing:0.1em;
                            text-transform:uppercase;color:var(--muted);margin-bottom:8px;">
                    EEG characteristics
                </div>
                <div style="font-size:0.83rem;color:#b0c4d8;line-height:1.7;"
                     id="aphase-eeg-text"></div>
            </div>
            <div style="background:var(--surface2);border:1px solid var(--border);
                        border-radius:10px;padding:16px 18px;transition:border-color 0.3s;"
                 id="aphase-clinical-card">
                <div style="font-size:0.68rem;font-weight:700;letter-spacing:0.1em;
                            text-transform:uppercase;color:var(--muted);margin-bottom:8px;">
                    Clinical context
                </div>
                <div style="font-size:0.83rem;color:#b0c4d8;line-height:1.7;"
                     id="aphase-clinical-text"></div>
            </div>
        </div>

    </div>
    `;

    // ── CSS ───────────────────────────────────────────────────────────────────
    if (!document.getElementById('aphase-styles')) {
        const style = document.createElement('style');
        style.id = 'aphase-styles';
        style.textContent = `.aphase-wrap { padding: 4px 0; }`;
        document.head.appendChild(style);
    }

    // ── TIMELINE BAR ──────────────────────────────────────────────────────────
    function buildTimelineBar() {
        const el = document.getElementById('aphase-timeline-bar');
        if (!el) return;
        let html = '';
        let elapsed = 0;
        TIMELINE.forEach((ph, i) => {
            const left  = (elapsed / TOTAL_SEC) * 100;
            const width = (ph.duration / TOTAL_SEC) * 100;
            html += `
            <div style="position:absolute;left:${left}%;width:${width}%;height:10px;top:0;
                        background:${ph.color};opacity:0.25;
                        border-left:${i > 0 ? '1px solid rgba(0,0,0,0.3)' : 'none'};"></div>
            <div style="position:absolute;left:${left + width/2}%;transform:translateX(-50%);
                        top:12px;font-size:0.72rem;color:${ph.color};font-weight:600;
                        letter-spacing:0.04em;white-space:nowrap;opacity:0.8;">${ph.label}</div>
            `;
            elapsed += ph.duration;
        });
        el.innerHTML = html;
    }

    // ── SLIDER CURSOR GÜNCELLEMESİ ────────────────────────────────────────────
    let currentSliderVal = 0;

    function updateFromSlider(val) {
        currentSliderVal = val;
        // val: 0→100 → kaç saniye?
        const currentSec    = (val / 100) * (TOTAL_SEC - WIN_SEC);
        const sampleOffset  = Math.floor(currentSec * FS);
        const clampedOffset = Math.max(0, Math.min(sampleOffset, maxOffset));

        // Pencereyi al
        const window = fullSignal.subarray(clampedOffset, clampedOffset + WIN_SAMPLES);

        // Orta noktadaki faz
        const midSec = currentSec + WIN_SEC / 2;
        const phase  = getPhaseAt(midSec);
        const scaleUV = 50;

        // Canvas
        EEGEngine.drawEEG('aphase-canvas', [
            { signal: window, label: 'Fp1', color: phase.color },
        ], { scaleUV, showScaleBar: true, show1sBar: true });

        // Badge
        const badge    = document.getElementById('aphase-badge');
        const sublabel = document.getElementById('aphase-sublabel');
        if (badge) {
            badge.textContent        = phase.label;
            badge.style.color        = phase.color;
            badge.style.borderColor  = phase.color + '55';
            badge.style.background   = phase.color + '18';
        }

        // Sublabel — zaman göster
        if (sublabel) {
            const mins = Math.floor(midSec / 60);
            const secs = Math.floor(midSec % 60).toString().padStart(2, '0');
            sublabel.textContent = `t = ${mins}:${secs}`;
        }

        // Info kartları
        const info = PHASE_INFO[phase.label] || PHASE_INFO['Maintenance'];
        const eegEl    = document.getElementById('aphase-eeg-text');
        const clinEl   = document.getElementById('aphase-clinical-text');
        const eegCard  = document.getElementById('aphase-eeg-card');
        const clinCard = document.getElementById('aphase-clinical-card');
        if (eegEl)   eegEl.textContent  = info.desc;
        if (clinEl)  clinEl.textContent = info.clinical;
        if (eegCard)  eegCard.style.borderColor  = phase.color + '55';
        if (clinCard) clinCard.style.borderColor = phase.color + '33';
    }

    // ── GLOBAL HANDLER ────────────────────────────────────────────────────────
    window.aphaseOnSlider = function(val) {
        updateFromSlider(val);
    };

    window.addEventListener('resize', () => updateFromSlider(currentSliderVal));

    // ── INIT ──────────────────────────────────────────────────────────────────
    buildTimelineBar();
    setTimeout(() => updateFromSlider(0), 80);
}
