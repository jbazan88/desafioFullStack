const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const db = require('../database/models');

module.exports = {
  processRegister: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { name, surname, email, password } = req.body;
  
      // Verificar si el email ya está registrado
      const existingUser = await db.User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }
  
      const newUser = await db.User.create({
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        image: null,
        password: bcrypt.hashSync(password, 10),
        token: uuidv4(),
        validated: true,
        lock: false,
        rolId: 2,
      });
  
      return res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
    } catch (error) {
      console.error('Error en el registro:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  processLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await db.User.findOne({ where: { email } });
  
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
  
      // Crear sesión
      req.session.userLogin = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        rol: user.rolId,
      };
  
      return res.status(200).json({ message: 'Login exitoso', user: req.session.userLogin });
    } catch (error) {
      console.error('Error en el login:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Perfil de usuario
  profile: async (req, res) => {
    // 'req.session.userLogin' contiene la información del usuario logueado gracias al middleware
    if (req.session.userLogin) {
      try {
        // Opcional: Puedes buscar la información completa del usuario en la base de datos si solo tienes el ID en la sesión
        const user = await User.findById(req.session.userLogin.id);

        if (user) {
          return res.json({
            isLoggedIn: true,
            userId: user._id,
            rol: user.rol,
            // ... otra información relevante del usuario que quieras enviar al frontend
          });
        } else {
          // Si por alguna razón no se encuentra el usuario en la base de datos
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
      } catch (error) {
        console.error('Error al obtener perfil de usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
    } else {
      // Esto no debería ocurrir si el middleware authMiddleware está funcionando correctamente
      return res.status(401).json({ error: 'No autorizado' });
    }
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al cerrar sesión' });
      }
      res.clearCookie('connect.sid'); // Limpiar la cookie de sesión
      return res.status(200).json({ message: 'Sesión cerrada con éxito' });
    });
  }
};