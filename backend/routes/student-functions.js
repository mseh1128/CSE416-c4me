const mysql = require('mysql');
const express = require('path');

let queryAddStudent = 'INSERT INTO students (userID) VALUES (?)';

//this assumes that the user only changes one thing at a time.
//also, "profile" means the academic profile of a student user, (SAT score)
//and "student" stores non-academic data of a student user (majors, high school)
//var queryUpdateStudentInfo = "UPDATE students SET ?=? where userID=?";
//var queryUpdateProfileInfo = "UPDATE profile SET ?=? where userID=?";

let queryUpdateStudentInfo =
  'UPDATE student SET state=?, highSchoolCity=?, major1=?, major2=?, highSchool=? where userID=?';
let queryUpdateProfileInfo =
  'UPDATE profile SET highSchoolGPA=?, SATMath=?, SATEBRW=?, ACTEng=?, ACTMath=?, ACTReading=?, ACTSci=?, ACTComp=?, ACTLit=?, APUSHist=?, APWorldHist=?, APMathI=?, APMathII=?, APEcoBio=?, APMolBio=?, APChem=?, APPhysics=?, passedAPAmount=? where userId=?';
let queryAllAboutAStudent =
  'select * from student inner join `profile` on student.userID=`profile`.studentID inner join `user` on `user`.userID=`profile`.studentID where student.userID=?';



module.exports = function(app, connection) {
  app.post('/initializeStudents', (req, res) => {
    let body = JSON.parse(req.body);
    let id = body.id;

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
    console.log(req.body);
    let state = req.body.state;
    let highSchoolCity = req.body.highSchoolCity;
    let major1 = req.body.major1;
    let major2 = req.body.major2;
    let highSchool = req.body.highSchool;
    let id = req.body.id;

    connection.query(
      queryUpdateStudentInfo,
      [state, highSchoolCity, major1, major2, highSchool, id],
      (err, rows, params) => {
        //console.log("state: " + state + "; highSchoolCity: " + highSchoolCity + "; first major: " + major1 + "; second major: " + major2 + "; id: " + id)
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
    let gpa = req.body.gpa;
    let satMath = req.body.satMath;
    let satEBRW = req.body.satEBRW;
    let actEng = req.body.actEng;
    let actMath = req.body.actMath;
    let actReading = req.body.actReading;
    let actSci = req.body.actSci;
    let actComp = req.body.actComp;
    let actLit = req.body.actLit;
    let apUSHist = req.body.apUSHist;
    let apWorldHist = req.body.apWorldHist;
    let apMath1 = req.body.apMath1;
    let apMath2 = req.body.apMath2;
    let apEcoBio = req.body.apEcoBio;
    let apMolBio = req.body.apMolBio;
    let apChem = req.body.apChem;
    let apPhysics = req.body.apPhysics;
    let apPassed = req.body.apPassed;
    let id = req.body.id;

    connection.query(
      queryUpdateProfileInfo,
      [
        gpa,
        satMath,
        satEBRW,
        actEng,
        actMath,
        actReading,
        actSci,
        actComp,
        actLit,
        apUSHist,
        apWorldHist,
        apMath1,
        apMath2,
        apEcoBio,
        apMolBio,
        apChem,
        apPhysics,
        apPassed,
        id
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

  app.get('/retrieveAStudent', (req, res) => {
    console.log(req.query);
    const userID = req.query.userID;
    connection.query(queryAllAboutAStudent, [userID], (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows[0]);
      res.send(rows[0])
    })
  })

  app.post('/deleteStudentsNonAcademicInfo', (req, res) => {
    connection.query(queryDeleteEveryStudent, (err, rows, params) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200).json(rows);
      return;
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
