const multer = require('multer');
const path = require('path');

// Configuración para productos
const storageProductos = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/products/');
    },
    filename: function(req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Configuración para usuarios
const storageUsuarios = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/users/');
    },
    filename: function(req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Middleware para productos
exports.productUpload = multer({
    storage: storageProductos,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: function(req, file, cb) {
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif'];
        if (tiposPermitidos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido'), false);
        }
    }
}).single('imagen');

// Middleware para usuarios
exports.userUpload = multer({
    storage: storageUsuarios,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: function(req, file, cb) {
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif'];
        if (tiposPermitidos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido'), false);
        }
    }
}).single('avatar');