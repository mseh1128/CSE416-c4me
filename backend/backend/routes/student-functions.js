const mysql = require('mysql');
const express = require('path');

const queryAddStudent = 'INSERT INTO students (userID) VALUES (?)';

//this assumes that the user only changes one thing at a time.
//also, "profile" means the academic profile of a student user, (SAT score)
//and "student" stores non-academic data of a student user (majors, high school)
const queryUpdateStudentInfo = 'UPDATE students SET ?=? where userID=?';
const queryUpdateProfileInfo = 'UPDATE profile SET ?=? where userID=?';
const queryDeleteEveryStudent = 'TRUNCATE student';
const queryDeleteEveryProfile = 'TRUNCATE profile';

module.exports = function(app, connection) {
  app.post('/initializeStudents', (req, res) => {
    const body = JSON.parse(req.body);
    const id = body.id;

    connection.query(queryAddStudent, [id], (err, rows, params) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });

  app.post('/updateStudentInfo', (req, res) => {
    const body = JSON.parse(req.body);
    const category = body.category;
    const value = body.value;
    const id = body.id;

    connection.query(
      queryUpdateStudentInfo,
      [category, value, id],
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

  app.post('/updateProfileInfo', (req, res) => {
    const body = JSON.parse(req.body);
    const category = body.category;
    const value = body.value;
    const id = body.id;

    connection.query(
      queryUpdateProfileInfo,
      [category, value, id],
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

  app.post('/deleteStudentsNonAcademicInfo', (req, res) => {
    connection.query(queryDeleteEveryStudent, (err, rows, params) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });

  app.post('/deleteStudentsAcademicInfo', (req, res) => {
    connection.query(queryDeleteEveryProfile, (err, rows, params) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
};
