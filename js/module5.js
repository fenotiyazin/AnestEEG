// ============================================================
//  AnestEEG — Module 5: Burst Suppression & Spikes
//  module5.js
//  Sayfa 1: Tanımlar + açıklamalı EEG görselleri
//  Sayfa 2: Pattern recognition quiz (interaktif)
// ============================================================

function getModule5Page1() {
    return `
    <div class="content-section">
        <h3 class="section-title">What is Burst Suppression?</h3>
        <p class="content-text">
            Burst suppression is an EEG pattern characterised by alternating periods of high-amplitude, 
            mixed-frequency electrical activity (<strong>bursts</strong>) and near-isoelectric silence 
            (<strong>suppression</strong>). It represents a profound reduction in cortical activity and 
            is a reliable indicator of excessively deep anaesthesia or significant neurological compromise.
        </p>
        <div class="info-box">
            <div class="info-box-icon">📊</div>
            <div>
                <strong>Burst Suppression Ratio (BSR)</strong><br>
                BSR is the percentage of time occupied by suppression within a defined epoch (usually 63 seconds).
                <br><br>
                <code style="color:var(--teal);background:rgba(0,198,167,0.08);padding:4px 10px;border-radius:4px;font-size:0.9rem;">
                    BSR (%) = (Duration of suppression / Total epoch duration) × 100
                </code>
                <br><br>
                A BSR of 0% means continuous activity (normal); a BSR of 100% means complete isoelectric silence.
                Clinical concern begins when BSR rises <strong>above 20–40%</strong> during maintenance anaesthesia.
            </div>
        </div>

        <h3 class="section-title" style="margin-top:2rem;">What is a Spike Pattern?</h3>
        <p class="content-text">
            An EEG spike is a transient, sharply contoured waveform with a duration of 
            <strong>20–70 ms</strong> and an amplitude clearly exceeding the background. Spikes — 
            particularly when recurring or appearing in runs — may indicate epileptiform activity, 
            seizure risk, or anaesthetic-related neurotoxicity. They are distinct from burst suppression 
            and carry different clinical implications.
        </p>

        <!-- VISUAL COMPARISON CARDS -->
        <h3 class="section-title" style="margin-top:2rem;">Visual Comparison</h3>
        <div class="pattern-compare-grid">

            <!-- BURST SUPPRESSION CARD -->
            <div class="pattern-card" id="bs-card">
                <div class="pattern-card-header bs-header">
                    <span class="pattern-label">Burst Suppression</span>
                    <span class="pattern-badge bs-badge">Deep / Over-anaesthesia</span>
                </div>
                <div class="eeg-canvas-wrap">
                    <canvas id="bs-canvas" width="480" height="110"></canvas>
                    <div class="eeg-annotations" id="bs-annot"></div>
                </div>
                <div class="pattern-features">
                    <div class="feature-row"><span class="feat-icon">〰️</span><span>Alternating burst (high-amp) and flat (isoelectric) segments</span></div>
                    <div class="feature-row"><span class="feat-icon">⏱️</span><span>Suppression duration: seconds to tens of seconds</span></div>
                    <div class="feature-row"><span class="feat-icon">📉</span><span>BSR increases proportionally with anaesthetic depth</span></div>
                    <div class="feature-row"><span class="feat-icon">⚠️</span><span>Associated with POCD, delirium, and prolonged emergence</span></div>
                </div>
            </div>

            <!-- SPIKE PATTERN CARD -->
            <div class="pattern-card" id="spike-card">
                <div class="pattern-card-header spike-header">
                    <span class="pattern-label">Spike Pattern</span>
                    <span class="pattern-badge spike-badge">Epileptiform / Neurotoxic</span>
                </div>
                <div class="eeg-canvas-wrap">
                    <canvas id="spike-canvas" width="480" height="110"></canvas>
                    <div class="eeg-annotations" id="spike-annot"></div>
                </div>
                <div class="pattern-features">
                    <div class="feature-row"><span class="feat-icon">⚡</span><span>Sharp, transient high-amplitude deflections (20–70 ms)</span></div>
                    <div class="feature-row"><span class="feat-icon">🔁</span><span>May recur in rhythmic runs or spike-wave complexes</span></div>
                    <div class="feature-row"><span class="feat-icon">🧠</span><span>Indicates potential epileptiform or ictal activity</span></div>
                    <div class="feature-row"><span class="feat-icon">🔴</span><span>Requires immediate clinical correlation; may signal seizure onset</span></div>
                </div>
            </div>

        </div><!-- /pattern-compare-grid -->

        <!-- HOW TO DISTINGUISH -->
        <div class="distinguish-box">
            <h4 style="color:var(--teal);margin:0 0 1rem 0;font-size:1.05rem;">
                🔍 How to Tell Them Apart
            </h4>
            <table class="compare-table">
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>Burst Suppression</th>
                        <th>Spike Pattern</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Duration of event</td>
                        <td>Seconds (burst) + seconds (flat)</td>
                        <td>20–70 ms (single spike)</td>
                    </tr>
                    <tr>
                        <td>Background activity</td>
                        <td>Flat / near-isoelectric between bursts</td>
                        <td>Usually continuous (may be altered)</td>
                    </tr>
                    <tr>
                        <td>Pattern regularity</td>
                        <td>Cyclical — burst → flat → burst</td>
                        <td>Focal or generalised sharp transients</td>
                    </tr>
                    <tr>
                        <td>Primary cause</td>
                        <td>Excessive anaesthetic depth</td>
                        <td>Epileptiform activity / neurotoxicity</td>
                    </tr>
                    <tr>
                        <td>BSR</td>
                        <td>Elevated (&gt;20%)</td>
                        <td>Not applicable</td>
                    </tr>
                    <tr>
                        <td>Immediate action</td>
                        <td>Reduce anaesthetic dose</td>
                        <td>Evaluate seizure risk; notify surgeon</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="key-concept-box">
            <span class="kc-icon">💡</span>
            <div>
                <strong>Key Concept:</strong> Burst suppression and spike patterns both represent 
                pathological EEG states — but they require <em>opposite</em> responses. 
                Burst suppression demands <strong>less</strong> anaesthetic; epileptiform spikes may 
                require <strong>more</strong> (or anticonvulsants). Misidentification carries real 
                clinical risk.
            </div>
        </div>

    </div><!-- /content-section -->

    <style>${module5Styles()}</style>
    `;
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE 2 — Pattern Recognition Quiz
// ─────────────────────────────────────────────────────────────────────────────

const m5QuizCases = [
    {
        id: 1,
        type: 'burst_suppression',
        label: 'Burst Suppression',
        description: 'A 72-year-old patient under propofol-based TIVA. Surgeon reports haemodynamic stability. This EEG is recorded during deep maintenance.',
        explanation: 'This is <strong>burst suppression</strong>. Note the alternating high-amplitude bursts and flat isoelectric segments. The BSR is approximately 55%. At this depth, the patient is significantly over-anaesthetised — consider reducing propofol infusion rate.',
        bsr: 55,
        patternType: 'bs'
    },
    {
        id: 2,
        type: 'spike',
        label: 'Spike Pattern',
        description: 'A 58-year-old patient 30 minutes into a craniotomy. Sevoflurane 1.5 MAC, fentanyl infusion. No haemodynamic changes.',
        explanation: 'These are <strong>epileptiform spikes</strong> — sharp, brief (30–50 ms), high-amplitude transients on a continuous background. During neurosurgery, sevoflurane at high MAC concentrations can induce spike-wave complexes. Notify the surgeon and consider adjusting the volatile agent.',
        bsr: 0,
        patternType: 'spike'
    },
    {
        id: 3,
        type: 'normal',
        label: 'Normal / Neither',
        description: 'A 45-year-old patient during induction with propofol 2 mg/kg. EEG recorded at loss of consciousness.',
        explanation: 'This is <strong>neither burst suppression nor spikes</strong>. This is a normal EEG transition during induction: high-frequency, moderate-amplitude activity transitioning toward slower oscillations. The background is continuous with no flat segments and no sharp transients.',
        bsr: 0,
        patternType: 'normal'
    }
];

let m5QuizState = {
    currentIndex: 0,
    answers: [],
    completed: false
};

function getModule5Page2() {
    m5QuizState = { currentIndex: 0, answers: [], completed: false };

    return `
    <div class="content-section">
        <h3 class="section-title">Pattern Recognition Exercise</h3>
        <p class="content-text">
            You will be shown <strong>${m5QuizCases.length} EEG tracings</strong> from different clinical scenarios. 
            For each, identify whether the pattern represents <em>burst suppression</em>, an <em>epileptiform spike pattern</em>, 
            or <em>neither</em>. Immediate feedback follows each answer.
        </p>

        <div class="quiz-progress-bar-wrap">
            <div class="quiz-progress-bar" id="m5-progress-bar" style="width:0%"></div>
        </div>
        <div class="quiz-progress-label" id="m5-progress-label">Case 1 of ${m5QuizCases.length}</div>

        <div id="m5-quiz-container">
            <!-- dynamically filled -->
        </div>

        <div id="m5-quiz-results" style="display:none;"></div>
    </div>

    <style>${module5Styles()}</style>
    `;
}

function renderM5QuizCase(idx) {
    const container = document.getElementById('m5-quiz-container');
    if (!container) return;
    if (idx >= m5QuizCases.length) {
        showM5Results();
        return;
    }

    const c = m5QuizCases[idx];
    const pct = (idx / m5QuizCases.length) * 100;
    const prog = document.getElementById('m5-progress-bar');
    const progLabel = document.getElementById('m5-progress-label');
    if (prog) prog.style.width = pct + '%';
    if (progLabel) progLabel.textContent = `Case ${idx + 1} of ${m5QuizCases.length}`;

    container.innerHTML = `
        <div class="quiz-case-card" id="quiz-case-${c.id}">
            <div class="quiz-case-header">
                <span class="quiz-case-num">Case ${idx + 1}</span>
                <span class="quiz-clinical-tag">📋 Clinical Scenario</span>
            </div>
            <p class="quiz-scenario-text">${c.description}</p>

            <div class="eeg-trace-quiz-wrap">
                <canvas id="quiz-canvas-${c.id}" width="620" height="120"></canvas>
            </div>
            ${c.bsr > 0 ? `<div class="bsr-display">BSR: <span style="color:var(--teal)">${c.bsr}%</span></div>` : ''}

            <p class="quiz-question">What pattern do you see in this EEG?</p>
            <div class="quiz-options">
                <button class="quiz-opt-btn" onclick="checkM5Answer(${idx}, 'burst_suppression', this)">
                    <span class="opt-icon">〰️</span> Burst Suppression
                </button>
                <button class="quiz-opt-btn" onclick="checkM5Answer(${idx}, 'spike', this)">
                    <span class="opt-icon">⚡</span> Spike Pattern
                </button>
                <button class="quiz-opt-btn" onclick="checkM5Answer(${idx}, 'normal', this)">
                    <span class="opt-icon">✅</span> Normal / Neither
                </button>
            </div>
            <div id="m5-feedback-${idx}" class="quiz-feedback" style="display:none;"></div>
        </div>
    `;

    // Draw the appropriate EEG pattern
    requestAnimationFrame(() => {
        const cvs = document.getElementById(`quiz-canvas-${c.id}`);
        if (!cvs) return;
        if (c.patternType === 'bs')     drawBSTrace(cvs, c.bsr);
        else if (c.patternType === 'spike') drawSpikeTrace(cvs);
        else                            drawNormalTrace(cvs);
    });
}

function checkM5Answer(idx, selected, btn) {
    const c = m5QuizCases[idx];
    const correct = selected === c.type;

    // Disable all buttons
    const allBtns = btn.parentElement.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach(b => {
        b.disabled = true;
        b.style.opacity = '0.6';
        b.style.cursor = 'not-allowed';
    });

    // Highlight correct / incorrect
    if (correct) {
        btn.classList.add('opt-correct');
    } else {
        btn.classList.add('opt-wrong');
        // Highlight the correct one
        allBtns.forEach(b => {
            const map = { 'burst_suppression': '〰️ Burst Suppression', 'spike': '⚡ Spike Pattern', 'normal': '✅ Normal / Neither' };
            if (b.textContent.trim().includes(c.label)) b.classList.add('opt-correct');
        });
    }

    // Record answer
    m5QuizState.answers.push({ idx, selected, correct });

    // Show feedback
    const fb = document.getElementById(`m5-feedback-${idx}`);
    if (fb) {
        fb.style.display = 'flex';
        fb.innerHTML = `
            <span class="fb-icon">${correct ? '✅' : '❌'}</span>
            <div>
                <strong>${correct ? 'Correct!' : 'Not quite.'}</strong><br>
                ${c.explanation}
            </div>
        `;
        fb.className = 'quiz-feedback ' + (correct ? 'fb-correct' : 'fb-wrong');
    }

    // Next button
    const caseCard = document.getElementById(`quiz-case-${c.id}`);
    const nextLabel = (idx + 1 < m5QuizCases.length) ? `Next Case →` : `See Results →`;
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-next-case';
    nextBtn.textContent = nextLabel;
    nextBtn.onclick = () => renderM5QuizCase(idx + 1);
    caseCard.appendChild(nextBtn);
}

function showM5Results() {
    const container = document.getElementById('m5-quiz-container');
    const results   = document.getElementById('m5-quiz-results');
    const prog      = document.getElementById('m5-progress-bar');
    const progLabel = document.getElementById('m5-progress-label');

    if (prog) prog.style.width = '100%';
    if (progLabel) progLabel.textContent = `All ${m5QuizCases.length} cases completed`;

    container.style.display = 'none';
    results.style.display   = 'block';

    const score  = m5QuizState.answers.filter(a => a.correct).length;
    const total  = m5QuizCases.length;
    const pct    = Math.round((score / total) * 100);
    const grade  = pct >= 80 ? { label: 'Excellent', color: '#00c6a7', icon: '🏆' }
                 : pct >= 60 ? { label: 'Good',      color: '#f0c040', icon: '👍' }
                 :             { label: 'Keep practising', color: '#e05a5a', icon: '📚' };

    const caseReview = m5QuizCases.map((c, i) => {
        const ans = m5QuizState.answers[i];
        return `
        <div class="result-row ${ans.correct ? 'rr-correct' : 'rr-wrong'}">
            <span class="rr-icon">${ans.correct ? '✅' : '❌'}</span>
            <span class="rr-label">Case ${i+1}: ${c.description.substring(0, 60)}…</span>
            <span class="rr-answer">Your answer: <strong>${ans.selected.replace('_', ' ')}</strong></span>
        </div>`;
    }).join('');

    results.innerHTML = `
        <div class="results-card">
            <div class="results-score-circle" style="border-color:${grade.color}">
                <span class="score-icon">${grade.icon}</span>
                <span class="score-num" style="color:${grade.color}">${score}/${total}</span>
                <span class="score-pct">${pct}%</span>
            </div>
            <h3 style="color:${grade.color};margin:1rem 0 0.4rem">${grade.label}</h3>
            <p style="color:var(--text-muted);margin:0 0 1.5rem">
                ${pct >= 80 
                    ? 'You have demonstrated solid pattern recognition skills for burst suppression and spikes. These are critical safety competencies in anaesthetic EEG monitoring.' 
                    : pct >= 60 
                    ? 'Good effort. Review the cases you missed — the distinguishing features between these patterns are clinically important.' 
                    : 'Consider revisiting Page 1 of this module to consolidate the defining features of burst suppression and spike patterns before retrying.'}
            </p>
            <div class="result-review-list">${caseReview}</div>
            <div style="display:flex;gap:1rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap;">
                <button class="btn-retry-quiz" onclick="retryM5Quiz()">↩ Retry Quiz</button>
            </div>
        </div>
    `;
}

function retryM5Quiz() {
    m5QuizState = { currentIndex: 0, answers: [], completed: false };
    const results   = document.getElementById('m5-quiz-results');
    const container = document.getElementById('m5-quiz-container');
    if (results)   results.style.display   = 'none';
    if (container) container.style.display = 'block';
    renderM5QuizCase(0);
}

// ─────────────────────────────────────────────────────────────────────────────
//  CANVAS DRAWING FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function drawBurstSuppressionCanvas() {
    const cvs = document.getElementById('bs-canvas');
    if (!cvs) return;
    drawBSTrace(cvs, 50);
}

