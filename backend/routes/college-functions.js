const mysql = require('mysql');
const express = require('path');

//the tables really do have 12 variables,
//and I would really like to add them all at once
//because this is meant to be a complete thing.
const queryInsertCollege =
  'INSERT INTO college VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

//this is quick and dirty, make sure to make a separate table for alternate
//spellings and other things that college is called.
const queryGetCollege = 'SELECT * FROM college WHERE collegeName=?';
const queryGetAllColleges = 'SELECT * FROM college';
const queryGetStudentCollegeDecs =
  'SELECT * FROM college_declaration WHERE userID=?';

module.exports = function(app, connection) {
  app.post('/insertCollege', (req, res) => {
    console.log(req.body);
    const body = JSON.parse(req.body);
    const state = body.state;
    const cost = body.cost;
    const majors = body.majors; //majors offered at this
    const satEBRW = body.satEBRW; //SAT EBRW score
    const satMath = body.satMath; //SAT Math Score
    const actComposite = body.actComposite; //ACT Composite Score
    const admissionRatePerc = body.admissionRatePerc;
    const averageDebt = body.averageDebt;
    const size = body.size; //amount of people the college can handle
    const region = body.region;
    connection.query(
      queryInsertCollege,
      [
        state,
        cost,
        majors,
        satEBRW,
        satMath,
        actComposite,
        admissionRatePerc,
        averageDebt,
        size,
        region
      ],
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

  app.get('/getAllColleges', (req, res) => {
    connection.query(queryGetAllColleges, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500).json('error occurred!');
      }
      console.log(results);
      res.send(results);
    });
  });

  app.get('/getCollege', (req, res) => {
    console.log(req.query);
    const { collegeName } = req.query;
    connection.query(queryGetCollege, [collegeName], (err, results, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.send(results[0]);
    });
  });

  app.get('/getStudentCollegeDeclarations', (req, res) => {
    const { userID } = req.query;
    connection.query(
      queryGetStudentCollegeDecs,
      [userID],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.send(results);
      }
    );
  });
};
