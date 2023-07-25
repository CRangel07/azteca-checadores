
const adminModel =  require('../models/adminModel');

const userController = {
    showUserPage: (req, res) => {
        res.status(200).render('user', {username: 'Invitado', message: 'undefined'});
    },
    showBranchImages : async (req, res) => {
        try {
          const branch = req.query.branch;
          const results = await adminModel.getOneBranchImage(branch);
      
          if (results.length == 0) {
            res.render("user", {username: 'Invitado', message: 'No hay imagenes en la sucursal'});
          } else {
            res.render("carousel", { results});
          }
        } catch (error) {
          console.error("Error al obtener las imágenes de la sucursal:", error);
          res
            .status(500)
            .json({ error: "Error al obtener las imágenes de la sucursal" });
        }
    }
}

module.exports = userController;