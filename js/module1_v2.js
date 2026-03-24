// ─── MODULE 1 CONTENT — v2 ────────────────────────────────────────────────────
// Sayfa 1 ve 2: değişmedi.
// Sayfa 3: SVG EEG görselleri → EEGEngine canvas'larıyla değiştirildi.

const module1Content = {

    1: `
    <div class="content-block">
        <h3 class="content-heading">The Origin of the EEG Signal</h3>
        <p class="content-text">
            The electroencephalogram (EEG) records the summed electrical activity of the brain from the scalp surface.
            Understanding where this signal comes from — and what it actually represents — is essential before
            interpreting any EEG tracing in the operating room.
        </p>
    </div>

    <div class="content-block">
        <h3 class="content-heading">Action Potentials vs. Postsynaptic Potentials</h3>
        <p class="content-text">
            Neurons generate two types of electrical events: <span class="highlight">action potentials</span> and
            <span class="highlight">postsynaptic potentials</span>. Although action potentials are the more
            familiar concept, they are <em>not</em> the primary source of the EEG signal.
        </p>

        <div class="comparison-grid">
            <div class="comparison-card">
                <div class="comparison-icon">⚡</div>
                <div class="comparison-label">Action Potential</div>
                <ul class="comparison-list">
                    <li>Brief, all-or-none event (~1 ms)</li>
                    <li>Propagates along the axon</li>
                    <li>High amplitude but very short duration</li>
                    <li>Poorly synchronised across neurons</li>
                    <li><span class="tag-red">Minimal contribution to scalp EEG</span></li>
                </ul>
            </div>
            <div class="comparison-card highlight-card">
                <div class="comparison-icon">〰️</div>
                <div class="comparison-label">Postsynaptic Potential</div>
                <ul class="comparison-list">
                    <li>Slower, graded event (10–100 ms)</li>
                    <li>Occurs at the dendrites and soma</li>
                    <li>Lower amplitude but longer duration</li>
                    <li>Can summate across thousands of neurons</li>
                    <li><span class="tag-green">Primary source of the EEG signal</span></li>
                </ul>
            </div>
        </div>

        <p class="content-text">
            Because postsynaptic potentials last longer and can occur simultaneously in large populations of neurons,
            their electrical fields summate and become detectable at the scalp. A single postsynaptic potential
            is far too small to be recorded — it is the <strong>synchronised activity of tens of thousands of neurons</strong>
            that produces the signal we measure.
        </p>
    </div>

    <div class="content-block">
        <h3 class="content-heading">Why Cortical Pyramidal Neurons?</h3>
        <p class="content-text">
            Not all neurons contribute equally to the scalp EEG. The dominant contributors are the
            <span class="highlight">cortical pyramidal neurons</span> of layers III and V — and for good reason:
        </p>

        <div class="info-list">
            <div class="info-item">
                <div class="info-num">01</div>
                <div class="info-body">
                    <strong>Perpendicular orientation.</strong> Pyramidal neurons are aligned perpendicular to the
                    cortical surface, with their apical dendrites pointing toward the scalp. This geometry means
                    their electrical dipoles sum constructively rather than cancelling each other out.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">02</div>
                <div class="info-body">
                    <strong>High density.</strong> They are among the most abundant neuron types in the neocortex,
                    providing a large source of synchronised activity.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">03</div>
                <div class="info-body">
                    <strong>Thalamocortical connectivity.</strong> They receive strong rhythmic input from the thalamus,
                    which drives the synchronised oscillations we observe in anaesthesia EEG.
                </div>
            </div>
        </div>
    </div>

    <div class="content-block">
        <h3 class="content-heading">The Concept of Synchronisation</h3>
        <p class="content-text">
            The amplitude and pattern of the EEG signal is fundamentally determined by how
            <span class="highlight">synchronised</span> neuronal activity is at any given moment.
        </p>

        <div class="sync-diagram">
            <div class="sync-state">
                <div class="sync-label">Desynchronised (Awake)</div>
                <div class="sync-waves">
                    <svg viewBox="0 0 260 60" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:60px;">
                        <path d="M0,30 C10,10 20,50 30,30 C40,10 50,50 60,30 C70,15 80,45 90,30 C100,20 110,40 120,30 C130,10 140,50 150,25 C160,15 170,45 180,30 C190,20 200,40 210,28 C220,12 240,48 260,30" stroke="#3b82f6" stroke-width="1.5" fill="none" opacity="0.9"/>
                        <path d="M0,30 C8,22 18,38 28,30 C38,22 48,40 58,28 C68,18 78,42 88,30 C98,24 108,36 118,30 C128,18 138,42 148,28 C158,20 168,40 178,28 C188,22 198,38 208,30 C218,18 238,44 258,28" stroke="#3b82f6" stroke-width="1.5" fill="none" opacity="0.5"/>
                        <path d="M0,32 C12,16 22,46 32,32 C42,18 52,44 62,32 C72,20 82,42 92,30 C102,22 112,38 122,30 C132,16 142,46 152,30 C162,18 172,44 182,28 C192,20 202,40 212,30 C222,14 242,46 260,32" stroke="#3b82f6" stroke-width="1.5" fill="none" opacity="0.3"/>
                    </svg>
                </div>
                <div class="sync-desc">Multiple frequencies, low amplitude — neurons firing independently</div>
            </div>
            <div class="sync-arrow-right">→</div>
            <div class="sync-state">
                <div class="sync-label">Synchronised (Deep Anaesthesia)</div>
                <div class="sync-waves">
                    <svg viewBox="0 0 260 60" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:60px;">
                        <path d="M0,30 C20,5 40,55 65,30 C90,5 110,55 130,30 C150,5 170,55 195,30 C220,5 240,55 260,30" stroke="#00c6a7" stroke-width="2" fill="none"/>
                        <path d="M0,30 C20,6 40,54 65,30 C90,6 110,54 130,30 C150,6 170,54 195,30 C220,6 240,54 260,30" stroke="#00c6a7" stroke-width="2" fill="none" opacity="0.5"/>
                        <path d="M0,30 C20,7 40,53 65,30 C90,7 110,53 130,30 C150,7 170,53 195,30 C220,7 240,53 260,30" stroke="#00c6a7" stroke-width="2" fill="none" opacity="0.3"/>
                    </svg>
                </div>
                <div class="sync-desc">Dominant slow frequency, high amplitude — neurons firing together</div>
            </div>
        </div>

        <p class="content-text">
            During wakefulness, neurons fire independently in response to diverse sensory and cognitive inputs —
            the EEG appears low-amplitude and irregular. Under general anaesthesia, thalamocortical circuits
            are disrupted and large populations of neurons begin to fire in synchrony, producing the
            characteristic high-amplitude, slow-wave patterns we observe.
        </p>

        <div class="callout-box">
            <div class="callout-icon">💡</div>
            <div class="callout-text">
                <strong>Key concept:</strong> The EEG does not measure a single neuron's activity.
                It reflects the <em>net synchronised postsynaptic activity</em> of millions of cortical pyramidal neurons.
                Changes in synchronisation — driven by anaesthetic agents — are what make EEG a window into
                anaesthetic depth.
            </div>
        </div>
    </div>

    <div class="content-block">
        <h3 class="content-heading">EEG as a Sum of Multiple Signals</h3>
        <p class="content-text">
            The waveform you see on an EEG monitor is not a single oscillation — it is the
            <strong>superposition of multiple simultaneous rhythms</strong>, each generated by different
            neural circuits operating at different frequencies. Use the simulator below to explore this concept.
        </p>
    </div>

    <div class="simulator-placeholder">
        <div class="sim-header">
            <span class="sim-badge">Interactive</span>
            <span class="sim-title">Wave Composition Simulator</span>
        </div>
        <div id="wsim-mount" style="padding: 24px 28px;"></div>
    </div>
    `,

    2: `
    <div class="content-block">
        <h3 class="content-heading">From Cortex to Scalp: Volume Conduction</h3>
        <p class="content-text">
            The electrical potentials generated by cortical pyramidal neurons do not travel directly 
            to the scalp electrode via a wire. Instead, they propagate through a series of biological 
            layers — cortex, cerebrospinal fluid, skull, and scalp — by a process called 
            <span class="highlight">volume conduction</span>.
        </p>
        <p class="content-text">
            Each layer attenuates and spatially blurs the signal. By the time a potential reaches 
            the scalp, its amplitude has been reduced roughly 1000-fold compared to the original 
            cortical source. This is why EEG amplitudes are measured in <strong>microvolts (µV)</strong> 
            rather than millivolts, and why high-quality electrodes and low impedance are critical.
        </p>

        <div class="info-list">
            <div class="info-item">
                <div class="info-num">01</div>
                <div class="info-body">
                    <strong>Cortex → CSF.</strong> Cerebrospinal fluid is highly conductive and acts 
                    as a low-resistance pathway, but it also spreads the signal spatially.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">02</div>
                <div class="info-body">
                    <strong>CSF → Skull.</strong> Bone is a poor conductor — it attenuates signal 
                    amplitude significantly and acts as a spatial low-pass filter.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">03</div>
                <div class="info-body">
                    <strong>Skull → Scalp.</strong> The scalp (skin, subcutaneous fat) adds further 
                    resistance. Electrode-skin contact quality at this interface directly determines 
                    signal quality — this is where impedance matters most.
                </div>
            </div>
        </div>
    </div>

    <div class="content-block">
        <h3 class="content-heading">The 10-20 System</h3>
        <p class="content-text">
            Standard EEG uses the <span class="highlight">International 10-20 System</span> for 
            electrode placement — a standardised method ensuring consistent electrode positions 
            across patients and recording sessions. Positions are defined as percentages of the 
            distance between anatomical landmarks (nasion, inion, preauricular points).
        </p>
        <p class="content-text">
            For intraoperative monitoring and processed EEG devices, a simplified 
            <strong>frontal montage</strong> is typically used — focusing on the prefrontal and 
            frontal regions (Fp1, Fp2, F7, F8) where anaesthesia-related changes are most prominent.
        </p>

        <div class="electrode-diagram-wrap">
            <svg viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg" 
                 style="width:100%;max-width:380px;display:block;margin:0 auto;">
                <ellipse cx="170" cy="175" rx="130" ry="148" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
                <path d="M155,27 Q170,10 185,27" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
                <path d="M40,175 Q28,162 30,175 Q28,188 40,175" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
                <path d="M300,175 Q312,162 310,175 Q312,188 300,175" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
                <line x1="170" y1="27" x2="170" y2="323" stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="4,4"/>
                <line x1="40" y1="175" x2="300" y2="175" stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="4,4"/>
                <circle cx="136" cy="68" r="10" fill="rgba(0,198,167,0.2)" stroke="#00c6a7" stroke-width="1.5"/>
                <text x="136" y="72" text-anchor="middle" font-size="9" fill="#00c6a7" font-family="DM Sans,sans-serif" font-weight="600">Fp1</text>
                <circle cx="204" cy="68" r="10" fill="rgba(0,198,167,0.2)" stroke="#00c6a7" stroke-width="1.5"/>
                <text x="204" y="72" text-anchor="middle" font-size="9" fill="#00c6a7" font-family="DM Sans,sans-serif" font-weight="600">Fp2</text>
                <circle cx="82" cy="118" r="10" fill="rgba(0,198,167,0.15)" stroke="#00c6a7" stroke-width="1.5"/>
                <text x="82" y="122" text-anchor="middle" font-size="9" fill="#00c6a7" font-family="DM Sans,sans-serif" font-weight="600">F7</text>
                <circle cx="128" cy="110" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
                <text x="128" y="114" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.5)" font-family="DM Sans,sans-serif">F3</text>
                <circle cx="170" cy="105" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
                <text x="170" y="109" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.5)" font-family="DM Sans,sans-serif">Fz</text>
                <circle cx="212" cy="110" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
                <text x="212" y="114" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.5)" font-family="DM Sans,sans-serif">F4</text>
                <circle cx="258" cy="118" r="10" fill="rgba(0,198,167,0.15)" stroke="#00c6a7" stroke-width="1.5"/>
                <text x="258" y="122" text-anchor="middle" font-size="9" fill="#00c6a7" font-family="DM Sans,sans-serif" font-weight="600">F8</text>
                <circle cx="58" cy="175" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="58" y="179" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">T3</text>
                <circle cx="118" cy="175" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="118" y="179" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">C3</text>
                <circle cx="170" cy="175" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="170" y="179" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">Cz</text>
                <circle cx="222" cy="175" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="222" y="179" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">C4</text>
                <circle cx="282" cy="175" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="282" y="179" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">T4</text>
                <circle cx="128" cy="235" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="128" y="239" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">P3</text>
                <circle cx="170" cy="242" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="170" y="246" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">Pz</text>
                <circle cx="212" cy="235" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="212" y="239" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">P4</text>
                <circle cx="140" cy="292" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="140" y="296" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">O1</text>
                <circle cx="200" cy="292" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="200" y="296" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">O2</text>
                <circle cx="52" cy="316" r="6" fill="rgba(0,198,167,0.2)" stroke="#00c6a7" stroke-width="1.5"/>
                <text x="63" y="320" font-size="9" fill="#00c6a7" font-family="DM Sans,sans-serif" font-weight="600">Frontal (intraoperative focus)</text>
                <circle cx="190" cy="316" r="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
                <text x="201" y="320" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">Other positions</text>
            </svg>
        </div>

        <div class="callout-box" style="margin-top:16px;">
            <div class="callout-icon">💡</div>
            <div class="callout-text">
                In the operating room, most processed EEG monitors (BIS, SedLine, Narcotrend) use 
                a simplified <strong>frontal strip</strong> covering Fp1/Fp2 and F7/F8. Full 
                19-channel recording is reserved for neurophysiology labs and research settings.
            </div>
        </div>
    </div>

    <div class="content-block">
        <h3 class="content-heading">Electrode Impedance</h3>
        <p class="content-text">
            <span class="highlight">Impedance</span> is the resistance to alternating current flow 
            at the electrode-skin interface. It is the single most controllable determinant of 
            signal quality in clinical EEG recording.
        </p>

        <div class="comparison-grid">
            <div class="comparison-card highlight-card">
                <div class="comparison-icon">✓</div>
                <div class="comparison-label">Low Impedance (&lt;5 k&Omega;)</div>
                <ul class="comparison-list">
                    <li>Good electrode-skin contact</li>
                    <li>High signal-to-noise ratio</li>
                    <li>Minimal 50/60 Hz interference</li>
                    <li><span class="tag-green">Target for clinical recording</span></li>
                </ul>
            </div>
            <div class="comparison-card">
                <div class="comparison-icon">✗</div>
                <div class="comparison-label">High Impedance (&gt;10 k&Omega;)</div>
                <ul class="comparison-list">
                    <li>Poor contact — dry skin, hair, gel degradation</li>
                    <li>Amplifies ambient electrical noise</li>
                    <li>Pronounced 50/60 Hz power line artefact</li>
                    <li><span class="tag-red">Compromises signal reliability</span></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="content-block">
        <h3 class="content-heading">Filters and Display Scale</h3>
        <p class="content-text">
            Raw EEG contains signals across a wide frequency range — not all of which are 
            clinically relevant. <span class="highlight">Filters</span> selectively attenuate 
            frequencies outside the range of interest, improving signal clarity.
        </p>

        <div class="info-list">
            <div class="info-item">
                <div class="info-num">HP</div>
                <div class="info-body">
                    <strong>High-pass filter (low frequency cut-off).</strong> Removes slow drifts 
                    caused by electrode movement, breathing, and sweat. Typical setting: 0.5–1 Hz.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">LP</div>
                <div class="info-body">
                    <strong>Low-pass filter (high frequency cut-off).</strong> Removes high-frequency 
                    noise including EMG contamination. Typical setting: 70 Hz.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">NF</div>
                <div class="info-body">
                    <strong>Notch filter (50 or 60 Hz).</strong> Specifically attenuates power line 
                    interference. Essential in most OR environments.
                </div>
            </div>
        </div>
    </div>

    <div class="simulator-placeholder">
        <div class="sim-header">
            <span class="sim-badge">Interactive</span>
            <span class="sim-title">Filter &amp; Scale Simulator</span>
        </div>
        <div id="fsim-mount" style="padding: 24px 28px;"></div>
    </div>
    `,

    3: `
    <div class="content-block">
        <h3 class="content-heading">Common Technical Problems in Intraoperative EEG</h3>
        <p class="content-text">
            Even with correct electrode placement, intraoperative EEG is vulnerable to a range of 
            technical problems. Recognising these artefacts — and knowing how to resolve them — 
            is an essential practical skill.
        </p>
    </div>

    <!-- SORUN 1: YÜKSEK EMPEDANS -->
    <div class="problem-card">
        <div class="problem-header">
            <div class="problem-num">01</div>
            <div class="problem-title">High Electrode Impedance</div>
            <div class="problem-tag tag-warning">Most Common</div>
        </div>
        <div class="problem-body">
            <div class="problem-col">
                <div class="problem-section-label">Cause</div>
                <p>Insufficient skin preparation, dried conductive gel, hair between electrode and skin, or sweating that dilutes the gel.</p>
                <div class="problem-section-label" style="margin-top:12px;">EEG Appearance</div>
                <p>Increased baseline noise, irregular oscillations superimposed on the signal, prominent 50/60 Hz ripple.</p>
                <div class="problem-section-label" style="margin-top:12px;">Solution</div>
                <ul class="solution-list">
                    <li>Re-prep skin with abrasive gel</li>
                    <li>Reapply fresh conductive gel</li>
                    <li>Press and hold electrode firmly for 30 seconds</li>
                    <li>Target impedance &lt;5 k&Omega; on all channels</li>
                </ul>
            </div>
            <div class="problem-eeg-box">
                <div class="eeg-label">EEG with high impedance</div>
                <div id="eeg-high-impedance" style="border-radius:6px;overflow:hidden;"></div>
                <div class="eeg-note">Irregular high-frequency noise obscures true signal</div>
            </div>
        </div>
    </div>

    <!-- SORUN 2: ELEKTROT DÜŞMESİ -->
    <div class="problem-card">
        <div class="problem-header">
            <div class="problem-num">02</div>
            <div class="problem-title">Electrode Displacement or Disconnection</div>
            <div class="problem-tag tag-danger">Critical</div>
        </div>
        <div class="problem-body">
            <div class="problem-col">
                <div class="problem-section-label">Cause</div>
                <p>Electrode adhesive failure, patient movement, surgical draping, or accidental cable tension.</p>
                <div class="problem-section-label" style="margin-top:12px;">EEG Appearance</div>
                <p>Sudden transition to flat line (isoelectric) on the affected channel, or a large deflection at the moment of displacement.</p>
                <div class="problem-section-label" style="margin-top:12px;">Solution</div>
                <ul class="solution-list">
                    <li>Check electrode connections at amplifier</li>
                    <li>Inspect electrode adhesion on scalp</li>
                    <li>Do not interpret a flat channel as burst suppression</li>
                </ul>
            </div>
            <div class="problem-eeg-box">
                <div class="eeg-label">Electrode displacement</div>
                <div id="eeg-displacement" style="border-radius:6px;overflow:hidden;"></div>
                <div class="eeg-note">Normal signal → abrupt artefact → isoelectric flat line</div>
            </div>
        </div>
    </div>

    <!-- SORUN 3: GÜÇ HATTI GÜRÜLTÜsü -->
    <div class="problem-card">
        <div class="problem-header">
            <div class="problem-num">03</div>
            <div class="problem-title">Power Line Interference (50/60 Hz)</div>
            <div class="problem-tag tag-info">Common in OR</div>
        </div>
        <div class="problem-body">
            <div class="problem-col">
                <div class="problem-section-label">Cause</div>
                <p>Electromagnetic interference from OR equipment. Worsened by high electrode impedance or inadequate grounding.</p>
                <div class="problem-section-label" style="margin-top:12px;">EEG Appearance</div>
                <p>Regular, high-frequency sinusoidal oscillation at exactly 50 or 60 Hz — creates a "thickened" baseline appearance.</p>
                <div class="problem-section-label" style="margin-top:12px;">Solution</div>
                <ul class="solution-list">
                    <li>Enable notch filter (50 Hz Europe/Turkey, 60 Hz North America)</li>
                    <li>Reduce electrode impedance</li>
                    <li>Move cables away from power sources</li>
                </ul>
            </div>
            <div class="problem-eeg-box">
                <div class="eeg-label">50 Hz power line interference</div>
                <div id="eeg-powerline" style="border-radius:6px;overflow:hidden;"></div>
                <div class="eeg-note">Regular 50 Hz sinusoid obscures underlying EEG rhythm</div>
            </div>
        </div>
    </div>

    <!-- SORUN 4: KÖTÜ REFERANS -->
    <div class="problem-card">
        <div class="problem-header">
            <div class="problem-num">04</div>
            <div class="problem-title">Poor Reference Electrode</div>
            <div class="problem-tag tag-info">Often Overlooked</div>
        </div>
        <div class="problem-body">
            <div class="problem-col">
                <div class="problem-section-label">Cause</div>
                <p>The reference electrode has high impedance or is placed over an active area. All channels share the reference, so one bad reference corrupts all channels simultaneously.</p>
                <div class="problem-section-label" style="margin-top:12px;">EEG Appearance</div>
                <p>Identical artefact appearing across all channels simultaneously.</p>
                <div class="problem-section-label" style="margin-top:12px;">Solution</div>
                <ul class="solution-list">
                    <li>Re-prep and reapply the reference electrode specifically</li>
                    <li>Use linked mastoid reference when possible</li>
                    <li>Check reference impedance independently</li>
                </ul>
            </div>
            <div class="problem-eeg-box">
                <div class="eeg-label">All channels affected simultaneously</div>
                <div id="eeg-bad-reference" style="border-radius:6px;overflow:hidden;"></div>
                <div class="eeg-note">Same noise pattern on all channels = reference problem</div>
            </div>
        </div>
    </div>

    <div class="callout-box" style="margin-top:8px;">
        <div class="callout-icon">💡</div>
        <div class="callout-text">
            <strong>Practical rule:</strong> When you see an unexpected EEG pattern, always ask 
            <em>"Is this real, or is this a technical artefact?"</em> before making a clinical 
            decision. Check electrodes and impedance first.
        </div>
    </div>
    `,
};

