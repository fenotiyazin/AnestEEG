// ─── MODULE 3 CONTENT ─────────────────────────────────────────────────────────

const module3Content = {

    1: `
    <div class="content-block">
        <h3 class="content-heading">Frequency Bands of the EEG</h3>
        <p class="content-text">
            The EEG signal is conventionally divided into frequency bands, each associated with 
            distinct neural generators, physiological states, and — critically for anaesthesia — 
            specific drug effects. Understanding these bands is the foundation of all EEG 
            interpretation: before you can recognise a pattern, you need to know what frequencies 
            are present, at what amplitude, and whether their distribution is appropriate for 
            the clinical context.
        </p>
        <p class="content-text">
            The boundaries between bands are conventional rather than biologically absolute. 
            What matters clinically is not the precise frequency of a single wave, but the 
            <span class="highlight">dominant rhythm</span> — the frequency band that carries 
            most of the signal power at a given moment.
        </p>
    </div>

    <!-- ── DELTA ───────────────────────────────────────────────────────────── -->
    <div class="content-block">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start;">
            <div>
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
                    <div style="background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.35);
                                border-radius:8px;padding:6px 14px;font-size:0.78rem;font-weight:700;
                                letter-spacing:0.08em;text-transform:uppercase;color:#818cf8;">
                        Delta
                    </div>
                    <div style="font-size:0.82rem;color:var(--muted);">0.5 – 4 Hz</div>
                </div>
                <svg viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg" 
                     style="width:100%;height:70px;background:rgba(0,0,0,0.15);
                            border:1px solid var(--border);border-radius:8px;display:block;">
                    <line x1="0" y1="35" x2="280" y2="35" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
                    <path d="M0,35 C25,5 55,65 70,35 C85,5 115,65 140,35 C155,5 185,65 210,35 C225,5 255,65 280,35"
                          stroke="#818cf8" stroke-width="2" fill="none"/>
                </svg>
                <div style="font-size:0.72rem;color:var(--muted);margin-top:6px;text-align:center;
                            letter-spacing:0.04em;">~1.5 Hz — high amplitude, slow</div>
            </div>
            <div style="padding-top:4px;">
                <div style="font-size:0.83rem;font-weight:600;color:var(--text);margin-bottom:10px;">Key features</div>
                <div style="display:flex;flex-direction:column;gap:8px;">
                    ${[
                        ['Amplitude', 'High — typically 75–200 µV or more'],
                        ['Normal context', 'Deep sleep (N3/N4), infants'],
                        ['In anaesthesia', 'Appears during induction; dominant in deep maintenance'],
                        ['Clinical note', 'Frontal delta is expected and normal during propofol anaesthesia — but excessive delta with suppression intervals signals over-dosing'],
                    ].map(([label, val]) => `
                    <div style="display:flex;gap:10px;font-size:0.82rem;">
                        <span style="color:var(--muted);min-width:90px;flex-shrink:0;">${label}</span>
                        <span style="color:#c0cfe0;line-height:1.5;">${val}</span>
                    </div>`).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- ── THETA ───────────────────────────────────────────────────────────── -->
    <div class="content-block">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start;">
            <div>
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
                    <div style="background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.35);
                                border-radius:8px;padding:6px 14px;font-size:0.78rem;font-weight:700;
                                letter-spacing:0.08em;text-transform:uppercase;color:#60a5fa;">
                        Theta
                    </div>
                    <div style="font-size:0.82rem;color:var(--muted);">4 – 8 Hz</div>
                </div>
                <svg viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg"
                     style="width:100%;height:70px;background:rgba(0,0,0,0.15);
                            border:1px solid var(--border);border-radius:8px;display:block;">
                    <line x1="0" y1="35" x2="280" y2="35" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
                    <path d="M0,35 C10,12 25,58 40,35 C55,12 70,58 85,35 C100,12 115,58 130,35 C145,12 160,58 175,35 C190,12 205,58 220,35 C235,12 250,58 265,35 C272,23 276,42 280,35"
                          stroke="#60a5fa" stroke-width="2" fill="none"/>
                </svg>
                <div style="font-size:0.72rem;color:var(--muted);margin-top:6px;text-align:center;
                            letter-spacing:0.04em;">~6 Hz — moderate amplitude</div>
            </div>
            <div style="padding-top:4px;">
                <div style="font-size:0.83rem;font-weight:600;color:var(--text);margin-bottom:10px;">Key features</div>
                <div style="display:flex;flex-direction:column;gap:8px;">
                    ${[
                        ['Amplitude', 'Moderate — typically 20–100 µV'],
                        ['Normal context', 'Drowsiness, light sleep, memory encoding'],
                        ['In anaesthesia', 'Prominent during light sedation and early induction; decreases as depth increases'],
                        ['Clinical note', 'Theta activity mixed with alpha during sedation; not a reliable marker of adequate surgical depth'],
                    ].map(([label, val]) => `
                    <div style="display:flex;gap:10px;font-size:0.82rem;">
                        <span style="color:var(--muted);min-width:90px;flex-shrink:0;">${label}</span>
                        <span style="color:#c0cfe0;line-height:1.5;">${val}</span>
                    </div>`).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- ── ALPHA ───────────────────────────────────────────────────────────── -->
    <div class="content-block">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start;">
            <div>
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
                    <div style="background:rgba(0,198,167,0.15);border:1px solid rgba(0,198,167,0.35);
                                border-radius:8px;padding:6px 14px;font-size:0.78rem;font-weight:700;
                                letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);">
                        Alpha
                    </div>
                    <div style="font-size:0.82rem;color:var(--muted);">8 – 13 Hz</div>
                </div>
                <svg viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg"
                     style="width:100%;height:70px;background:rgba(0,0,0,0.15);
                            border:1px solid var(--border);border-radius:8px;display:block;">
                    <line x1="0" y1="35" x2="280" y2="35" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
                    <path d="M0,35 C7,18 18,52 28,35 C38,18 49,52 59,35 C69,18 80,52 90,35 C100,18 111,52 121,35 C131,18 142,52 152,35 C162,18 173,52 183,35 C193,18 204,52 214,35 C224,18 235,52 245,35 C255,18 266,52 276,35 C278,32 279,33 280,35"
                          stroke="#00c6a7" stroke-width="2" fill="none"/>
                </svg>
                <div style="font-size:0.72rem;color:var(--muted);margin-top:6px;text-align:center;
                            letter-spacing:0.04em;">~10 Hz — medium amplitude, regular</div>
            </div>
            <div style="padding-top:4px;">
                <div style="font-size:0.83rem;font-weight:600;color:var(--text);margin-bottom:10px;">Key features</div>
                <div style="display:flex;flex-direction:column;gap:8px;">
                    ${[
                        ['Amplitude', 'Medium — typically 20–60 µV'],
                        ['Normal context', 'Relaxed wakefulness with eyes closed; dominant over occipital regions'],
                        ['In anaesthesia', 'Frontal alpha is the hallmark of propofol anaesthesia at surgical depth — the "frontal alpha-delta pattern"'],
                        ['Clinical note', 'Alpha dropout — sudden loss of frontal alpha — may indicate inadequate depth or response to nociception (Module 9)'],
                    ].map(([label, val]) => `
                    <div style="display:flex;gap:10px;font-size:0.82rem;">
                        <span style="color:var(--muted);min-width:90px;flex-shrink:0;">${label}</span>
                        <span style="color:#c0cfe0;line-height:1.5;">${val}</span>
                    </div>`).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- ── BETA ────────────────────────────────────────────────────────────── -->
    <div class="content-block">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start;">
            <div>
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
                    <div style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);
                                border-radius:8px;padding:6px 14px;font-size:0.78rem;font-weight:700;
                                letter-spacing:0.08em;text-transform:uppercase;color:#fbbf24;">
                        Beta
                    </div>
                    <div style="font-size:0.82rem;color:var(--muted);">13 – 30 Hz</div>
                </div>
                <svg viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg"
                     style="width:100%;height:70px;background:rgba(0,0,0,0.15);
                            border:1px solid var(--border);border-radius:8px;display:block;">
                    <line x1="0" y1="35" x2="280" y2="35" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
                    <path d="M0,35 C4,26 8,44 12,35 C16,26 20,44 24,35 C28,26 32,44 36,35 C40,26 44,44 48,35 C52,26 56,44 60,35 C64,26 68,44 72,35 C76,26 80,44 84,35 C88,26 92,44 96,35 C100,26 104,44 108,35 C112,26 116,44 120,35 C124,26 128,44 132,35 C136,26 140,44 144,35 C148,26 152,44 156,35 C160,26 164,44 168,35 C172,26 176,44 180,35 C184,26 188,44 192,35 C196,26 200,44 204,35 C208,26 212,44 216,35 C220,26 224,44 228,35 C232,26 236,44 240,35 C244,26 248,44 252,35 C256,26 260,44 264,35 C268,26 272,44 276,35 C278,31 279,33 280,35"
                          stroke="#fbbf24" stroke-width="1.8" fill="none"/>
                </svg>
                <div style="font-size:0.72rem;color:var(--muted);margin-top:6px;text-align:center;
                            letter-spacing:0.04em;">~20 Hz — low amplitude, fast</div>
            </div>
            <div style="padding-top:4px;">
                <div style="font-size:0.83rem;font-weight:600;color:var(--text);margin-bottom:10px;">Key features</div>
                <div style="display:flex;flex-direction:column;gap:8px;">
                    ${[
                        ['Amplitude', 'Low — typically 5–30 µV'],
                        ['Normal context', 'Active wakefulness, cognitive processing, motor preparation'],
                        ['In anaesthesia', 'Beta "activation" paradoxically seen at sub-anaesthetic doses of propofol and during benzodiazepine sedation'],
                        ['Clinical note', 'Persistent beta at surgical depth may indicate insufficient depth; also prominent with ketamine'],
                    ].map(([label, val]) => `
                    <div style="display:flex;gap:10px;font-size:0.82rem;">
                        <span style="color:var(--muted);min-width:90px;flex-shrink:0;">${label}</span>
                        <span style="color:#c0cfe0;line-height:1.5;">${val}</span>
                    </div>`).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- ── GAMMA ───────────────────────────────────────────────────────────── -->
    <div class="content-block">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start;">
            <div>
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
                    <div style="background:rgba(248,113,113,0.15);border:1px solid rgba(248,113,113,0.35);
                                border-radius:8px;padding:6px 14px;font-size:0.78rem;font-weight:700;
                                letter-spacing:0.08em;text-transform:uppercase;color:#f87171;">
                        Gamma
                    </div>
                    <div style="font-size:0.82rem;color:var(--muted);">&gt; 30 Hz</div>
                </div>
                <svg viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg"
                     style="width:100%;height:70px;background:rgba(0,0,0,0.15);
                            border:1px solid var(--border);border-radius:8px;display:block;">
                    <line x1="0" y1="35" x2="280" y2="35" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
                    <path d="M0,35 C2,29 4,41 6,35 C8,29 10,41 12,35 C14,29 16,41 18,35 C20,29 22,41 24,35 C26,29 28,41 30,35 C32,29 34,41 36,35 C38,29 40,41 42,35 C44,29 46,41 48,35 C50,29 52,41 54,35 C56,29 58,41 60,35 C62,29 64,41 66,35 C68,29 70,41 72,35 C74,29 76,41 78,35 C80,29 82,41 84,35 C86,29 88,41 90,35 C92,29 94,41 96,35 C98,29 100,41 102,35 C104,29 106,41 108,35 C110,29 112,41 114,35 C116,29 118,41 120,35 C122,29 124,41 126,35 C128,29 130,41 132,35 C134,29 136,41 138,35 C140,29 142,41 144,35 C146,29 148,41 150,35 C152,29 154,41 156,35 C158,29 160,41 162,35 C164,29 166,41 168,35 C170,29 172,41 174,35 C176,29 178,41 180,35 C182,29 184,41 186,35 C188,29 190,41 192,35 C194,29 196,41 198,35 C200,29 202,41 204,35 C206,29 208,41 210,35 C212,29 214,41 216,35 C218,29 220,41 222,35 C224,29 226,41 228,35 C230,29 232,41 234,35 C236,29 238,41 240,35 C242,29 244,41 246,35 C248,29 250,41 252,35 C254,29 256,41 258,35 C260,29 262,41 264,35 C266,29 268,41 270,35 C272,29 274,41 276,35 C278,32 280,35 280,35"
                          stroke="#f87171" stroke-width="1.5" fill="none"/>
                </svg>
                <div style="font-size:0.72rem;color:var(--muted);margin-top:6px;text-align:center;
                            letter-spacing:0.04em;">~40 Hz — very low amplitude, very fast</div>
            </div>
            <div style="padding-top:4px;">
                <div style="font-size:0.83rem;font-weight:600;color:var(--text);margin-bottom:10px;">Key features</div>
                <div style="display:flex;flex-direction:column;gap:8px;">
                    ${[
                        ['Amplitude', 'Very low — typically < 10 µV; often indistinguishable from EMG'],
                        ['Normal context', 'High-level sensory binding, conscious perception, cross-regional synchrony'],
                        ['In anaesthesia', 'Largely suppressed under general anaesthesia; its disappearance may be mechanistically linked to loss of consciousness'],
                        ['Clinical note', 'Gamma is rarely used as a standalone clinical marker — too easily contaminated by EMG artefact at scalp level'],
                    ].map(([label, val]) => `
                    <div style="display:flex;gap:10px;font-size:0.82rem;">
                        <span style="color:var(--muted);min-width:90px;flex-shrink:0;">${label}</span>
                        <span style="color:#c0cfe0;line-height:1.5;">${val}</span>
                    </div>`).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- ── ÖZET TABLO ──────────────────────────────────────────────────────── -->
    <div class="content-block">
        <h3 class="content-heading">Summary Reference Table</h3>
        <p class="content-text">
            The table below summarises all five bands with their anaesthesia-specific significance. 
            Use this as a quick reference — the clinical patterns described here will recur 
            throughout the remaining modules.
        </p>

        <div style="overflow-x:auto;margin-top:8px;">
            <table style="width:100%;border-collapse:collapse;font-size:0.83rem;">
                <thead>
                    <tr style="border-bottom:1px solid var(--border);">
                        ${['Band','Range','Amplitude','Awake state','Under anaesthesia'].map(h =>
                            `<th style="padding:10px 14px;text-align:left;font-size:0.72rem;
                                        font-weight:700;letter-spacing:0.08em;text-transform:uppercase;
                                        color:var(--muted);">${h}</th>`
                        ).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${[
                        ['δ Delta','0.5–4 Hz','High (75–200 µV)','Deep sleep, infants','Dominant at surgical depth; excessive → burst suppression risk','#818cf8'],
                        ['θ Theta','4–8 Hz','Moderate (20–100 µV)','Drowsiness, light sleep','Sedation, early induction; decreases with deeper anaesthesia','#60a5fa'],
                        ['α Alpha','8–13 Hz','Medium (20–60 µV)','Relaxed, eyes closed','Frontal alpha = hallmark of propofol depth; dropout = light anaesthesia','#00c6a7'],
                        ['β Beta','13–30 Hz','Low (5–30 µV)','Alert, active','Sub-anaesthetic doses; ketamine; benzodiazepines','#fbbf24'],
                        ['γ Gamma','> 30 Hz','Very low (< 10 µV)','Conscious perception','Suppressed under GA; EMG contamination limits utility','#f87171'],
                    ].map(([band, range, amp, awake, anaes, color], i) => `
                    <tr style="border-bottom:1px solid rgba(255,255,255,0.04);
                               background:${i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'};">
                        <td style="padding:12px 14px;font-weight:700;color:${color};">${band}</td>
                        <td style="padding:12px 14px;color:var(--muted);">${range}</td>
                        <td style="padding:12px 14px;color:var(--muted);">${amp}</td>
                        <td style="padding:12px 14px;color:#b0c4d8;">${awake}</td>
                        <td style="padding:12px 14px;color:#b0c4d8;">${anaes}</td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>
    </div>

    <div class="callout-box">
        <div class="callout-icon">💡</div>
        <div class="callout-text">
            In clinical practice, you will rarely see a "pure" single-band EEG. 
            The raw signal is always a mixture — the skill lies in identifying the 
            <strong>dominant band and its topographic distribution</strong>. 
            A frontally dominant alpha-delta mixture in a patient receiving propofol 
            is reassuring; the same patient showing only delta with suppression intervals 
            requires dose reduction.
        </div>
    </div>
    `,
};
