// Función para actualizar textos de la página Alumnos
// getTranslation proviene de navbar.js (cargado después de este script)
function actualizarTextosAlumnos() {
    console.log('Actualizando textos de Alumnos...');
    
    // Forzar lectura del lang del documento
    const docLang = document.documentElement.lang || 'es';
    console.log('Idioma del documento:', docLang);
    
    // Título
    const titulo = document.getElementById('titulo-alumno');
    if (titulo) {
        titulo.textContent = getTranslation('titleAlumno');
        console.log('Título actualizado a:', titulo.textContent);
    }
    
    // Labels usando IDs directos
    const labelNotaMaxima = document.getElementById('label-notaMaxima');
    const labelNotaMinima = document.getElementById('label-notaMinima');
    const labelNotaEximir = document.getElementById('label-notaEximir');
    const labelNotaAprobar = document.getElementById('label-notaAprobar');
    
    if (labelNotaMaxima) {
        labelNotaMaxima.textContent = getTranslation('notaMaxima') + ':';
        console.log('Label notaMaxima:', labelNotaMaxima.textContent);
    }
    if (labelNotaMinima) labelNotaMinima.textContent = getTranslation('notaMinima') + ':';
    if (labelNotaEximir) labelNotaEximir.textContent = getTranslation('notaEximirse') + ':';
    if (labelNotaAprobar) labelNotaAprobar.textContent = getTranslation('notaAprobar') + ':';
    
    // Labels de las secciones dinámicas (buscar por texto o clase)
    const labelsSeccion = document.querySelectorAll('.section .text-xs');
    console.log('Labels de sección encontrados:', labelsSeccion.length);
    labelsSeccion.forEach(label => {
        const texto = label.textContent.toLowerCase();
        if (texto.includes('nombre de')) {
            label.textContent = getTranslation('nombreSeccion') + ':';
        } else if (texto.includes('pondera la sec')) {
            label.textContent = getTranslation('ponderaSeccion') + ':';
        } else if (texto.includes('nota:') || texto.includes('nota ')) {
            label.textContent = getTranslation('notaAprobar') + ':';
        } else if (texto.includes('pondera la not')) {
            label.textContent = getTranslation('ponderaNota') + ':';
        }
    });
    
    // Placeholders de inputs principales
    const notaMaximaInput = document.getElementById('notaMaxima');
    const notaMinimaInput = document.getElementById('notaMinima');
    const notaEximirInput = document.getElementById('notaEximir');
    const notaAprobarInput = document.getElementById('notaAprobar');
    
    if (notaMaximaInput) notaMaximaInput.placeholder = "10";
    if (notaMinimaInput) notaMinimaInput.placeholder = "1";
    if (notaEximirInput) notaEximirInput.placeholder = getTranslation('notaEximirsePlaceholder');
    if (notaAprobarInput) notaAprobarInput.placeholder = getTranslation('notaAprobarPlaceholder');
    
    // Placeholders de secciones
    document.querySelectorAll('.section-name').forEach(input => {
        input.placeholder = getTranslation('nombreSeccionPlaceholder');
    });
    
    // Botones - FORZAR actualización
    const addNoteBtns = document.querySelectorAll('.add-note-btn');
    console.log('Botones agregar nota encontrados:', addNoteBtns.length);
    addNoteBtns.forEach(btn => {
        const newText = getTranslation('agregarNota');
        btn.textContent = newText;
    });
    
    const addSectionBtns = document.querySelectorAll('.add-section-btn');
    console.log('Botones agregar sección encontrados:', addSectionBtns.length);
    addSectionBtns.forEach(btn => {
        btn.textContent = getTranslation('agregarSeccion');
    });
    
    const calcBtns = document.querySelectorAll('.calculate-grade-btn');
    console.log('Botones calcular encontrados:', calcBtns.length);
    calcBtns.forEach(btn => {
        btn.textContent = getTranslation('calcularNotaFinal');
    });
    
    // Promedio de sección
    document.querySelectorAll('.section-average').forEach(div => {
        div.firstChild.textContent = getTranslation('promedioSeccion') + ' ';
    });
    
    // Mensajes iniciales
    const resultDiv = document.getElementById('result');
    if (resultDiv) resultDiv.textContent = getTranslation('sinSecciones');
    
    console.log('Textos de Alumnos actualizados');
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarTextosAlumnos();

    document.getElementById("eximirse").textContent = "";
    addInputEventListeners(document.getElementById("section1"));
    calculateFinalGrade();

    // Cuando navbar.js termine de detectar el idioma, re-aplicar textos y recalcular
    document.addEventListener('idiomaListo', () => {
        actualizarTextosAlumnos();
        calculateFinalGrade();
    });

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
            class="w-max py-2 px-4 text-orange-500 hover:text-orange-300 text-white rounded text-xs add-note-btn" style="background: #212735;">
            ${getTranslation('agregarNota')}
        </button>
        <button class="w-max py-2 px-3 text-white rounded text-xs delete-note-btn" style="background: #f97316";>
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