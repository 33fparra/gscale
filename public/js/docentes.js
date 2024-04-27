function calcularNotas() {

    const nMax = parseFloat(document.getElementById('nMax').value); // Nota máxima, por ejemplo, 10
    const nMin = parseFloat(document.getElementById('nMin').value); // Nota mínima, por ejemplo, 1
    const nApr = parseFloat(document.getElementById('nApr').value); // Nota de aprobación, por ejemplo, 6
    const e = parseFloat(document.getElementById('e').value) / 100;  // Convertir a porcentaje decimal   // Porcentaje para el umbral de aprobación, por ejemplo, 0.5
    const pMax = parseFloat(document.getElementById('pMax').value); // Puntaje máximo, por ejemplo, 100
    const incremento = parseFloat(document.getElementById('incremento').value); // Incremento del puntaje
    const orden = document.getElementById('orden').value; // Orden de las notas
   // Validar que la nota mínima y de aprobación no sean mayores que la nota máxima
   if (nMin > nMax || nApr > nMax) {
       alert('La nota mínima y la nota de aprobación no pueden ser mayores que la nota máxima.');
       console.error('La nota mínima y la nota de aprobación no pueden ser mayores que la nota máxima.')
       return;
   }
   console.log(e);
   console.log(e);
    if (isNaN(nMax) || isNaN(nMin) || isNaN(nApr) || isNaN(e) || isNaN(pMax) || isNaN(incremento)) {
        alert('Por favor, rellena todos los campos con valores numéricos válidos.');
        return;
    }

    
    
    let notas = [];
    for (let p = 0; p <= pMax; p += incremento) {
        let n;
        if (p < e * pMax) {
            n = nMin + (nApr - nMin) * (p / (e * pMax)); // Escala linealmente de nMin a nApr hasta e * pMax
        } else {
            n = nApr + (nMax - nApr) * ((p - e * pMax) / (pMax - e * pMax)); // Escala linealmente de nApr a nMax desde e * pMax a pMax
        }
        notas.push({ puntaje: p, nota: Math.round(n * 10) / 10 });
    }

    if (orden === 'descendente') {
        notas.reverse();
    }

    const resultadosElement = document.getElementById('resultados');
    resultadosElement.innerHTML = ''; // Limpiar resultados anteriores
    resultadosElement.className = 'flex flex-wrap justify-center p-2'; // Estilos para los resultados
    const resultadosPorTabla = 10; // Cantidad de resultados por tabla

    notas.forEach((nota, index) => {
        if (index % resultadosPorTabla === 0) {
            const tablaContenedor = document.createElement('div');
            tablaContenedor.className = 'w-full flex justify-center mb-4'; // Clases para manejar el ancho y margen de cada tabla
            const tablaActual = document.createElement('div');
            tablaActual.className = 'w-full max-w-screen-md overflow-hidden rounded-lg bg-white shadow-lg'; // Clases para el estilo de la tabla
            const thead = document.createElement('thead');
            thead.className = 'bg-purple-400 text-white'; // Clases para el encabezado
            const trHead = document.createElement('tr');
            ['Puntaje', 'Nota'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                th.className = 'px-4 py-2'; // Clases para el texto del encabezado
                trHead.appendChild(th);
            });
            thead.appendChild(trHead);
            tablaActual.appendChild(thead);
            const tbody = document.createElement('tbody');
            tablaActual.appendChild(tbody);
            tablaContenedor.appendChild(tablaActual);
            resultadosElement.appendChild(tablaContenedor);
        }
        const tbody = resultadosElement.lastChild.firstChild.lastChild; // Obtener el último tbody añadido
        const tr = document.createElement('tr');
        const tdPuntaje = document.createElement('td');
        tdPuntaje.textContent = nota.puntaje;
        tdPuntaje.className = 'px-4 py-2 border text-center'; // Clases para las celdas
        const tdNota = document.createElement('td');
        tdNota.textContent = nota.nota;
        tdNota.className = 'px-4 py-2 border text-center'; // Clases para las celdas
        tr.appendChild(tdPuntaje);
        tr.appendChild(tdNota);
        tbody.appendChild(tr);
    });
}