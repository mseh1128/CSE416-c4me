const mysql = require('mysql');
const express = require('path');

const queryCheckForUser =
  'SELECT * FROM user WHERE username=? AND userPassword=?';
const queryAddAUser =
  'INSERT INTO user (username, userPassword, name) VALUES (?, ?, ?)';
const queryGetID =
  'SELECT id FROM user WHERE username=? AND userPassword=?';
const queryaauInstantiateStudent =
  'INSERT INTO student (userID) VALUES (?)';
const queryaauInstantiateProfile =
  'INSERT INTO profile (userID) VALUES (?)'


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

  app.post('/addANewStudent', (req, res) => {
    let username = req.query.username;
    let password = req.query.password;
    let name = req.query.name;

    connection.query(
      queryAddAUser,
      [username, password, name],
      (err, rows, params) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        console.log("Added " + name + " as a user to the database.")
      }
    );

    let id = 0;
    connection.query(
      queryGetID,
      [username, password],
      (err, rows, params) => {
        if (err) {
          console.log(err)
          res.sendStatus(500)
          return;
        }

        id = rows[0].id;
        console.log("The id is " + id);
      }
    );

    connection.query(
      queryaauInstantiateStudent,
      [id],
      (err, rows, params) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        console.log("User " + id + " has nonacademic info")
      }
    );

    connection.query(
      queryaauInstantiateProfile,
      [id],
      (err, rows, params) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        console.log("User " + id + " has academic info")
      }
    );
  });

};
