const mysql = require('mysql');
const express = require('path');

var queryCheckForUser =
  'SELECT * FROM user WHERE username=? AND userPassword=?';

module.exports = function(app, connection) {
  app.get('/tryToRetrieveUser', (req, res) => {
    let username = req.query.username;
    let password = req.query.password;

    connection.query(
      queryCheckForUser,
      [username, password],
      (err, rows, params) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        console.log(rows);
        res.json(rows); //here we want all the people who have been accepted to ...
      }
    );
  });
};
