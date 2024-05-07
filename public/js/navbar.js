document.addEventListener("DOMContentLoaded", function () {
    // Definir los datos de notas para cada país
    const datosPaises = {
        chile: {
            notaMaxima: 70,
            notaMinima: 10,
            notaAprobacion: 40,
            exigencia: 60,
            puntajeMaximo: 100,
            incremento: 1
        },
        estados_unidos: {
            notaMaxima: 100,
            notaMinima: 0,
            notaAprobacion: 60,
            exigencia: 90,
            puntajeMaximo: 100,
            incremento: 1
        },
        argentina: {
            notaMaxima: 10,
            notaMinima: 1,
            notaAprobacion: 4,
            exigencia: 6,
            puntajeMaximo: 10,
            incremento: 1
        },
        colombia: {
            notaMaxima: 5,
            notaMinima: 0,
            notaAprobacion: 2.5,
            exigencia: 3.5,
            puntajeMaximo: 5,
            incremento: 0.1
        },
        venezuela: {
            notaMaxima: 20,
            notaMinima: 0,
            notaAprobacion: 7,
            exigencia: 12,
            puntajeMaximo: 20,
            incremento: 1
        },
        espana: {
            notaMaxima: 10,
            notaMinima: 0,
            notaAprobacion: 5,
            exigencia: 7,
            puntajeMaximo: 10,
            incremento: 0.1
        },
        peru: {
            notaMaxima: 20,
            notaMinima: 1,
            notaAprobacion: 10.5,
            exigencia: 15,
            puntajeMaximo: 20,
            incremento: 1
        }
    };

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
            // Obtener los datos del país
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
            // Obtiene el valor del país seleccionado
            const selectedCountry = this.dataset.value;

            // Actualiza la imagen de la bandera seleccionada y su texto alternativo
            const imgSrc = this.querySelector("img").src;
            const imgAlt = this.querySelector("img").alt;
            selectedFlag.src = imgSrc;
            selectedFlag.alt = imgAlt;

            // Esconde el contenedor de opciones después de seleccionar
            optionsContainer.style.display = "none";

            try {
                // Obtener los datos del país seleccionado
                const datosPais = await obtenerDatosPais(selectedCountry);

                // Setea los valores de los inputs basados en los datos del país seleccionado
                nMaxInput.value = datosPais.notaMaxima;
                nMinInput.value = datosPais.notaMinima;
                nAprInput.value = datosPais.notaAprobacion;
                eInput.value = datosPais.exigencia;
                pMaxInput.value = datosPais.puntajeMaximo;
                incrementoInput.value = datosPais.incremento;

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
