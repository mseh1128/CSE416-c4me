const mysql = require('mysql');
const express = require('path');

const setAcceptanceStatusQuery =
  'UPDATE college_declaration SET acceptanceStatus=? WHERE studentID=? AND collegeName=?';

const addCollegeDeclarationQuery =
  "INSERT INTO college_declaration(studentID, collegeName, acceptanceStatus, questionable) VALUES (?, ?, 'pending', 0);";

const queryGetDeclaredCollegeNames =
  'SELECT collegeName FROM college_declaration WHERE studentID=?;';

const queryGetDecision =
  'select * from college_declaration inner join student on college_declaration.studentID=student.userID inner join `profile` on student.userID=`profile`.studentID inner join `user` on `user`.userID=`profile`.studentID where collegeName=? and questionable=0;';

const queryGetStudentIDFromOtherSources =
  'select userID from `user` where name=?';

module.exports = function (app, connection) {
  promisifyQuery = (sql, args) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  };

  app.post('/addCollegeDeclaration', (req, res) => {
    const { userID, collegeName } = req.body;
    promisifyQuery(addCollegeDeclarationQuery, [userID, collegeName])
      .then((result) => {
        res.send('Successfully added college declaration!');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

  app.get('/getDeclaredCollegeNames', (req, res) => {
    const { userID } = req.query;
    connection.query(
      queryGetDeclaredCollegeNames,
      [userID],
      (err, results, params) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: err });
        }
        res.send(results);
      }
    );
  });

  app.post('/setAcceptanceStatus', (req, res) => {
    const { collegesWithDecs, userID } = req.body;
    console.log(req.body);
    Promise.all(
      collegesWithDecs.map((college) => {
        const { acceptanceStatus, collegeName } = college;
        return promisifyQuery(setAcceptanceStatusQuery, [
          acceptanceStatus,
          userID,
          collegeName,
        ]);
      })
    )
      .then((result) => {
        console.log(result);
        res.send('Successfully updated acceptance statuses!');
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err });
      });
  });

  app.get('/retrieveStudentsDecisions', (req, res) => {
    const collegeName = req.query.collegeName;
    connection.query(
      queryGetDecision,
      [collegeName],
      (err, results, params) => {
        if (err) {
          console.log(err);
          res.status(500);
          return;
        }

        console.log(results);
        res.json(results); //here we want all the people who have been accepted to ...
      }
    );
  });

  app.get('/getUserIDThroughOtherInfo', (req, res) => {
    const studentName = req.query.studentName;
    connection.query(
      queryGetStudentIDFromOtherSources,
      [studentName],
      (err, results, params) => {
        if (err) {
          console.log(err);
          res.status(500);
          return;
        }

        console.log(results[0]);
        res.json(results[0]);
      }
    );
  });
};
