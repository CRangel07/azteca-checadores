const db = require("../db.js");
const moment = require("moment-timezone");

// adminModel.js
const adminModel = {
  // Funcion guardar las imagenes en la base de datos
  savesImages: (files, branch) => {
    branch = parseInt(branch);

    files.forEach((file) => {
      // Obtener la fecha y hora actual en la zona horaria que desees
      const now = moment().tz("America/Mexico_City"); // Cambia 'America/Mexico_City' por la zona horaria deseada
      // Formatear la fecha y hora al formato aceptado por MySQL (YYYY-MM-DD HH:mm:ss)
      const formattedDate = now.format("YYYY-MM-DD HH:mm:ss");
      let { filename, destination, path } = file;
      path = path.replace('public', '');
      console.log(filename, destination, path);
      const query =
        "INSERT INTO images(image_ID, image_name, image_dest, image_url, image_uploadDate, image_branch_ID) VALUES(null, ?, ?, ?, ?, ?);";
      db.query(
        query,
        [filename, destination, path, formattedDate, branch],
        (err, results) => {
          if (err) {
            console.log(err);
            return err;
          } else {
            return results[0];
          }
        }
      );
    });
  },
  // Funcion para obtener las imagenes de todas las sucursales
  getAllBranchImages: (callback) => {
    // Lógica para obtener todas las imagenes
    db.query("SELECT * FROM images;", (err, results) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Usuario no encontrado
      }
      const branchesImages = results;
      return callback(null, branchesImages);
    });
  },

  getOneBranchImage: (branch) => {
    // Obtener una imagen
    
    const query = "SELECT * FROM `images` WHERE `image_branch_ID` = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [branch], (err, results) => {
        if (err) {
          console.log(err);
          reject(err); // Rechaza la promesa si hay un error
        } else {
          resolve(results); // Resuelve la promesa con los resultados de la consulta
        }
      });
    });
  }
  // Otras funciones del modelo (createUser, updateUser, deleteUser, etc.)
};

module.exports = adminModel;
