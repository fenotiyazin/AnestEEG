// ─── MODÜL REJİSTRİ ───────────────────────────────────────────────────────────
const moduleRegistry = [
    { id: 1,  title: 'What is EEG?',               subtitle: 'Signal, Hardware & Filters',              pages: 3 },
    { id: 2,  title: 'EEG in Anaesthesia',          subtitle: 'Why and When?',                           pages: 2 },
    { id: 3,  title: 'Frequency Bands',             subtitle: 'Basic EEG Patterns',                      pages: 1 },
    { id: 4,  title: 'Anaesthetic Depth & Raw EEG', subtitle: 'Reading the Raw Signal',                  pages: 3 },
    { id: 5,  title: 'Burst Suppression & Spikes',  subtitle: 'Recognition & Clinical Significance',     pages: 2 },
    { id: 6,  title: 'Drug Effects on EEG',         subtitle: 'Agent-Specific EEG Signatures',           pages: 3 },
    { id: 7,  title: 'Processed EEG & Spectral Analysis', subtitle: 'BIS, Power Spectrum & DSA',         pages: 3 },
    { id: 8,  title: 'Artefacts',                   subtitle: 'Recognition & Management',                pages: 2 },
    { id: 9,  title: 'Patient Variability',         subtitle: 'Age, Comorbidity & Nociception',          pages: 2 },
    { id: 10, title: 'Clinical Integration',        subtitle: 'Decision-Making & Case Scenarios',        pages: 3 },
];

// ─── STATE ────────────────────────────────────────────────────────────────────
let completedModules = JSON.parse(localStorage.getItem('anestEEG_completed') || '[]');
let activeModule     = null;
let activePage       = 1;

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    loadUserGreeting();
    buildSidebarNav();
    updateProgress();
});

// ─── USER GREETING ────────────────────────────────────────────────────────────
function loadUserGreeting() {
    const user = JSON.parse(localStorage.getItem('anestEEG_user') || '{}');
    if (user.nickname) {
        document.getElementById('user-greeting').textContent = '👤 ' + user.nickname;
    }
}

// ─── BUILD SIDEBAR NAV ────────────────────────────────────────────────────────
function buildSidebarNav() {
    const nav = document.getElementById('module-nav');
    nav.innerHTML = '';

    moduleRegistry.forEach(mod => {
        const isCompleted = completedModules.includes(mod.id);
        const item = document.createElement('div');
        item.className = 'module-nav-item' + (isCompleted ? ' completed' : '');
        item.id = `nav-item-${mod.id}`;
        item.onclick = () => loadModule(mod.id);
        item.innerHTML = `
            <div class="nav-num">${isCompleted ? '✓' : mod.id}</div>
            <div class="nav-label">${mod.title}</div>
        `;
        nav.appendChild(item);
    });
}

// ─── UPDATE PROGRESS ──────────────────────────────────────────────────────────
function updateProgress() {
    const count = completedModules.length;
    const pct   = (count / moduleRegistry.length) * 100;

    document.getElementById('sidebar-progress-fill').style.width = pct + '%';
    document.getElementById('sidebar-progress-text').textContent = `${count} / ${moduleRegistry.length} completed`;

    const postBtn = document.getElementById('posttest-btn');
    if (count === moduleRegistry.length) {
        postBtn.disabled = false;
    }
}

// ─── LOAD MODULE ──────────────────────────────────────────────────────────────
function loadModule(id) {
    activeModule = id;
    activePage   = 1;
    const mod = moduleRegistry.find(m => m.id === id);

    // Sidebar active state
    document.querySelectorAll('.module-nav-item').forEach(el => el.classList.remove('active'));
    const navItem = document.getElementById(`nav-item-${id}`);
    if (navItem) navItem.classList.add('active');

    // Topbar title
    document.getElementById('topbar-title').textContent = `Module ${id} — ${mod.title}`;

    // Hide welcome, show content
    document.getElementById('welcome-screen').style.display = 'none';
    const contentEl = document.getElementById('module-content');
    contentEl.style.display = 'block';

    // Render module shell
    contentEl.innerHTML = buildModuleShell(mod);

    // Scroll to top
    document.getElementById('content-area').scrollTop = 0;
    window.scrollTo(0, 0);

    // Simülatör callback
    if (id === 1 && typeof onModule1PageLoad === 'function') onModule1PageLoad(1);
    if (id === 3 && typeof onModule3PageLoad === 'function') onModule3PageLoad(1);
    if (id === 4 && typeof onModule4PageLoad === 'function') onModule4PageLoad(1);
    if (id === 5 && typeof onModule5PageLoad === 'function') onModule5PageLoad(1);
    if (id === 6 && typeof onModule6PageLoad === 'function') onModule6PageLoad(1);
}

