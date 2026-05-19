// Funciones de traducción para Alumnos
function getTranslation(key) {
    const traducciones = {
        al: {
            notaMaxima: "Nota maksimale",
            notaMinima: "Nota minimale",
            titleAlumno: "Llogarit mesataren time",
            notaEximirse: "Nota për lirim",
            notaEximirsePlaceholder: "Nota për lirim nga provimi",
            notaAprobar: "Nota për kaluar",
            notaAprobarPlaceholder: "Nota për të kaluar",
            nombreSeccion: "Emri i seksionit",
            nombreSeccionPlaceholder: "Lëndë, Temë, etj...",
            ponderaSeccion: "Ponderon seksionin",
            ponderaNota: "Ponderon notën",
            agregarNota: "Shto notë",
            agregarSeccion: "Shto seksion",
            calcularNotaFinal: "Llogarit notën përfundimtare",
            promedioSeccion: "Mesatarja e seksionit:",
            resultado: "Nota përfundimtare e llogaritur:",
            eximirseMsg: "Po liroheni nga lënda.",
            noEximirseMsg: "Nuk po liroheni nga lënda.",
            sinSecciones: " ende nuk keni shtuar të gjitha seksionet tuaja.",
            ponderacionesError: "Shuma e ponderimeve të seksioneve nuk është 100%.",
            minimoUnaNota: " Duhet të ketë të paku një notë në seksion.",
            minimoUnaSeccion: " Duhet të keni të paku një seksion."
        },
        en: {
            notaMaxima: "Maximum grade",
            notaMinima: "Minimum grade",
            titleAlumno: "Calculate my average",
            notaEximirse: "Grade to exempt",
            notaEximirsePlaceholder: "Grade to exempt from exam",
            notaAprobar: "Grade to pass",
            notaAprobarPlaceholder: "Grade to pass",
            nombreSeccion: "Section name",
            nombreSeccionPlaceholder: "Subject, Topic, etc...",
            ponderaSeccion: "Section weight",
            ponderaNota: "Grade weight",
            agregarNota: "Add grade",
            agregarSeccion: "Add section",
            calcularNotaFinal: "Calculate Final Grade",
            promedioSeccion: "Section average:",
            resultado: "Calculated final grade:",
            eximirseMsg: "You are being exempted from the course.",
            noEximirseMsg: "You are not being exempted from the course.",
            sinSecciones: "You haven't added all your sections yet.",
            ponderacionesError: "The sum of section weights is not 100%.",
            minimoUnaNota: "There must be at least one note in the section.",
            minimoUnaSeccion: "You must have at least one section."
        },
        es: {
            notaMaxima: "Nota máxima",
            notaMinima: "Nota mínima",
            titleAlumno: "Calcula mi promedio",
            notaEximirse: "Nota eximirse",
            notaEximirsePlaceholder: "Nota para eximir examen",
            notaAprobar: "Nota aprobar",
            notaAprobarPlaceholder: "Nota para aprobar",
            nombreSeccion: "Nombre de sección",
            nombreSeccionPlaceholder: "Taller, Cátedra, etc...",
            ponderaSeccion: "Pondera la sección",
            ponderaNota: "Pondera la nota",
            agregarNota: "Agregar nota",
            agregarSeccion: "Agregar sección",
            calcularNotaFinal: "Calcular Nota Final",
            promedioSeccion: "Promedio de la sección:",
            resultado: "Nota final calculada:",
            eximirseMsg: "Te estás eximiendo de la asignatura.",
            noEximirseMsg: "No te estás eximiendo de la asignatura.",
            sinSecciones: "Aún no agregas todas tus secciones.",
            ponderacionesError: "La suma de las ponderaciones de las secciones no es 100%.",
            minimoUnaNota: "Debe haber al menos una nota en la sección.",
            minimoUnaSeccion: "Debes tener al menos una sección."
        }
    };
    
    // Obtener idioma - priorizar localStorage
    let lang = 'es';
    
    // Primero buscar en localStorage
    const savedLang = localStorage.getItem('gscale_idioma');
    if (savedLang && ['al', 'en', 'es'].includes(savedLang)) {
        lang = savedLang;
    } else {
        // Si no hay localStorage, usar el lang del documento
        const docLang = document.documentElement.lang;
        if (docLang && ['al', 'en', 'es'].includes(docLang)) {
            lang = docLang;
        }
    }
    
    const t = traducciones[lang] || traducciones.es;
    return t[key] || traducciones.es[key] || key;
}

