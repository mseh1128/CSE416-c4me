const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'gas pedal',
  database: 'college_recommender'
});

connection.connect(err => {
  err
    ? console.log('You failed to connect because ' + err)
    : console.log('A connection has been established.');
});

require('./routes/student-functions.js')(app, connection);
require('./routes/student-acceptance-claims.js')(app, connection);
require('./routes/user-validation.js')(app, connection);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send('This page does not exist!');
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send('An error has occurred!');
});

module.exports = app;
