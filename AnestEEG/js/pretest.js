// ─── SORU BANKASI ────────────────────────────────────────────────────────────
const questions = [

    // ── METİN TABANLI SORULAR (1-5) ──────────────────────────────────────────

    {
        type: 'text',
        question: 'Which of the following best describes the primary source of the EEG signal?',
        options: [
            'Action potentials from cortical pyramidal neurons',
            'Summated postsynaptic potentials from cortical pyramidal neurons',
            'Electrical activity from subcortical nuclei',
            'Myelinated axon conduction potentials'
        ],
        correct: 1
    },
    {
        type: 'text',
        question: 'A patient under general anaesthesia shows a burst suppression pattern on raw EEG. Which of the following is the most appropriate interpretation?',
        options: [
            'The patient is at risk of awareness',
            'Anaesthesia depth is excessive',
            'The EEG signal is artefact-contaminated',
            'This is a normal finding during surgical stimulation'
        ],
        correct: 1
    },
    {
        type: 'text',
        question: 'Which anaesthetic agent is most likely to produce a paradoxical increase in the BIS index despite adequate anaesthetic depth?',
        options: [
            'Propofol',
            'Sevoflurane',
            'Ketamine',
            'Midazolam'
        ],
        correct: 2
    },
    {
        type: 'text',
        question: 'In the context of EEG monitoring, what does the Burst Suppression Ratio (BSR) quantify?',
        options: [
            'The ratio of high-frequency to low-frequency power in the EEG',
            'The percentage of time the EEG shows isoelectric (suppressed) activity',
            'The amplitude difference between burst and baseline EEG',
            'The number of bursts per minute in the EEG tracing'
        ],
        correct: 1
    },
    {
        type: 'text',
        question: 'Which of the following EEG frequency bands is characteristically dominant in the frontal regions during adequate propofol-based general anaesthesia?',
        options: [
            'Delta (0.5–4 Hz)',
            'Theta (4–8 Hz)',
            'Alpha (8–13 Hz)',
            'Beta (13–30 Hz)'
        ],
        correct: 2
    },

    // ── GÖRSEL TABANLI SORULAR (6-10) ────────────────────────────────────────

    {
        type: 'visual',
        image: 'assets/eeg_q6.png',
        imageLabel: 'EEG Tracing — Question 6',
        question: 'Examine the EEG tracing above. Which pattern does this most likely represent?',
        options: [
            'Normal awake EEG with alpha activity',
            'Burst suppression pattern',
            'High-frequency EMG artefact',
            'Frontal alpha-delta pattern during propofol anaesthesia'
        ],
        correct: 1
    },
    {
        type: 'visual',
        image: 'assets/eeg_q7.png',
        imageLabel: 'EEG Tracing — Question 7',
        question: 'The EEG shown above was recorded during intraoperative monitoring. What is the most likely cause of this appearance?',
        options: [
            'Electrode impedance is too high',
            'Correct filter settings applied, normal signal',
            'Notch filter is turned off — 50 Hz power line interference',
            'Patient movement artefact'
        ],
        correct: 2
    },
    {
        type: 'visual',
        image: 'assets/eeg_q8.png',
        imageLabel: 'EEG Tracing — Question 8',
        question: 'Looking at this intraoperative EEG tracing, which anaesthetic phase does it most likely correspond to?',
        options: [
            'Pre-induction (awake baseline)',
            'Induction — loss of consciousness',
            'Adequate maintenance — surgical depth',
            'Emergence — return of consciousness'
        ],
        correct: 2
    },
    {
        type: 'visual',
        image: 'assets/eeg_q9.png',
        imageLabel: 'EEG Tracing — Question 9',
        question: 'This EEG segment shows a sudden change in pattern. What is the most clinically relevant interpretation?',
        options: [
            'Alpha drop-out — possible response to nociceptive stimulus',
            'Electrode displacement — technical artefact',
            'Transition from NREM to REM sleep',
            'Onset of seizure activity'
        ],
        correct: 0
    },
    {
        type: 'visual',
        image: 'assets/eeg_q10.png',
        imageLabel: 'EEG Tracing — Question 10',
        question: 'This Density Spectral Array (DSA) image is from a patient under sevoflurane anaesthesia. Which finding is most concerning?',
        options: [
            'Gradual shift toward high-frequency power — patient is too light',
            'Persistent suppression band — excessive anaesthetic depth',
            'Symmetric bilateral activity — this is expected',
            'Absence of delta band — normal for sevoflurane'
        ],
        correct: 1
    }
];

