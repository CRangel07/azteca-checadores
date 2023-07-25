let cont = 0; 
window.addEventListener("DOMContentLoaded", () => {
  const carouselItem = document.querySelector(".carousel-item");

  if (cont == 0) {
    carouselItem.classList.add("active");
    cont++;
  }

  function handleKey(event) {
    // Verificar si se presionó la tecla escape
    if (event.key === "Escape") {
      if (window.location.pathname == "/user/images") {
        window.location.pathname = "/user";
      }
      if (window.location.pathname == "/admin/images") {
        window.location.pathname = "/admin";
      }
    }
  }

  window.addEventListener("keydown", handleKey);
});
