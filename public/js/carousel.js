window.addEventListener("DOMContentLoaded", () => {
  const carouselItem = document.querySelector(".carousel-item");
  let cont = 0;
  if (cont == 0) {
    carouselItem.classList.add("active");
    cont++;
  }
  carrouselListeners();
});

function carrouselListeners() {
  function handleKey(event) {
    // Verificar si se presionó la tecla escape
    if (event.key === "Escape") {
        document.body.removeChild(document.body.firstChild);
        window.location.pathname = '/admin';
    }
  }

  // Agregar el event listener al elemento
  window.addEventListener("keydown", handleKey);
}
