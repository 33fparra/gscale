// Sistema de traducciones
const traducciones = {
    al: {
        title: "Shkalla e notave",
        notaMaxima: "Nota maksimale",
        notaMinima: "Nota minimale",
        notaAprobacion: "Nota kalimitare",
        exigencia: "Kërkesë",
        puntajeMaximo: "Rezultati maksimal",
        incremento: "Rritja",
        orden: "Renditja",
        ascendente: "Në ngjitje",
        descendente: "Në zbritje",
        calcular: "Llogarit",
        ptje: "Pk",
        errorCampos: "Ju lutem plotësoni të gjitha fushat me vlera numerike të vlefshme.",
        errorMinimo: "Nota minimale dhe nota e kalimit nuk mund të jenë më të mëdha se nota maksimale.",
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
        title: "Grade Scale",
        notaMaxima: "Maximum grade",
        notaMinima: "Minimum grade",
        notaAprobacion: "Passing grade",
        exigence: "Requirement",
        puntajeMaximo: "Maximum score",
        incremento: "Increment",
        orden: "Order",
        ascendente: "Ascending",
        descendente: "Descending",
        calcular: "Calculate",
        ptje: "Scr",
        errorCampos: "Please fill in all fields with valid numeric values.",
        errorMinimo: "The minimum grade and passing grade cannot be greater than the maximum grade.",
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
        title: "Escala de notas",
        notaMaxima: "Nota máxima",
        notaMinima: "Nota mínima",
        notaAprobacion: "Nota aprobación",
        exigencia: "Exigencia",
        puntajeMaximo: "Puntaje máximo",
        incremento: "Incremento",
        orden: "Orden",
        ascendente: "Ascendente",
        descendente: "Descendente",
        calcular: "Calcular",
        ptje: "Ptje",
        errorCampos: "Por favor, rellena todos los campos con valores numéricos válidos.",
        errorMinimo: "La nota mínima y la nota de aprobación no pueden ser mayores que la nota máxima.",
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

// Datos de notas para cada país
const datosPaises = {
    albania: {
        notaMaxima: 10,
        notaMinima: 1,
        notaAprobacion: 4,
        exigencia: 0.4,
        puntajeMaximo: 10,
        incremento: 0.1,
        idioma: "al"
    },
    chile: {
        notaMaxima: 70,
        notaMinima: 10,
        notaAprobacion: 40,
        exigencia: 0.6,
        puntajeMaximo: 100,
        incremento: 1,
        idioma: "es"
    },
    espana: {
        notaMaxima: 10,
        notaMinima: 0,
        notaAprobacion: 5,
        exigencia: 0.7,
        puntajeMaximo: 10,
        incremento: 0.1,
        idioma: "es"
    },
    estados_unidos: {
        notaMaxima: 100,
        notaMinima: 0,
        notaAprobacion: 60,
        exigencia: 0.9,
        puntajeMaximo: 100,
        incremento: 1,
        idioma: "en"
    },
    mexico: {
        notaMaxima: 10,
        notaMinima: 0,
        notaAprobacion: 5,
        exigencia: 0.5,
        puntajeMaximo: 10,
        incremento: 0.1,
        idioma: "es"
    }
};

// Obtener idioma actual
let idiomaActual = "es";

function getTranslation(key) {
    const t = traducciones[idiomaActual] || traducciones.es;
    return t[key] || traducciones.es[key] || key;
}

// Detectar idioma y país por IP
async function detectarIdiomaPorIP() {
    try {
        // Usar ip-api.com que es más flexible para clientes
        const response = await fetch('http://ip-api.com/json/?fields=countryCode');
        const data = await response.json();
        
        console.log('IP detectada:', data.countryCode);
        
        if (data.countryCode === 'AL') {
            return { idioma: 'al', pais: 'albania' };
        } else if (data.countryCode === 'US') {
            return { idioma: 'en', pais: 'estados_unidos' };
        } else if (data.countryCode === 'CL') {
            return { idioma: 'es', pais: 'chile' };
        } else if (data.countryCode === 'ES') {
            return { idioma: 'es', pais: 'espana' };
        } else if (data.countryCode === 'MX') {
            return { idioma: 'es', pais: 'mexico' };
        }
    } catch (e) {
        console.log('Error detectando IP:', e);
    }
    return { idioma: 'en', pais: 'estados_unidos' };
}

// Inicializar idioma
async function inicializarIdioma() {
    // Primero verificar si hay un idioma guardado en localStorage
    let idiomaGuardado = localStorage.getItem('gscale_idioma');
    let paisGuardado = localStorage.getItem('gscale_pais');
    
    let resultado;
    
    if (idiomaGuardado && paisGuardado) {
        // Usar idioma guardado
        console.log('Idioma guardado:', idiomaGuardado, paisGuardado);
        resultado = { idioma: idiomaGuardado, pais: paisGuardado };
    } else {
        // Detectar IP solo si no hay idioma guardado
        console.log('No hay idioma guardado, detectando IP...');
        resultado = await detectarIdiomaPorIP();
        // Guardar para futuras navegaciones
        localStorage.setItem('gscale_idioma', resultado.idioma);
        localStorage.setItem('gscale_pais', resultado.pais);
    }
    
    idiomaActual = resultado.idioma;
    
    // Actualizar lang del documento
    document.documentElement.lang = resultado.idioma;
    
    // Aplicar valores del país
    const datosPais = datosPaises[resultado.pais];
    if (datosPais) {
        const nMaxInput = document.getElementById("nMax");
        const nMinInput = document.getElementById("nMin");
        const nAprInput = document.getElementById("nApr");
        const eInput = document.getElementById("e");
        const pMaxInput = document.getElementById("pMax");
        const incrementoInput = document.getElementById("incremento");
        
        if (nMaxInput) nMaxInput.value = datosPais.notaMaxima;
        if (nMinInput) nMinInput.value = datosPais.notaMinima;
        if (nAprInput) nAprInput.value = datosPais.notaAprobacion;
        if (eInput) eInput.value = datosPais.exigencia * 100;
        if (pMaxInput) pMaxInput.value = datosPais.puntajeMaximo;
        if (incrementoInput) incrementoInput.value = datosPais.incremento;
        
        // Actualizar bandera
        const selectedFlag = document.getElementById("selectedFlagImage");
        if (selectedFlag) {
            const paisesFlag = {
                albania: '/img/albania.svg',
                chile: '/img/chile.svg',
                espana: '/img/espana.svg',
                estados_unidos: '/img/estados-unidos.svg',
                mexico: '/img/mexico.svg'
            };
            selectedFlag.src = paisesFlag[resultado.pais] || '/img/chile.svg';
        }
    }
    
    actualizarTextos();
    
    // Calcular notas después de establecer valores (solo en página docente)
    setTimeout(() => {
        const btn = document.getElementById("calcularNotasBtn");
        if (btn) btn.click();
    }, 100);
}

// Función para cambiar idioma y país cuando el usuario selecciona un país
function cambiarPais(pais) {
    const datosPais = datosPaises[pais];
    if (datosPais && datosPais.idioma) {
        idiomaActual = datosPais.idioma;
        localStorage.setItem('gscale_idioma', idiomaActual);
        localStorage.setItem('gscale_pais', pais);
        document.documentElement.lang = idiomaActual;
        actualizarTextos();
    }
}

// Actualizar textos según idioma
function actualizarTextos() {
    // Actualizar labels del docente si existen
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (el.tagName === 'INPUT' && el.placeholder) {
            el.placeholder = getTranslation(key + 'Placeholder') || getTranslation(key);
        } else {
            el.textContent = getTranslation(key);
        }
    });
    
// Actualizar placeholders específicos
    const nMaxLabel = document.querySelector('label[for="nMax"]');
    const nMinLabel = document.querySelector('label[for="nMin"]');
    const nAprLabel = document.querySelector('label[for="nApr"]');
    const eLabel = document.getElementById('label-exigencia');
    const pMaxLabel = document.querySelector('label[for="pMax"]');
    const incLabel = document.querySelector('label[for="incremento"]');
    const ordenLabel = document.getElementById('label-orden');
    const btnCalcular = document.getElementById("calcularNotasBtn");
    
    if (nMaxLabel) nMaxLabel.textContent = getTranslation('notaMaxima') + ':';
    if (nMinLabel) nMinLabel.textContent = getTranslation('notaMinima') + ':';
    if (nAprLabel) nAprLabel.textContent = getTranslation('notaAprobacion') + ':';
    if (eLabel) eLabel.textContent = getTranslation('exigencia') + ' (%):';
    if (pMaxLabel) pMaxLabel.textContent = getTranslation('puntajeMaximo') + ':';
    if (incLabel) incLabel.textContent = getTranslation('incremento') + ':';
    if (ordenLabel) ordenLabel.textContent = getTranslation('orden') + ':';
    
    // Actualizar opciones del select de Orden con iconos
    const ordenSelect = document.getElementById('orden');
    if (ordenSelect) {
        const opciones = ordenSelect.querySelectorAll('option');
        if (opciones.length >= 2) {
            opciones[0].textContent = '↑ ' + getTranslation('ascendente');
            opciones[1].textContent = '↓ ' + getTranslation('descendente');
        }
    }
    if (btnCalcular) btnCalcular.textContent = getTranslation('calcular');
    
    // Actualizar placeholders de inputs
    const pMaxInput = document.getElementById('pMax');
    const incInput = document.getElementById('incremento');
    if (pMaxInput) pMaxInput.placeholder = pMaxInput.value;
    if (incInput) incInput.placeholder = incInput.value;
    
    // Actualizar textos de Alumnos si existe la página
    const notaMaximaLabel = document.querySelector('label[for="notaMaxima"]');
    const notaMinimaLabel = document.querySelector('label[for="notaMinima"]');
    const notaEximirLabel = document.querySelector('label[for="notaEximir"]');
    const notaAprobarLabel = document.querySelector('label[for="notaAprobar"]');
    
    if (notaMaximaLabel) notaMaximaLabel.textContent = getTranslation('notaMaxima') + ':';
    if (notaMinimaLabel) notaMinimaLabel.textContent = getTranslation('notaMinima') + ':';
    if (notaEximirLabel) notaEximirLabel.textContent = getTranslation('notaEximirse') + ':';
    if (notaAprobarLabel) notaAprobarLabel.textContent = getTranslation('notaAprobar') + ':';
    
    // Actualizar labels dinámicos en secciones de Alumnos
    document.querySelectorAll('.section-name').forEach(input => {
        input.placeholder = getTranslation('nombreSeccionPlaceholder');
    });
    document.querySelectorAll('.section-weight').forEach(input => {
        input.placeholder = '%';
    });
    document.querySelectorAll('.note').forEach(input => {
        input.placeholder = getTranslation('notaAprobarPlaceholder');
    });
    document.querySelectorAll('.note-weight').forEach(input => {
        input.placeholder = '%';
    });
    
    // Actualizar título de la página
    const tituloDocente = document.querySelector('h2');
    if (tituloDocente && tituloDocente.textContent.includes('Escala')) {
        tituloDocente.textContent = getTranslation('title');
    }
    
    const tituloAlumno = document.querySelector('h2');
    if (tituloAlumno && tituloAlumno.textContent.includes('promedio')) {
        tituloAlumno.textContent = getTranslation('titleAlumno');
    }
    
    // Guardar idioma en localStorage
    localStorage.setItem('gscale_idioma', idiomaActual);
}

