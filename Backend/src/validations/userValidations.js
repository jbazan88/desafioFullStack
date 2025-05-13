const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { User } = require('../database/models');

const loginValidations = [
  // Validación del email
  body('email')
    .notEmpty().withMessage('El email es obligatorio.')
    .isEmail().withMessage('Debes ingresar un formato de email válido.')
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error('El email no está registrado.');
      }
      return true;
    }),

  // Validación de la contraseña
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user || !bcrypt.compareSync(value, user.password)) {
        throw new Error('La contraseña es incorrecta.');
      }
      req.user = user; // Guarda el usuario en `req.user` para usarlo más adelante
      return true;
    }),

  // Manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]

const registerValidations = [
    // Validación del nombre
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres.'),

    // Validación del apellido
    body('surname')
        .notEmpty().withMessage('El apellido es obligatorio.')
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres.'),

    // Validación del email
    body('email')
        .notEmpty().withMessage('El email es obligatorio.')
        .isEmail().withMessage('Debes ingresar un formato de email válido.')
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                throw new Error('Este email ya está registrado.');
            }
            return true;
        }),

    // Validación de la contraseña
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),

    // Validación de la imagen
    body('image')
        .optional()
        .custom((value, { req }) => {
            if (!req.file) {
                return true; // Si no se sube archivo, la validación pasa
            }
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            const fileExtension = `.${req.file.originalname.split('.').pop().toLowerCase()}`;
            if (!allowedExtensions.includes(fileExtension)) {
                throw new Error('La imagen debe ser un archivo JPG, JPEG, PNG o GIF.');
            }
            return true;
        })
];
module.exports = { registerValidations, loginValidations };