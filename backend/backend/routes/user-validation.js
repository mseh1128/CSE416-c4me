const mysql = require('mysql');
const express = require('path');

const queryCheckForUser = 'SELECT * FROM user WHERE username=? AND password=?';

module.exports = function(app, connection) {
  app.get('/tryToRetrieveUser', (req, res) => {
    connection.query(queryGetDecision, [collegeName], (err, rows, params) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //here we want all the people who have been accepted to ...
    });
  });
};
