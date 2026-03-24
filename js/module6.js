// ─── MODULE6.JS — Drug Effects on EEG ────────────────────────────────────────
// Agent-Specific EEG Signatures | 3 pages
// Bağımlılıklar: sim_drug_eeg.js (modules.html'de yüklü olmalı)

const module6Content = {

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 1 — Agent-Specific EEG Signatures
// ═══════════════════════════════════════════════════════════════════════════
1: `
<div class="content-block">
    <h3 class="content-heading">Agent-Specific EEG Signatures</h3>
    <p class="content-text">
        Every anaesthetic agent produces a distinctive EEG pattern rooted in its 
        mechanism of action. Recognising these signatures allows you to identify 
        the dominant agent, detect unexpected changes, and understand why processed 
        EEG indices sometimes mislead.
    </p>
</div>

<!-- KEY CONCEPT BOX -->
<div class="callout callout-key" style="margin-bottom:32px;">
    <div class="callout-icon">💡</div>
    <div>
        <strong>The core principle:</strong> An agent's EEG signature is not arbitrary — 
        it is a direct readout of the neural circuit it modulates. GABA-A potentiation 
        produces synchrony and slow waves; NMDA antagonism produces activation; 
        &alpha;₂-agonism produces sleep-like patterns. Learn the mechanism, predict the EEG.
    </div>
</div>

<!-- EEG VIEWER SIMÜLATÖRÜ -->
<div class="sim-container" id="drug-eeg-viewer-mount">
    <div class="sim-loading">
        <div class="sim-spinner"></div>
        <span>Loading EEG viewer…</span>
    </div>
</div>

<!-- COMPARISON TABLE -->
<div class="content-block" style="margin-top:40px;">
    <h4 class="content-subheading">Quick Reference: EEG Signatures</h4>
    <div class="eeg-compare-table">
        <div class="ect-header">
            <div class="ect-cell">Agent</div>
            <div class="ect-cell">Mechanism</div>
            <div class="ect-cell">Dominant frequency</div>
            <div class="ect-cell">Amplitude</div>
            <div class="ect-cell">pEEG reliability</div>
        </div>
        <div class="ect-row">
            <div class="ect-cell"><span class="drug-pill prop">Propofol</span></div>
            <div class="ect-cell">GABA-A &uarr;</div>
            <div class="ect-cell">Frontal alpha (8–12 Hz)</div>
            <div class="ect-cell ect-high">High (50–150 µV)</div>
            <div class="ect-cell ect-good">✓ Reliable</div>
        </div>
        <div class="ect-row">
            <div class="ect-cell"><span class="drug-pill sevo">Sevoflurane</span></div>
            <div class="ect-cell">GABA-A + NMDA</div>
            <div class="ect-cell">Mixed theta–alpha–beta</div>
            <div class="ect-cell ect-mid">Moderate</div>
            <div class="ect-cell ect-mid">⚠ Moderate</div>
        </div>
        <div class="ect-row">
            <div class="ect-cell"><span class="drug-pill ket">Ketamine</span></div>
            <div class="ect-cell">NMDA antagonism</div>
            <div class="ect-cell">Beta/gamma (25–40 Hz)</div>
            <div class="ect-cell ect-mid">Moderate–high</div>
            <div class="ect-cell ect-bad">✗ Unreliable</div>
        </div>
        <div class="ect-row">
            <div class="ect-cell"><span class="drug-pill dex">Dexmedetomidine</span></div>
            <div class="ect-cell">&alpha;₂-adrenoreceptor &uarr;</div>
            <div class="ect-cell">Slow osc + spindles</div>
            <div class="ect-cell ect-low">Low (&lt;50 µV)</div>
            <div class="ect-cell ect-bad">✗ Unreliable</div>
        </div>
    </div>
</div>

<!-- CALLOUT: CLINICAL IMPLICATION -->
<div class="callout callout-warning" style="margin-top:32px;">
    <div class="callout-icon">⚠</div>
    <div>
        <strong>Why does this matter clinically?</strong>
        Processed EEG indices (BIS, Entropy) were validated primarily with propofol and 
        volatile agents. When ketamine or dexmedetomidine is used, the index can be 
        grossly misleading — the patient may be deeply sedated with a BIS of 70, or 
        lightly sedated with a BIS of 40. Raw EEG pattern recognition is essential 
        in these situations.
    </div>
</div>

<style>
.eeg-compare-table { border:1px solid var(--border); border-radius:12px; overflow:hidden; }
.ect-header, .ect-row {
    display:grid;
    grid-template-columns: 1.2fr 1.3fr 1.8fr 1fr 1fr;
    border-bottom:1px solid var(--border);
}
.ect-header { background:rgba(0,198,167,0.06); }
.ect-row:last-child { border-bottom:none; }
.ect-cell {
    padding:11px 14px;
    font-size:0.82rem;
    color:var(--text-sec);
    display:flex; align-items:center;
    border-right:1px solid var(--border);
}
.ect-cell:last-child { border-right:none; }
.ect-header .ect-cell { font-weight:700; font-size:0.72rem; text-transform:uppercase; letter-spacing:0.07em; color:var(--muted); }
.ect-high { color:#00c6a7 !important; font-weight:600; }
.ect-mid  { color:#f0a500 !important; font-weight:600; }
.ect-low  { color:#7b8cde !important; font-weight:600; }
.ect-good { color:#00c6a7 !important; font-weight:600; }
.ect-bad  { color:#e05c7a !important; font-weight:600; }
.drug-pill {
    padding:3px 10px; border-radius:99px;
    font-size:0.78rem; font-weight:600;
}
.drug-pill.prop { background:rgba(0,198,167,0.12); color:#00c6a7; }
.drug-pill.sevo { background:rgba(240,165,0,0.12); color:#f0a500; }
.drug-pill.ket  { background:rgba(224,92,122,0.12); color:#e05c7a; }
.drug-pill.dex  { background:rgba(123,140,222,0.12); color:#7b8cde; }
@media(max-width:640px){
    .ect-header, .ect-row { grid-template-columns:1fr 1fr; }
    .ect-cell:nth-child(2){ display:none; }
    .ect-cell:nth-child(4){ display:none; }
}
</style>
`,

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 2 — EEG in Multimodal Anaesthesia
// ═══════════════════════════════════════════════════════════════════════════
2: `
<div class="content-block">
    <h3 class="content-heading">EEG in Multimodal Anaesthesia</h3>
    <p class="content-text">
        Modern anaesthesia is rarely a single-agent technique. Understanding how 
        combinations of agents shape the composite EEG — and why certain combinations 
        create diagnostic pitfalls — is an essential clinical skill.
    </p>
</div>

<!-- OPIOID SECTION -->
<div class="content-block">
    <h4 class="content-subheading">Opioids and the EEG</h4>
    <div class="two-col-grid">
        <div>
            <p class="content-text">
                Opioids (remifentanil, fentanyl, sufentanil) act primarily through 
                µ-opioid receptors, not the GABAergic or glutamatergic systems that 
                dominate EEG generation. At clinical analgesic doses, they produce 
                mild, dose-dependent delta slowing — a <em>quantitative</em> shift 
                rather than a qualitative signature change.
            </p>
            <p class="content-text" style="margin-top:12px;">
                High-dose opioid infusions (e.g., remifentanil &ge; 0.4 µg/kg/min) can 
                produce paradoxical delta burst activity and may potentiate the slow-wave 
                effects of propofol, occasionally contributing to unintended burst 
                suppression in vulnerable patients.
            </p>
        </div>
        <div class="callout callout-info" style="align-self:start;">
            <div class="callout-icon">ℹ</div>
            <div>
                <strong>Practical rule:</strong> The dominant EEG pattern in TIVA is 
                set by propofol, not the opioid. In balanced volatile anaesthesia, 
                the volatile agent dominates. Opioids modify the depth but not the 
                characteristic pattern.
            </div>
        </div>
    </div>
</div>

<!-- MULTIMODAL SIMULATOR -->
<div class="sim-container" id="multimodal-sim-mount">
    <div class="sim-loading">
        <div class="sim-spinner"></div>
        <span>Loading multimodal simulator…</span>
    </div>
</div>

<!-- COMBINATION PITFALLS -->
<div class="content-block" style="margin-top:40px;">
    <h4 class="content-subheading">Combination Pitfalls</h4>

    <div class="pitfall-cards">

        <div class="pitfall-card" style="border-top-color:#e05c7a;">
            <div class="pitfall-title" style="color:#e05c7a;">
                ⚠ Propofol + Ketamine (TIVA + adjunct)
            </div>
            <p class="content-text">
                Adding ketamine (even sub-anaesthetic) to propofol introduces competing 
                influences: propofol slows the EEG while ketamine activates it. 
                The composite signal has lower amplitude alpha and more theta/beta activity. 
                BIS may read 10–20 points higher than expected. Do not increase propofol 
                based on BIS alone — reassess clinically and via raw EEG morphology.
            </p>
        </div>

        <div class="pitfall-card" style="border-top-color:#7b8cde;">
            <div class="pitfall-title" style="color:#7b8cde;">
                ⚠ Propofol + Dexmedetomidine (sedation in ICU/procedural)
            </div>
            <p class="content-text">
                Both agents produce slow waves, but dexmedetomidine's low-amplitude 
                pattern can mask propofol burst suppression risk: the composite EEG 
                appears "calm" at depths that might already be excessive. Burst 
                suppression episodes may be shorter and harder to identify. 
                Vigilance is required in elderly or neurologically vulnerable patients.
            </p>
        </div>

        <div class="pitfall-card" style="border-top-color:#f0a500;">
            <div class="pitfall-title" style="color:#f0a500;">
                ⚠ Volatile agent + Nitrous oxide
            </div>
            <p class="content-text">
                Nitrous oxide adds a high-frequency (40 Hz) oscillation that is largely 
                invisible on standard clinical EEG displays but substantially affects 
                processed indices. It can elevate BIS by 5–15 points compared to 
                volatile agent alone — an important consideration during N₂O discontinuation.
            </p>
        </div>

    </div>
</div>

<style>
.two-col-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:20px; align-items:start; }
@media(max-width:640px){ .two-col-grid { grid-template-columns:1fr; } }
.pitfall-cards { display:flex; flex-direction:column; gap:14px; }
.pitfall-card {
    background:var(--surface2);
    border:1px solid var(--border);
    border-top:3px solid;
    border-radius:10px;
    padding:16px 18px;
}
.pitfall-title { font-weight:700; font-size:0.88rem; margin-bottom:10px; }
</style>
`,

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 3 — "Which Agent?" Exercise
// ═══════════════════════════════════════════════════════════════════════════
3: `
<div class="content-block">
    <h3 class="content-heading">Which Agent? — Pattern Recognition Exercise</h3>
    <p class="content-text">
        Five EEG tracings, five clinical vignettes. Apply what you have learned about 
        agent-specific signatures to identify the dominant anaesthetic agent. 
        Each answer reveals a focused explanation of the distinguishing features.
    </p>
</div>

<!-- QUIZ HINT BOX -->
<div class="callout callout-tip" style="margin-bottom:28px;">
    <div class="callout-icon">🎯</div>
    <div>
        <strong>Strategy:</strong> Read the clinical context first — it narrows 
        the differential. Then examine the EEG: assess <em>frequency</em> 
        (slow vs fast), <em>amplitude</em> (high vs low), and 
        <em>regularity</em> (coherent vs irregular). Match to the signature table from Page 1.
    </div>
</div>

<!-- QUIZ -->
<div class="sim-container" id="drug-quiz-mount">
    <div class="sim-loading">
        <div class="sim-spinner"></div>
        <span>Loading quiz…</span>
    </div>
</div>
`

}; // end module6Content

// ─────────────────────────────────────────────────────────────────────────────
// PAGE LOAD CALLBACK — modules.js tarafından çağrılır
// ─────────────────────────────────────────────────────────────────────────────

function onModule6PageLoad(pageNum) {
    if (pageNum === 1) {
        // Simülatörü yükle
        const mount = document.getElementById('drug-eeg-viewer-mount');
        if (mount) {
            mount.innerHTML = ''; // loading kaldır
            initDrugEEGViewer('drug-eeg-viewer-mount');
        }
    }
    else if (pageNum === 2) {
        const mount = document.getElementById('multimodal-sim-mount');
        if (mount) {
            mount.innerHTML = '';
            initMultimodalSim('multimodal-sim-mount');
        }
    }
    else if (pageNum === 3) {
        const mount = document.getElementById('drug-quiz-mount');
        if (mount) {
            mount.innerHTML = '';
            initDrugQuiz('drug-quiz-mount');
        }
    }
}
