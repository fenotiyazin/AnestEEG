// ─── MODULE 1 CONTENT ─────────────────────────────────────────────────────────

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

        <!-- 10-20 SVG DİYAGRAMI -->
        <div class="electrode-diagram-wrap">
            <svg viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg" 
                 style="width:100%;max-width:380px;display:block;margin:0 auto;">
                
                <!-- Kafa şekli -->
                <ellipse cx="170" cy="175" rx="130" ry="148" 
                         fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
                <!-- Burun -->
                <path d="M155,27 Q170,10 185,27" 
                      fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
                <!-- Sol kulak -->
                <path d="M40,175 Q28,162 30,175 Q28,188 40,175" 
                      fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
                <!-- Sağ kulak -->
                <path d="M300,175 Q312,162 310,175 Q312,188 300,175" 
                      fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>

                <!-- Orta çizgiler (referans) -->
                <line x1="170" y1="27" x2="170" y2="323" 
                      stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="4,4"/>
                <line x1="40" y1="175" x2="300" y2="175" 
                      stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="4,4"/>

                <!-- ── ELEKTROTLAR ── -->
                <!-- Fp1 -->
                <circle cx="136" cy="68" r="10" fill="rgba(0,198,167,0.2)" stroke="#00c6a7" stroke-width="1.5"/>
                <text x="136" y="72" text-anchor="middle" font-size="9" fill="#00c6a7" font-family="DM Sans,sans-serif" font-weight="600">Fp1</text>

                <!-- Fp2 -->
                <circle cx="204" cy="68" r="10" fill="rgba(0,198,167,0.2)" stroke="#00c6a7" stroke-width="1.5"/>
                <text x="204" y="72" text-anchor="middle" font-size="9" fill="#00c6a7" font-family="DM Sans,sans-serif" font-weight="600">Fp2</text>

                <!-- F7 -->
                <circle cx="82" cy="118" r="10" fill="rgba(0,198,167,0.15)" stroke="#00c6a7" stroke-width="1.5"/>
                <text x="82" y="122" text-anchor="middle" font-size="9" fill="#00c6a7" font-family="DM Sans,sans-serif" font-weight="600">F7</text>

                <!-- F3 -->
                <circle cx="128" cy="110" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
                <text x="128" y="114" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.5)" font-family="DM Sans,sans-serif">F3</text>

                <!-- Fz -->
                <circle cx="170" cy="105" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
                <text x="170" y="109" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.5)" font-family="DM Sans,sans-serif">Fz</text>

                <!-- F4 -->
                <circle cx="212" cy="110" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
                <text x="212" y="114" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.5)" font-family="DM Sans,sans-serif">F4</text>

                <!-- F8 -->
                <circle cx="258" cy="118" r="10" fill="rgba(0,198,167,0.15)" stroke="#00c6a7" stroke-width="1.5"/>
                <text x="258" y="122" text-anchor="middle" font-size="9" fill="#00c6a7" font-family="DM Sans,sans-serif" font-weight="600">F8</text>

                <!-- T3 -->
                <circle cx="58" cy="175" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="58" y="179" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">T3</text>

                <!-- C3 -->
                <circle cx="118" cy="175" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="118" y="179" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">C3</text>

                <!-- Cz -->
                <circle cx="170" cy="175" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="170" y="179" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">Cz</text>

                <!-- C4 -->
                <circle cx="222" cy="175" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="222" y="179" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">C4</text>

                <!-- T4 -->
                <circle cx="282" cy="175" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="282" y="179" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">T4</text>

                <!-- P3 -->
                <circle cx="128" cy="235" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="128" y="239" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">P3</text>

                <!-- Pz -->
                <circle cx="170" cy="242" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="170" y="246" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">Pz</text>

                <!-- P4 -->
                <circle cx="212" cy="235" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="212" y="239" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">P4</text>

                <!-- O1 -->
                <circle cx="140" cy="292" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="140" y="296" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">O1</text>

                <!-- O2 -->
                <circle cx="200" cy="292" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                <text x="200" y="296" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="DM Sans,sans-serif">O2</text>

                <!-- LEGEND -->
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
                <div class="comparison-label">Low Impedance (&lt;5 kΩ)</div>
                <ul class="comparison-list">
                    <li>Good electrode-skin contact</li>
                    <li>High signal-to-noise ratio</li>
                    <li>Minimal 50/60 Hz interference</li>
                    <li><span class="tag-green">Target for clinical recording</span></li>
                </ul>
            </div>
            <div class="comparison-card">
                <div class="comparison-icon">✗</div>
                <div class="comparison-label">High Impedance (&gt;10 kΩ)</div>
                <ul class="comparison-list">
                    <li>Poor contact — dry skin, hair, gel degradation</li>
                    <li>Amplifies ambient electrical noise</li>
                    <li>Pronounced 50/60 Hz power line artefact</li>
                    <li><span class="tag-red">Compromises signal reliability</span></li>
                </ul>
            </div>
        </div>

        <p class="content-text">
            In practice, impedance should be checked before the start of monitoring and rechecked 
            if signal quality deteriorates. Most modern EEG monitors display impedance continuously 
            via a colour-coded electrode map.
        </p>
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
                    Setting too high removes clinically relevant delta activity.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">LP</div>
                <div class="info-body">
                    <strong>Low-pass filter (high frequency cut-off).</strong> Removes high-frequency 
                    noise including EMG contamination. Typical setting: 70 Hz. Setting too low 
                    removes beta activity and blurs the signal.
                </div>
            </div>
            <div class="info-item">
                <div class="info-num">NF</div>
                <div class="info-body">
                    <strong>Notch filter (50 or 60 Hz).</strong> Specifically attenuates power line 
                    interference. Essential in most OR environments. Should only be used when 
                    power line noise is present — it slightly distorts signals near 50/60 Hz.
                </div>
            </div>
        </div>

        <div class="callout-box">
            <div class="callout-icon">⚠️</div>
            <div class="callout-text">
                <strong>Scale matters.</strong> EEG amplitude scale (µV/division) directly affects 
                visual interpretation. A burst suppression pattern may appear as flat line on a 
                compressed scale, or as dramatically large waves on a sensitive scale. Always check 
                your scale setting before interpreting the trace.
            </div>
        </div>
    </div>

    <!-- FİLTRE SİMÜLATÖRÜ PLACEHOLDER -->
    <div class="simulator-placeholder">
        <div class="sim-header">
            <span class="sim-badge">Interactive</span>
            <span class="sim-title">Filter & Scale Simulator</span>
        </div>
        <div id="fsim-mount" style="padding: 24px 28px;
             text-align:center; color:var(--muted); font-size:0.85rem;">
            🚧 &nbsp; Simulator coming in next phase.
        </div>
    </div>
    `,


    3: `
    <div class="content-block">
        <h3 class="content-heading">Common Technical Problems in Intraoperative EEG</h3>
        <p class="content-text">
            Even with correct electrode placement, intraoperative EEG is vulnerable to a range of 
            technical problems. Recognising these artefacts — and knowing how to resolve them — 
            is an essential practical skill. The following are the four most common issues 
            encountered in the operating room.
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
                <p>Increased baseline noise, irregular low-amplitude oscillations superimposed on the signal, prominent 50/60 Hz ripple.</p>
                <div class="problem-section-label" style="margin-top:12px;">Solution</div>
                <ul class="solution-list">
                    <li>Re-prep skin with abrasive gel</li>
                    <li>Reapply fresh conductive gel</li>
                    <li>Press and hold electrode firmly for 30 seconds</li>
                    <li>Target impedance &lt;5 kΩ on all channels</li>
                </ul>
            </div>
            <div class="problem-eeg-box">
                <div class="eeg-label">EEG with high impedance</div>
                <svg viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:70px;">
                    <!-- Gürültülü sinyal -->
                    <path d="M0,35 C3,28 5,42 7,31 C9,24 11,46 14,35 C16,22 19,48 22,33 C25,20 27,50 30,34 C33,25 35,44 38,32 C40,21 43,49 46,35 C48,23 51,47 54,33 C57,22 59,48 62,34 C65,26 67,44 70,32 C73,19 75,51 78,35 C80,22 83,48 86,33 C89,21 91,49 94,34 C96,24 99,46 102,32 C104,20 107,50 110,35 C113,23 115,47 118,33 C120,22 123,48 126,34 C129,25 131,45 134,32 C136,20 139,51 142,35 C145,22 147,48 150,33 C153,21 155,49 158,34 C161,24 163,46 166,32 C168,21 171,50 174,35 C177,23 179,47 182,33 C184,22 187,48 190,34 C193,26 195,44 198,32 C200,20 203,51 206,35 C209,22 211,48 214,33 C216,21 219,49 222,34 C225,24 227,46 230,32 C232,20 235,50 238,35 C241,23 243,47 246,33 C248,22 251,48 254,34 C257,26 259,44 262,32 C264,21 267,50 270,35 C273,22 275,48 278,33" 
                          stroke="#f87171" stroke-width="1.2" fill="none" opacity="0.8"/>
                    <line x1="0" y1="35" x2="280" y2="35" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" stroke-dasharray="3,3"/>
                </svg>
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
                <p>Sudden transition to flat line (isoelectric) on the affected channel, or a large, slow, irregular deflection at the moment of displacement.</p>
                <div class="problem-section-label" style="margin-top:12px;">Solution</div>
                <ul class="solution-list">
                    <li>Check electrode connections at amplifier</li>
                    <li>Inspect electrode adhesion on scalp</li>
                    <li>Reapply if accessible without disrupting sterile field</li>
                    <li>Do not interpret a flat channel as burst suppression</li>
                </ul>
            </div>
            <div class="problem-eeg-box">
                <div class="eeg-label">Electrode displacement</div>
                <svg viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:70px;">
                    <!-- Normal sinyal -->
                    <path d="M0,35 C8,18 16,52 28,35 C40,18 50,52 62,35 C74,18 84,52 96,35 C108,18 118,52 130,35" 
                          stroke="#00c6a7" stroke-width="1.5" fill="none"/>
                    <!-- Ani düşüş -->
                    <path d="M130,35 L135,10 L138,60 L142,35" 
                          stroke="#f87171" stroke-width="1.5" fill="none"/>
                    <!-- Flat line -->
                    <line x1="142" y1="35" x2="278" y2="35" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-dasharray="4,2"/>
                    <!-- Marker -->
                    <line x1="132" y1="5" x2="132" y2="65" stroke="#f87171" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.5"/>
                    <text x="145" y="20" font-size="8" fill="#f87171" font-family="DM Sans,sans-serif">disconnect</text>
                    <line x1="0" y1="35" x2="280" y2="35" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                </svg>
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
                <p>Electromagnetic interference from OR equipment (electrosurgical units, infusion pumps, warming blankets). Worsened by high electrode impedance or inadequate grounding.</p>
                <div class="problem-section-label" style="margin-top:12px;">EEG Appearance</div>
                <p>Regular, high-frequency sinusoidal oscillation at exactly 50 or 60 Hz superimposed on the signal — creates a "thickened" baseline appearance.</p>
                <div class="problem-section-label" style="margin-top:12px;">Solution</div>
                <ul class="solution-list">
                    <li>Enable notch filter (50 Hz Europe/Turkey, 60 Hz North America)</li>
                    <li>Reduce electrode impedance</li>
                    <li>Move cables away from power sources</li>
                    <li>Identify and temporarily disable interfering equipment</li>
                </ul>
            </div>
            <div class="problem-eeg-box">
                <div class="eeg-label">50 Hz power line interference</div>
                <svg viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:70px;">
                    <!-- Altta gerçek sinyal -->
                    <path d="M0,35 C18,22 36,48 70,35 C104,22 122,48 155,35 C188,22 206,48 240,35 C258,22 268,42 280,35" 
                          stroke="#00c6a7" stroke-width="1" fill="none" opacity="0.3"/>
                    <!-- 50 Hz gürültü -->
                    <path d="M0,35 C1,28 2,42 3,35 C4,28 5,42 6,35 C7,28 8,42 9,35 C10,28 11,42 12,35 C13,28 14,42 15,35 C16,28 17,42 18,35 C19,28 20,42 21,35 C22,28 23,42 24,35 C25,28 26,42 27,35 C28,28 29,42 30,35 C31,28 32,42 33,35 C34,28 35,42 36,35 C37,28 38,42 39,35 C40,28 41,42 42,35 C43,28 44,42 45,35 C46,28 47,42 48,35 C49,28 50,42 51,35 C52,28 53,42 54,35 C55,28 56,42 57,35 C58,28 59,42 60,35 C61,28 62,42 63,35 C64,28 65,42 66,35 C67,28 68,42 69,35 C70,28 71,42 72,35 C73,28 74,42 75,35 C76,28 77,42 78,35 C79,28 80,42 81,35 C82,28 83,42 84,35 C85,28 86,42 87,35 C88,28 89,42 90,35 C91,28 92,42 93,35 C94,28 95,42 96,35 C97,28 98,42 99,35 C100,28 101,42 102,35 C103,28 104,42 105,35 C106,28 107,42 108,35 C109,28 110,42 111,35 C112,28 113,42 114,35 C115,28 116,42 117,35 C118,28 119,42 120,35 C121,28 122,42 123,35 C124,28 125,42 126,35 C127,28 128,42 129,35 C130,28 131,42 132,35 C133,28 134,42 135,35 C136,28 137,42 138,35 C139,28 140,42 141,35 C142,28 143,42 144,35 C145,28 146,42 147,35 C148,28 149,42 150,35 C151,28 152,42 153,35 C154,28 155,42 156,35 C157,28 158,42 159,35 C160,28 161,42 162,35 C163,28 164,42 165,35 C166,28 167,42 168,35 C169,28 170,42 171,35 C172,28 173,42 174,35 C175,28 176,42 177,35 C178,28 179,42 180,35 C181,28 182,42 183,35 C184,28 185,42 186,35 C187,28 188,42 189,35 C190,28 191,42 192,35 C193,28 194,42 195,35 C196,28 197,42 198,35 C199,28 200,42 201,35 C202,28 203,42 204,35 C205,28 206,42 207,35 C208,28 209,42 210,35 C211,28 212,42 213,35 C214,28 215,42 216,35 C217,28 218,42 219,35 C220,28 221,42 222,35 C223,28 224,42 225,35 C226,28 227,42 228,35 C229,28 230,42 231,35 C232,28 233,42 234,35 C235,28 236,42 237,35 C238,28 239,42 240,35 C241,28 242,42 243,35 C244,28 245,42 246,35 C247,28 248,42 249,35 C250,28 251,42 252,35 C253,28 254,42 255,35 C256,28 257,42 258,35 C259,28 260,42 261,35 C262,28 263,42 264,35 C265,28 266,42 267,35 C268,28 269,42 270,35 C271,28 272,42 273,35 C274,28 275,42 276,35 C277,28 278,42 279,35" 
                          stroke="#facc15" stroke-width="1" fill="none" opacity="0.85"/>
                    <line x1="0" y1="35" x2="280" y2="35" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                </svg>
                <div class="eeg-note">Regular 50 Hz sinusoid obscures underlying EEG rhythm</div>
            </div>
        </div>
    </div>

    <!-- SORUN 4: KÖTÜ REFERANS ELEKTROT -->
    <div class="problem-card">
        <div class="problem-header">
            <div class="problem-num">04</div>
            <div class="problem-title">Poor Reference Electrode</div>
            <div class="problem-tag tag-info">Often Overlooked</div>
        </div>
        <div class="problem-body">
            <div class="problem-col">
                <div class="problem-section-label">Cause</div>
                <p>The reference electrode (typically mastoid or linked ears) has high impedance or is placed over an active area. All channels share the reference, so one bad reference corrupts all channels simultaneously.</p>
                <div class="problem-section-label" style="margin-top:12px;">EEG Appearance</div>
                <p>Identical artefact appearing across all channels simultaneously — particularly 50/60 Hz noise, slow drift, or pulsation artefact affecting every trace in the same pattern.</p>
                <div class="problem-section-label" style="margin-top:12px;">Solution</div>
                <ul class="solution-list">
                    <li>Re-prep and reapply the reference electrode specifically</li>
                    <li>Use linked mastoid reference when possible</li>
                    <li>Check reference impedance independently</li>
                    <li>Consider switching montage if the issue persists</li>
                </ul>
            </div>
            <div class="problem-eeg-box">
                <div class="eeg-label">All channels affected simultaneously</div>
                <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:80px;">
                    <!-- 3 kanal, hepsi aynı gürültüyle -->
                    <path d="M0,18 C3,12 5,24 7,15 C9,10 11,26 14,18 C16,11 19,25 22,17 C25,10 27,26 30,18 C33,12 35,24 38,16 C40,10 43,26 46,18 C48,11 51,25 54,17 C57,10 59,26 62,18 C65,13 67,23 70,16 C73,9 75,27 78,18 C80,12 83,24 86,16 C89,10 91,26 94,18 C96,13 99,23 102,16 C104,10 107,27 110,18 C113,12 115,24 118,16 C120,10 123,26 126,18 C129,13 131,23 134,16 C136,10 139,26 142,18 C145,12 147,24 150,16 C153,10 155,26 158,18 C161,13 163,23 166,16 C168,10 171,26 174,18 C177,12 179,24 182,16 C184,10 187,26 190,18 C193,13 195,23 198,16 C200,10 203,26 206,18 C209,12 211,24 214,16 C216,10 219,26 222,18 C225,13 227,23 230,16 C232,10 235,26 238,18 C241,12 243,24 246,16 C248,10 251,26 254,18 C257,13 259,23 262,16 C264,10 267,26 270,18 C273,12 275,24 278,16" 
                          stroke="#f87171" stroke-width="1" fill="none" opacity="0.7"/>
                    <path d="M0,40 C3,34 5,46 7,37 C9,32 11,48 14,40 C16,33 19,47 22,39 C25,32 27,48 30,40 C33,34 35,46 38,38 C40,32 43,48 46,40 C48,33 51,47 54,39 C57,32 59,48 62,40 C65,35 67,45 70,38 C73,31 75,49 78,40 C80,34 83,46 86,38 C89,32 91,48 94,40 C96,35 99,45 102,38 C104,32 107,49 110,40 C113,34 115,46 118,38 C120,32 123,48 126,40 C129,35 131,45 134,38 C136,32 139,48 142,40 C145,34 147,46 150,38 C153,32 155,48 158,40 C161,35 163,45 166,38 C168,32 171,48 174,40 C177,34 179,46 182,38 C184,32 187,48 190,40 C193,35 195,45 198,38 C200,32 203,48 206,40 C209,34 211,46 214,38 C216,32 219,48 222,40 C225,35 227,45 230,38 C232,32 235,48 238,40 C241,34 243,46 246,38 C248,32 251,48 254,40 C257,35 259,45 262,38 C264,32 267,48 270,40 C273,34 275,46 278,38" 
                          stroke="#f87171" stroke-width="1" fill="none" opacity="0.7"/>
                    <path d="M0,62 C3,56 5,68 7,59 C9,54 11,70 14,62 C16,55 19,69 22,61 C25,54 27,70 30,62 C33,56 35,68 38,60 C40,54 43,70 46,62 C48,55 51,69 54,61 C57,54 59,70 62,62 C65,57 67,67 70,60 C73,53 75,71 78,62 C80,56 83,68 86,60 C89,54 91,70 94,62 C96,57 99,67 102,60 C104,54 107,71 110,62 C113,56 115,68 118,60 C120,54 123,70 126,62 C129,57 131,67 134,60 C136,54 139,70 142,62 C145,56 147,68 150,60 C153,54 155,70 158,62 C161,57 163,67 166,60 C168,54 171,70 174,62 C177,56 179,68 182,60 C184,54 187,70 190,62 C193,57 195,67 198,60 C200,54 203,70 206,62 C209,56 211,68 214,60 C216,54 219,70 222,62 C225,57 227,67 230,60 C232,54 235,70 238,62 C241,56 243,68 246,60 C248,54 251,70 254,62 C257,57 259,67 262,60 C264,54 267,70 270,62 C273,56 275,68 278,60" 
                          stroke="#f87171" stroke-width="1" fill="none" opacity="0.7"/>
                    <text x="4" y="76" font-size="7" fill="rgba(255,255,255,0.3)" font-family="DM Sans,sans-serif">Ch1</text>
                    <text x="4" y="54" font-size="7" fill="rgba(255,255,255,0.3)" font-family="DM Sans,sans-serif">Ch2</text>
                    <text x="4" y="32" font-size="7" fill="rgba(255,255,255,0.3)" font-family="DM Sans,sans-serif">Ch3</text>
                </svg>
                <div class="eeg-note">Same noise pattern on all channels = reference problem</div>
            </div>
        </div>
    </div>

    <div class="callout-box" style="margin-top:8px;">
        <div class="callout-icon">💡</div>
        <div class="callout-text">
            <strong>Practical rule:</strong> When you see an unexpected EEG pattern, always ask 
            <em>"Is this real, or is this a technical artefact?"</em> before making a clinical 
            decision. Check electrodes and impedance first — it is almost always faster than 
            re-evaluating your anaesthetic regimen.
        </div>
    </div>
    `,
}

// ─── SAYFA YÜKLENINCE ÇAĞRILIR ────────────────────────────────────────────────
function onModule1PageLoad(pageNum) {
    if (pageNum === 1) {
        setTimeout(() => {
            if (typeof initWaveSimulator === 'function') {
                initWaveSimulator('wsim-mount');
            }
        }, 80);
    }
    if (pageNum === 2) {
        setTimeout(() => {
            if (typeof initFilterSimulator === 'function')
                initFilterSimulator('fsim-mount');
        }, 80);
    }
}
