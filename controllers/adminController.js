const path = require("path");
const adminModel = require("../models/adminModel");


const showAdminPage = (req, res) => {
  const { username } = req.session.user;
  res.render("admin", { username });
};

const showLoadPage = (req, res) => {
  const { username } = req.session.user;
  res.render("uploadImages", { username });
};

const getAllBranchImages = (req, res) => {
  const userId = req.params;
  console.log(userId);

  adminModel.getAllBranchImages((err, branchesImages) => {
    if (err) {
      return res.status(500).send("Error al obtener imagenes");
    }

    if (!branchesImages) {
      return res.status(404).send("Sin imagenes");
    }

    return res.send(branchesImages);
  });
};

// Para guardar imagenes
const saveImages = (req, res) => {
  const {files} = req;
  const { branch } = req.body;
  adminModel.savesImages(files, branch);
  res.status(204);
  res.redirect("/admin");
};

const showBranchImages = async (req, res) => {
  try {
    const branch = req.query.branch;
    const results = await adminModel.getOneBranchImage(branch);
    
    const imageBasePath = '/public/uploads';
    res.render('carousel', {results, imageBasePath});
  } catch (error) {
    console.error('Error al obtener las imágenes de la sucursal:', error);
    res.status(500).json({ error: 'Error al obtener las imágenes de la sucursal' });
  }
};

const showStoredPage = (req, res) => {
  const { username } = req.session.user;
  res.render("storedImages", { username });
};

// Otras funciones del controlador (createUser, updateUser, deleteUser, etc.)

module.exports = {
  showAdminPage,
  showLoadPage,
  getAllBranchImages,
  saveImages,
  showBranchImages,
  showStoredPage
};
