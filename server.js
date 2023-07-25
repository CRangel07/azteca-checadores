const express = require("express");
const app = express();
const session = require("express-session");
const loginRoutes = require("./routes/loginRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authMiddleware = require('./middlewares/authMiddleware');


// ***MIDDLEWARES***

// Establecer el directorio de vistas
app.set("views", "./views");
// Configurar el motor de plantillas EJS
app.set("view engine", "ejs");
// Configurar el middleware express- session
app.use(
  session({
    secret: "kjbkjbkbbkfhddzf", //cambiar
    resave: false,
    saveUninitialized: false,
  })
);
// Middleware para analizar datos de formulario
app.use(express.urlencoded({ extended: true }));
// Configurar el middleware para servir archivos estáticos
app.use(express.static("public"));
// Middleware de autenticación y autorización para rutas protegidas
app.use('/admin', authMiddleware);
// Rutas para login
app.use(loginRoutes);
// Rutas para login
app.use(adminRoutes);

app.get("/", (req, res) => {
  res.redirect("/login");
});

// Ruta pagina 404
app.use((req, res) => {
  res.status(404).render('notFound404');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