function drawSpikeCanvas() {
    const cvs = document.getElementById('spike-canvas');
    if (!cvs) return;
    drawSpikeTrace(cvs);
}

// Generic burst-suppression tracer — bsr controls how much is flat
function drawBSTrace(canvas, bsr) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const mid = H / 2;
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = '#0d1424';
    ctx.fillRect(0, 0, W, H);

    // Grid line
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(W, mid); ctx.stroke();

    // Draw trace
    const suppressFraction = bsr / 100;
    const burstFraction    = 1 - suppressFraction;

    ctx.strokeStyle = '#00c6a7';
    ctx.lineWidth = 1.5;
    ctx.lineJoin  = 'round';
    ctx.beginPath();

    let x = 0;
    const segW = 60; // segment width in pixels
    let drawing = false;

    while (x < W) {
        // Decide burst or suppress for this segment
        const rand = Math.random();
        const isBurst = rand < burstFraction;
        const len = segW + Math.random() * 30;

        if (isBurst) {
            // Draw a burst: noisy, high amplitude
            for (let i = 0; i < len && x + i < W; i++) {
                const t = (x + i) / W;
                const amp = 28 + Math.random() * 18;
                const y = mid + Math.sin(i * 0.4 + Math.random() * 2) * amp
                              + (Math.random() - 0.5) * 20;
                if (!drawing) { ctx.moveTo(x + i, y); drawing = true; }
                else ctx.lineTo(x + i, y);
            }
        } else {
            // Flat suppression — tiny noise near midline
            for (let i = 0; i < len && x + i < W; i++) {
                const y = mid + (Math.random() - 0.5) * 3;
                if (!drawing) { ctx.moveTo(x + i, y); drawing = true; }
                else ctx.lineTo(x + i, y);
            }
        }
        x += len;
    }
    ctx.stroke();

    // Labels
    ctx.font = '10px DM Sans, sans-serif';
    ctx.fillStyle = 'rgba(0,198,167,0.7)';
    ctx.fillText('BURST', 8, 18);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText('SUPPRESSION', W * 0.55, H - 8);
}

