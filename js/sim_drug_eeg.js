// ─── SIM_DRUG_EEG.JS — Agent-Specific EEG Signature Simulator ────────────────
// Module 6 için üç ayrı simülatör sağlar:
//   1. initDrugEEGViewer(containerId)  → Sayfa 1: 4 ajan yan yana tracingler
//   2. initMultimodalSim(containerId)  → Sayfa 2: kombinasyon anestezi slider
//   3. initDrugQuiz(containerId)       → Sayfa 3: "Bu hangi ajan?" egzersizi

// ─────────────────────────────────────────────────────────────────────────────
// YARDIMCI: Her ajan için EEG morfolojisini üret
// Gerçek EEG morfolojileri: yüksek amplitüdlü yavaş, düzensiz mikst,
// hızlı yüksek frekans, düşük amp yavaş
// ─────────────────────────────────────────────────────────────────────────────

const DRUG_PROFILES = {
    propofol: {
        label: 'Propofol',
        color: '#00c6a7',
        mechanism: 'GABA-A potentiation',
        eegCharacter: 'High-amplitude frontal alpha (8–12 Hz) with slower delta activity. Anterior–posterior coherence reversal. Progressive amplitude increase → burst suppression at deep levels.',
        keyFeatures: ['Frontal alpha dominance', 'High amplitude (50–150 µV)', 'Slow-wave predominance', 'Coherence reversal (ant→post)'],
        clinicalNote: 'The "propofol signature" — large, slow frontal alpha — is highly reliable. Disappearance of alpha with rising delta signals deepening. Burst suppression indicates overdose.',
        // Morfoloji: FS=64 referansında yavaş, geniş dalgalar
        // numPoints=384 @ canvas~400px → ~6px/nokta → dalga aralığı görünür
        waves: [
            { freq: 1.0,  amp: 0.30, phase: 0.0  },  // yavaş delta zemini
            { freq: 1.8,  amp: 0.22, phase: 1.4  },  // delta
            { freq: 10.0, amp: 0.55, phase: 0.4  },  // frontal alfa — baskın
            { freq: 10.6, amp: 0.20, phase: 2.3  },  // alfa harmonik
        ],
        noise: 0.06,
        ampScale: 0.70   // yüksek ama sığdırılmış
    },
    sevoflurane: {
        label: 'Sevoflurane',
        color: '#f0a500',
        mechanism: 'GABA-A + NMDA modulation',
        eegCharacter: 'Irregular mixture of theta, alpha and beta activity. Less coherent than propofol. At deeper planes: slowing with delta dominance and spindle-like bursts.',
        keyFeatures: ['Mixed frequency (theta–alpha–beta)', 'Irregular, less coherent pattern', 'Spindle-like bursts', 'Dose-dependent slowing'],
        clinicalNote: 'Sevoflurane lacks the clean propofol alpha — the signal is "noisier". This makes processed EEG indices like BIS less reliable with volatile agents compared to propofol.',
        waves: [
            { freq: 0.7,  amp: 0.18, phase: 0.0  },
            { freq: 3.0,  amp: 0.28, phase: 0.7  },  // theta
            { freq: 6.0,  amp: 0.32, phase: 1.5  },  // theta-alfa sınırı
            { freq: 9.0,  amp: 0.28, phase: 0.9  },  // düzensiz alfa
            { freq: 13.0, amp: 0.18, phase: 2.1  },  // beta sıçramaları
        ],
        noise: 0.15,
        ampScale: 0.62
    },
    ketamine: {
        label: 'Ketamine',
        color: '#e05c7a',
        mechanism: 'NMDA antagonism',
        eegCharacter: 'Paradoxical EEG activation: high-frequency gamma/beta activity (>25 Hz), increased amplitude. COMPLETELY different from other agents — more like light sedation or even wakefulness.',
        keyFeatures: ['High-frequency beta/gamma (25–40 Hz)', 'Increased overall amplitude', 'Paradoxical activation', 'NO slow-wave predominance'],
        clinicalNote: 'Ketamine is the great disruptor — it activates rather than suppresses EEG. This is why BIS may READ HIGH (40–70) despite deep surgical anaesthesia with ketamine. Never use BIS alone to guide ketamine depth.',
        waves: [
            { freq: 1.5,  amp: 0.12, phase: 0.0  },  // minimal yavaş
            { freq: 8.0,  amp: 0.18, phase: 1.2  },
            { freq: 20.0, amp: 0.38, phase: 0.3  },  // beta baskın
            { freq: 28.0, amp: 0.42, phase: 2.0  },  // yüksek beta — çekirdek
            { freq: 36.0, amp: 0.25, phase: 1.0  },  // gamma
        ],
        noise: 0.12,
        ampScale: 0.58   // frekans yüksek ama amplitüd orta
    },
    dexmedetomidine: {
        label: 'Dexmedetomidine',
        color: '#7b8cde',
        mechanism: 'α₂-adrenoreceptor agonism',
        eegCharacter: 'Low-amplitude slow oscillations (0.1–1 Hz) with spindle-like activity (9–15 Hz). EEG resembles stage 2 NREM sleep — a unique neurophysiological state.',
        keyFeatures: ['Low amplitude overall', 'Slow oscillations (< 1 Hz)', 'Sleep spindles (9–15 Hz)', 'NREM sleep-like pattern'],
        clinicalNote: 'Dexmedetomidine does not produce true unconsciousness — it produces an arousable sedation resembling natural sleep. EEG confirmation is valuable as clinical signs alone can mislead.',
        waves: [
            { freq: 0.3,  amp: 0.45, phase: 0.0  },  // çok yavaş — baskın, geniş dalgalar
            { freq: 0.7,  amp: 0.28, phase: 1.8  },  // yavaş delta
            { freq: 12.0, amp: 0.16, phase: 0.6  },  // uyku iğciği — ince
            { freq: 13.2, amp: 0.10, phase: 2.4  },
        ],
        noise: 0.04,
        ampScale: 0.40   // karakteristik düşük amplitüd
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// EEG SİNYAL ÜRETİCİ
// ─────────────────────────────────────────────────────────────────────────────

function generateDrugEEG(profile, numPoints, fs = 64) {
    // fs=64: 1 saniye = 64 nokta, numPoints=384 → ~6 saniye
    // Canvas genişliği ~400px → ~1px/nokta → dalgalar rahat görünür
    const dt = 1 / fs;
    const signal = new Float32Array(numPoints);

    for (let i = 0; i < numPoints; i++) {
        const t = i * dt;
        let val = 0;
        for (const w of profile.waves) {
            val += w.amp * Math.sin(2 * Math.PI * w.freq * t + w.phase);
        }
        val += (Math.random() - 0.5) * 2 * profile.noise;
        signal[i] = val * profile.ampScale;
    }

    // Hafif yumuşatma — çok ağır smoothing yapma, EEG detayını koru
    for (let i = 1; i < numPoints - 1; i++) {
        signal[i] = signal[i] * 0.88 + signal[i-1] * 0.08 + signal[i+1] * 0.04;
    }

    return signal;
}

function drawEEGTrace(canvas, profile, options = {}) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const numPoints = options.numPoints || 384;
    const signal = generateDrugEEG(profile, numPoints);
    const color = options.color || profile.color;
    const lineWidth = options.lineWidth || 1.5;

    ctx.clearRect(0, 0, W, H);

    // Izgara çizgisi
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();

    // EEG tracing
    const margin = H * 0.12;
    const usableH = H - margin * 2;
    const midY = H / 2;
    const scaleY = (usableH / 2) * 0.85;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.shadowColor = color;
    ctx.shadowBlur = 3;

    for (let i = 0; i < numPoints; i++) {
        const x = (i / (numPoints - 1)) * W;
        const y = midY - signal[i] * scaleY;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. DRUG EEG VIEWER — Sayfa 1
// ─────────────────────────────────────────────────────────────────────────────

function initDrugEEGViewer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const drugs = ['propofol', 'sevoflurane', 'ketamine', 'dexmedetomidine'];

    container.innerHTML = `
    <div class="deeg-wrap">
        <div class="deeg-cards" id="deeg-cards">
            ${drugs.map(d => `
            <div class="deeg-card" id="deeg-card-${d}" onclick="deegSelect('${d}')">
                <div class="deeg-card-header" style="border-color:${DRUG_PROFILES[d].color}22;">
                    <span class="deeg-drug-name" style="color:${DRUG_PROFILES[d].color}">
                        ${DRUG_PROFILES[d].label}
                    </span>
                    <span class="deeg-mech">${DRUG_PROFILES[d].mechanism}</span>
                </div>
                <div class="deeg-canvas-box">
                    <canvas id="deeg-canvas-${d}" height="80" style="width:100%;display:block;"></canvas>
                </div>
                <div class="deeg-tap-hint">tap for details</div>
            </div>
            `).join('')}
        </div>

        <div class="deeg-detail-panel" id="deeg-detail" style="display:none;">
            <button class="deeg-close-btn" onclick="deegClose()">✕ Close</button>
            <div class="deeg-detail-inner" id="deeg-detail-inner"></div>
        </div>

        <div class="deeg-timescale">
            <span>Time →</span>
            <div class="deeg-scale-bar"></div>
            <span>5 s</span>
        </div>
    </div>`;

    // Canvas boyutlarını ayarla ve çiz
    requestAnimationFrame(() => {
        drugs.forEach(d => {
            const canvas = document.getElementById(`deeg-canvas-${d}`);
            if (!canvas) return;
            canvas.width = canvas.offsetWidth || 400;
            drawEEGTrace(canvas, DRUG_PROFILES[d]);
        });

        // Resize observer
        const resizeObs = new ResizeObserver(() => {
            drugs.forEach(d => {
                const canvas = document.getElementById(`deeg-canvas-${d}`);
                if (!canvas) return;
                const newW = canvas.offsetWidth;
                if (newW > 0 && canvas.width !== newW) {
                    canvas.width = newW;
                    drawEEGTrace(canvas, DRUG_PROFILES[d]);
                }
            });
        });
        resizeObs.observe(container);
    });
}

window.deegSelect = function(drugKey) {
    const p = DRUG_PROFILES[drugKey];
    const panel = document.getElementById('deeg-detail');
    const inner = document.getElementById('deeg-detail-inner');
    if (!panel || !inner) return;

    inner.innerHTML = `
        <div class="deeg-detail-header" style="border-bottom: 2px solid ${p.color}30; padding-bottom:16px; margin-bottom:20px;">
            <h3 style="font-family:'DM Serif Display',serif; font-size:1.5rem; color:${p.color}; margin:0 0 4px;">
                ${p.label}
            </h3>
            <span style="font-size:0.8rem; color:var(--muted); font-style:italic;">
                ${p.mechanism}
            </span>
        </div>

        <div class="deeg-detail-canvas-box" style="margin-bottom:20px;">
            <canvas id="deeg-detail-canvas" height="100" style="width:100%;display:block;border-radius:8px;background:rgba(0,0,0,0.3);"></canvas>
        </div>

        <div style="margin-bottom:16px;">
            <div class="deeg-detail-section-title">EEG Characteristics</div>
            <p style="font-size:0.88rem; color:var(--text-sec); line-height:1.65; margin:0;">${p.eegCharacter}</p>
        </div>

        <div style="margin-bottom:16px;">
            <div class="deeg-detail-section-title">Key Features</div>
            <div class="deeg-feature-tags">
                ${p.keyFeatures.map(f => `<span class="deeg-feature-tag" style="border-color:${p.color}44; color:${p.color};">${f}</span>`).join('')}
            </div>
        </div>

        <div class="deeg-clinical-box" style="border-left: 3px solid ${p.color}; background: ${p.color}0d;">
            <div class="deeg-detail-section-title" style="color:${p.color};">Clinical Note</div>
            <p style="font-size:0.85rem; color:var(--text-sec); line-height:1.65; margin:0;">${p.clinicalNote}</p>
        </div>
    `;

    panel.style.display = 'block';

    requestAnimationFrame(() => {
        const dc = document.getElementById('deeg-detail-canvas');
        if (dc) {
            dc.width = dc.offsetWidth || 600;
            drawEEGTrace(dc, p, { lineWidth: 1.8, numPoints: 512 });
        }
    });
};

window.deegClose = function() {
    const panel = document.getElementById('deeg-detail');
    if (panel) panel.style.display = 'none';
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. MULTİMODAL ANESTEZİ SİMÜLATÖRÜ — Sayfa 2
// ─────────────────────────────────────────────────────────────────────────────

function initMultimodalSim(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
    <div class="mmsim-wrap">
        <div class="mmsim-title">Build your anaesthetic combination</div>
        <div class="mmsim-subtitle">
            Adjust each agent's contribution and observe the composite EEG signature.
            The dominant agent shapes the overall pattern.
        </div>

        <div class="mmsim-sliders">
            <div class="mmsim-row">
                <div class="mmsim-agent-label" style="color:${DRUG_PROFILES.propofol.color}">
                    <span class="mmsim-dot" style="background:${DRUG_PROFILES.propofol.color}"></span>
                    Propofol
                </div>
                <input type="range" class="mmsim-slider" id="mmsim-prop" min="0" max="100" value="60"
                       oninput="mmsimUpdate()" style="--track-color:${DRUG_PROFILES.propofol.color}">
                <span class="mmsim-pct" id="mmsim-prop-val">60%</span>
            </div>
            <div class="mmsim-row">
                <div class="mmsim-agent-label" style="color:${DRUG_PROFILES.ketamine.color}">
                    <span class="mmsim-dot" style="background:${DRUG_PROFILES.ketamine.color}"></span>
                    Ketamine
                </div>
                <input type="range" class="mmsim-slider" id="mmsim-ket" min="0" max="100" value="0"
                       oninput="mmsimUpdate()" style="--track-color:${DRUG_PROFILES.ketamine.color}">
                <span class="mmsim-pct" id="mmsim-ket-val">0%</span>
            </div>
            <div class="mmsim-row">
                <div class="mmsim-agent-label" style="color:${DRUG_PROFILES.dexmedetomidine.color}">
                    <span class="mmsim-dot" style="background:${DRUG_PROFILES.dexmedetomidine.color}"></span>
                    Dexmedetomidine
                </div>
                <input type="range" class="mmsim-slider" id="mmsim-dex" min="0" max="100" value="0"
                       oninput="mmsimUpdate()" style="--track-color:${DRUG_PROFILES.dexmedetomidine.color}">
                <span class="mmsim-pct" id="mmsim-dex-val">0%</span>
            </div>
        </div>

        <div class="mmsim-canvas-wrap">
            <div class="mmsim-canvas-label">Composite EEG</div>
            <canvas id="mmsim-canvas" height="110" style="width:100%;display:block;"></canvas>
        </div>

        <div class="mmsim-opioid-note" id="mmsim-opioid">
            <div class="mmsim-opioid-title">🔶 Opioid co-administration</div>
            <p>Opioids (remifentanil, fentanyl) do <strong>not</strong> produce a distinctive EEG signature 
            at clinical doses. They cause mild delta slowing and can potentiate the effects of other agents 
            but will not dominate the EEG picture. At very high doses: paradoxical delta burst activity.</p>
        </div>

        <div class="mmsim-status" id="mmsim-status">
            <div class="mmsim-status-dot" style="background:${DRUG_PROFILES.propofol.color}"></div>
            <span id="mmsim-status-text">Dominant pattern: Propofol — frontal alpha with high amplitude</span>
        </div>

        <div class="mmsim-warning" id="mmsim-warning" style="display:none;">
            ⚠️ <strong>Ketamine dominant:</strong> BIS and other pEEG indices will be unreliable. 
            EEG shows activation, not suppression — do not titrate purely by index.
        </div>
    </div>`;

    // Canvas
    requestAnimationFrame(() => {
        const c = document.getElementById('mmsim-canvas');
        if (c) { c.width = c.offsetWidth || 600; mmsimUpdate(); }
    });
}

window.mmsimUpdate = function() {
    const propVal = parseInt(document.getElementById('mmsim-prop').value);
    const ketVal  = parseInt(document.getElementById('mmsim-ket').value);
    const dexVal  = parseInt(document.getElementById('mmsim-dex').value);

    document.getElementById('mmsim-prop-val').textContent = propVal + '%';
    document.getElementById('mmsim-ket-val').textContent  = ketVal + '%';
    document.getElementById('mmsim-dex-val').textContent  = dexVal + '%';

    const canvas = document.getElementById('mmsim-canvas');
    if (!canvas) return;
    canvas.width = canvas.offsetWidth || 600;

    const total = propVal + ketVal + dexVal || 1;
    const wProp = propVal / total;
    const wKet  = ketVal  / total;
    const wDex  = dexVal  / total;

    const numPoints = 384;
    const fs = 64;
    const dt = 1 / fs;

    // Karışık sinyal üret
    const sP = generateDrugEEG(DRUG_PROFILES.propofol,         numPoints, fs);
    const sK = generateDrugEEG(DRUG_PROFILES.ketamine,          numPoints, fs);
    const sD = generateDrugEEG(DRUG_PROFILES.dexmedetomidine,  numPoints, fs);

    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const midY = H / 2;
    const scaleY = (H * 0.38);

    ctx.clearRect(0, 0, W, H);

    // Izgara
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(W, midY); ctx.stroke();

    // Dominant rengi hesapla
    let domColor;
    if (ketVal >= propVal && ketVal >= dexVal) domColor = DRUG_PROFILES.ketamine.color;
    else if (dexVal >= propVal) domColor = DRUG_PROFILES.dexmedetomidine.color;
    else domColor = DRUG_PROFILES.propofol.color;

    ctx.beginPath();
    ctx.strokeStyle = domColor;
    ctx.lineWidth = 1.6;
    ctx.shadowColor = domColor;
    ctx.shadowBlur = 4;

    for (let i = 0; i < numPoints; i++) {
        const mixed = sP[i] * wProp + sK[i] * wKet + sD[i] * wDex;
        const x = (i / (numPoints - 1)) * W;
        const y = midY - mixed * scaleY;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Status güncelle
    const statusDot  = document.querySelector('.mmsim-status-dot');
    const statusText = document.getElementById('mmsim-status-text');
    const warning    = document.getElementById('mmsim-warning');

    if (statusDot) statusDot.style.background = domColor;

    let statusMsg = '';
    if (ketVal > 50) {
        statusMsg = 'Dominant pattern: Ketamine — paradoxical EEG activation, high-frequency beta/gamma';
        if (warning) warning.style.display = 'block';
    } else if (dexVal > propVal && dexVal > ketVal) {
        statusMsg = 'Dominant pattern: Dexmedetomidine — low amplitude, sleep-like slow oscillations';
        if (warning) warning.style.display = 'none';
    } else if (propVal === 0 && ketVal === 0 && dexVal === 0) {
        statusMsg = 'All agents at 0% — no signal';
        if (warning) warning.style.display = 'none';
    } else {
        statusMsg = 'Dominant pattern: Propofol — frontal alpha with high amplitude slow waves';
        if (warning) warning.style.display = 'none';
    }

    if (statusText) statusText.textContent = statusMsg;
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. DRUG QUIZ SİMÜLATÖRÜ — Sayfa 3
// ─────────────────────────────────────────────────────────────────────────────

const QUIZ_QUESTIONS = [
    {
        drug: 'propofol',
        hint: '45-year-old ASA II patient, elective cholecystectomy. Haemodynamics stable throughout. BIS: 42.',
        options: ['Propofol', 'Sevoflurane', 'Ketamine', 'Dexmedetomidine'],
        answer: 'Propofol',
        explanation: 'The large-amplitude slow frontal alpha (8–12 Hz) waves are the hallmark propofol signature. High amplitude + slow-wave dominance + BIS in the 40s = classic TIVA with propofol.'
    },
    {
        drug: 'ketamine',
        hint: 'Trauma patient, haemodynamically unstable. Rapid sequence induction. SpO₂ stable. BIS reading: 67.',
        options: ['Propofol', 'Sevoflurane', 'Ketamine', 'Dexmedetomidine'],
        answer: 'Ketamine',
        explanation: 'Paradoxical high-frequency activation (beta/gamma) with a misleadingly high BIS — exactly what ketamine does. The patient is under adequate anaesthesia despite the "awake-looking" EEG and high BIS.'
    },
    {
        drug: 'dexmedetomidine',
        hint: '78-year-old patient in the ICU, mechanically ventilated for respiratory failure. Targeted sedation protocol in place. RASS −2. Haemodynamics stable, no vasopressors.',
        options: ['Propofol', 'Midazolam', 'Ketamine', 'Dexmedetomidine'],
        answer: 'Dexmedetomidine',
        explanation: 'Low amplitude, very slow oscillations (< 1 Hz) with sleep spindles. This NREM-sleep pattern is unique to dexmedetomidine. The patient is arousable because it mimics natural sleep physiology.'
    },
    {
        drug: 'sevoflurane',
        hint: 'Paediatric patient, tonsillectomy. BIS fluctuating 38–55.',
        options: ['Propofol', 'Sevoflurane', 'Fentanyl', 'Dexmedetomidine'],
        answer: 'Sevoflurane',
        explanation: 'Irregular mixed theta–alpha–beta activity without the clean frontal alpha of propofol. The irregular, lower-coherence pattern + fluctuating BIS is typical for volatile agents, especially sevoflurane.'
    },
    {
        drug: 'dexmedetomidine',
        hint: 'Elderly patient, 78y, undergoing awake fibreoptic intubation. Cooperative, responds to voice. RASS −1.',
        options: ['Propofol', 'Sevoflurane', 'Midazolam', 'Dexmedetomidine'],
        answer: 'Dexmedetomidine',
        explanation: 'Low amplitude, very slow oscillations with spindle-like activity — the NREM sleep pattern of dexmedetomidine. The patient is arousable and cooperative, which is exactly the clinical goal. No other agent produces this combination of EEG appearance and preserved responsiveness.'
    }
];

function initDrugQuiz(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    window._quizState = { current: 0, score: 0, answered: new Array(QUIZ_QUESTIONS.length).fill(null) };
    renderQuizQuestion(container, 0);
}

function renderQuizQuestion(container, idx) {
    const q = QUIZ_QUESTIONS[idx];
    const state = window._quizState;
    const total = QUIZ_QUESTIONS.length;
    const already = state.answered[idx];

    container.innerHTML = `
    <div class="dquiz-wrap">
        <div class="dquiz-header">
            <span class="dquiz-counter">Question ${idx + 1} / ${total}</span>
            <span class="dquiz-score">Score: ${state.score} / ${total}</span>
        </div>

        <div class="dquiz-hint-box">
            <span class="dquiz-hint-label">📋 Clinical context</span>
            <p class="dquiz-hint-text">${q.hint}</p>
        </div>

        <div class="dquiz-canvas-wrap">
            <div class="dquiz-canvas-label">EEG trace — identify the agent</div>
            <canvas id="dquiz-canvas" height="90" style="width:100%;display:block;"></canvas>
        </div>

        <div class="dquiz-options" id="dquiz-options">
            ${q.options.map(opt => {
                let cls = 'dquiz-opt';
                if (already !== null) {
                    if (opt === q.answer) cls += ' correct';
                    else if (opt === already) cls += ' wrong';
                    else cls += ' disabled';
                }
                return `<button class="${cls}" onclick="dquizAnswer('${opt}', ${idx})">${opt}</button>`;
            }).join('')}
        </div>

        ${already !== null ? `
        <div class="dquiz-explanation ${already === q.answer ? 'ok' : 'err'}">
            <div class="dquiz-exp-icon">${already === q.answer ? '✓' : '✗'}</div>
            <div>
                <strong>${already === q.answer ? 'Correct!' : 'Incorrect.'}</strong>
                <p style="margin:6px 0 0;font-size:0.85rem;line-height:1.6;">${q.explanation}</p>
            </div>
        </div>
        ` : ''}

        <div class="dquiz-nav">
            <button class="dquiz-nav-btn" onclick="dquizPrev(${idx})" ${idx === 0 ? 'disabled' : ''}>← Prev</button>
            ${idx < total - 1
                ? `<button class="dquiz-nav-btn primary" onclick="dquizNext(${idx})">Next →</button>`
                : `<button class="dquiz-nav-btn primary" onclick="dquizFinish()">See Results →</button>`
            }
        </div>
    </div>`;

    requestAnimationFrame(() => {
        const c = document.getElementById('dquiz-canvas');
        if (c) {
            c.width = c.offsetWidth || 600;
            // Cevap verilmişse rengi göster, vermemişse gri
            const prof = already !== null
                ? DRUG_PROFILES[q.drug]
                : { ...DRUG_PROFILES[q.drug], color: '#4a5568' };
            drawEEGTrace(c, prof, { lineWidth: 1.6 });
        }
    });
}

window.dquizAnswer = function(selected, idx) {
    const state = window._quizState;
    if (state.answered[idx] !== null) return;
    state.answered[idx] = selected;
    if (selected === QUIZ_QUESTIONS[idx].answer) state.score++;
    const container = document.getElementById('drug-quiz-mount');
    if (container) renderQuizQuestion(container, idx);
};

window.dquizNext = function(idx) {
    const container = document.getElementById('drug-quiz-mount');
    if (container) renderQuizQuestion(container, idx + 1);
};

window.dquizPrev = function(idx) {
    const container = document.getElementById('drug-quiz-mount');
    if (container && idx > 0) renderQuizQuestion(container, idx - 1);
};

window.dquizFinish = function() {
    const container = document.getElementById('drug-quiz-mount');
    if (!container) return;
    const state = window._quizState;
    const total = QUIZ_QUESTIONS.length;
    const pct = Math.round((state.score / total) * 100);

    let feedback, feedbackColor;
    if (pct === 100) { feedback = 'Perfect score! Outstanding EEG pattern recognition.'; feedbackColor = '#00c6a7'; }
    else if (pct >= 80) { feedback = 'Excellent work. Minor refinements needed.'; feedbackColor = '#00c6a7'; }
    else if (pct >= 60) { feedback = 'Good foundation. Review the agents you missed.'; feedbackColor = '#f0a500'; }
    else { feedback = 'Review the agent-specific signatures in Page 1 before retaking.'; feedbackColor = '#e05c7a'; }

    container.innerHTML = `
    <div class="dquiz-result-wrap">
        <div class="dquiz-result-score" style="color:${feedbackColor}">${state.score}<span>/${total}</span></div>
        <div class="dquiz-result-pct">${pct}%</div>
        <p class="dquiz-result-feedback">${feedback}</p>
        <button class="dquiz-retry-btn" onclick="initDrugQuiz('drug-quiz-mount')">↺ Retry Quiz</button>
    </div>`;
};

// ─────────────────────────────────────────────────────────────────────────────
// CSS — inline enjekte edilir (dosya bağımlılığı azaltmak için)
// ─────────────────────────────────────────────────────────────────────────────

(function injectDrugEEGStyles() {
    if (document.getElementById('drug-eeg-styles')) return;
    const style = document.createElement('style');
    style.id = 'drug-eeg-styles';
    style.textContent = `

/* ── DRUG EEG VIEWER ─────────────────────────────────────────── */
.deeg-wrap { width:100%; }

.deeg-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
    margin-bottom: 20px;
}

.deeg-card {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
}
.deeg-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.35);
    border-color: rgba(255,255,255,0.12);
}

.deeg-card-header {
    padding: 12px 14px 8px;
    border-bottom: 1px solid;
}
.deeg-drug-name {
    display: block;
    font-family: 'DM Serif Display', serif;
    font-size: 1rem;
    margin-bottom: 2px;
}
.deeg-mech {
    font-size: 0.7rem;
    color: var(--muted);
    font-style: italic;
}
.deeg-canvas-box {
    padding: 8px 10px 4px;
    background: rgba(0,0,0,0.25);
}
.deeg-tap-hint {
    text-align: center;
    font-size: 0.68rem;
    color: var(--muted);
    padding: 6px 0;
    letter-spacing: 0.05em;
    opacity: 0.6;
}

.deeg-timescale {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    color: var(--muted);
    margin-top: 4px;
    opacity: 0.6;
}
.deeg-scale-bar {
    flex: 1;
    height: 1px;
    background: var(--border);
}

/* Detail panel */
.deeg-detail-panel {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px;
    margin-bottom: 20px;
    position: relative;
    animation: deegSlideIn 0.2s ease;
}
@keyframes deegSlideIn {
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:translateY(0); }
}
.deeg-close-btn {
    position: absolute;
    top: 16px; right: 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--muted);
    padding: 4px 10px;
    font-size: 0.75rem;
    cursor: pointer;
}
.deeg-close-btn:hover { color: var(--text); border-color: var(--accent); }

