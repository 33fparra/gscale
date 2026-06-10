// RIASEC Vocational Test — App Logic
// 3 questions per step · unanswered = 0 · beforeunload protection · canvas PNG download

const SCORES = { "Po": 2, "Ndoshta": 1, "Jo": 0 };
const QUESTIONS_PER_STEP = 3;

const CAT_COLORS = {
    R: '#fb7185', I: '#38bdf8', A: '#c084fc',
    S: '#2dd4bf', E: '#fbbf24', C: '#60a5fa'
};

const CATEGORY_NAMES = {
    al: { R: "Realistike", I: "Hulumtuese", A: "Artistike", S: "Sociale", E: "Ekzekutive", C: "Konvencionale" },
    en: { R: "Realistic",  I: "Investigative", A: "Artistic", S: "Social", E: "Enterprising", C: "Conventional" },
    es: { R: "Realista",   I: "Investigador",  A: "Artístico", S: "Social", E: "Emprendedor", C: "Convencional" }
};

const CATEGORY_DESCRIPTIONS = {
    al: {
        R: "Ju pëlqen puna praktike, me duar, mjete dhe makineri. Jeni të aftë për të zgjidhur probleme teknike.",
        I: "Ju pëlqen të hulumtoni, analizoni dhe kuptoni se si funksionon bota përreth jush.",
        A: "Ju keni imagjinatë të pasur dhe pëlqeni të shprehni veten përmes artit, dizajnit ose krijimtarisë.",
        S: "Ju pëlqen të ndihmoni të tjerët, të punoni në grup dhe të kujdeseni për njerëzit.",
        E: "Ju pëlqen të udhëheqni, të negocioni dhe të merrni iniciativën në situata të ndryshme.",
        C: "Ju pëlqen organizimi, saktësia dhe puna me të dhëna dhe dokumente."
    },
    en: {
        R: "You enjoy hands-on work with tools, machines, and practical problem-solving.",
        I: "You enjoy researching, analyzing, and understanding how the world works.",
        A: "You have a rich imagination and enjoy expressing yourself through art, design, or creativity.",
        S: "You enjoy helping others, working in groups, and caring for people.",
        E: "You enjoy leading, negotiating, and taking initiative in various situations.",
        C: "You enjoy organization, precision, and working with data and documents."
    },
    es: {
        R: "Disfrutas del trabajo práctico con herramientas, máquinas y resolución de problemas técnicos.",
        I: "Disfrutas investigar, analizar y comprender cómo funciona el mundo.",
        A: "Tienes una rica imaginación y disfrutas expresarte a través del arte, diseño o creatividad.",
        S: "Disfrutas ayudar a otros, trabajar en grupo y cuidar de las personas.",
        E: "Disfrutas liderar, negociar e tomar la iniciativa en diversas situaciones.",
        C: "Disfrutas la organización, la precisión y trabajar con datos y documentos."
    }
};

const ANSWERS = {
    al: { Po: "Po", Ndoshta: "Ndoshta", Jo: "Jo" },
    en: { Po: "Yes",  Ndoshta: "Maybe",  Jo: "No" },
    es: { Po: "Sí",   Ndoshta: "A veces", Jo: "No" }
};

let selectedQuestions = [];
let userAnswers     = {};
let currentStep     = 0;
let totalSteps      = 0;
let lastSummary     = [];
let testStarted     = false;
let testFinished    = false;
let lang            = 'al';

