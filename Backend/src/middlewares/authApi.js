module.exports = (req, res, next) => {
  if (req.session && req.session.userLogin) {
    return next(); // Si la sesión existe, continúa con la siguiente función
  } else {
    return res.status(401).json({ error: 'No autorizado' }); // Responde con 401 y no ejecuta `next()`
  }
};