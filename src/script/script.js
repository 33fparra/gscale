
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona elementos importantes del DOM
  const selectedFlag = document.getElementById('selectedFlagImage');
  const optionsContainer = document.getElementById('optionsContainer');
  const options = document.querySelectorAll('.option');
  const customSelect = document.getElementById('customSelect');

  // Manejador de clics para el contenedor principal
  customSelect.addEventListener('click', function(event) {
    // Verifica si el clic fue directamente en la bandera seleccionada o en su 
contenedor
    if (event.target === this || event.target === selectedFlag) {
      // Alterna la visibilidad del contenedor de opciones
      const isDisplayed = optionsContainer.style.display === 'block';
      optionsContainer.style.display = isDisplayed ? 'none' : 'block';
    }
  });

  // Añade manejadores de clics a cada opción
  options.forEach(option => {
    option.addEventListener('click', function() {
      // Actualiza la imagen de la bandera seleccionada y su texto alternativo
      const imgSrc = this.querySelector('img').src;
      const imgAlt = this.querySelector('img').alt;
      selectedFlag.src = imgSrc;
      selectedFlag.alt = imgAlt;

      // Esconde el contenedor de opciones después de seleccionar
      optionsContainer.style.display = 'none';

      // Opcional: Realizar acciones adicionales con el valor seleccionado
      console.log('Valor seleccionado:', this.dataset.value);
    });
  });
});
