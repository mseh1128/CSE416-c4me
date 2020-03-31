const mysql = require('mysql');
const express = require('path');

const queryCheckForUser =
  'SELECT * FROM user WHERE username=? AND userPassword=?';
const queryAddUser =
  'INSERT INTO user (username, userPassword, name) VALUES (?, ?, ?)';
const queryInstantiateStudent = 'INSERT INTO student (userID) VALUES (?)';
const queryInstantiateProfile = 'INSERT INTO profile (userID) VALUES (?)';

module.exports = function(app, connection) {
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
        console.log('User was found! Updating session now.');
        req.session.userID = results[0].userID;
        console.log(req.session);
        return res.sendStatus(200);
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
                  connection.query(queryInstantiateProfile, [insertId])
                ]);
                return res.sendStatus(200);
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
