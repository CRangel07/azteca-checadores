document.addEventListener("DOMContentLoaded", () => {
  // startApp();
  
  const toast = document.querySelector('#toast');
  
  if(toast) {
      setTimeout(() => {
        toast.style.display = 'none';
      },4000);
  }
});

function startApp() { 
  const watchBtn = document.querySelector("#btn-watch");
  watchBtn.addEventListener("click", checkImages);
}

function checkImages() {
  const input = document.getElementById("inputWatchImages");
  input.value == ""
    ? alert('No hay archivos seleccionados')
    : createCarousel(input);
}

function createCarousel(input) {
  const carousel = document.querySelector("#carousel1");
  const carouselInner = document.querySelector('.carousel-inner');

  // Función para mostrar las imágenes seleccionadas por el usuario
  function showImages(files) {
    carouselInner.innerHTML = ""; // Limpiar el carrusel antes de agregar las nuevas imágenes
    carousel.style.display = "block";
    let cont = 0;
    for (const file of files) {
      console.log(file);
      const reader = new FileReader();

      reader.onload = function (event) {
        // Elemento padre
        const carouselItem = document.createElement("DIV");
        carouselItem.classList.add("carousel-item");
        if(cont == 0){
            carouselItem.classList.add('active');
            cont++;
        }
        carouselItem.setAttribute('data-bs-interval', '3000');
        // Imagen
        const img = document.createElement("IMG");
        img.src = event.target.result;
        img.alt = file.name;
        img.classList.add("carousel__img");
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
      };

      reader.readAsDataURL(file);
    }
  }

  // Función para cargar las imágenes seleccionadas por el usuario
  function loadImages() {
    const files = input.files;
    if (files.length > 0) {
      showImages(files);
    }
  }

  // Mostrar la primera imagen cuando se carga la página
  loadImages();
  carrouselListeners(carousel);
}

function carrouselListeners(carousel){

    function handleKey(event) {
        

        // Verificar si se presionó la tecla escape
        if (event.key === 'Escape') {
            carousel.children.innerHTML = "";
            carousel.style.display = 'none';
        }
    }

    // Agregar el event listener al elemento
    window.addEventListener('keydown', handleKey);
}

