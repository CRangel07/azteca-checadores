const path = require("path");
const adminModel = require("../models/adminModel");

const showAdminPage = (req, res) => {
  const { username } = req.session.user;
  res.render("admin", { username, message: 'undefined'});
};

const showLoadPage = (req, res) => {
  const { username } = req.session.user;
  res.render("uploadImages", { username });
};

const getImages = async (req, res) => {
  const { username } = req.session.user;
  if (req.body.hasOwnProperty("getall")) {
    adminModel.getAllBranchImages((err, branchesImages) => {
      if (err) {
        return res.status(500).send("Error al obtener imagenes");
      }

      if (!branchesImages) {
        return res.render("storedImages", {
          username,
          branchesImages: "undefined",
          message: "No hay imagenes en la base de datos",
        });
      }

      return res.render("storedImages", {
        username,
        branchesImages,
        message: "undefined",
      });
    });
  } else if (req.body.hasOwnProperty("getimage")) {
    try {
      const branch = req.body.branch;
      const branchesImages = await adminModel.getOneBranchImage(branch);
      console.log(branchesImages);
      if (branchesImages.length == 0) {
        return res.render("storedImages", {
          username,
          branchesImages: "undefined",
          message: "No hay imagenes en la sucursal seleccionada",
        });
      }
      return res.render("storedImages", {
        username,
        branchesImages,
        message: "undefined",
      });
    } catch (error) {
      console.error("Error al obtener las imágenes de la sucursal:", error);
      res
        .status(500)
        .json({ error: "Error al obtener las imágenes de la sucursal" });
    }
  }
};

// Para guardar imagenes
const saveImages = (req, res) => {
  const { username } = req.session.user;
  const { files } = req;
  const { branch } = req.body;
  adminModel.savesImages(files, branch);
  res.status(200);
  res.render("admin", {username, message: 'Imagenes guardadas correctamente'});
};

const showBranchImages = async (req, res) => {
  try {
    const branch = req.query.branch;
    const results = await adminModel.getOneBranchImage(branch);

    const imageBasePath = "/public/uploads";
    if (results.length == 0) {
      res.redirect("/admin");
    } else {
      res.render("carousel", { results, imageBasePath });
    }
  } catch (error) {
    console.error("Error al obtener las imágenes de la sucursal:", error);
    res
      .status(500)
      .json({ error: "Error al obtener las imágenes de la sucursal" });
  }
};

const showStoredPage = (req, res) => {
  const { username } = req.session.user;
  res.render("storedImages", {
    username,
    branchesImages: "undefined",
    message: "undefined",
  });
};

// eliminar una imagen por su ID
const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const results = await adminModel.deleteImage(imageId);
    res.send(results);
  } catch (error) {
    console.error("Error al obtener las imágenes de la sucursal:", error);
    res
      .status(500)
      .json({ error: "Error al obtener las imágenes de la sucursal" });
  }
};

// Otras funciones del controlador (createUser, updateUser, deleteUser, etc.)

module.exports = {
  showAdminPage,
  showLoadPage,
  getImages,
  saveImages,
  showBranchImages,
  showStoredPage,
  deleteImage,
};
