const bcrypt = require('bcrypt');
const mysql = require('mysql');
const express = require('path');

const queryCheckForUser =
  'SELECT * FROM user WHERE username=? AND userPassword=?';
const queryGetPasswordsFromUsername =
  'SELECT userID, userPassword FROM user WHERE username=?;';
const queryAddUser =
  'INSERT INTO user (username, userPassword, name) VALUES (?, ?, ?)';
const queryInstantiateStudent = 'INSERT INTO student (userID) VALUES (?)';
const queryInstantiateProfile = 'INSERT INTO profile (studentID) VALUES (?)';
const jwt = require('jsonwebtoken');
const salt = 10;

module.exports = function (app, connection) {
  app.post('/loginUser', (req, res) => {
    const { username, password } = req.body;
    connection.query(
      queryGetPasswordsFromUsername,
      [username],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json('err!');
        }
        let matchingUser = getMatchingPassword(password, results);
        if (results === undefined || results.length == 0 || !matchingUser) {
          // could not find user
          console.log('User not found!');
          return res.status(400).json('User not found!');
        }
        console.log('User was found! Sending back jwt now.');
        // const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
        // need to change secret to environment var
        const token = jwt.sign(matchingUser.userID, 'jwt_secret_key');
        return res.send({ jwtToken: token, isAdmin: results[0].isAdmin });
      }
    );
  });

  const getMatchingPassword = (plainTextPassword, allHashedPasswords) => {
    for (const hashedPassword of allHashedPasswords) {
      if (bcrypt.compareSync(plainTextPassword, hashedPassword.userPassword))
        return hashedPassword;
    }
    return false;
  };

  app.post('/addNewStudent', (req, res) => {
    const { username, password, name } = req.body;
    // check if user already exists
    connection.query(
      queryGetPasswordsFromUsername,
      [username],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json('err!');
        }
        if (
          results === undefined ||
          results.length == 0 ||
          !getMatchingPassword(password, results)
        ) {
          // no duplicate found, can add it
          const encryptedPassword = bcrypt.hashSync(password, salt);
          connection.query(
            queryAddUser,
            [username, encryptedPassword, name],
            (err, results, fields) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ error: err });
              }
              console.log(`Added ${name} as a user to the database.`);
              const { insertId } = results;
              connection.query(
                queryInstantiateStudent,
                [insertId],
                (err, results, fields) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).json({ error: err });
                  }
                  connection.query(
                    queryInstantiateProfile,
                    [insertId],
                    (err, results, fields) => {
                      if (err) {
                        console.log(err);
                        return res.status(500).json({ error: err });
                      }
                      return res.send('dwad200');
                    }
                  );
                }
              );
              // try {
              //   return res.status(200);
              // } catch (err) {
              //   console.log(err);
              //   return res.status(500).json('err!');
              // }
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