.deeg-detail-canvas-box { border-radius: 8px; overflow: hidden; }
.deeg-detail-section-title {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
}
.deeg-feature-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.deeg-feature-tag {
    border: 1px solid;
    border-radius: 99px;
    padding: 3px 10px;
    font-size: 0.75rem;
    font-weight: 500;
}
.deeg-clinical-box { padding: 14px 16px; border-radius: 8px; }

/* ── MULTIMODAL SIM ───────────────────────────────────────────── */
.mmsim-wrap { width:100%; }
.mmsim-title { font-family:'DM Serif Display',serif; font-size:1.15rem; color:var(--text); margin-bottom:6px; }
.mmsim-subtitle { font-size:0.85rem; color:var(--muted); margin-bottom:20px; line-height:1.55; }

.mmsim-sliders { display:flex; flex-direction:column; gap:12px; margin-bottom:20px; }
.mmsim-row { display:flex; align-items:center; gap:12px; }
.mmsim-agent-label {
    display:flex; align-items:center; gap:8px;
    font-size:0.85rem; font-weight:600;
    min-width:140px;
}
.mmsim-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
.mmsim-slider { flex:1; accent-color: var(--accent); }
.mmsim-pct { font-size:0.8rem; color:var(--muted); min-width:36px; text-align:right; }

