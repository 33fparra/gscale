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
        minimoUnaSeccion: " Duhet të keni të paku një seksion.",
        docente: "Mësues",
        alumno: "Nxënës",
        prinderit: "Prindër",
        universitetet: "Universitetet",
        blog: "Blog"
    },
    en: {
        title: "Grade Scale",
        notaMaxima: "Maximum grade",
        notaMinima: "Minimum grade",
        notaAprobacion: "Passing grade",
        exigencia: "Requirement",
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
        minimoUnaSeccion: "You must have at least one section.",
        docente: "Teacher",
        alumno: "Students",
        prinderit: "Parents",
        universitetet: "Universities",
        blog: "Blog"
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
        minimoUnaSeccion: "Debes tener al menos una sección.",
        docente: "Docente",
        alumno: "Alumno"
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

// Guard: evitar doble ejecución (Astro dev + Vite HMR pueden inyectar el script dos veces)
if (window.__gscaleNavbarInit) { /* ya cargado */ } else {
window.__gscaleNavbarInit = true;

// --- Limpiar localStorage corrupto de versiones anteriores ---
(function () {
    var pais = localStorage.getItem('gscale_pais');
    var lang = localStorage.getItem('gscale_idioma');
    var mapaEsperado = { albania:'al', chile:'es', espana:'es', estados_unidos:'en', mexico:'es' };
    // Si el idioma no coincide con el país guardado, corregirlo
    if (pais && mapaEsperado[pais] && lang !== mapaEsperado[pais]) {
        localStorage.setItem('gscale_idioma', mapaEsperado[pais]);
    }
    // Si hay pais guardado inválido, limpiar todo
    if (pais && !mapaEsperado[pais]) {
        localStorage.removeItem('gscale_pais');
        localStorage.removeItem('gscale_idioma');
    }
})();

// Obtener idioma actual (default: albanés)
let idiomaActual = "al";

function getTranslation(key) {
    const t = traducciones[idiomaActual] || traducciones.es;
    return t[key] || traducciones.es[key] || key;
}

// Mapa completo país → { idioma, pais }
const _MAPA_PAISES = {
    // Albania y Kosovo (albanohablantes)
    AL: { idioma: 'al', pais: 'albania' },
    XK: { idioma: 'al', pais: 'albania' },
    // España
    ES: { idioma: 'es', pais: 'espana' },
    // Sudamérica hispanohablante → escala Chile
    CL: { idioma: 'es', pais: 'chile' },
    AR: { idioma: 'es', pais: 'chile' },
    CO: { idioma: 'es', pais: 'chile' },
    PE: { idioma: 'es', pais: 'chile' },
    VE: { idioma: 'es', pais: 'chile' },
    BO: { idioma: 'es', pais: 'chile' },
    EC: { idioma: 'es', pais: 'chile' },
    PY: { idioma: 'es', pais: 'chile' },
    UY: { idioma: 'es', pais: 'chile' },
    // Centroamérica + Caribe hispanohablante → escala México
    MX: { idioma: 'es', pais: 'mexico' },
    GT: { idioma: 'es', pais: 'mexico' },
    HN: { idioma: 'es', pais: 'mexico' },
    SV: { idioma: 'es', pais: 'mexico' },
    NI: { idioma: 'es', pais: 'mexico' },
    CR: { idioma: 'es', pais: 'mexico' },
    PA: { idioma: 'es', pais: 'mexico' },
    CU: { idioma: 'es', pais: 'mexico' },
    DO: { idioma: 'es', pais: 'mexico' },
    // Países anglófonos principales
    US: { idioma: 'en', pais: 'estados_unidos' },
    CA: { idioma: 'en', pais: 'estados_unidos' },
    AU: { idioma: 'en', pais: 'estados_unidos' },
    GB: { idioma: 'en', pais: 'estados_unidos' },
    NZ: { idioma: 'en', pais: 'estados_unidos' },
    IE: { idioma: 'en', pais: 'estados_unidos' },
    ZA: { idioma: 'en', pais: 'estados_unidos' },
    PH: { idioma: 'en', pais: 'estados_unidos' },
};

// Continente americano completo (fuera de él → albanés como segunda opción)
const _AMERICAS = new Set([
    'US','CA','MX','GT','HN','SV','NI','CR','PA','CU','DO','PR','JM','TT','BB','HT',
    'CL','AR','CO','PE','VE','BO','EC','PY','UY','BR','GY','SR','BZ','GF','GP','MQ'
]);

// Código HTML correcto para albanés: sq (ISO 639-1), no el código de país AL
function _toHtmlLang(idioma) {
    return idioma === 'al' ? 'sq' : idioma;
}

// Detectar idioma y país por IP
async function detectarIdiomaPorIP() {
    console.log('Iniciando detección de IP...');
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const code = data.country_code;
        console.log('País detectado:', code);

        if (_MAPA_PAISES[code]) return _MAPA_PAISES[code];

        // Fuera del continente americano → albanés como segunda opción por defecto
        if (!_AMERICAS.has(code)) {
            console.log('País fuera de las Américas, usando albanés como segunda opción');
            return { idioma: 'al', pais: 'albania' };
        }
    } catch (e) {
        console.log('Error con ipapi.co:', e);
    }
    // Fallback: albanés (default global)
    return { idioma: 'al', pais: 'albania' };
}

// Inicializar idioma
async function inicializarIdioma() {
    console.log('Inicializando idioma...');
    
    // Primero verificar si hay un idioma guardado en localStorage
    let idiomaGuardado = localStorage.getItem('gscale_idioma');
    let paisGuardado = localStorage.getItem('gscale_pais');
    
    console.log('LocalStorage:', idiomaGuardado, paisGuardado);
    
    let resultado;
    
    if (paisGuardado && datosPaises[paisGuardado]) {
        // Derivar idioma desde los datos del país (previene inconsistencias en localStorage)
        const idiomaDePais = datosPaises[paisGuardado].idioma;
        resultado = { idioma: idiomaDePais, pais: paisGuardado };
    } else {
        // Sin datos guardados: detectar por IP
        resultado = await detectarIdiomaPorIP();
    }
    // Siempre sincronizar localStorage con el estado actual
    localStorage.setItem('gscale_idioma', resultado.idioma);
    localStorage.setItem('gscale_pais', resultado.pais);
    
    idiomaActual = resultado.idioma;
    window.idiomaActual = idiomaActual;
    console.log('Idioma actual:', idiomaActual);

    // Actualizar lang del documento (sq = código ISO 639-1 correcto para albanés)
    document.documentElement.lang = _toHtmlLang(resultado.idioma);
    
    // Aplicar valores del país
    const datosPais = datosPaises[resultado.pais];
    console.log('Datos del país:', datosPais);
    
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
            selectedFlag.src = paisesFlag[resultado.pais] || '/img/estados-unidos.svg';
        }
    }
    
    actualizarTextos();
    document.dispatchEvent(new CustomEvent('idiomaListo'));

    // Calcular notas después de establecer valores (solo en página docente)
    setTimeout(() => {
        const btn = document.getElementById("calcularNotasBtn");
        if (btn) btn.click();
    }, 100);
}

