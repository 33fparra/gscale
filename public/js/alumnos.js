document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("result").textContent =
        "Aún no agregas todas tus secciones.";
    document.getElementById("eximirse").textContent = ""; // Inicialmente vacío.
    // Añade el manejador de eventos a la sección inicial y a cada nota ya existente.
    addInputEventListeners(document.getElementById("section1"));
    calculateFinalGrade(); // Calcula las notas al inicio si es necesario.

    // Busca todos los botones con la clase 'add-note-btn', 'add-section-btn' y 'calculate-grade-btn' y añade el evento click.
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
    // Añade manejadores de eventos a cada input nuevo.
    parent.querySelectorAll(".note, .note-weight").forEach((input) => {
        input.addEventListener("input", calculateSectionAverage);
    });
}

function calculateSectionAverage(event) {
    // Esta función ahora se llama cada vez que se edita una nota o su ponderación.
    const section = event.target.closest(".section");
    calculateSectionGrade(section);
}

function addNote(button) {
    const notesContainer = button.parentNode.parentNode; // Obtener el contenedor principal
    const newNote = document.createElement("div");
    newNote.className = "flex gap-4 notes";
    newNote.innerHTML = `
    <div class="w-full flex">
        <div class="flex w-full pr-1 items-center">
            <label class="text-xs block text-gray-500 font-bold mb-1 md:mb-0 w-1/2">
                Nota:
            </label>
            <input type="number" placeholder="Nota"
                class="note w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
        </div>
    </div>
    <div class="w-full flex">
        <div class="flex w-full pr-1 items-center">
            <label class="text-xs block text-gray-500 font-bold mb-1 md:mb-0 w-1/2">
                % de ponderación:
            </label>
            <input type="number" placeholder="% de ponderación"
                class="note-weight w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
        </div>
    </div>
`;
    notesContainer.insertBefore(newNote, button.parentNode); // Insertar el nuevo div justo antes del contenedor del botón
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
                Nombre de sección:
                </label>
                <input type="text" placeholder="Nombre de la sección"
                    class="section-name w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
            </div>
        </div>
        <div class="w-full flex">
            <div class="flex w-full pr-1 items-center">
                <label class="text-xs block text-gray-500 font-bold mb-1 md:mb-0 w-1/2">
                    % de ponderación sección:
                </label>
                <input type="text" placeholder="% de ponderación de la sección"
                    class="section-weight w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
            </div>
        </div>
    </div>
    <div class="flex gap-4 notes">
        <div class="w-full flex">
            <div class="flex w-full pr-1 items-center">
                <label class="text-xs block text-gray-500 font-bold mb-1 md:mb-0 w-1/2">
                    Nota:
                </label>
                <input type="number" placeholder="Nota"
                    class="note w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
            </div>
        </div>
        <div class="w-full flex">
            <div class="flex w-full pr-1 items-center">
                <label class="text-xs block text-gray-500 font-bold mb-1 md:mb-0 w-1/2">
                    % de ponderación:
                </label>
                <input type="number" placeholder="% de ponderación"
                    class="note-weight w-1/2 bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-xs text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
            </div>
        </div>
    </div>
    <div class="w-full mx-auto flex justify-center gap-2">
        <button
            class="w-max py-2 px-4 bg-purple-500 text-white rounded text-xs add-note-btn">
            Agregar nota
        </button>
        <button class="w-max py-2 px-3 bg-red-500 text-white rounded text-xs delete-note-btn">
            <i class="fas fa-trash"></i>
        </button>
    </div>
    <div class="section-average text-center font-bold mt-2">Promedio de la sección: <span>0</span></div>
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
    // Agrega los event listeners a los inputs de notas y ponderaciones para calcular en tiempo real.
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
            parseFloat(noteWeights[index].value) || 100 / notes.length; // Si no hay ponderación, se asume igual para todas.
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
    ); // Asegúrate de capturar este valor correctamente
    const sections = document.querySelectorAll(".section");
    let finalGrade = 0;
    let totalSectionWeight = 0; // Esta variable ayudará a asegurar que la suma de las ponderaciones de las secciones sea 100%

    // Verificar si hay secciones agregadas
    if (sections.length === 0) {
        document.getElementById("result").textContent =
            "Aún no agregas todas tus secciones.";
        document.getElementById("eximirse").textContent = "";
        return; // Salir de la función si no hay secciones.
    }

    sections.forEach((section) => {
        const sectionName = section.querySelector(".section-name").value;
        const sectionWeight =
            parseFloat(section.querySelector(".section-weight").value) /
            100;
        const notes = section.querySelectorAll(".note");
        const noteWeights = section.querySelectorAll(".note-weight");
        let sectionGrade = 0;
        let totalNotesWeight = 0; // Ponderación total dentro de la sección

        notes.forEach((note, index) => {
            const noteValue = parseFloat(note.value);
            const noteWeight = noteWeights[index].value
                ? parseFloat(noteWeights[index].value) / 100
                : 1 / notes.length; // Distribuir equitativamente si no hay ponderación específica

            sectionGrade += noteValue * noteWeight;
            totalNotesWeight += noteWeight;
        });

        // Calcula el promedio de la sección sin dividir por la longitud de las notas porque ya estamos sumando las ponderaciones
        const sectionAverage = sectionGrade / totalNotesWeight;
        section.querySelector(".section-average span").textContent = isNaN(
            sectionAverage,
        )
            ? "0"
            : sectionAverage.toFixed(2); // Mostramos el promedio de la sección

        finalGrade += sectionAverage * sectionWeight;
        totalSectionWeight += sectionWeight;
    });

    if (totalSectionWeight === 1) {
        document.getElementById("result").textContent =
            "Nota final calculada: " + finalGrade.toFixed(2);
        document.getElementById("eximirse").textContent =
            finalGrade >= notaEximir
                ? "Te estás eximiendo de la asignatura."
                : "No te estás eximiendo de la asignatura.";
    } else {
        // Manejar error si las ponderaciones de las secciones no suman 100%
        document.getElementById("result").textContent =
            "La suma de las ponderaciones de las secciones no es 100%.";
        // document.getElementById("eximirse").textContent = ""; // Limpiar este campo por si acaso.
    }
}

function deleteLastNote(event) {
    const section = event.target.closest(".section");
    const notes = section.querySelectorAll(".notes");

    if (notes.length === 1) {
        alert("Debe haber al menos una nota en la sección.");
        return;
    }

    const lastNote = notes[notes.length - 1];
    lastNote.parentNode.removeChild(lastNote);
    calculateSectionAverage(event);
}


function deleteLastSection() {
    const sections = document.querySelectorAll(".section");
    if (sections.length <= 1) {
        alert("Debes tener al menos una sección.");
        return;
    }
    const lastSection = sections[sections.length - 1];
    lastSection.remove();
}
