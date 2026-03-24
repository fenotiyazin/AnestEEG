// ─── SIM_WAVE.JS — Wave Composition Simulator ────────────────────────────────
// Bağımsız simülatör modülü. module1.js sayfa 1 yüklenince initWaveSimulator()
// çağrılır, bu dosya içindeki her şeyi verilen container'a inject eder.

function initWaveSimulator(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
    <div class="wsim-wrap">

        <div class="wsim-section-label">Composite EEG signal</div>
        <div class="wsim-canvas-box">
            <canvas id="wsim-composite" height="90" style="width:100%;display:block;"></canvas>
        </div>

        <div class="wsim-divider"></div>
        <div class="wsim-section-label">Component waves</div>
        <div class="wsim-canvas-box">
            <div id="wsim-wave-list">
                <div class="wsim-empty">No waves added yet — add a component below</div>
            </div>
            <canvas id="wsim-components" height="90"
                    style="width:100%;display:block;border-top:0.5px solid var(--border);"></canvas>
        </div>

        <div class="wsim-divider"></div>
        <div class="wsim-section-label">Add a wave component</div>

        <div class="wsim-ctrl-row">
            <span class="wsim-ctrl-label">Frequency</span>
            <input type="range" id="wsim-freq" min="0.5" max="30" step="0.5" value="2"
                   style="flex:1;min-width:100px;">
            <span class="wsim-ctrl-val" id="wsim-freq-val">2.0 Hz</span>
            <span class="wsim-band-pill" id="wsim-band-pill">delta</span>
        </div>
        <div class="wsim-ctrl-row">
            <span class="wsim-ctrl-label">Amplitude</span>
            <input type="range" id="wsim-amp" min="10" max="100" step="5" value="60"
                   style="flex:1;min-width:100px;">
            <span class="wsim-ctrl-val" id="wsim-amp-val">60 µV</span>
        </div>

        <div class="wsim-btn-row">
            <button class="wsim-btn-add" id="wsim-add-btn">+ Add wave</button>
            <button class="wsim-btn-clear" id="wsim-clear-btn">Clear all</button>
        </div>

        <div class="wsim-hint">
            💡 Try combining a slow delta wave (1–2 Hz) with a faster alpha wave (10 Hz) 
            to see how a complex EEG signal emerges from simple components.
        </div>
    </div>
    `;

    // ── CSS ───────────────────────────────────────────────────────────────────
    if (!document.getElementById('wsim-styles')) {
        const style = document.createElement('style');
        style.id = 'wsim-styles';
        style.textContent = `
        .wsim-wrap { padding: 8px 0; }
        .wsim-section-label {
            font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
            text-transform: uppercase; color: var(--muted);
            margin-bottom: 8px;
        }
        .wsim-canvas-box {
            border: 1px solid var(--border); border-radius: 10px;
            overflow: hidden; background: rgba(0,0,0,0.15);
            margin-bottom: 4px;
        }
        .wsim-divider { height: 1px; background: var(--border); margin: 20px 0; }
        .wsim-wave-row {
            display: flex; align-items: center; gap: 10px;
            padding: 9px 14px;
            border-bottom: 1px solid var(--border);
            font-size: 0.85rem;
        }
        .wsim-wave-row:last-child { border-bottom: none; }
        .wsim-dot {
            width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
        }
        .wsim-wave-name { flex: 1; color: var(--text); font-weight: 500; }
        .wsim-wave-detail { color: var(--muted); font-size: 0.78rem; }
        .wsim-remove {
            background: none; border: 1px solid var(--border);
            border-radius: 6px; padding: 2px 8px;
            font-size: 0.72rem; color: var(--muted); cursor: pointer;
            font-family: 'DM Sans', sans-serif;
            transition: all 0.2s;
        }
        .wsim-remove:hover { border-color: #f87171; color: #f87171; }
        .wsim-empty {
            padding: 16px; text-align: center;
            font-size: 0.82rem; color: var(--muted);
        }
        .wsim-ctrl-row {
            display: flex; align-items: center; gap: 10px;
            margin-bottom: 12px; flex-wrap: wrap;
        }
        .wsim-ctrl-label {
            font-size: 0.83rem; color: var(--muted); min-width: 76px;
        }
        .wsim-ctrl-val {
            font-size: 0.83rem; font-weight: 600;
            color: var(--text); min-width: 52px;
        }
        .wsim-band-pill {
            font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em;
            padding: 3px 10px; border-radius: 99px;
            background: rgba(0,198,167,0.12);
            color: var(--accent);
            border: 1px solid rgba(0,198,167,0.25);
        }
        .wsim-btn-row { display: flex; gap: 10px; margin-top: 4px; margin-bottom: 20px; }
        .wsim-btn-add {
            padding: 9px 22px;
            background: linear-gradient(135deg, var(--accent), #00a896);
            border: none; border-radius: 8px;
            color: #0a0e1a; font-family: 'DM Sans', sans-serif;
            font-size: 0.85rem; font-weight: 700; cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 2px 12px rgba(0,198,167,0.25);
        }
        .wsim-btn-add:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,198,167,0.35); }
        .wsim-btn-clear {
            padding: 9px 18px;
            background: none; border: 1px solid var(--border);
            border-radius: 8px; color: var(--muted);
            font-family: 'DM Sans', sans-serif;
            font-size: 0.85rem; cursor: pointer;
            transition: all 0.2s;
        }
        .wsim-btn-clear:hover { border-color: #f87171; color: #f87171; }
        .wsim-hint {
            font-size: 0.82rem; color: var(--muted);
            background: rgba(0,198,167,0.05);
            border: 1px solid rgba(0,198,167,0.15);
            border-radius: 8px; padding: 12px 16px;
            line-height: 1.6;
        }
        `;
        document.head.appendChild(style);
    }

    // ── CONSTANTS ─────────────────────────────────────────────────────────────
    const COLORS  = ['#378ADD','#1D9E75','#BA7517','#D85A30','#D4537E','#7F77DD','#639922','#E24B4A'];
    const BANDS   = [
        { name:'delta', min:0.5, max:4  },
        { name:'theta', min:4,   max:8  },
        { name:'alpha', min:8,   max:13 },
        { name:'beta',  min:13,  max:31 },
    ];
    const POINTS  = 400;
    const DURATION = 4; // seconds

    // ── STATE ─────────────────────────────────────────────────────────────────
    let waves    = [];
    let colorIdx = 0;

    // ── HELPERS ───────────────────────────────────────────────────────────────
    function getBandName(freq) {
        return (BANDS.find(b => freq >= b.min && freq < b.max) || BANDS[3]).name;
    }

    function computeSignal(waveSet) {
        const sig = new Float32Array(POINTS).fill(0);
        waveSet.forEach(w => {
            for (let i = 0; i < POINTS; i++) {
                const t = (i / POINTS) * DURATION;
                sig[i] += w.amp * Math.sin(2 * Math.PI * w.freq * t);
            }
        });
        return sig;
    }

    function drawCanvas(canvas, signals, colors) {
        const W = canvas.offsetWidth || 600;
        canvas.width = W;
        const H   = canvas.height;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, W, H);

        // baseline
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, H / 2);
        ctx.lineTo(W, H / 2);
        ctx.stroke();

        const midY  = H / 2;
        const scale = (H * 0.42) / 100;

        signals.forEach((sig, si) => {
            ctx.beginPath();
            ctx.strokeStyle  = colors[si];
            ctx.lineWidth    = signals.length === 1 ? 2 : (si === 0 ? 2.2 : 1.3);
            ctx.globalAlpha  = si === 0 && signals.length > 1 ? 1 : (signals.length === 1 ? 1 : 0.6);
            for (let i = 0; i < sig.length; i++) {
                const x = (i / (sig.length - 1)) * W;
                const y = midY - sig[i] * scale;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
        });
    }

    function redraw() {
        const composite    = computeSignal(waves);
        const compCanvas   = document.getElementById('wsim-composite');
        const indivCanvas  = document.getElementById('wsim-components');
        if (!compCanvas || !indivCanvas) return;

        drawCanvas(compCanvas, [composite], ['#00c6a7']);

        if (waves.length > 0) {
            drawCanvas(indivCanvas, waves.map(w => computeSignal([w])), waves.map(w => w.color));
        } else {
            indivCanvas.width = indivCanvas.offsetWidth || 600;
            indivCanvas.getContext('2d').clearRect(0, 0, indivCanvas.width, indivCanvas.height);
        }
    }

    function renderList() {
        const list = document.getElementById('wsim-wave-list');
        if (!list) return;
        if (waves.length === 0) {
            list.innerHTML = '<div class="wsim-empty">No waves added yet — add a component below</div>';
            return;
        }
        list.innerHTML = waves.map((w, i) => `
            <div class="wsim-wave-row">
                <div class="wsim-dot" style="background:${w.color}"></div>
                <div class="wsim-wave-name">
                    ${w.freq.toFixed(1)} Hz
                    <span class="wsim-band-pill" style="margin-left:6px;">${getBandName(w.freq)}</span>
                </div>
                <div class="wsim-wave-detail">${w.amp} µV</div>
                <button class="wsim-remove" onclick="wsimRemove(${i})">remove</button>
            </div>
        `).join('');
    }

    // ── GLOBAL REMOVE (onclick handler için) ─────────────────────────────────
    window.wsimRemove = function(idx) {
        waves.splice(idx, 1);
        renderList();
        redraw();
    };

    // ── EVENT LISTENERS ───────────────────────────────────────────────────────
    document.getElementById('wsim-freq').addEventListener('input', function() {
        const v = parseFloat(this.value);
        document.getElementById('wsim-freq-val').textContent  = v.toFixed(1) + ' Hz';
        document.getElementById('wsim-band-pill').textContent = getBandName(v);
    });

    document.getElementById('wsim-amp').addEventListener('input', function() {
        document.getElementById('wsim-amp-val').textContent = this.value + ' µV';
    });

    document.getElementById('wsim-add-btn').addEventListener('click', function() {
        const freq = parseFloat(document.getElementById('wsim-freq').value);
        const amp  = parseInt(document.getElementById('wsim-amp').value);
        waves.push({ freq, amp, color: COLORS[colorIdx % COLORS.length] });
        colorIdx++;
        renderList();
        redraw();
    });

    document.getElementById('wsim-clear-btn').addEventListener('click', function() {
        waves    = [];
        colorIdx = 0;
        renderList();
        redraw();
    });

    window.addEventListener('resize', redraw);

    // ── DEMO WAVES ────────────────────────────────────────────────────────────
    waves = [
        { freq: 1.5, amp: 70, color: COLORS[0] },
        { freq: 10,  amp: 35, color: COLORS[1] },
    ];
    colorIdx = 2;
    renderList();
    setTimeout(redraw, 80);
}
