const mysql = require('mysql');
const express = require('path');

<<<<<<< HEAD:backend/backend/routes/user-validation.js
var queryCheckForUser = "SELECT * FROM user WHERE username=? AND userPassword=?";

module.exports = function(app, connection){
  app.get("/tryToRetrieveUser", (req, res) => {
    let username = req.query.username;
    let password = req.query.password;

    connection.query(queryCheckForUser, [username, password], (err, rows, params) => {
      if (err){
=======
const queryCheckForUser = 'SELECT * FROM user WHERE username=? AND password=?';

module.exports = function(app, connection) {
  app.get('/tryToRetrieveUser', (req, res) => {
    connection.query(queryGetDecision, [collegeName], (err, rows, params) => {
      if (err) {
>>>>>>> 8cddfe9ef360e0c7ff9f641bf598137f69f21729:backend/routes/user-validation.js
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      res.json(rows); //here we want all the people who have been accepted to ...
    });
  });
};
