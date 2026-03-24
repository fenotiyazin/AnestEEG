// ─── MODULE 4 CONTENT — v2 ────────────────────────────────────────────────────
// Sayfa 1: ham EEG vs BIS karşılaştırmasındaki SVG tracing → EEGEngine canvas
// Sayfa 2: simülatör — değişmedi
// Sayfa 3: frontal alfa-delta açıklamalı SVG → EEGEngine canvas + text annotations

const module4Content = {

    1: `
    <div class="content-block">
        <h3 class="content-heading">What Is Raw EEG?</h3>
        <p class="content-text">
            Raw EEG is the unprocessed, continuous electrical signal recorded directly from 
            scalp electrodes — the voltage trace you see scrolling across the screen in 
            real time. It contains the full frequency spectrum of cortical activity, 
            preserving all the information that the brain is generating at that moment.
        </p>
        <p class="content-text">
            The term "raw" distinguishes it from <span class="highlight">processed EEG</span>, 
            where mathematical algorithms compress the signal into a single number — 
            such as the BIS index (0–100). That number is derived from the raw signal, 
            but in the process of derivation, a large amount of clinically relevant 
            information is discarded.
        </p>
    </div>

    <div class="content-block">
        <h3 class="content-heading">Raw EEG vs. Processed EEG Index</h3>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0;">

            <!-- Ham EEG -->
            <div style="background:var(--surface2);border:1px solid rgba(0,198,167,0.25);border-radius:12px;overflow:hidden;">
                <div style="background:rgba(0,198,167,0.08);border-bottom:1px solid rgba(0,198,167,0.2);
                            padding:12px 18px;font-size:0.75rem;font-weight:700;letter-spacing:0.08em;
                            text-transform:uppercase;color:var(--accent);">
                    Raw EEG trace
                </div>
                <div style="padding:12px 18px 16px;">
                    <div id="eeg-raw-comparison" style="border-radius:8px;overflow:hidden;margin-bottom:12px;"></div>
                    <div style="display:flex;flex-direction:column;gap:6px;">
                        ${[
                            'Full frequency content visible',
                            'Burst suppression immediately recognisable',
                            'Artefacts visible and identifiable',
                            'Asymmetry between hemispheres detectable',
                            'Drug-specific patterns distinguishable',
                        ].map(t => `<div style="display:flex;gap:8px;font-size:0.8rem;color:#b0c4d8;">
                            <span style="color:var(--accent);flex-shrink:0;">✓</span>${t}
                        </div>`).join('')}
                    </div>
                </div>
            </div>

            <!-- İşlenmiş EEG -->
            <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;overflow:hidden;">
                <div style="background:rgba(255,255,255,0.03);border-bottom:1px solid var(--border);
                            padding:12px 18px;font-size:0.75rem;font-weight:700;letter-spacing:0.08em;
                            text-transform:uppercase;color:var(--muted);">
                    Processed EEG index (BIS)
                </div>
                <div style="padding:12px 18px 16px;">
                    <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:16px;text-align:center;
                                border:1px solid rgba(255,255,255,0.06);margin-bottom:12px;">
                        <div style="font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;
                                    color:var(--muted);margin-bottom:6px;">BIS INDEX</div>
                        <div style="font-size:3rem;font-weight:700;color:#fbbf24;line-height:1;
                                    font-family:'DM Serif Display',serif;">46</div>
                        <div style="font-size:0.72rem;color:var(--muted);margin-top:6px;">
                            Target range: 40–60
                        </div>
                        <div style="height:4px;background:var(--surface2);border-radius:99px;
                                    margin-top:10px;overflow:hidden;">
                            <div style="width:46%;height:100%;
                                        background:linear-gradient(90deg,#f87171,#fbbf24,#00c6a7);"></div>
                        </div>
                        <div style="display:flex;justify-content:space-between;
                                    font-size:0.65rem;color:var(--muted);margin-top:3px;">
                            <span>0</span><span>100</span>
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:6px;">
                        ${[
                            'Single number — all waveform detail lost',
                            'Burst suppression may be masked or misrepresented',
                            'Artefacts can corrupt the index silently',
                            'Hemispheric asymmetry not captured',
                            'Ketamine, dexmedetomidine cause misleading values',
                        ].map(t => `<div style="display:flex;gap:8px;font-size:0.8rem;color:#b0c4d8;">
                            <span style="color:#f87171;flex-shrink:0;">✗</span>${t}
                        </div>`).join('')}
                    </div>
                </div>
            </div>
        </div>

        <div class="callout-box">
            <div class="callout-icon">💡</div>
            <div class="callout-text">
                BIS = 46 tells you a number. The raw EEG tells you <em>why</em> that number 
                is 46 — and whether you should trust it. A BIS of 46 driven by frontal 
                alpha-delta is very different from a BIS of 46 driven by burst suppression 
                with a high BSR. The index cannot make this distinction; the raw trace can.
            </div>
        </div>
    </div>

    <div class="content-block">
        <h3 class="content-heading">What to Look for in the Raw EEG</h3>
        <p class="content-text">
            Interpreting raw EEG does not require neurophysiology training. In the anaesthesia 
            context, four parameters provide most of the clinically relevant information:
        </p>

        <div class="info-list">
            <div class="info-item">
                <div class="info-num">01</div>
                <div class="info-body">
                    <strong>Amplitude.</strong> How large are the deflections? 
                    Amplitude broadly reflects the degree of neuronal synchronisation. 
                    High amplitude suggests strong synchrony — seen in deep slow-wave 
                    anaesthesia. Very low amplitude (near-flat) may indicate either 
                    very deep anaesthesia or a technical problem.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">02</div>
                <div class="info-body">
                    <strong>Dominant frequency.</strong> What is the predominant rhythm? 
                    Slow (delta/theta) suggests deep anaesthesia or over-dosing. 
                    The coexistence of frontal alpha and delta is the target pattern 
                    for propofol-based maintenance.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">03</div>
                <div class="info-body">
                    <strong>Continuity.</strong> Is the signal continuous or interrupted? 
                    Periods of near-isoelectric silence alternating with bursts of activity 
                    define burst suppression — a pattern that warrants immediate dose reduction.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">04</div>
                <div class="info-body">
                    <strong>Symmetry.</strong> Are left and right hemisphere channels 
                    behaving similarly? Persistent asymmetry may indicate a focal process: 
                    cerebral ischaemia, embolic event, or pre-existing neurological pathology.
                </div>
            </div>
        </div>
    </div>
    `,

// ─────────────────────────────────────────────────────────────────────────────

    2: `
    <div class="content-block">
        <h3 class="content-heading">How Raw EEG Changes Across Anaesthetic Phases</h3>
        <p class="content-text">
            The EEG does not remain static during anaesthesia — it undergoes a characteristic 
            sequence of changes that track the patient's journey from wakefulness through 
            induction, surgical maintenance, and emergence. Recognising these phase-specific 
            patterns is a core practical skill.
        </p>
        <p class="content-text">
            Use the simulator below to move through the five phases of anaesthesia. 
            For each phase, observe how amplitude, dominant frequency, and signal 
            continuity change — and note the corresponding clinical state.
        </p>
    </div>

    <div class="simulator-placeholder">
        <div class="sim-header">
            <span class="sim-badge">Interactive</span>
            <span class="sim-title">Anaesthetic Phases EEG Simulator</span>
        </div>
        <div id="aphase-mount" style="padding: 24px 28px;"></div>
    </div>

    <div class="content-block" style="margin-top:32px;">
        <h3 class="content-heading">Key Transitions to Remember</h3>

        <div style="display:flex;flex-direction:column;gap:10px;margin-top:8px;">
            ${[
                ['Awake → Induction', 'Alpha drops out posteriorly; frontal beta activation appears briefly; then theta/delta emerges as consciousness is lost.','#fbbf24'],
                ['Induction → Maintenance', 'Transition to high-amplitude slow waves. With propofol, characteristic frontal alpha re-emerges and co-exists with delta — the target pattern.','#00c6a7'],
                ['Adequate → Deep maintenance', 'Alpha diminishes; delta becomes dominant; suppression intervals appear — first as isolated flat periods, then as true burst suppression.','#f87171'],
                ['Maintenance → Emergence', 'Slow waves decrease; faster frequencies return; continuity improves; pattern begins to resemble induction in reverse.','#60a5fa'],
            ].map(([title, desc, color]) => `
            <div style="display:flex;gap:14px;background:var(--surface2);border:1px solid var(--border);
                        border-radius:10px;padding:16px 20px;align-items:flex-start;">
                <div style="width:3px;flex-shrink:0;border-radius:2px;background:${color};
                            align-self:stretch;min-height:24px;"></div>
                <div>
                    <div style="font-size:0.85rem;font-weight:600;color:var(--text);margin-bottom:4px;">${title}</div>
                    <div style="font-size:0.82rem;color:#b0c4d8;line-height:1.65;">${desc}</div>
                </div>
            </div>`).join('')}
        </div>
    </div>
    `,

// ─────────────────────────────────────────────────────────────────────────────

    3: `
    <div class="content-block">
        <h3 class="content-heading">The Frontal Alpha-Delta Pattern</h3>
        <p class="content-text">
            The <span class="highlight">frontal alpha-delta pattern</span> is the characteristic 
            EEG signature of propofol anaesthesia at adequate surgical depth. It consists of 
            two co-existing rhythms recorded over the frontal electrodes: a slow delta 
            oscillation (0.5–4 Hz) carrying most of the amplitude, with a faster alpha 
            component (8–13 Hz) superimposed upon it.
        </p>
        <p class="content-text">
            Propofol potentiates GABA-A receptors, enhancing inhibitory tone in 
            thalamocortical circuits. The resulting oscillation reflects the rhythmic 
            alternation between "up states" (cortical activation, generating the alpha 
            component) and "down states" (cortical silence, generating the slow delta 
            envelope).
        </p>
    </div>

    <div class="content-block">
        <h3 class="content-heading">Frontal Alpha-Delta — Raw EEG Tracing</h3>

        <!-- EEGEngine canvas — propofol_maintenance preset -->
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;
                    padding:16px;margin:16px 0;">
            <div style="font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
                        color:var(--muted);margin-bottom:8px;">Fp1 — Fp2 &nbsp;|&nbsp; Propofol maintenance</div>
            <div id="eeg-alpha-delta" style="border-radius:8px;overflow:hidden;"></div>
            <!-- Annotations -->
            <div style="display:flex;gap:16px;margin-top:12px;flex-wrap:wrap;">
                <div style="display:flex;align-items:center;gap:8px;font-size:0.78rem;">
                    <div style="width:24px;height:3px;background:#60a5fa;border-radius:2px;"></div>
                    <span style="color:var(--muted);">Delta envelope (~1–2 Hz, high amplitude)</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;font-size:0.78rem;">
                    <div style="width:24px;height:3px;background:#00c6a7;border-radius:2px;"></div>
                    <span style="color:var(--muted);">Alpha superimposed (~10 Hz)</span>
                </div>
            </div>
        </div>

        <p class="content-text">
            The trace above shows Fp1 and Fp2 during propofol maintenance. The slow delta 
            envelope (~1.5 Hz) carries the large-amplitude oscillation, while a faster alpha 
            rhythm (~10 Hz) is superimposed, producing the characteristic notched appearance 
            on the slow wave peaks. Note the similarity between the two frontal channels — 
            bilateral symmetry is expected.
        </p>
    </div>

    <div class="content-block">
        <h3 class="content-heading">Using the Pattern to Assess Anaesthetic Depth</h3>

        <div style="display:flex;flex-direction:column;gap:10px;margin:16px 0;">
            ${[
                ['Too light','Alpha dropout — the alpha component disappears, leaving irregular theta/delta. May be accompanied by movement or haemodynamic change.','#f87171','↑ Increase propofol'],
                ['Adequate depth','Stable frontal alpha-delta pattern. Continuous, symmetric, no suppression intervals.','#00c6a7','✓ Maintain current dose'],
                ['Too deep','Alpha disappears; delta dominates; suppression intervals emerge → burst suppression. BSR begins to rise.','#f87171','↓ Reduce propofol'],
            ].map(([state, desc, color, action]) => `
            <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;
                        padding:16px 20px;display:grid;grid-template-columns:110px 1fr 130px;
                        gap:16px;align-items:center;">
                <div style="font-size:0.82rem;font-weight:700;color:${color};">${state}</div>
                <div style="font-size:0.82rem;color:#b0c4d8;line-height:1.6;">${desc}</div>
                <div style="background:rgba(255,255,255,0.04);border:1px solid var(--border);
                            border-radius:8px;padding:8px 12px;font-size:0.78rem;
                            font-weight:600;color:${color};text-align:center;">${action}</div>
            </div>`).join('')}
        </div>
    </div>

    <div class="content-block">
        <h3 class="content-heading">Advantages and Limitations Compared to pEEG Indices</h3>

        <div class="comparison-grid">
            <div class="comparison-card highlight-card">
                <div class="comparison-icon">✓</div>
                <div class="comparison-label">Advantages of Raw EEG</div>
                <ul class="comparison-list">
                    <li>No proprietary algorithm — what you see is the signal</li>
                    <li>Burst suppression directly visible, not abstracted</li>
                    <li>Drug-specific patterns recognisable</li>
                    <li>Artefacts identifiable and distinguishable from true signal</li>
                    <li>Hemispheric asymmetry detectable</li>
                </ul>
            </div>
            <div class="comparison-card">
                <div class="comparison-icon">⚠️</div>
                <div class="comparison-label">Limitations of Raw EEG</div>
                <ul class="comparison-list">
                    <li>Requires training to interpret reliably</li>
                    <li>Time-consuming in a busy OR without practice</li>
                    <li>Significant individual variability in baseline patterns</li>
                    <li>Not validated as a standalone awareness prevention tool</li>
                    <li>Confounded by neurological comorbidities</li>
                </ul>
            </div>
        </div>

        <div class="callout-box" style="margin-top:16px;">
            <div class="callout-icon">💡</div>
            <div class="callout-text">
                The goal is not to replace processed EEG indices with raw EEG — 
                it is to <strong>use both together</strong>. The index provides a 
                quick numeric reference; the raw trace provides the context needed 
                to interpret that number correctly.
            </div>
        </div>
    </div>
    `,
};

// ─── SAYFA YÜKLENINCE ─────────────────────────────────────────────────────────
function onModule4PageLoad(pageNum) {
    if (pageNum === 1) {
        setTimeout(() => {
            if (typeof EEGEngine === 'undefined') return;
            EEGEngine.renderBlock('eeg-raw-comparison', 'propofol_maintenance', {
                height: 100, showScaleBar: true, show1sBar: true,
            });
        }, 80);
    }
    if (pageNum === 2) {
        setTimeout(() => {
            if (typeof initAnaesthesiaPhasesSim === 'function')
                initAnaesthesiaPhasesSim('aphase-mount');
        }, 80);
    }
    if (pageNum === 3) {
        setTimeout(() => {
            if (typeof EEGEngine === 'undefined') return;
            EEGEngine.renderBlock('eeg-alpha-delta', 'propofol_maintenance', {
                height: 130, showScaleBar: true, show1sBar: true,
            });
        }, 80);
    }
}
