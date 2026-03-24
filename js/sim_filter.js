// ─── SIM_FILTER.JS — Filter & Scale Simulator ────────────────────────────────
// module1.js Sayfa 2 yüklenince initFilterSimulator('fsim-mount') çağrılır.

function initFilterSimulator(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
    <div class="fsim-wrap">

        <div class="fsim-section-label">EEG signal</div>
        <div class="fsim-canvas-box">
            <div class="fsim-canvas-label" id="fsim-canvas-label">Raw EEG signal (unfiltered)</div>
            <canvas id="fsim-canvas" height="140" style="width:100%;display:block;"></canvas>
        </div>

        <div class="fsim-divider"></div>

        <div class="fsim-ctrl-row">
            <span class="fsim-ctrl-label">Filters</span>
            <div class="fsim-toggle-group">
                <button class="fsim-toggle" id="fsim-btn-hp"    onclick="fsimToggle('hp')">High-pass 0.5 Hz</button>
                <button class="fsim-toggle" id="fsim-btn-lp"    onclick="fsimToggle('lp')">Low-pass 70 Hz</button>
                <button class="fsim-toggle" id="fsim-btn-notch" onclick="fsimToggle('notch')">Notch 50 Hz</button>
            </div>
        </div>

        <div class="fsim-ctrl-row" style="margin-top:12px;">
            <span class="fsim-ctrl-label">Scale (µV/div)</span>
            <input type="range" id="fsim-scale-slider" min="1" max="5" step="1" value="3"
                   style="flex:1;min-width:100px;" oninput="fsimUpdateScale()">
            <span class="fsim-ctrl-val" id="fsim-scale-val">10 µV/div</span>
        </div>

        <div class="fsim-status-box bad" id="fsim-status">
            Filters off — baseline drift, 50 Hz noise, and EMG all present. Signal uninterpretable.
        </div>

        <div class="fsim-hint">
            💡 Enable all filters first, then adjust the scale. Try 25 µV/div to see how an
            inappropriate scale makes the signal unreadable — then dial back to 10 µV/div.
        </div>
    </div>
    `;

    // ── CSS ───────────────────────────────────────────────────────────────────
    if (!document.getElementById('fsim-styles')) {
        const style = document.createElement('style');
        style.id = 'fsim-styles';
        style.textContent = `
        .fsim-wrap { padding: 8px 0; }
        .fsim-section-label {
            font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
            text-transform: uppercase; color: var(--muted); margin-bottom: 8px;
        }
        .fsim-canvas-box {
            border: 1px solid var(--border); border-radius: 10px;
            overflow: hidden; background: rgba(0,0,0,0.15); margin-bottom: 4px;
        }
        .fsim-canvas-label {
            font-size: 0.72rem; color: var(--muted); padding: 8px 12px 0;
            font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase;
        }
        .fsim-divider { height: 1px; background: var(--border); margin: 18px 0; }
        .fsim-ctrl-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .fsim-ctrl-label { font-size: 0.83rem; color: var(--muted); min-width: 90px; }
        .fsim-ctrl-val { font-size: 0.83rem; font-weight: 600; color: var(--text); min-width: 70px; text-align: right; }
        .fsim-toggle-group { display: flex; gap: 8px; flex-wrap: wrap; }
        .fsim-toggle {
            padding: 6px 16px; font-size: 0.8rem; font-weight: 500;
            border: 1px solid var(--border); border-radius: 8px;
            background: none; color: var(--muted);
            cursor: pointer; transition: all 0.15s;
            font-family: 'DM Sans', sans-serif;
        }
        .fsim-toggle:hover { border-color: rgba(255,255,255,0.3); color: var(--text); }
        .fsim-toggle.active {
            background: rgba(0,198,167,0.12);
            border-color: rgba(0,198,167,0.4);
            color: var(--accent);
        }
        .fsim-status-box {
            margin-top: 16px; padding: 12px 16px; border-radius: 8px;
            font-size: 0.84rem; line-height: 1.6; border: 1px solid;
            transition: background 0.3s, color 0.3s, border-color 0.3s;
        }
        .fsim-status-box.bad {
            background: rgba(248,113,113,0.08);
            border-color: rgba(248,113,113,0.25); color: #fca5a5;
        }
        .fsim-status-box.warn {
            background: rgba(250,204,21,0.08);
            border-color: rgba(250,204,21,0.25); color: #fde68a;
        }
        .fsim-status-box.good {
            background: rgba(0,198,167,0.08);
            border-color: rgba(0,198,167,0.25); color: var(--accent);
        }
        .fsim-hint {
            margin-top: 14px; font-size: 0.82rem; color: var(--muted);
            background: rgba(0,198,167,0.05);
            border: 1px solid rgba(0,198,167,0.15);
            border-radius: 8px; padding: 12px 16px; line-height: 1.6;
        }
        `;
        document.head.appendChild(style);
    }

    // ── CONSTANTS ─────────────────────────────────────────────────────────────
    const SCALES  = [3, 5, 10, 15, 25];
    const SLABELS = ['3 µV/div', '5 µV/div', '10 µV/div', '15 µV/div', '25 µV/div'];
    const N   = 600;
    const DUR = 6;

    // ── STATE ─────────────────────────────────────────────────────────────────
    let filters  = { hp: false, lp: false, notch: false };
    let scaleIdx = 2; // default: 10 µV/div

    // ── SIGNAL ────────────────────────────────────────────────────────────────
    // Peak ~8 µV — 10 µV/div'de tam oturur, 25'te taşar, 3'te klipler
    function buildSignal() {
        const s = new Float32Array(N);
        for (let i = 0; i < N; i++) {
            const t = (i / N) * DUR;
            s[i] =
                3.5 * Math.sin(2 * Math.PI * 1.1  * t) +
                2.0 * Math.sin(2 * Math.PI * 2.4  * t + 0.9) +
                1.5 * Math.sin(2 * Math.PI * 9.5  * t + 1.4) +
                0.8 * Math.sin(2 * Math.PI * 16   * t + 0.3);

            if (!filters.hp)
                s[i] += 12 * Math.sin(2 * Math.PI * 0.09 * t) +
                         7  * Math.sin(2 * Math.PI * 0.2  * t + 1.1);

            if (!filters.notch)
                s[i] += 3 * Math.sin(2 * Math.PI * 50 * t + 0.5);

            if (!filters.lp)
                s[i] += 2.5 * Math.sin(2 * Math.PI * 75 * t + 0.2) +
                         1.5 * Math.sin(2 * Math.PI * 95 * t + 0.8);
        }
        return s;
    }

    // ── DRAW ──────────────────────────────────────────────────────────────────
    function draw() {
        const canvas = document.getElementById('fsim-canvas');
        if (!canvas) return;
        const W = canvas.offsetWidth || 660;
        canvas.width = W;
        const H   = canvas.height;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, W, H);

        const midY = H / 2;
        const maxA = SCALES[scaleIdx];
        const scY  = (H * 0.42) / maxA;
        const s    = buildSignal();

        ctx.strokeStyle = 'rgba(255,255,255,0.07)';
        ctx.lineWidth   = 0.5;
        ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(W, midY); ctx.stroke();

        const allOn = filters.hp && filters.lp && filters.notch;
        const anyOn = filters.hp || filters.lp || filters.notch;
        const color = allOn ? '#00c6a7' : anyOn ? '#facc15' : '#f87171';

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth   = 1.6;
        ctx.lineJoin    = 'round';

        // 25 µV/div: clamp yok — sinyal canvas dışına çıksın (didaktik)
        const clamp = scaleIdx < 4;
        for (let i = 0; i < N; i++) {
            const x = (i / (N - 1)) * W;
            const v = clamp ? Math.max(-maxA, Math.min(maxA, s[i])) : s[i];
            const y = midY - v * scY;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

    // ── STATUS ────────────────────────────────────────────────────────────────
    function updateStatus() {
        const el  = document.getElementById('fsim-status');
        const lbl = document.getElementById('fsim-canvas-label');
        if (!el || !lbl) return;

        const allOn = filters.hp && filters.lp && filters.notch;

        if (!filters.hp && !filters.lp && !filters.notch) {
            el.className = 'fsim-status-box bad';
            el.textContent = 'All filters off — baseline drift, 50 Hz interference, and EMG noise present. Signal uninterpretable.';
            lbl.textContent = 'Raw EEG signal (unfiltered)';
            return;
        }

        if (!allOn) {
            if (!filters.notch) {
                el.className = 'fsim-status-box warn';
                el.textContent = '50 Hz power line interference still present. Enable notch filter.';
                lbl.textContent = 'Partially filtered — 50 Hz noise remaining';
            } else if (!filters.hp) {
                el.className = 'fsim-status-box warn';
                el.textContent = 'Slow baseline drift still present. Enable high-pass filter.';
                lbl.textContent = 'Partially filtered — baseline drift remaining';
            } else {
                el.className = 'fsim-status-box warn';
                el.textContent = 'High-frequency EMG noise still present. Enable low-pass filter.';
                lbl.textContent = 'Partially filtered — EMG noise remaining';
            }
            return;
        }

        lbl.textContent = 'Filtered EEG — HP 0.5 Hz + LP 70 Hz + Notch 50 Hz';
        if (scaleIdx === 4) {
            el.className = 'fsim-status-box bad';
            el.textContent = 'Scale too wide (25 µV/div) — signal extends beyond the display. Reduce scale to see the trace properly.';
        } else if (scaleIdx === 3) {
            el.className = 'fsim-status-box warn';
            el.textContent = 'Scale acceptable (15 µV/div) — signal fits but uses most of the display. A tighter scale improves readability.';
        } else if (scaleIdx === 2) {
            el.className = 'fsim-status-box good';
            el.textContent = 'Optimal — filters active, scale appropriate (10 µV/div). Signal is clean and well-fitted to the display.';
        } else if (scaleIdx === 1) {
            el.className = 'fsim-status-box warn';
            el.textContent = 'Scale too tight (5 µV/div) — small baseline variations may cause clipping.';
        } else {
            el.className = 'fsim-status-box warn';
            el.textContent = 'Scale too tight (3 µV/div) — signal clips. Normal low-amplitude activity cannot be fully displayed.';
        }
    }

    // ── SYNC BUTTONS ──────────────────────────────────────────────────────────
    function syncButtons() {
        ['hp', 'lp', 'notch'].forEach(k => {
            const btn = document.getElementById('fsim-btn-' + k);
            if (btn) btn.className = 'fsim-toggle' + (filters[k] ? ' active' : '');
        });
    }

    function redraw() { draw(); updateStatus(); syncButtons(); }

    // ── GLOBAL HANDLERS ───────────────────────────────────────────────────────
    window.fsimToggle = function(key) {
        filters[key] = !filters[key];
        redraw();
    };

    window.fsimUpdateScale = function() {
        scaleIdx = parseInt(document.getElementById('fsim-scale-slider').value) - 1;
        document.getElementById('fsim-scale-val').textContent = SLABELS[scaleIdx];
        redraw();
    };

    window.addEventListener('resize', redraw);
    setTimeout(redraw, 80);
}