// ─── STATE ────────────────────────────────────────────────────────────────────
let currentIndex = 0;
const userAnswers = new Array(questions.length).fill(null);

// ─── RENDER ───────────────────────────────────────────────────────────────────
function renderQuestion(index) {
    const q = questions[index];
    const card = document.getElementById('question-card');
    const letters = ['A', 'B', 'C', 'D'];

    const badgeClass  = q.type === 'text' ? 'badge-text' : 'badge-visual';
    const badgeLabel  = q.type === 'text' ? 'Text-based' : 'Visual Recognition';

    let imageHTML = '';
    if (q.type === 'visual') {
        imageHTML = `
        <div class="eeg-placeholder">
            <img src="${q.image}"
                 alt="${q.imageLabel}"
                 style="max-width:100%; max-height:170px; border-radius:8px; object-fit:contain;"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
                <span class="eeg-icon">〰️</span>
                <p>${q.imageLabel}</p>
                <p style="font-size:0.72rem; opacity:0.5;">(Image will be added)</p>
            </div>
        </div>`;
    }

    const optionsHTML = q.options.map((opt, i) => {
        const selected = userAnswers[index] === i ? 'selected' : '';
        return `
        <button class="option-btn ${selected}" onclick="selectAnswer(${i})">
            <span class="option-letter">${letters[i]}</span>
            <span>${opt}</span>
        </button>`;
    }).join('');

    card.innerHTML = `
        <span class="question-type-badge ${badgeClass}">${badgeLabel}</span>
        <div class="question-number">Question ${index + 1} of ${questions.length}</div>
        <div class="question-text">${q.question}</div>
        ${imageHTML}
        <div class="options-list">${optionsHTML}</div>
    `;

    // Progress bar
    const fill = ((index + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = fill + '%';
    document.getElementById('q-current').textContent = index + 1;

    // Prev button
    document.getElementById('prev-btn').disabled = index === 0;

    // Next / Finish button
    const nextBtn = document.getElementById('next-btn');
    if (index === questions.length - 1) {
        nextBtn.textContent = 'Finish & Start Learning →';
        nextBtn.classList.add('btn-finish');
    } else {
        nextBtn.textContent = 'Next →';
        nextBtn.classList.remove('btn-finish');
    }

    // Fade animation
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = 'fadeUp 0.35s ease both';
}

// ─── SELECT ANSWER ────────────────────────────────────────────────────────────
function selectAnswer(optionIndex) {
    userAnswers[currentIndex] = optionIndex;
    renderQuestion(currentIndex);
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
function nextQuestion() {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion(currentIndex);
    } else {
        finishPretest();
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion(currentIndex);
    }
}

// ─── FINISH ───────────────────────────────────────────────────────────────────
function finishPretest() {
    // Skoru kaydet ama gösterme
    const score = userAnswers.reduce((acc, ans, i) => {
        return acc + (ans === questions[i].correct ? 1 : 0);
    }, 0);

    // localStorage'a kaydet (ileride backend entegrasyonunda kullanılacak)
    localStorage.setItem('anestEEG_pretest_score', score);
    localStorage.setItem('anestEEG_pretest_answers', JSON.stringify(userAnswers));
    localStorage.setItem('anestEEG_pretest_done', 'true');

    // Direkt modüllere geç
    window.location.href = 'modules.html';
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
renderQuestion(0);