// Función para actualizar textos de la página Alumnos
function actualizarTextosAlumnos() {
    // Título
    const titulo = document.querySelector('h2');
    if (titulo && titulo.textContent.includes('promedio')) {
        titulo.textContent = getTranslation('titleAlumno');
    }
    
    // Labels
    const labels = {
        'notaMaxima': getTranslation('notaMaxima'),
        'notaMinima': getTranslation('notaMinima'),
        'notaEximir': getTranslation('notaEximirse'),
        'notaAprobar': getTranslation('notaAprobar')
    };
    
    Object.keys(labels).forEach(id => {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) label.textContent = labels[id] + ':';
    });
    
    // Placeholders de inputs principales
    const notaEximirInput = document.getElementById('notaEximir');
    if (notaEximirInput) notaEximirInput.placeholder = getTranslation('notaEximirsePlaceholder');
    
    const notaAprobarInput = document.getElementById('notaAprobar');
    if (notaAprobarInput) notaAprobarInput.placeholder = getTranslation('notaAprobarPlaceholder');
    
    // Botones
    document.querySelectorAll('.add-note-btn').forEach(btn => {
        btn.textContent = getTranslation('agregarNota');
    });
    
    document.querySelectorAll('.add-section-btn').forEach(btn => {
        btn.textContent = getTranslation('agregarSeccion');
    });
    
    document.querySelectorAll('.calculate-grade-btn').forEach(btn => {
        btn.textContent = getTranslation('calcularNotaFinal');
    });
    
    // Labels de sección
    document.querySelectorAll('.section-name').forEach(input => {
        input.placeholder = getTranslation('nombreSeccionPlaceholder');
    });
    
    // Mensajes iniciales
    const resultDiv = document.getElementById('result');
    if (resultDiv) resultDiv.textContent = getTranslation('sinSecciones');
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarTextosAlumnos();
    
    document.getElementById("result").textContent = getTranslation('sinSecciones');
    document.getElementById("eximirse").textContent = "";
    addInputEventListeners(document.getElementById("section1"));
    calculateFinalGrade();

    document.querySelectorAll(".add-note-btn").forEach((button) => {
        button.addEventListener("click", () => addNote(button));
    });

    document.querySelectorAll(".add-section-btn").forEach((button) => {
        button.addEventListener("click", addSection);
    });

    document.querySelectorAll(".calculate-grade-btn").forEach((button) => {
        button.addEventListener("click", calculateFinalGrade);
    });

    document.querySelectorAll(".delete-note-btn").forEach((button) => {
        button.addEventListener("click", deleteLastNote);
    });

    document.querySelectorAll(".delete-section-btn").forEach((button) => {
        button.addEventListener("click", deleteLastSection);
    });
});

function addNoteEventHandler(parent) {
    parent.querySelectorAll(".note, .note-weight").forEach((input) => {
        input.addEventListener("input", calculateSectionAverage);
    });
}

function calculateSectionAverage(event) {
    const section = event.target.closest(".section");
    calculateSectionGrade(section);
}

function addNote(button) {
    const notesContainer = button.parentNode.parentNode;
    const newNote = document.createElement("div");
    newNote.className = "flex gap-4 notes";
    newNote.innerHTML = `
    <div class="w-full flex">
        <div class="flex w-full pr-1 items-center">
            <label class="text-xs block text-gray-500 font-bold mb-1 md:mb-0 w-1/2">
                ${getTranslation('notaAprobar')}:
            </label>
            <input type="number" placeholder="${getTranslation('notaAprobarPlaceholder')}"
                class="note w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
        </div>
    </div>
    <div class="w-full flex">
        <div class="flex w-full pr-1 items-center">
            <label class="text-xs block text-gray-500 font-bold mb-1 md:mb-0 w-1/2">
                ${getTranslation('ponderaNota')}:
            </label>
            <input type="number" placeholder="%"
                class="note-weight w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
        </div>
    </div>
`;
    notesContainer.insertBefore(newNote, button.parentNode);
    addNoteEventHandler(notesContainer);
}

