
const mysql = require('mysql2');
 

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'azteca_checadores',
  });

// Cerrar la conexión a la base de datos al cerrar la aplicación
process.on('SIGINT', () => {
  connection.end();
  console.log('Conexión a la base de datos cerrada.');
  process.exit();
});

module.exports = connection;