.mmsim-canvas-wrap { margin-bottom:16px; }
.mmsim-canvas-label { font-size:0.72rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px; }

.mmsim-status {
    display:flex; align-items:center; gap:10px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius:8px;
    padding: 10px 14px;
    font-size:0.82rem; color:var(--text-sec);
    margin-bottom:10px;
}
.mmsim-status-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }

.mmsim-opioid-note {
    background: rgba(240,165,0,0.06);
    border: 1px solid rgba(240,165,0,0.2);
    border-radius:10px;
    padding:14px 16px;
    margin-bottom:14px;
}
.mmsim-opioid-title { font-size:0.8rem; font-weight:700; color:#f0a500; margin-bottom:6px; }
.mmsim-opioid-note p { font-size:0.82rem; color:var(--text-sec); line-height:1.6; margin:0; }

.mmsim-warning {
    background: rgba(224,92,122,0.08);
    border: 1px solid rgba(224,92,122,0.3);
    border-radius:8px;
    padding:12px 14px;
    font-size:0.82rem;
    color:var(--text-sec);
    line-height:1.55;
}

/* ── DRUG QUIZ ────────────────────────────────────────────────── */
.dquiz-wrap { width:100%; }
.dquiz-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.dquiz-counter { font-size:0.8rem; color:var(--muted); }
.dquiz-score { font-size:0.85rem; font-weight:700; color:var(--accent); }

.dquiz-hint-box {
    background: rgba(0,198,167,0.05);
    border: 1px solid rgba(0,198,167,0.15);
    border-radius:10px;
    padding:12px 16px;
    margin-bottom:14px;
}
.dquiz-hint-label { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--accent); display:block; margin-bottom:4px; }
.dquiz-hint-text { font-size:0.85rem; color:var(--text-sec); line-height:1.55; margin:0; }