// Generic spike tracer
function drawSpikeTrace(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const mid = H / 2;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#0d1424';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(W, mid); ctx.stroke();

    // Background EEG — moderate amplitude, continuous
    ctx.strokeStyle = '#00c6a7';
    ctx.lineWidth = 1.4;
    ctx.beginPath();

    // spike positions
    const spikesAt = [80, 180, 290, 410, 520];
    let inSpike = false;

    for (let x = 0; x < W; x++) {
        const nearSpike = spikesAt.some(sx => Math.abs(x - sx) < 4);
        const spikePhase = spikesAt.find(sx => Math.abs(x - sx) < 4);

        let y;
        if (nearSpike && spikePhase !== undefined) {
            const d = x - spikePhase;
            // Sharp triangular spike
            y = mid - (1 - Math.abs(d) / 4) * 38;
        } else {
            // Normal background: alpha-like 9Hz oscillation + noise
            y = mid + Math.sin(x * 0.18) * 12
                    + Math.sin(x * 0.07) * 6
                    + (Math.random() - 0.5) * 5;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Mark spikes with subtle annotation
    ctx.strokeStyle = 'rgba(240,90,90,0.5)';
    ctx.lineWidth = 1;
    spikesAt.forEach(sx => {
        ctx.beginPath();
        ctx.moveTo(sx, 14);
        ctx.lineTo(sx, mid - 35);
        ctx.stroke();
        ctx.fillStyle = 'rgba(240,90,90,0.7)';
        ctx.font = '9px DM Sans, sans-serif';
        ctx.fillText('▼', sx - 4, 13);
    });
}

// Normal EEG trace
function drawNormalTrace(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const mid = H / 2;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#0d1424';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(W, mid); ctx.stroke();

    ctx.strokeStyle = '#00c6a7';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let x = 0; x < W; x++) {
        // Moderate amplitude, continuous, mixed frequency
        const y = mid + Math.sin(x * 0.22) * 14
                      + Math.sin(x * 0.08) * 8
                      + Math.sin(x * 0.45) * 5
                      + (Math.random() - 0.5) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
}

// ─────────────────────────────────────────────────────────────────────────────
//  MODULE 5 CONTENT ROUTER
// ─────────────────────────────────────────────────────────────────────────────

function getModule5Content(page) {
    if (page === 1) return getModule5Page1();
    if (page === 2) return getModule5Page2();
    return '<p>Page not found.</p>';
}

// ─────────────────────────────────────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────────────────────────────────────

function module5Styles() {
    return `
    /* ── Pattern Compare Grid ────────────────────────────── */
    .pattern-compare-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.4rem;
        margin: 1.5rem 0;
    }
    @media (max-width: 760px) {
        .pattern-compare-grid { grid-template-columns: 1fr; }
    }

    .pattern-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        overflow: hidden;
        transition: border-color 0.2s;
    }
    .pattern-card:hover { border-color: rgba(0,198,167,0.3); }

    .pattern-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
    }
    .bs-header    { background: rgba(0,198,167,0.12); border-bottom: 1px solid rgba(0,198,167,0.18); }
    .spike-header { background: rgba(240,90,90,0.10); border-bottom: 1px solid rgba(240,90,90,0.2); }

    .pattern-label {
        font-family: 'DM Serif Display', serif;
        font-size: 1.05rem;
        color: var(--text-primary, #e8eaf0);
    }
    .pattern-badge {
        font-size: 0.7rem;
        padding: 3px 8px;
        border-radius: 20px;
        font-weight: 600;
        letter-spacing: 0.03em;
    }
    .bs-badge    { background: rgba(0,198,167,0.2);  color: #00c6a7; }
    .spike-badge { background: rgba(240,90,90,0.2);  color: #e05a5a; }

    .eeg-canvas-wrap {
        position: relative;
        background: #0d1424;
        padding: 8px;
    }
    .eeg-canvas-wrap canvas {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 4px;
    }

    .pattern-features {
        padding: 0.9rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
    }
    .feature-row {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        font-size: 0.83rem;
        color: var(--text-muted, #8a8fa8);
        line-height: 1.4;
    }
    .feat-icon { flex-shrink: 0; font-size: 0.9rem; }

    /* ── Distinguish Table ───────────────────────────────── */
    .distinguish-box {
        background: rgba(0,198,167,0.04);
        border: 1px solid rgba(0,198,167,0.15);
        border-radius: 10px;
        padding: 1.2rem 1.4rem;
        margin: 1.5rem 0;
    }

    .compare-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.83rem;
        margin-top: 0.5rem;
    }
    .compare-table th {
        color: var(--teal, #00c6a7);
        font-weight: 600;
        padding: 6px 10px;
        border-bottom: 1px solid rgba(0,198,167,0.2);
        text-align: left;
    }
    .compare-table td {
        padding: 7px 10px;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        color: var(--text-muted, #8a8fa8);
        vertical-align: top;
    }
    .compare-table tr:last-child td { border-bottom: none; }

    /* ── Key Concept Box ─────────────────────────────────── */
    .key-concept-box {
        display: flex;
        gap: 0.9rem;
        align-items: flex-start;
        background: rgba(255,200,60,0.07);
        border: 1px solid rgba(255,200,60,0.2);
        border-radius: 10px;
        padding: 1rem 1.2rem;
        margin-top: 1.5rem;
        font-size: 0.88rem;
        color: var(--text-secondary, #b8bcd0);
        line-height: 1.6;
    }
    .kc-icon { font-size: 1.3rem; flex-shrink: 0; }

    /* ── Info Box ────────────────────────────────────────── */
    .info-box {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        background: rgba(0,198,167,0.06);
        border-left: 3px solid var(--teal, #00c6a7);
        border-radius: 0 8px 8px 0;
        padding: 1rem 1.2rem;
        margin: 1.2rem 0;
        font-size: 0.88rem;
        color: var(--text-secondary, #b8bcd0);
        line-height: 1.6;
    }
    .info-box-icon { font-size: 1.4rem; flex-shrink: 0; }

    /* ── Quiz Styles ─────────────────────────────────────── */
    .quiz-progress-bar-wrap {
        background: rgba(255,255,255,0.08);
        border-radius: 4px;
        height: 6px;
        margin: 1rem 0 0.4rem;
        overflow: hidden;
    }
    .quiz-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #00c6a7, #00e5c2);
        transition: width 0.5s ease;
        border-radius: 4px;
    }
    .quiz-progress-label {
        font-size: 0.78rem;
        color: var(--text-muted, #8a8fa8);
        margin-bottom: 1.2rem;
        text-align: right;
    }

    .quiz-case-card {
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 1.4rem;
        animation: fadeInUp 0.3s ease;
    }
    @keyframes fadeInUp {
        from { opacity:0; transform:translateY(10px); }
        to   { opacity:1; transform:translateY(0); }
    }

    .quiz-case-header {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 0.8rem;
    }
    .quiz-case-num {
        font-family: 'DM Serif Display', serif;
        font-size: 1.1rem;
        color: var(--teal, #00c6a7);
    }
    .quiz-clinical-tag {
        font-size: 0.75rem;
        padding: 3px 8px;
        background: rgba(255,255,255,0.06);
        border-radius: 20px;
        color: var(--text-muted, #8a8fa8);
    }

    .quiz-scenario-text {
        font-size: 0.88rem;
        color: var(--text-secondary, #b8bcd0);
        line-height: 1.6;
        margin-bottom: 1rem;
        background: rgba(255,255,255,0.03);
        padding: 0.8rem 1rem;
        border-radius: 8px;
        border-left: 3px solid rgba(255,255,255,0.1);
    }

    .eeg-trace-quiz-wrap {
        background: #0d1424;
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 0.6rem;
    }
    .eeg-trace-quiz-wrap canvas {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 4px;
    }

    .bsr-display {
        font-size: 0.82rem;
        color: var(--text-muted);
        text-align: right;
        margin-bottom: 0.6rem;
        font-style: italic;
    }

    .quiz-question {
        font-weight: 600;
        color: var(--text-primary, #e8eaf0);
        margin: 1rem 0 0.7rem;
        font-size: 0.95rem;
    }

    .quiz-options {
        display: flex;
        gap: 0.7rem;
        flex-wrap: wrap;
        margin-bottom: 0.8rem;
    }
    .quiz-opt-btn {
        flex: 1;
        min-width: 140px;
        padding: 0.65rem 1rem;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px;
        color: var(--text-secondary, #b8bcd0);
        font-size: 0.88rem;
        cursor: pointer;
        transition: all 0.18s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .quiz-opt-btn:hover:not(:disabled) {
        background: rgba(0,198,167,0.1);
        border-color: rgba(0,198,167,0.4);
        color: #fff;
    }
    .opt-correct {
        background: rgba(0,198,167,0.15) !important;
        border-color: rgba(0,198,167,0.6) !important;
        color: #00c6a7 !important;
    }
    .opt-wrong {
        background: rgba(240,90,90,0.12) !important;
        border-color: rgba(240,90,90,0.5) !important;
        color: #e05a5a !important;
    }
    .opt-icon { font-size: 1rem; }

    .quiz-feedback {
        display: flex;
        gap: 0.9rem;
        align-items: flex-start;
        padding: 1rem 1.1rem;
        border-radius: 8px;
        font-size: 0.87rem;
        line-height: 1.6;
        margin-top: 0.6rem;
        animation: fadeInUp 0.25s ease;
    }
    .fb-correct { background: rgba(0,198,167,0.08); border: 1px solid rgba(0,198,167,0.25); color: var(--text-secondary); }
    .fb-wrong   { background: rgba(240,90,90,0.08); border: 1px solid rgba(240,90,90,0.25); color: var(--text-secondary); }
    .fb-icon    { font-size: 1.1rem; flex-shrink: 0; padding-top: 2px; }

    .btn-next-case {
        display: block;
        margin: 1rem auto 0;
        padding: 0.6rem 1.8rem;
        background: var(--teal, #00c6a7);
        color: #0a0e1a;
        border: none;
        border-radius: 8px;
        font-weight: 700;
        font-size: 0.9rem;
        cursor: pointer;
        transition: opacity 0.18s;
    }
    .btn-next-case:hover { opacity: 0.85; }

    /* ── Results ─────────────────────────────────────────── */
    .results-card {
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 14px;
        padding: 2rem;
        text-align: center;
        animation: fadeInUp 0.4s ease;
    }
    .results-score-circle {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        border: 3px solid;
        margin: 0 auto 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
    }
    .score-icon { font-size: 1.5rem; }
    .score-num  { font-family: 'DM Serif Display', serif; font-size: 1.4rem; font-weight: 700; }
    .score-pct  { font-size: 0.8rem; color: var(--text-muted); }

    .result-review-list {
        text-align: left;
        margin-top: 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .result-row {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        padding: 0.5rem 0.8rem;
        border-radius: 6px;
        font-size: 0.8rem;
    }
    .rr-correct { background: rgba(0,198,167,0.06); }
    .rr-wrong   { background: rgba(240,90,90,0.06); }
    .rr-icon    { flex-shrink: 0; }
    .rr-label   { flex: 1; color: var(--text-muted); }
    .rr-answer  { color: var(--text-secondary); flex-shrink: 0; }

    .btn-retry-quiz {
        padding: 0.6rem 1.6rem;
        background: transparent;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 8px;
        color: var(--text-secondary);
        font-size: 0.88rem;
        cursor: pointer;
        transition: all 0.18s;
    }
    .btn-retry-quiz:hover {
        background: rgba(255,255,255,0.06);
        border-color: rgba(255,255,255,0.35);
    }
    `;
}

// ─────────────────────────────────────────────────────────────────────────────
//  REGISTER IN GLOBAL getPageContent
// ─────────────────────────────────────────────────────────────────────────────
function onModule5PageLoad(page) {
    requestAnimationFrame(() => {
        if (page === 1) {
            drawBurstSuppressionCanvas();
            drawSpikeCanvas();
        }
        if (page === 2) {
            renderM5QuizCase(0);
        }
    });
}
// modules.js'teki getPageContent switch/case'e eklenmesi gerekiyor:
//   case 5: return getModule5Content(page);
const module5Content = {
    1: getModule5Content(1),
    2: getModule5Content(2)
};