// ─── SAYFA YÜKLENINCE ─────────────────────────────────────────────────────────
function onModule1PageLoad(pageNum) {
    if (pageNum === 1) {
        setTimeout(() => {
            if (typeof initWaveSimulator === 'function') initWaveSimulator('wsim-mount');
        }, 80);
    }
    if (pageNum === 2) {
        setTimeout(() => {
            if (typeof initFilterSimulator === 'function') initFilterSimulator('fsim-mount');
        }, 80);
    }
    if (pageNum === 3) {
        setTimeout(() => {
            if (typeof EEGEngine === 'undefined') return;
            EEGEngine.renderBlock('eeg-high-impedance',  'high_impedance',        { height: 70, showScaleBar: false, show1sBar: false });
            EEGEngine.renderBlock('eeg-displacement',    'electrode_displacement', { height: 70, showScaleBar: false, show1sBar: false });
            EEGEngine.renderBlock('eeg-powerline',       'powerline_noise',        { height: 70, showScaleBar: false, show1sBar: false });
            // Bad reference: iki kanal aynı noise ile
            const badRefCanvas = 'eeg-bad-reference-canvas';
            const container = document.getElementById('eeg-bad-reference');
            if (container) {
                container.innerHTML = `<canvas id="${badRefCanvas}" height="80" style="width:100%;display:block;background:rgba(0,0,0,0.15);border-radius:8px;"></canvas>`;
                const sharedNoise = EEGEngine.makeSignal({
                    components: [{ freq: 50.0, amp: 7, phase: 0.0 }],
                    pinkAmp: 3.0, whiteAmp: 4.0, drift: 3.0, smoothAlpha: 0.9,
                });
                setTimeout(() => {
                    EEGEngine.drawEEG(badRefCanvas, [
                        { signal: sharedNoise, label: 'Ch1', color: '#f87171' },
                        { signal: sharedNoise, label: 'Ch2', color: '#f87171' },
                    ], { scaleUV: 40, showScaleBar: false, show1sBar: false });
                }, 40);
            }
        }, 80);
    }
}
