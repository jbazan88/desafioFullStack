const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');

/* const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
*/
const apiProductsRouter = require('./routes/products');
const apiUsersRouter = require('./routes/users');
const apiDropdownsRouter = require('./routes/dropdowns');
const apiCartRouter = require('./routes/cart'); // Asegúrate de que esta ruta sea correcta{


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'miSecreto', // Cambia esto por un secreto más seguro
  resave: false,
  saveUninitialized: false, // Cambiar a `false` para evitar sesiones vacías
  cookie: {
    httpOnly: true,
    secure: false, // Cambiar a `true` si usas HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 día
  }
}));
app.use(cors({
  origin: 'http://localhost:5000', // Puerto del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use((req, res, next) => {
  if (req.session.userLogin) {
    res.locals.userLogin = req.session.userLogin
  }
  next()
})

/* app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
*/
app.use('/products', apiProductsRouter);
app.use('/users', apiUsersRouter);
app.use('/cart', apiCartRouter);
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads/products')));
app.use('/api/dropdowns', apiDropdownsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
