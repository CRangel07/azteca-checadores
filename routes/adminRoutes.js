const adminController = require("../controllers/adminController");
const express = require("express");
router = express.Router();
const path = require("path");
const multer = require("multer");

// Configuración de Multer para gestionar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { branch } = req.body;
    // Crear un objeto de mapeo para las opciones de tienda
    const branchOptions = {
      1: "cedis-azteca",
      2: "solidaridad",
      3: "ultramarinos",
      4: "obrera",
      5: "trincheras",
      6: "tenencia",
      7: "tijeras",
    };

    // Obtener el valor correspondiente a la opción de branch
    const folderName = branchOptions[branch] || "sin-sucursal"; // Cambia 'default-folder' por el nombre de la carpeta por defecto si branch no coincide con ninguna opción

    const destinationPath = path.join("public/uploads/", folderName); // Ruta completa de destino
    cb(null, destinationPath); // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext); // Nombre de archivo único
  },
});

const upload = multer({ storage: storage });

router.get("/admin", adminController.showAdminPage);
// router.get("/admin/uploaded", adminController.showLoadPage);
// router.post("/admin/uploaded", adminController.getAllBranchImages);
router.post(
  "/admin",
  upload.array("image", 15),
  adminController.saveImages
);
router.get('/admin/images', adminController.showBranchImages);
router.get('/admin/stored', adminController.showStoredPage);
router.post('/admin/stored', adminController.getImages);
router.delete('/admin/stored', adminController.deleteImage);
router.delete('/admin/stored/:id', adminController.deleteImage);



module.exports = router; 
