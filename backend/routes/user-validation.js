const mysql = require('mysql');
const express = require('path');

const queryCheckForUser =
  'SELECT * FROM user WHERE username=? AND userPassword=?';
const queryAddUser =
  'INSERT INTO user (username, userPassword, name) VALUES (?, ?, ?)';
const queryInstantiateStudent = 'INSERT INTO student (userID) VALUES (?)';
const queryInstantiateProfile = 'INSERT INTO profile (userID) VALUES (?)';
const jwt = require('jsonwebtoken');

module.exports = function (app, connection) {
  app.post('/loginUser', (req, res) => {
    const { username, password } = req.body;
    connection.query(
      queryCheckForUser,
      [username, password],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json('err!');
        }
        if (results === undefined || results.length == 0) {
          // could not find user
          console.log('User not found!');
          return res.status(400).json('User not found!');
        }
        console.log('User was found! Sending back jwt now.');
        // const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
        // need to change secret to environment var
        const token = jwt.sign(results[0].userID, 'jwt_secret_key');
        return res.send({ jwtToken: token, isAdmin: results[0].isAdmin });
      }
    );
  });

  app.post('/addNewStudent', (req, res) => {
    const { username, password, name } = req.body;
    // check if user already exists
    connection.query(
      queryCheckForUser,
      [username, password],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json('err!');
        }
        if (results === undefined || results.length == 0) {
          // no duplicate found, can add it
          connection.query(
            queryAddUser,
            [username, password, name],
            async (err, results, fields) => {
              if (err) {
                console.log(err);
                return res.status(500).json('err!');
              }
              console.log(`Added ${name} as a user to the database.`);
              const { insertId } = results;
              try {
                const result = await Promise.all([
                  connection.query(queryInstantiateStudent, [insertId]),
                  connection.query(queryInstantiateProfile, [insertId]),
                ]);
                return res.status(200);
              } catch (err) {
                console.log(err);
                return res.status(500).json('err!');
              }
            }
          );
        } else {
          // duplicate found
          console.log('Duplicate found!');
          return res.status(400).json('Duplicate account found!');
        }
      }
    );
  });
};
