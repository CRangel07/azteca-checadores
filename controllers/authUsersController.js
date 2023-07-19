
const userModel = require('../models/userModel');

const login = (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);

  userModel.getUserByUsername(username, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error al obtener los datos del usuario.');
    }

    if (!user) {
      return res.send('El usuario no existe. Inténtalo de nuevo.');
    }

    userModel.comparePassword(password, user.user_password, (err, isMatch) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error al comparar contraseñas.');
      }

      if (!isMatch) {
        if(password == user.user_password){
          return res.send('hola');
        }else return res.send('Credenciales inválidas. Inténtalo de nuevo.');
      }

      // Comprobación de éxito, el usuario y la contraseña son correctos
      // Guardar información del usuario en la sesión
      req.session.user = {
        id: user.user_ID,
        username: user.user_name,
        role: user.user_role,
        mainAdmin: user.user_mainAdmin,
      };

      console.log(req.session);

      // Redireccionar según el rol del usuario (por ejemplo, 'admin' o 'user')
      const role = user.user_role; // Suponemos que el rol del usuario se encuentra en la columna 'role'

      if (role === 'admin') {
        // Redirigir al panel de administrador
        res.redirect('/admin');
      } else {
        // Redirigir a la página de usuario normal
        res.redirect('/login');
      }
    });
  });
};

module.exports = {
  login,
};