.dquiz-canvas-wrap { margin-bottom:16px; }
.dquiz-canvas-label { font-size:0.72rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px; }

.dquiz-options { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px; }
.dquiz-opt {
    flex: 1 1 calc(50% - 4px);
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius:10px;
    padding:10px 14px;
    font-family:'DM Sans',sans-serif;
    font-size:0.88rem;
    color:var(--text);
    cursor:pointer;
    transition: all 0.15s;
    text-align:left;
}
.dquiz-opt:hover:not(.disabled):not(.correct):not(.wrong) {
    border-color: var(--accent);
    background: rgba(0,198,167,0.06);
}
.dquiz-opt.correct { background:rgba(0,198,167,0.12); border-color:var(--accent); color:var(--accent); font-weight:600; }
.dquiz-opt.wrong   { background:rgba(224,92,122,0.10); border-color:#e05c7a; color:#e05c7a; }
.dquiz-opt.disabled { opacity:0.35; cursor:not-allowed; }

.dquiz-explanation {
    display:flex; gap:12px; align-items:flex-start;
    border-radius:10px;
    padding:14px 16px;
    margin-bottom:16px;
    animation: dquizFadeIn 0.2s ease;
}
@keyframes dquizFadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
.dquiz-explanation.ok { background:rgba(0,198,167,0.08); border:1px solid rgba(0,198,167,0.25); }
.dquiz-explanation.err { background:rgba(224,92,122,0.08); border:1px solid rgba(224,92,122,0.25); }
.dquiz-exp-icon { font-size:1.2rem; flex-shrink:0; padding-top:1px; }
.dquiz-explanation strong { font-size:0.88rem; color:var(--text); }

.dquiz-nav { display:flex; justify-content:space-between; align-items:center; margin-top:4px; }
.dquiz-nav-btn {
    background: var(--surface);
    border:1px solid var(--border);
    border-radius:9px;
    padding:10px 20px;
    font-family:'DM Sans',sans-serif;
    font-size:0.85rem;
    color:var(--muted);
    cursor:pointer;
    transition:all 0.15s;
}
.dquiz-nav-btn:hover:not(:disabled) { border-color:var(--accent); color:var(--accent); }
.dquiz-nav-btn:disabled { opacity:0.3; cursor:not-allowed; }
.dquiz-nav-btn.primary {
    background: linear-gradient(135deg, var(--accent), #00a896);
    border-color:transparent;
    color:#0a0e1a;
    font-weight:700;
}
.dquiz-nav-btn.primary:hover { box-shadow:0 4px 18px rgba(0,198,167,0.3); transform:translateY(-1px); }

/* Result */
.dquiz-result-wrap {
    text-align:center;
    padding:48px 24px;
    animation: dquizFadeIn 0.3s ease;
}
.dquiz-result-score {
    font-family:'DM Serif Display',serif;
    font-size:4rem;
    font-weight:700;
    margin-bottom:4px;
}
.dquiz-result-score span { font-size:2rem; color:var(--muted); }
.dquiz-result-pct { font-size:1.2rem; color:var(--muted); margin-bottom:20px; }
.dquiz-result-feedback { font-size:0.95rem; color:var(--text-sec); max-width:400px; margin:0 auto 28px; line-height:1.6; }
.dquiz-retry-btn {
    background: linear-gradient(135deg, var(--accent), #00a896);
    border:none;
    border-radius:10px;
    padding:12px 28px;
    font-family:'DM Sans',sans-serif;
    font-size:0.9rem;
    font-weight:700;
    color:#0a0e1a;
    cursor:pointer;
    transition:all 0.15s;
}
.dquiz-retry-btn:hover { box-shadow:0 6px 24px rgba(0,198,167,0.35); transform:translateY(-1px); }
    `;
    document.head.appendChild(style);
})();
