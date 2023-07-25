document.addEventListener("DOMContentLoaded", () => {
  const deleteLinks = document.querySelectorAll(".delete-link");
  // Agregar un listener para cada enlace de "Eliminar"
  deleteLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Obtener la ID de la imagen desde el atributo de datos personalizado
      const imageId = link.dataset.imageId;

      // Realizar una solicitud al servidor para eliminar la imagen
      if (window.confirm("¿Estas seguro de eliminar este elemento?")) {
        fetch(`/admin/stored/${imageId}`, {
          method: "DELETE",
        })
          .then((response) => response.text)
          .then((data) => {
            // Eliminar la fila de la tabla correspondiente a la imagen eliminada
            const tableRow = link.closest("tr");
            tableRow.remove();
            //   location.reload();
          })
          .catch((error) => {
            console.error("Error al eliminar la imagen:", error);
          });
      }
    });
  });

  const imageContainer = document.querySelector(".image__viewer");
  const imageViewer = document.getElementById("image-viewer");
  const viewLinks = document.querySelectorAll(".viewer-link");

  viewLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Obtener la ID de la imagen desde el atributo de datos personalizado
      const imageUrl = link.dataset.imageUrl;

      imageViewer.setAttribute("src", imageUrl);
      imageContainer.classList.add("active");
      console.log(imageContainer.style);
      let scrollY = window.scrollY + "px";
      console.log(scrollY);
      imageContainer.style.top = scrollY;
    });
  });

  // Boton para cerrar previsualizador
  const closeBtn = document.querySelector(".img__btn");
  closeBtn.addEventListener("click", () => {
    imageContainer.classList.toggle("active");
  });

  const toast = document.querySelector(".toast__stored");
  if (toast) {
    setTimeout(() => {
      toast.style.display = "none";
    }, 4000);
  }
});
