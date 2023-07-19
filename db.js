
const mysql = require('mysql2');
 

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'azteca_checadores',
  });

module.exports = connection;