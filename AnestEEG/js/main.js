document.getElementById('start-pretest-btn').addEventListener('click', function () {
    const nickname = document.getElementById('nickname').value.trim();
    const title    = document.getElementById('title').value;
    const exp      = document.getElementById('experience').value;
    const country  = document.getElementById('country').value.trim();
    const training = document.getElementById('eeg-training').value;

    if (!nickname || !title || !exp || !country || !training) {
        alert('Please fill in all fields before starting.');
        return;
    }

    localStorage.setItem('anestEEG_user', JSON.stringify({ nickname, title, exp, country, training }));
    window.location.href = 'pretest.html';
});