// Cambiar idioma y país: guarda en localStorage y recarga la misma página
function cambiarPais(pais) {
    const datosPais = datosPaises[pais];
    if (!datosPais) return;
    localStorage.setItem('gscale_idioma', datosPais.idioma);
    localStorage.setItem('gscale_pais', pais);
    window.location.reload();
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
    
    // Labels del docente
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
    if (btnCalcular) btnCalcular.textContent = getTranslation('calcular');

    // Traducir botones del navbar usando .nav-text para preservar iconos
    function setNavText(id, key) {
        var el = document.getElementById(id);
        if (!el) return;
        var span = el.querySelector('.nav-text');
        if (span) span.textContent = getTranslation(key);
        else el.textContent = getTranslation(key);
    }
    setNavText('btn-docente',      'docente');
    setNavText('btn-alumno',       'alumno');
    setNavText('btn-estudiante',   'prinderit');
    setNavText('btn-universidades','universitetet');
    setNavText('mob-docente',      'docente');
    setNavText('mob-alumno',       'alumno');
    setNavText('mob-estudiante',   'prinderit');
    setNavText('mob-universidades','universitetet');

    const tituloDocente = document.getElementById('titulo-docente');
    if (tituloDocente) tituloDocente.textContent = getTranslation('title');

    // Actualizar window.idiomaActual para que otros scripts lo lean en tiempo real
    window.idiomaActual = idiomaActual;
    
    // Select de orden
    const ordenSelect = document.getElementById('orden');
    if (ordenSelect) {
        const opciones = ordenSelect.querySelectorAll('option');
        if (opciones.length >= 2) {
            opciones[0].textContent = '↑ ' + getTranslation('ascendente');
            opciones[1].textContent = '↓ ' + getTranslation('descendente');
        }
    }
    
    // Texts de Alumnos
    const tituloAlumno = document.getElementById('titulo-alumno');
    if (tituloAlumno) tituloAlumno.textContent = getTranslation('titleAlumno');
    
    const labelNotaMaxima = document.getElementById('label-notaMaxima');
    const labelNotaMinima = document.getElementById('label-notaMinima');
    const labelNotaEximir = document.getElementById('label-notaEximir');
    const labelNotaAprobar = document.getElementById('label-notaAprobar');
    
    if (labelNotaMaxima) labelNotaMaxima.textContent = getTranslation('notaMaxima') + ':';
    if (labelNotaMinima) labelNotaMinima.textContent = getTranslation('notaMinima') + ':';
    if (labelNotaEximir) labelNotaEximir.textContent = getTranslation('notaEximirse') + ':';
    if (labelNotaAprobar) labelNotaAprobar.textContent = getTranslation('notaAprobar') + ':';
    
    // Placeholders de Alumnos
    const notaEximirInput = document.getElementById('notaEximir');
    const notaAprobarInput = document.getElementById('notaAprobar');
    if (notaEximirInput) notaEximirInput.placeholder = getTranslation('notaEximirsePlaceholder');
    if (notaAprobarInput) notaAprobarInput.placeholder = getTranslation('notaAprobarPlaceholder');
    
    // Labels de sección de Alumnos (nuevos IDs)
    const labelNombreSeccion = document.getElementById('label-nombre-seccion');
    const labelPonderaSeccion = document.getElementById('label-pondera-seccion');
    const labelNotaSeccion = document.getElementById('label-nota-seccion');
    const labelPonderaNota = document.getElementById('label-pondera-nota');
    const labelPromedioSeccion = document.getElementById('label-promedio-seccion');
    
    if (labelNombreSeccion) labelNombreSeccion.textContent = getTranslation('nombreSeccion') + ':';
    if (labelPonderaSeccion) labelPonderaSeccion.textContent = getTranslation('ponderaSeccion') + ':';
    if (labelNotaSeccion) labelNotaSeccion.textContent = getTranslation('notaAprobar') + ':';
    if (labelPonderaNota) labelPonderaNota.textContent = getTranslation('ponderaNota') + ':';
    if (labelPromedioSeccion) {
        labelPromedioSeccion.firstChild.textContent = getTranslation('promedioSeccion') + ' ';
    }
    
    // Botones de Alumnos (nuevos IDs)
    const btnAgregarNota = document.getElementById('btn-agregar-nota');
    const btnAgregarSeccion = document.getElementById('btn-agregar-seccion');
    const btnCalcularFinal = document.getElementById('btn-calcular-final');
    
    if (btnAgregarNota) btnAgregarNota.textContent = getTranslation('agregarNota');
    if (btnAgregarSeccion) btnAgregarSeccion.textContent = getTranslation('agregarSeccion');
    if (btnCalcularFinal) btnCalcularFinal.textContent = getTranslation('calcularNotaFinal');
    
    // Placeholders de section-name
    document.querySelectorAll('.section-name').forEach(input => {
        input.placeholder = getTranslation('nombreSeccionPlaceholder');
    });
    
    console.log('Textos de Alumnos actualizados en navbar.js');
}

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
    inicializarIdioma();
});

// Exponer en window para que el onclick del Navbar los pueda llamar en cualquier momento
window.getTranslation = getTranslation;
window.cambiarPais    = cambiarPais;
window.idiomaActual   = idiomaActual;

} // fin del guard __gscaleNavbarInit