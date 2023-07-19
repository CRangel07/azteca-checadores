// middlewares/authMiddleware.js

const authMiddleware = (req, res, next) => {
    // Verificar si el usuario está autenticado (comprobar si existe la propiedad 'user' en la sesión)
    if (!req.session || !req.session.user) {
      return res.redirect('/login'); // Redirigir al formulario de inicio de sesión si no está autenticado
    }
  
    // Verificar el rol del usuario (suponemos que el rol se encuentra en la propiedad 'role' del objeto user)
    const { role } = req.session.user;
  
    // Verificar los permisos según el rol (aquí puedes definir tus propias reglas)
    if (role !== 'admin') {
      return res.status(403).send('Acceso denegado. No tienes permisos suficientes.');
    }
  
    // Si el usuario está autenticado y tiene los permisos adecuados, continuar con la siguiente función en la ruta
    next();
  };
  
  module.exports = authMiddleware;
  