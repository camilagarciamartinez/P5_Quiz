var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');

var index = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Instalamos el renderizador de vistas EJS
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Intalamos los MWS que procesan partes de req o res
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

// Instalamos los MW con las rutas especificas
//// Gracias al módulo router express que deberán estar creadas en el directorio routes.
app.use('/', index);

// catch 404 and forward to error handler
/// Si ejecución llega a este MW quiere decir que ningún MW anterior ha entendido la ruta y que
/// hay que enviar la respuesta 404 Not Found pasándosela al MW de error en el error enviado
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  /// Si no se ha definido el código de repsuesta se envía 500
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;