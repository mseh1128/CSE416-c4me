const mysql = require('mysql');
const express = require('path');

// (userID INT NOT NULL, collegeName VARCHAR(90) NOT NULL, questionable BOOL NOT NULL DEFAULT false, PRIMARY KEY (`userID`, `collegeName`));
const queryAddDecision =
  "INSERT INTO college_declaration (userID, collegeName, acceptanceStatus, questionable) VALUES (?, ?, 'pending', false)";
const queryChangeQuestionability =
  'UPDATE college_declaration SET questionable=? where userID=?';
const queryGetDecision =
  'SELECT * FROM college_declaration WHERE collegename=? AND questionable=0';
const queryDeleteEveryAcceptance = 'TRUNCATE college_declaration';

module.exports = function(app, connection) {
  // app.post('/addCollegeDeclaration', (req, res) => {
  //   const
  //   const body = JSON.parse(req.body);
  //   const name = body.name;
  //   const college = body.college;
  //   const questionable = body.questionablze;
  //   const id = body.id;
  //   connection.query(
  //     queryAddDecision,
  //     [name, college, questionable, id],
  //     (err, rows, params) => {
  //       if (err) {
  //         console.log(err);
  //         res.sendStatus(500);
  //         return;
  //       }
  //       res.sendStatus(200);
  //     }
  //   );
  // });

  app.post('/changeQuestionableStatus', (req, res) => {
    const body = JSON.parse(req.body);
    const questiStatus = body.questiStatus;
    const id = body.id;

    connection.query(
      queryChangeQuestionability,
      [questiStatus, id],
      (err, rows, params) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      }
    );
  });

  app.get('/retrieveDecision', (req, res) => {
    const collegeName = req.query.collegeName;
    connection.query(queryGetDecision, [collegeName], (err, rows, params) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //here we want all the people who have been accepted to ...
    });
  });

  app.post('/deleteEveryCollegeDeclaration', (req, res) => {
    connection.query(queryChangeQuestionability, (err, rows, params) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
};