function addSection() {
    const sectionsContainer = document.getElementById("sections");
    const newSection = document.createElement("div");
    newSection.classList.add("section");

    newSection.innerHTML = `
    <hr class="my-2">
    <div class="flex gap-4 mt-3">
        <div class="w-full flex">
            <div class="flex w-full pr-1 items-center">
                <label class="text-xs block text-gray-500 font-bold mb-1 md:mb-0 w-1/2">
                ${getTranslation('nombreSeccion')}:
                </label>
                <input type="text" placeholder="${getTranslation('nombreSeccionPlaceholder')}"
                    class="section-name w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
            </div>
        </div>
        <div class="w-full flex">
            <div class="flex w-full pr-1 items-center">
                <label class="text-xs block text-gray-500 font-bold mb-1 md:mb-0 w-1/2">
                    ${getTranslation('ponderaSeccion')}:
                </label>
                <input type="text" placeholder="%"
                    class="section-weight w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
            </div>
        </div>
    </div>
    <div class="flex gap-4 notes">
        <div class="w-full flex">
            <div class="flex w-full pr-1 items-center">
                <label class="text-xs block text-gray-500 font-bold mb-1 md:mb-0 w-1/2">
                    ${getTranslation('notaAprobar')}:
                </label>
                <input type="number" placeholder="${getTranslation('notaAprobarPlaceholder')}"
                    class="note w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
            </div>
        </div>
        <div class="w-full flex">
            <div class="flex w-full pr-1 items-center">
                <label class="text-xs block text-gray-500 font-bold mb-1 md:mb-0 w-1/2">
                    ${getTranslation('ponderaNota')}:
                </label>
                <input type="number" placeholder="%"
                    class="note-weight w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
            </div>
        </div>
    </div>
    <div class="w-full mx-auto flex justify-center gap-2">
        <button
            class="w-max py-2 px-4 text-yellow-500 hover:text-yellow-300 text-white rounded text-xs add-note-btn" style="background: #212735;">
            ${getTranslation('agregarNota')}
        </button>
        <button class="w-max py-2 px-3 text-white rounded text-xs delete-note-btn" style="background: #eab308";>
            <i class="fas fa-trash"></i>
        </button>
    </div>
    <div class="section-average text-center font-bold mt-2">${getTranslation('promedioSeccion')} <span>0</span></div>
`;

    sectionsContainer.appendChild(newSection);
    addNoteEventHandler(newSection);
    newSection
        .querySelector(".add-note-btn")
        .addEventListener("click", () =>
            addNote(newSection.querySelector(".add-note-btn")),
        );

    newSection
        .querySelector(".delete-note-btn")
        .addEventListener("click", deleteLastNote);
}

function addInputEventListeners(section) {
    const inputs = section.querySelectorAll(".note, .note-weight");
    inputs.forEach((input) => {
        input.addEventListener("input", () =>
            calculateSectionGrade(section),
        );
    });
}

function calculateSectionGrade(section) {
    const notes = section.querySelectorAll(".note");
    const noteWeights = section.querySelectorAll(".note-weight");
    let total = 0,
        weightSum = 0;

    notes.forEach((note, index) => {
        const noteValue = parseFloat(note.value) || 0;
        const weight =
            parseFloat(noteWeights[index].value) || 100 / notes.length;
        total += noteValue * (weight / 100);
        weightSum += weight;
    });

    const average = weightSum ? (total * 100) / weightSum : 0;
    section.querySelector(".section-average span").textContent =
        average.toFixed(2);
}

function calculateFinalGrade() {
    const notaEximir = parseFloat(
        document.getElementById("notaEximir").value,
    );
    const sections = document.querySelectorAll(".section");
    let finalGrade = 0;
    let totalSectionWeight = 0;

    if (sections.length === 0) {
        document.getElementById("result").textContent =
            getTranslation('sinSecciones');
        document.getElementById("eximirse").textContent = "";
        return;
    }

    sections.forEach((section) => {
        const sectionName = section.querySelector(".section-name").value;
        const sectionWeight =
            parseFloat(section.querySelector(".section-weight").value) /
            100;
        const notes = section.querySelectorAll(".note");
        const noteWeights = section.querySelectorAll(".note-weight");
        let sectionGrade = 0;
        let totalNotesWeight = 0;

        notes.forEach((note, index) => {
            const noteValue = parseFloat(note.value);
            const noteWeight = noteWeights[index].value
                ? parseFloat(noteWeights[index].value) / 100
                : 1 / notes.length;

            sectionGrade += noteValue * noteWeight;
            totalNotesWeight += noteWeight;
        });

        const sectionAverage = sectionGrade / totalNotesWeight;
        section.querySelector(".section-average span").textContent = isNaN(
            sectionAverage,
        )
            ? "0"
            : sectionAverage.toFixed(2);

        finalGrade += sectionAverage * sectionWeight;
        totalSectionWeight += sectionWeight;
    });

    if (totalSectionWeight === 1) {
        document.getElementById("result").textContent =
            getTranslation('resultado') + " " + finalGrade.toFixed(2);
        document.getElementById("eximirse").textContent =
            finalGrade >= notaEximir
                ? getTranslation('eximirseMsg')
                : getTranslation('noEximirseMsg');
    } else {
        document.getElementById("result").textContent =
            getTranslation('ponderacionesError');
    }
}

function deleteLastNote(event) {
    const section = event.target.closest(".section");
    const notes = section.querySelectorAll(".notes");

    if (notes.length === 1) {
        alert(getTranslation('minimoUnaNota'));
        return;
    }

    const lastNote = notes[notes.length - 1];
    lastNote.parentNode.removeChild(lastNote);
    calculateSectionAverage(event);
}


function deleteLastSection() {
    const sections = document.querySelectorAll(".section");
    if (sections.length <= 1) {
        alert(getTranslation('minimoUnaSeccion'));
        return;
    }
    const lastSection = sections[sections.length - 1];
    lastSection.remove();
}