// ─── Prevent accidental navigation while test is in progress ──────────────
window.addEventListener('beforeunload', function(e) {
    if (testStarted && !testFinished) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// ─── Language helper ──────────────────────────────────────────────────────
function getLang() {
    const saved = localStorage.getItem('gscale_idioma');
    if (saved && ['al', 'en', 'es'].includes(saved)) return saved;
    const doc = document.documentElement.lang;
    if (doc && ['al', 'en', 'es'].includes(doc)) return doc;
    return 'al';
}

// ─── Init ─────────────────────────────────────────────────────────────────
async function initTest() {
    lang = getLang();
    const loading     = document.getElementById('loading');
    const testContent = document.getElementById('test-content');

    if (loading)     loading.style.display = 'flex';
    if (testContent) testContent.style.display = 'none';

    try {
        const response    = await fetch('/assets/data/questions.json');
        const allQuestions = await response.json();

        const categories = ['R', 'I', 'A', 'S', 'E', 'C'];
        selectedQuestions = [];
        categories.forEach(cat => {
            const catQs    = allQuestions.filter(q => q.category === cat);
            const shuffled = catQs.sort(() => 0.5 - Math.random());
            selectedQuestions.push(...shuffled.slice(0, 4));
        });
        selectedQuestions.sort(() => 0.5 - Math.random());

        currentStep  = 0;
        totalSteps   = Math.ceil(selectedQuestions.length / QUESTIONS_PER_STEP);
        userAnswers  = {};
        testStarted  = true;
        testFinished = false;

        if (loading)     loading.style.display = 'none';
        if (testContent) testContent.style.display = 'block';

        updateTestTexts();
        renderStep();
    } catch (e) {
        console.error('Error loading questions:', e);
        if (loading) loading.innerHTML = '<p style="color:#fb7185;">Gabim gjatë ngarkimit. Provoni përsëri.</p>';
    }
}

// ─── Text updates ─────────────────────────────────────────────────────────
function updateTestTexts() {
    lang = getLang();
    const t = translations[lang] || translations.al;
    const el = id => document.getElementById(id);

    const title = el('test-title');
    const desc  = el('test-description');
    const prev  = el('btn-prev');
    const next  = el('btn-next');
    const sub   = el('btn-submit');

    if (title) title.textContent = t.testTitle;
    if (desc)  desc.textContent  = t.testDescription;
    if (prev)  prev.textContent  = t.prev;
    if (next)  next.textContent  = t.next;
    if (sub)   sub.textContent   = t.submitTest;
}

// ─── Render current step (3 questions) ───────────────────────────────────
function renderStep() {
    if (!selectedQuestions.length) return;

    const startIdx = currentStep * QUESTIONS_PER_STEP;
    const stepQs   = selectedQuestions.slice(startIdx, startIdx + QUESTIONS_PER_STEP);
    const pct      = ((currentStep + 1) / totalSteps) * 100;

    const progBar  = document.getElementById('progress-bar');
    const progText = document.getElementById('progress-text');
    if (progBar)  progBar.style.width = pct + '%';
    if (progText) progText.textContent = `Hapi ${currentStep + 1} / ${totalSteps}`;

    const container = document.getElementById('question-card');
    if (!container) return;

    const answers = ANSWERS[lang];
    let html = '';

    stepQs.forEach((q, localIdx) => {
        const globalNum    = startIdx + localIdx + 1;
        const catLabel     = CATEGORY_NAMES[lang][q.category] || q.category;
        const isAnswered   = userAnswers[q.id] !== undefined;

        const selPo       = userAnswers[q.id] === 'Po'       ? 'selected selected-po'       : '';
        const selNdoshta  = userAnswers[q.id] === 'Ndoshta'  ? 'selected selected-ndoshta'  : '';
        const selJo       = userAnswers[q.id] === 'Jo'       ? 'selected selected-jo'        : '';

        html += `
        <div class="step-question ${isAnswered ? 'step-q-answered' : ''}" id="sq-${q.id}">
          <div class="step-q-header">
            <span class="question-category category-${q.category}">${catLabel}</span>
            <span class="step-q-num">${globalNum} / ${selectedQuestions.length}</span>
          </div>
          <p class="question-text">${q.text}</p>
          <div class="answer-options">
            <button class="answer-btn ${selPo}"       onclick="selectAnswer('${q.id}','Po')">${answers.Po}</button>
            <button class="answer-btn ${selNdoshta}"  onclick="selectAnswer('${q.id}','Ndoshta')">${answers.Ndoshta}</button>
            <button class="answer-btn ${selJo}"       onclick="selectAnswer('${q.id}','Jo')">${answers.Jo}</button>
          </div>
        </div>`;
    });

    container.innerHTML = html;
    updateNavButtons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Answer selection ─────────────────────────────────────────────────────
function selectAnswer(qId, answer) {
    userAnswers[qId] = answer;
    renderStep(); // fast re-render, 3 cards only
}

// ─── Nav button visibility ────────────────────────────────────────────────
function updateNavButtons() {
    const prev   = document.getElementById('btn-prev');
    const next   = document.getElementById('btn-next');
    const submit = document.getElementById('btn-submit');

    if (prev)   prev.style.display   = currentStep === 0 ? 'none' : 'block';
    const onLast = currentStep === totalSteps - 1;
    if (next)   next.style.display   = onLast ? 'none'  : 'block';
    if (submit) submit.style.display = onLast ? 'block' : 'none';
}

// ─── Navigation ───────────────────────────────────────────────────────────
function prevQuestion() {
    if (currentStep > 0) { currentStep--; renderStep(); }
}

function nextQuestion() {
    if (currentStep < totalSteps - 1) { currentStep++; renderStep(); }
}

// ─── Submit ───────────────────────────────────────────────────────────────
function submitTest() {
    lang = getLang();
    const unanswered = selectedQuestions.filter(q => userAnswers[q.id] === undefined).length;

    if (unanswered > 0) {
        const t = translations[lang] || translations.al;
        const notice = document.getElementById('submit-notice');
        if (notice) {
            notice.textContent = t.skippedNotice.replace('{n}', unanswered);
            notice.style.display = 'block';
        }
        // Short delay so the user sees the notice, then proceed
        setTimeout(() => {
            if (notice) notice.style.display = 'none';
            testFinished = true;
            calculateResults();
        }, 1800);
        return;
    }

    testFinished = true;
    calculateResults();
}

// ─── Calculate ────────────────────────────────────────────────────────────
function calculateResults() {
    let scores = { R: {i:0,a:0}, I: {i:0,a:0}, A: {i:0,a:0}, S: {i:0,a:0}, E: {i:0,a:0}, C: {i:0,a:0} };

    selectedQuestions.forEach(q => {
        const answer = userAnswers[q.id];
        const pts    = SCORES[answer] || 0;  // undefined (unanswered) → 0
        const slot   = q.type === 'interest' ? 'i' : 'a';
        scores[q.category][slot] += pts;
    });

    lastSummary = Object.keys(scores).map(cat => ({
        category: cat,
        combined: scores[cat].i + scores[cat].a
    })).sort((a, b) => b.combined - a.combined);

    displayResults(lastSummary[0], lastSummary[1]);
}

// ─── Display results ──────────────────────────────────────────────────────
function displayResults(primary, secondary) {
    lang = getLang();
    const t       = translations[lang] || translations.al;
    const names   = CATEGORY_NAMES[lang];
    const descs   = CATEGORY_DESCRIPTIONS[lang];

    document.getElementById('test-section').style.display    = 'none';
    document.getElementById('results-section').style.display = 'block';

    document.getElementById('results-title').textContent    = t.resultsTitle;
    document.getElementById('results-subtitle').textContent = t.resultsSubtitle;

    document.getElementById('primary-label').textContent    = t.primaryProfile;
    document.getElementById('primary-name').textContent     = names[primary.category];
    document.getElementById('primary-description').textContent = descs[primary.category];

    document.getElementById('secondary-label').textContent  = t.secondaryProfile;
    document.getElementById('secondary-name').textContent   = names[secondary.category];
    document.getElementById('secondary-description').textContent = descs[secondary.category];

    // Score bars
    const maxScore = 12;
    let barsHtml = '';
    lastSummary.forEach(item => {
        const pct = (item.combined / maxScore) * 100;
        barsHtml += `
        <div class="score-bar-item">
          <div class="score-bar-label">
            <span class="score-bar-name" style="color:var(--cat-${item.category}-color)">${names[item.category]}</span>
            <span class="score-bar-value">${item.combined} / ${maxScore}</span>
          </div>
          <div class="score-bar-track">
            <div class="score-bar-fill fill-${item.category}" style="width:${pct}%"></div>
          </div>
        </div>`;
    });
    document.getElementById('score-bars').innerHTML = barsHtml;

    renderRadarChart(lastSummary);

    document.getElementById('download-btn').textContent = t.downloadImage;
    document.getElementById('restart-btn').textContent  = t.restartTest;

    // Capture card
    document.getElementById('capture-primary').textContent = names[primary.category];
    const catLabel = document.getElementById('primary-label');
    if (catLabel) catLabel.textContent = t.primaryProfile;

    let captureHtml = '';
    lastSummary.forEach(item => {
        captureHtml += `
        <div class="capture-score-item" style="border:1px solid var(--cat-${item.category}-color)">
          <div class="cat" style="color:var(--cat-${item.category}-color)">${names[item.category]}</div>
          <div class="score">${item.combined} / 12</div>
        </div>`;
    });
    document.getElementById('capture-scores').innerHTML = captureHtml;
}

// ─── Radar chart ──────────────────────────────────────────────────────────
function drawRadarToCtx(ctx, summary, cx, cy, radius) {
    const cats   = summary.map(s => s.category);
    const vals   = summary.map(s => s.combined);
    const maxVal = 12;
    const n      = cats.length;
    const angle  = i => (Math.PI * 2 / n) * i - Math.PI / 2;

    // Grid rings
    for (let ring = 1; ring <= 4; ring++) {
        const r = (radius / 4) * ring;
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
            const a = angle(i % n);
            const x = cx + r * Math.cos(a);
            const y = cy + r * Math.sin(a);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(42,48,66,0.9)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Spokes
    for (let i = 0; i < n; i++) {
        const a = angle(i);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + radius * Math.cos(a), cy + radius * Math.sin(a));
        ctx.strokeStyle = 'rgba(42,48,66,0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Filled polygon
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
        const idx = i % n;
        const a   = angle(idx);
        const r   = (vals[idx] / maxVal) * radius;
        const x   = cx + r * Math.cos(a);
        const y   = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle   = 'rgba(249,115,22,0.12)';
    ctx.fill();
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth   = 2;
    ctx.stroke();

    // Dots + labels
    for (let i = 0; i < n; i++) {
        const a     = angle(i);
        const dotX  = cx + radius * Math.cos(a);
        const dotY  = cy + radius * Math.sin(a);
        const color = CAT_COLORS[cats[i]];

        ctx.beginPath();
        ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        const labelR = radius + 26;
        const lx = cx + labelR * Math.cos(a);
        const ly = cy + labelR * Math.sin(a);

        ctx.fillStyle    = color;
        ctx.font         = 'bold 13px Segoe UI, Arial, sans-serif';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cats[i], lx, ly);
    }
}

function renderRadarChart(summary) {
    const canvas = document.getElementById('radar-canvas');
    if (!canvas) return;
    const ctx  = canvas.getContext('2d');
    const size = 400;
    canvas.width  = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);
    drawRadarToCtx(ctx, summary, size / 2, size / 2, 140);
}

// ─── PNG Download — pure canvas, no html2canvas dependency ───────────────
function downloadResultsAsPNG() {
    if (!lastSummary.length) return;

    const W = 720, H = 760;
    const cv = document.createElement('canvas');
    cv.width  = W * 2;  // retina @2x
    cv.height = H * 2;
    const ctx = cv.getContext('2d');
    ctx.scale(2, 2);

    const lang2 = getLang();
    const names  = CATEGORY_NAMES[lang2];
    const t      = translations[lang2] || translations.al;

    // ── Background
    ctx.fillStyle = '#1e212a';
    ctx.fillRect(0, 0, W, H);

    // ── Border
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth   = 2;
    rrect(ctx, 10, 10, W - 20, H - 20, 16);
    ctx.stroke();

    // ── Header
    ctx.fillStyle    = '#f97316';
    ctx.font         = 'bold 26px Arial, sans-serif';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('ScaleGrades', W / 2, 62);

    ctx.fillStyle = '#9ca3af';
    ctx.font      = '13px Arial, sans-serif';
    ctx.fillText('scalegrades.com  ·  ' + t.testTitle, W / 2, 84);

    // ── Separator
    ctx.fillStyle = '#333b4e';
    ctx.fillRect(40, 100, W - 80, 1);

    // ── Radar chart
    const radarY = 240;
    ctx.save();
    drawRadarToCtx(ctx, lastSummary, W / 2, radarY, 110);
    ctx.restore();

    // ── Primary profile box
    const primary   = lastSummary[0];
    const secondary = lastSummary[1];
    const primColor = CAT_COLORS[primary.category];
    const secColor  = CAT_COLORS[secondary.category];

    ctx.fillStyle = '#2a3042';
    rrect(ctx, 40, 374, W - 80, 68, 12);
    ctx.fill();
    ctx.strokeStyle = primColor;
    ctx.lineWidth   = 1.5;
    rrect(ctx, 40, 374, W - 80, 68, 12);
    ctx.stroke();

    ctx.fillStyle    = '#6b7280';
    ctx.font         = '10px Arial, sans-serif';
    ctx.textAlign    = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText((t.primaryProfile || 'PROFILI KRYESOR').toUpperCase(), 60, 396);

    ctx.fillStyle = primColor;
    ctx.font      = 'bold 20px Arial, sans-serif';
    ctx.fillText(names[primary.category], 60, 420);

    ctx.fillStyle = '#9ca3af';
    ctx.font      = '11px Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${primary.combined} / 12`, W - 60, 420);

    // ── Secondary profile
    ctx.fillStyle = '#1e212a';
    rrect(ctx, 40, 454, W - 80, 50, 10);
    ctx.fill();
    ctx.strokeStyle = secColor;
    ctx.lineWidth   = 1;
    rrect(ctx, 40, 454, W - 80, 50, 10);
    ctx.stroke();

    ctx.fillStyle    = '#6b7280';
    ctx.font         = '10px Arial, sans-serif';
    ctx.textAlign    = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText((t.secondaryProfile || 'PROFILI DYTESOR').toUpperCase(), 60, 468);

    ctx.fillStyle = secColor;
    ctx.font      = 'bold 15px Arial, sans-serif';
    ctx.fillText(names[secondary.category], 60, 490);

    ctx.fillStyle = '#9ca3af';
    ctx.font      = '11px Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${secondary.combined} / 12`, W - 60, 490);

    // ── Score bars
    const barAreaTop = 520;
    const barH       = 8;
    const rowH       = 26;
    const barLeft    = 180;
    const barWidth   = W - barLeft - 80;

    lastSummary.forEach((item, idx) => {
        const y     = barAreaTop + idx * rowH;
        const color = CAT_COLORS[item.category];
        const pct   = Math.min(item.combined / 12, 1);

        ctx.fillStyle    = color;
        ctx.font         = '11px Arial, sans-serif';
        ctx.textAlign    = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(names[item.category], 40, y + barH / 2);

        // Track
        ctx.fillStyle = '#2a3042';
        rrect(ctx, barLeft, y, barWidth, barH, 4);
        ctx.fill();

        // Fill
        if (pct > 0) {
            ctx.fillStyle = color;
            rrect(ctx, barLeft, y, barWidth * pct, barH, 4);
            ctx.fill();
        }

        // Score
        ctx.fillStyle = '#9ca3af';
        ctx.font      = '10px Arial, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${item.combined}/12`, W - 40, y + barH / 2);
    });

    // ── Footer separator + text
    ctx.fillStyle = '#333b4e';
    ctx.fillRect(40, H - 46, W - 80, 1);

    ctx.fillStyle    = '#4b5563';
    ctx.font         = '11px Arial, sans-serif';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('scalegrades.com — Orientim Profesional RIASEC', W / 2, H - 26);

    // ── Download
    const link      = document.createElement('a');
    link.download   = 'ScaleGrades_RIASEC.png';
    link.href       = cv.toDataURL('image/png');
    link.click();
}

// Rounded rect helper (cross-browser safe)
function rrect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y,     x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x,     y + h, r);
    ctx.arcTo(x,     y + h, x,     y,     r);
    ctx.arcTo(x,     y,     x + w, y,     r);
    ctx.closePath();
}

