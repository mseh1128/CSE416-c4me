var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//mysql is because it is what I am connecting to.
//bodyParser will allow me to accept body texts????
/
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gas pedal",
  database: "college_recommender"
});

connection.connect(function(err) {(err) ? console.log("You failed to connect because " + err) : console.log("A connection has been established.")});

require('./routes/student-functions.js')(app, connection);
require('./routes/student-acceptance-claims.js')(app, connection);
require('./routes/user-validation.js')(app, connection);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