document.addEventListener("DOMContentLoaded", function () {
    inicializarIdioma();
    
    // Selecciona elementos importantes del DOM
    const selectedFlag = document.getElementById("selectedFlagImage");
    const optionsContainer = document.getElementById("optionsContainer");
    const options = document.querySelectorAll(".option");
    const customSelect = document.getElementById("customSelect");
    const nMaxInput = document.getElementById("nMax");
    const nMinInput = document.getElementById("nMin");
    const nAprInput = document.getElementById("nApr");
    const eInput = document.getElementById("e");
    const pMaxInput = document.getElementById("pMax");
    const incrementoInput = document.getElementById("incremento");

    // Manejador de clics para el contenedor principal
    customSelect.addEventListener("click", function (event) {
        if (event.target === this || event.target === selectedFlag) {
            const isDisplayed = optionsContainer.style.display === "block";
            optionsContainer.style.display = isDisplayed ? "none" : "block";
        }
        event.stopPropagation();
    });

    function obtenerDatosPais(selectedCountry) {
        return new Promise((resolve, reject) => {
            const datosPais = datosPaises[selectedCountry];
            if (datosPais) {
                resolve(datosPais);
            } else {
                reject("Los datos del país seleccionado no están definidos.");
            }
        });
    }

    // Añade manejadores de clics a cada opción
    options.forEach((option) => {
        option.addEventListener("click", async function () {
            const selectedCountry = this.dataset.value;

            const imgSrc = this.querySelector("img").src;
            const imgAlt = this.querySelector("img").alt;
            selectedFlag.src = imgSrc;
            selectedFlag.alt = imgAlt;

            optionsContainer.style.display = "none";

            try {
                const datosPais = await obtenerDatosPais(selectedCountry);

                nMaxInput.value = datosPais.notaMaxima;
                nMinInput.value = datosPais.notaMinima;
                nAprInput.value = datosPais.notaAprobacion;
                eInput.value = datosPais.exigencia * 100;
                pMaxInput.value = datosPais.puntajeMaximo;
                incrementoInput.value = datosPais.incremento;

                cambiarPais(selectedCountry);
                
                document.getElementById("calcularNotasBtn").click();
            } catch (error) {
                console.error("Error:", error);
            }
        });
    });

    // Agrega un manejador de clics al documento para ocultar las opciones si se hace clic fuera de ellas
    document.addEventListener("click", function (event) {
        const isInsideCustomSelect = event.target.closest("#customSelect");
        if (!isInsideCustomSelect) {
            optionsContainer.style.display = "none";
        }
    });
});

// Exportar funciones para uso global
window.getTranslation = getTranslation;
window.cambiarPais = cambiarPais;
window.idiomaActual = idiomaActual;