// ─── Restart ──────────────────────────────────────────────────────────────
function restartTest() {
    testStarted  = false;
    testFinished = false;
    lastSummary  = [];
    currentStep  = 0;
    userAnswers  = {};
    selectedQuestions = [];

    document.getElementById('test-section').style.display    = 'block';
    document.getElementById('results-section').style.display = 'none';

    initTest();
}

// ─── Boot ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initTest);

// ─── Translations ─────────────────────────────────────────────────────────
const translations = {
    al: {
        testTitle:       "Testi Vocacional RIASEC",
        testDescription: "Zbuloni profilin tuaj profesional përmes 24 pyetjeve. Përgjigjuni me sinqeritet.",
        prev:            "Prapa",
        next:            "Para",
        submitTest:      "Përfundo Testin",
        resultsTitle:    "Rezultatet Tuaja",
        resultsSubtitle: "Profili juaj profesional RIASEC",
        primaryProfile:  "Profili Kryesor",
        secondaryProfile:"Profili Dytesor",
        downloadImage:   "Shkarko PNG",
        restartTest:     "Përsërit Testin",
        skippedNotice:   "{n} pyetje pa përgjigje — do të llogariten si 'Jo'"
    },
    en: {
        testTitle:       "RIASEC Vocational Test",
        testDescription: "Discover your professional profile through 24 questions. Answer honestly.",
        prev:            "Previous",
        next:            "Next",
        submitTest:      "Submit Test",
        resultsTitle:    "Your Results",
        resultsSubtitle: "Your RIASEC Professional Profile",
        primaryProfile:  "Primary Profile",
        secondaryProfile:"Secondary Profile",
        downloadImage:   "Download PNG",
        restartTest:     "Restart Test",
        skippedNotice:   "{n} unanswered questions — counted as 'No'"
    },
    es: {
        testTitle:       "Test Vocacional RIASEC",
        testDescription: "Descubre tu perfil profesional a través de 24 preguntas. Responde con honestidad.",
        prev:            "Anterior",
        next:            "Siguiente",
        submitTest:      "Enviar Test",
        resultsTitle:    "Tus Resultados",
        resultsSubtitle: "Tu Perfil Profesional RIASEC",
        primaryProfile:  "Perfil Principal",
        secondaryProfile:"Perfil Secundario",
        downloadImage:   "Descargar PNG",
        restartTest:     "Reiniciar Test",
        skippedNotice:   "{n} preguntas sin responder — se cuentan como 'No'"
    }
};