// ─── BUILD MODULE SHELL ───────────────────────────────────────────────────────
function buildModuleShell(mod) {
    const pageTabs = Array.from({length: mod.pages}, (_, i) => {
        const label = `Page ${i + 1}`;
        return `<button class="page-tab ${i === 0 ? 'active' : ''}" 
                        id="tab-${i+1}" 
                        onclick="switchPage(${i+1}, ${mod.pages})">
                    ${label}
                </button>`;
    }).join('');

    const prevDisabled = mod.id === 1 ? 'disabled style="opacity:0.3;cursor:not-allowed"' : '';

    return `
    <div class="module-header">
        <div class="module-tag">Module ${mod.id}</div>
        <h2 class="module-title">${mod.title}</h2>
        <p class="module-subtitle">${mod.subtitle}</p>
    </div>

    ${mod.pages > 1 ? `<div class="page-tabs">${pageTabs}</div>` : ''}

    <div id="page-content">
        ${getPageContent(mod.id, 1)}
    </div>

    <div class="module-bottom-nav" id="module-bottom-nav">
        <button class="btn-module-nav" onclick="prevModule(${mod.id})" ${prevDisabled}>
            ← Module ${mod.id - 1}
        </button>
        ${buildNextButton(mod, 1)}
    </div>
    `;
}

// ─── BUILD NEXT BUTTON ────────────────────────────────────────────────────────
function buildNextButton(mod, pageNum) {
    const isLastPage = pageNum >= mod.pages;

    if (!isLastPage) {
        // Henüz son sayfa değil — sonraki sayfaya git
        return `<button class="btn-module-nav primary" onclick="switchPage(${pageNum + 1}, ${mod.pages})">
                    Page ${pageNum + 1} →
                </button>`;
    }

    // Son sayfadayız — modül geçişi
    if (mod.id === 10) {
        return `<button class="btn-module-nav primary" onclick="goToPosttest()">
                    Go to Post-Test →
                </button>`;
    }

    return `<button class="btn-module-nav primary" onclick="completeAndNext(${mod.id})">
                Module ${mod.id + 1}: ${moduleRegistry[mod.id].title} →
            </button>`;
}

// ─── SWITCH PAGE ──────────────────────────────────────────────────────────────
function switchPage(pageNum, totalPages) {
    activePage = pageNum;

    // Tab aktif durumu güncelle
    document.querySelectorAll('.page-tab').forEach((t, i) => {
        t.classList.toggle('active', i + 1 === pageNum);
    });

    // Sayfa içeriğini güncelle
    document.getElementById('page-content').innerHTML = getPageContent(activeModule, pageNum);

    // Bottom nav'ı güncelle
    const mod    = moduleRegistry.find(m => m.id === activeModule);
    const navEl  = document.getElementById('module-bottom-nav');
    if (navEl && mod) {
        const prevDisabled = mod.id === 1 ? 'disabled style="opacity:0.3;cursor:not-allowed"' : '';
        navEl.innerHTML = `
            <button class="btn-module-nav" onclick="prevModule(${mod.id})" ${prevDisabled}>
                ← Module ${mod.id - 1}
            </button>
            ${buildNextButton(mod, pageNum)}
        `;
    }

    window.scrollTo(0, 0);

    // Simülatör callback
    if (activeModule === 3 && typeof onModule3PageLoad === 'function') onModule3PageLoad(pageNum);
    if (activeModule === 4 && typeof onModule4PageLoad === 'function') onModule4PageLoad(pageNum);
    if (activeModule === 1 && typeof onModule1PageLoad === 'function') onModule1PageLoad(pageNum);
    if (activeModule === 5 && typeof onModule5PageLoad === 'function') onModule5PageLoad(pageNum);
    if (activeModule === 6 && typeof onModule6PageLoad === 'function') onModule6PageLoad(pageNum);
}

// ─── GET PAGE CONTENT ─────────────────────────────────────────────────────────
function getPageContent(moduleId, pageNum) {
    const contentMap = { 1: module1Content, 2: module2Content, 3: module3Content, 4: module4Content, 5: module5Content, 6: module6Content };
    const modContent = contentMap[moduleId];
    if (modContent && modContent[pageNum]) {
        return modContent[pageNum];
    }
    return `<div style="background:var(--surface2);border:1px dashed rgba(0,198,167,0.2);
                border-radius:12px;padding:48px;text-align:center;color:var(--muted);">
        <div style="font-size:2rem;margin-bottom:16px;">🚧</div>
        <div style="font-size:1rem;font-weight:500;color:var(--text);margin-bottom:8px;">
            Module ${moduleId} — Page ${pageNum}</div>
        <div style="font-size:0.85rem;">Content coming soon.</div>
    </div>`;
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function prevModule(currentId) {
    if (currentId > 1) loadModule(currentId - 1);
}

function completeAndNext(currentId) {
    if (!completedModules.includes(currentId)) {
        completedModules.push(currentId);
        localStorage.setItem('anestEEG_completed', JSON.stringify(completedModules));
    }
    buildSidebarNav();
    updateProgress();

    if (currentId < 10) {
        loadModule(currentId + 1);
    }
}

function goToPosttest() {
    window.location.href = 'posttest.html';
}

// ─── SIDEBAR TOGGLE ───────────────────────────────────────────────────────────
function toggleSidebar() {
    const sidebar     = document.getElementById('sidebar');
    const contentArea = document.getElementById('content-area');
    sidebar.classList.toggle('hidden');
    contentArea.classList.toggle('expanded');
}
