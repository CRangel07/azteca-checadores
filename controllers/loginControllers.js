

const login = require('../models/loginModel');


// Mostrar pagina de Login
const showLoginPage = (req, res) => {
    res.render('login');
};

// Cerrar una sesion
const closeSesion = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Error al cerrar sesión.');
        }
        res.redirect('/login'); // Redirigir al formulario de inicio de sesión después de cerrar sesión
      });
};

module.exports = {
    showLoginPage,
    closeSesion,
};