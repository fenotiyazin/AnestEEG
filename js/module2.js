// ─── MODULE 2 CONTENT ─────────────────────────────────────────────────────────

const module2Content = {

    1: `
    <div class="content-block">
        <h3 class="content-heading">The Brain: The Primary Target We Rarely Monitor</h3>
        <p class="content-text">
            General anaesthesia is, by definition, a drug-induced alteration of brain function. 
            Consciousness is suppressed, memory formation is blocked, and the cortical response 
            to nociception is attenuated — all of these are neurological endpoints. Yet in most 
            operating rooms around the world, the brain remains the <span class="highlight">only 
            major target organ without continuous direct monitoring</span>.
        </p>
        <p class="content-text">
            We monitor the heart continuously. We monitor oxygenation, ventilation, and 
            neuromuscular function. We have well-established numeric targets and alarms for 
            each of these. For the brain — the organ whose function we are most directly 
            manipulating — we typically rely on indirect surrogates.
        </p>
    </div>

    <div class="content-block">
        <h3 class="content-heading">What We Monitor vs. What We Leave Unmonitored</h3>
        <p class="content-text">
            The contrast becomes striking when laid out side by side. The parameters below 
            represent a standard monitoring setup for a patient under general anaesthesia.
        </p>

        <!-- İNFOGRAFİK: İzlediğimiz vs izlemediğimiz -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0;">

            <!-- İzlenenler -->
            <div style="background:rgba(0,198,167,0.05);border:1px solid rgba(0,198,167,0.2);border-radius:14px;padding:24px;">
                <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin-bottom:16px;">
                    ✓ Routinely Monitored
                </div>
                <div style="display:flex;flex-direction:column;gap:10px;">
                    ${[
                        ['❤️', 'Heart', 'ECG — rate, rhythm, ischaemia'],
                        ['🫁', 'Lungs', 'SpO₂, EtCO₂, airway pressure'],
                        ['🩸', 'Vasculature', 'NIBP / IBP — perfusion pressure'],
                        ['💉', 'Depth of block', 'TOF — neuromuscular monitoring'],
                        ['🌡️', 'Temperature', 'Core temp — metabolic state'],
                    ].map(([icon, organ, desc]) => `
                    <div style="display:flex;align-items:flex-start;gap:12px;">
                        <span style="font-size:1.2rem;flex-shrink:0;margin-top:1px;">${icon}</span>
                        <div>
                            <div style="font-size:0.85rem;font-weight:600;color:var(--text);">${organ}</div>
                            <div style="font-size:0.78rem;color:var(--muted);line-height:1.4;">${desc}</div>
                        </div>
                    </div>`).join('')}
                </div>
            </div>

            <!-- İzlenmeyenler -->
            <div style="background:rgba(248,113,113,0.05);border:1px solid rgba(248,113,113,0.2);border-radius:14px;padding:24px;">
                <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#f87171;margin-bottom:16px;">
                    ✗ Typically Unmonitored
                </div>
                <div style="display:flex;flex-direction:column;gap:10px;">
                    ${[
                        ['🧠', 'Consciousness', 'No direct measure — inferred from surrogates'],
                        ['🔕', 'Memory formation', 'Completely undetectable intraoperatively'],
                        ['⚡', 'Cortical activity', 'EEG not routinely used'],
                        ['😣', 'Nociception', 'No validated real-time index'],
                        ['🔄', 'Cerebral autoregulation', 'Rarely assessed outside neuro-OR'],
                    ].map(([icon, organ, desc]) => `
                    <div style="display:flex;align-items:flex-start;gap:12px;">
                        <span style="font-size:1.2rem;flex-shrink:0;margin-top:1px;">${icon}</span>
                        <div>
                            <div style="font-size:0.85rem;font-weight:600;color:var(--text);">${organ}</div>
                            <div style="font-size:0.78rem;color:var(--muted);line-height:1.4;">${desc}</div>
                        </div>
                    </div>`).join('')}
                </div>
            </div>
        </div>
    </div>

    <div class="content-block">
        <h3 class="content-heading">Why Indirect Surrogates Are Not Enough</h3>
        <p class="content-text">
            In the absence of direct brain monitoring, anaesthetists rely on several indirect 
            parameters to estimate anaesthetic depth:
        </p>

        <div class="info-list">
            <div class="info-item">
                <div class="info-num">01</div>
                <div class="info-body">
                    <strong>Clinical signs — haemodynamic response.</strong> Tachycardia and 
                    hypertension in response to surgical stimulation are useful indicators of 
                    light anaesthesia. However, they are heavily confounded by beta-blockers, 
                    vasopressors, cardiac disease, and haemorrhage. Many patients with 
                    intraoperative awareness show no haemodynamic response at all.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">02</div>
                <div class="info-body">
                    <strong>MAC (Minimum Alveolar Concentration).</strong> MAC represents the 
                    alveolar concentration at which 50% of patients do not move in response to 
                    surgical incision. It is a population-level statistic, not an individual 
                    measure. Individual variability is substantial — especially in elderly patients, 
                    those with neurological comorbidities, or those receiving multimodal anaesthesia.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">03</div>
                <div class="info-body">
                    <strong>Processed EEG indices (BIS, pEEG).</strong> These provide a numeric 
                    summary of cortical activity and represent a step forward compared to clinical 
                    signs alone. However, they are proprietary, algorithmically processed, and 
                    subject to specific limitations — particularly with ketamine, 
                    dexmedetomidine, and nitrous oxide. They are covered in detail in Module 7.
                </div>
            </div>
        </div>

        <div class="callout-box">
            <div class="callout-icon">💡</div>
            <div class="callout-text">
                None of these surrogates directly measures what we actually care about: 
                <strong>cortical activity, conscious processing, and the individual patient's 
                brain state</strong>. Raw EEG is the only tool that provides direct, 
                real-time information about brain function — without algorithmic abstraction.
            </div>
        </div>
    </div>

    <div class="content-block">
        <h3 class="content-heading">The Scale of the Problem</h3>
        <p class="content-text">
            Intraoperative awareness — the experience of consciousness during general anaesthesia, 
            with or without explicit recall — occurs in approximately 
            <span class="highlight">1–2 per 1000 general anaesthetics</span>. Given the global 
            volume of procedures performed annually, this translates to a substantial number of 
            affected patients each year.
        </p>
        <p class="content-text">
            At the opposite end of the spectrum, excessive anaesthetic depth — manifested as 
            burst suppression on the EEG — is associated with increased risk of 
            <span class="highlight">postoperative neurocognitive disorders (POCD)</span> and 
            delirium, particularly in elderly patients. Both under- and over-dosing carry 
            clinically meaningful consequences that current standard monitoring often fails 
            to detect in real time.
        </p>
    </div>
    `,

// ─────────────────────────────────────────────────────────────────────────────

    2: `
    <div class="content-block">
        <h3 class="content-heading">Clinical Indications for Intraoperative EEG Monitoring</h3>
        <p class="content-text">
            EEG monitoring is not yet universally adopted in anaesthesia practice, but a growing 
            body of evidence and several international guidelines now identify specific patient 
            populations and clinical scenarios where it provides meaningful benefit. The 
            indications can be broadly divided into three categories: prevention of awareness, 
            prevention of excessive depth, and neurological protection.
        </p>
    </div>

    <div class="content-block">
        <h3 class="content-heading">1 — Prevention of Intraoperative Awareness</h3>
        <p class="content-text">
            Awareness risk is not uniformly distributed. Certain patient profiles and procedural 
            contexts carry substantially elevated risk, and these represent the clearest 
            indications for EEG-guided anaesthesia:
        </p>

        <div class="info-list">
            <div class="info-item">
                <div class="info-num">↑</div>
                <div class="info-body">
                    <strong>High-risk surgical procedures.</strong> Cardiac surgery with 
                    cardiopulmonary bypass, caesarean section under general anaesthesia, 
                    and trauma surgery with haemodynamic instability are associated with 
                    higher awareness rates — often because anaesthetic delivery must be 
                    deliberately restricted to preserve haemodynamic stability.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">↑</div>
                <div class="info-body">
                    <strong>Difficult airway or rapid sequence induction.</strong> 
                    Situations where the window between induction and airway securing may 
                    be prolonged, or where the use of neuromuscular blocking agents 
                    eliminates movement as a surrogate for depth.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">↑</div>
                <div class="info-body">
                    <strong>History of prior awareness.</strong> Patients who have 
                    experienced awareness during a previous anaesthetic are at 
                    significantly higher risk of recurrence. EEG monitoring in these 
                    patients is strongly advisable.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">↑</div>
                <div class="info-body">
                    <strong>Total intravenous anaesthesia (TIVA).</strong> Unlike 
                    volatile agents, propofol-based TIVA provides no end-tidal 
                    concentration monitoring. Pump failures, line disconnections, or 
                    underdosing may go undetected without EEG monitoring.
                </div>
            </div>
        </div>
    </div>

    <div class="content-block">
        <h3 class="content-heading">2 — Prevention of Excessive Anaesthetic Depth</h3>
        <p class="content-text">
            Burst suppression — a pattern of high-amplitude bursts interspersed with periods 
            of cortical silence — is a marker of excessive anaesthetic depth. Its clinical 
            significance extends beyond the operating room:
        </p>

        <div class="comparison-grid">
            <div class="comparison-card">
                <div class="comparison-icon">🧓</div>
                <div class="comparison-label">Elderly Patients</div>
                <ul class="comparison-list">
                    <li>Lower burst suppression threshold</li>
                    <li>Higher baseline fragility of neural circuits</li>
                    <li>Stronger association between BS and postoperative delirium</li>
                    <li>Standard MAC may lead to inadvertent over-dosing</li>
                </ul>
            </div>
            <div class="comparison-card">
                <div class="comparison-icon">🫀</div>
                <div class="comparison-label">Cardiac Surgery</div>
                <ul class="comparison-list">
                    <li>CPB-related cerebral hypoperfusion may compound drug effects</li>
                    <li>Temperature changes alter MAC unpredictably</li>
                    <li>Embolic events may be detected as asymmetric EEG changes</li>
                    <li>Prolonged burst suppression associated with worse outcomes</li>
                </ul>
            </div>
        </div>

        <p class="content-text" style="margin-top:16px;">
            The association between intraoperative burst suppression and 
            <span class="highlight">postoperative neurocognitive disorders (POCD)</span> 
            and delirium has been demonstrated in multiple prospective studies, 
            particularly in patients over 65 years of age. EEG monitoring allows 
            real-time detection and dose adjustment before cumulative cortical 
            suppression occurs.
        </p>
    </div>

    <div class="content-block">
        <h3 class="content-heading">3 — Neurological Protection in High-Risk Procedures</h3>
        <p class="content-text">
            In procedures with inherent risk of cerebral ischaemia or injury, continuous 
            EEG provides an early warning system that clinical signs and standard 
            haemodynamic monitoring cannot replicate:
        </p>

        <div class="info-list">
            <div class="info-item">
                <div class="info-num">🧠</div>
                <div class="info-body">
                    <strong>Carotid endarterectomy.</strong> EEG changes during carotid 
                    cross-clamping — particularly ipsilateral slowing or amplitude reduction — 
                    indicate inadequate collateral flow and may prompt shunt insertion 
                    before neurological injury occurs.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">🧠</div>
                <div class="info-body">
                    <strong>Neurosurgical procedures.</strong> Retraction-related ischaemia, 
                    vessel occlusion, and cortical spreading depolarisation can produce 
                    focal EEG changes that guide intraoperative decision-making.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">🧠</div>
                <div class="info-body">
                    <strong>Cardiac surgery with circulatory arrest.</strong> 
                    EEG-confirmed silence prior to circulatory arrest is used in some 
                    centres to verify adequate cerebral protection before flow cessation.
                </div>
            </div>
        </div>
    </div>

    <!-- KILAVUZ KUTULARI -->
    <div class="content-block">
        <h3 class="content-heading">What Do the Guidelines Say?</h3>
        <p class="content-text">
            Major anaesthesiology societies have increasingly addressed brain monitoring 
            in their guidelines, though recommendations vary in strength and scope:
        </p>

        <div style="display:flex;flex-direction:column;gap:12px;margin-top:8px;">

            <div style="background:var(--surface2);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:10px;padding:20px 24px;">
                <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin-bottom:8px;">
                    ESA — European Society of Anaesthesiology
                </div>
                <p style="font-size:0.88rem;color:#b0c4d8;line-height:1.7;margin:0;">
                    Recommends the use of processed EEG monitoring (pEEG) to reduce the 
                    incidence of intraoperative awareness in high-risk patients and to 
                    avoid excessive anaesthetic depth, particularly in elderly patients 
                    undergoing major surgery.
                </p>
            </div>

            <div style="background:var(--surface2);border:1px solid var(--border);border-left:3px solid var(--accent2);border-radius:10px;padding:20px 24px;">
                <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent2);margin-bottom:8px;">
                    ASA — American Society of Anesthesiologists
                </div>
                <p style="font-size:0.88rem;color:#b0c4d8;line-height:1.7;margin:0;">
                    Practice advisory acknowledges that brain function monitoring may 
                    reduce awareness risk in select high-risk cases, though evidence 
                    is insufficient to support universal adoption. Identifies TIVA, 
                    cardiac surgery, and prior awareness history as key indications.
                </p>
            </div>

            <div style="background:var(--surface2);border:1px solid var(--border);border-left:3px solid #a78bfa;border-radius:10px;padding:20px 24px;">
                <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#a78bfa;margin-bottom:8px;">
                    NICE — National Institute for Health and Care Excellence (UK)
                </div>
                <p style="font-size:0.88rem;color:#b0c4d8;line-height:1.7;margin:0;">
                    Recommends routine use of depth of anaesthesia monitoring using 
                    processed EEG in adults receiving general anaesthesia with 
                    neuromuscular blocking agents — one of the strongest guideline 
                    endorsements currently available.
                </p>
            </div>

        </div>

        <div class="callout-box" style="margin-top:20px;">
            <div class="callout-icon">⚠️</div>
            <div class="callout-text">
                It is important to note that current guidelines primarily address 
                <strong>processed EEG (pEEG) indices</strong> such as BIS, rather than 
                raw EEG interpretation. However, raw EEG provides richer information and 
                overcomes several limitations of index-based monitoring — the topic of 
                the remaining modules in this course.
            </div>
        </div>
    </div>

    <div class="content-block">
        <h3 class="content-heading">The Vulnerable Patient</h3>
        <p class="content-text">
            If universal EEG monitoring is not yet feasible or standard in your setting, 
            prioritising the following patient groups offers the greatest clinical return:
        </p>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:8px;">
            ${[
                ['🧓', 'Age > 65', 'Lower burst suppression threshold, higher delirium risk, altered MAC'],
                ['🧬', 'Cognitive impairment / dementia', 'Baseline EEG abnormalities, unpredictable drug response'],
                ['💊', 'TIVA without end-tidal monitoring', 'No pharmacokinetic surrogate for depth'],
                ['🫀', 'Cardiac surgery / CPB', 'Haemodynamic instability limits clinical surrogates'],
                ['⚠️', 'Prior awareness history', 'Elevated recurrence risk, high psychological impact'],
                ['🏥', 'Major non-cardiac surgery > 3h', 'Cumulative exposure, risk of excessive depth'],
            ].map(([icon, title, desc]) => `
            <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:16px;">
                <div style="font-size:1.4rem;margin-bottom:8px;">${icon}</div>
                <div style="font-size:0.83rem;font-weight:600;color:var(--text);margin-bottom:6px;line-height:1.3;">${title}</div>
                <div style="font-size:0.77rem;color:var(--muted);line-height:1.5;">${desc}</div>
            </div>`).join('')}
        </div>
    </div>
    `,
};
