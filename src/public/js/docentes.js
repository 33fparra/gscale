function calcularNotas() {
    const nMax = parseFloat(document.getElementById('nMax').value);
    const nMin = parseFloat(document.getElementById('nMin').value);
    const nApr = parseFloat(document.getElementById('nApr').value);
    const e = parseFloat(document.getElementById('e').value);
    const pMax = parseFloat(document.getElementById('pMax').value);
    const incremento = parseFloat(document.getElementById('incremento').value);
    const orden = document.getElementById('orden').value;

    if (isNaN(nMax) || isNaN(nMin) || isNaN(nApr) || isNaN(e) || isNaN(pMax) || isNaN(incremento)) {
        alert('Por favor, rellena todos los campos con valores numéricos válidos.');
        return;
    }

    let notas = [];
    for (let p = 0; p <= pMax; p += incremento) {
        let n;
        if (p < e * pMax) {
            n = ((nApr - nMin) / (e * pMax)) * p + nMin;
        } else {
            n = ((nMax - nApr) / (pMax * (1 - e))) * (p - e * pMax) + nApr;
        }
        notas.push({ puntaje: p, nota: Math.round(n * 10) / 10 });
    }

    if (orden === 'descendente') {
        notas.reverse();
    }
    const resultadosElement = document.getElementById('resultados');
    resultadosElement.innerHTML = ''; // Limpiar resultados anteriores
    resultadosElement.className = 'flex flex-wrap wrap justify-center p-2'; // Ajusta aquí según necesites
    const resultadosPorTabla = 10; // Cantidad de resultados por tabla

    notas.forEach((nota, index) => {
        if (index % resultadosPorTabla === 0) { // Inicio de un nuevo grupo
            // Crea el contenedor de la tabla con clases para manejar el ancho y margen
            const tablaContenedor = document.createElement('div');
            tablaContenedor.className = 'flex justify-center'; // Ajusta el ancho por fila aquí
            const tablaActual = document.createElement('div');
            tablaActual.className = 'overflow-hidden rounded-lg bg-white py-1 px-1'; // Clases de Tailwind
            // Crear thead para cada nueva tabla
            const thead = document.createElement('thead');
            thead.className = 'text-xs sm:text-sm md:text-xs lg:text-xs bg-purple-400 text-white rounded-tl-lg rounded-tr-lg pb-1'; // Clase de Tailwind para el fondo y color del texto del encabezado
            const trHead = document.createElement('tr');
            ['Ptje.', 'Nota'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                th.className = 'px-3 py-1 border text-xs sm:text-sm md:text-xs lg:text-xs text-center'; // Clases de Tailwind para padding y bordes
                trHead.appendChild(th);
            });
            thead.appendChild(trHead);
            tablaActual.appendChild(thead);
            const tbody = document.createElement('tbody');
            tablaActual.appendChild(tbody);
            resultadosElement.appendChild(tablaActual);
        }
        // Crear y añadir filas a la última tbody añadida al DOM
        const tbody = resultadosElement.lastChild.lastChild;
        const tr = document.createElement('tr');
        tr.className = 'border-b px-2 py-2 justify-center'; // Clase de Tailwind para el borde inferior
        const tdPuntaje = document.createElement('td');
        tdPuntaje.textContent = nota.puntaje;
        tdPuntaje.className = 'px-1 py-1 border text-xs sm:text-sm md:text-xs lg:text-xs justify-center text-center'; // Clases de Tailwind para bordes y padding
        const tdNota = document.createElement('td');
        tdNota.textContent = nota.nota;
        tdNota.className = 'px-1 py-1 border text-xs sm:text-sm md:text-xs lg:text-xs justify-center text-center'; // Clases de Tailwind para bordes y padding
        tr.appendChild(tdPuntaje);
        tr.appendChild(tdNota);
        tbody.appendChild(tr);
    });
}