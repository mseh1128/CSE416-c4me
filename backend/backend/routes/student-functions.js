const mysql = require('mysql');
const express = require('path');

var queryAddStudent = "INSERT INTO students (userID) VALUES (?)";

//this assumes that the user only changes one thing at a time.
//also, "profile" means the academic profile of a student user, (SAT score)
//and "student" stores non-academic data of a student user (majors, high school)
//var queryUpdateStudentInfo = "UPDATE students SET ?=? where userID=?";
//var queryUpdateProfileInfo = "UPDATE profile SET ?=? where userID=?";

var queryUpdateStudentInfo = "UPDATE students SET state=?, highSchoolCity=?, major1=?, major2=?, highSchool=? where userID=?"
var queryUpdateProfileInfo = "UPDATE profile SET highSchoolGPA=?, SATMath=?, ACTEng=?, ACTMath=?, ACTReading=?, ACTSci=?, ACTComp=?, ACTLit=?, APUSHist=?, APWorldHist=?, APMathI=?, APMathII=?, APEcoBio=?, APMolBio=?, APChem=?, APPhysics=?, passedAPAmount=?"

var queryDeleteEveryStudent = "TRUNCATE student";
var queryDeleteEveryProfile = "TRUNCATE profile";

module.exports = function(app, connection){
  app.post("/initializeStudents", (req, res) => {
    let body = JSON.parse(req.body);
    let id = body.id;

    connection.query(queryAddStudent, [id], (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    })
  })

  app.post("/updateStudentInfo", (req, res) => {
    let body = JSON.parse(req.body);
    let state = body.state;
    let highSchoolCity = body.highSchoolCity;
    let major1 = body.major1;
    let major2= body.major2;
    let highSchool = body.highSchool;

    connection.query(queryUpdateStudentInfo, [state, highSchoolCity, majo1, major2, highSchool], (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });

  app.post("/updateProfileInfo", (req, res) => {
    let body = JSON.parse(req.body);
    let gpa = body.gpa;
    let satMath = body.satMath;
    let satEBRW = body.satEBRW;
    let actMath = body.actMath;
    let actReading = body.actReading;
    let actSci = body.actSci;
    let actComp = body.actComp;
    let actLit = body.actLit;
    let apUSHist = body.apUSHist;
    let apWorldHist = body.apWorldHist;
    let apMath1 = body.apMath1;
    let apMath2 = body.apMath2;
    let apEcoBio = body.apEcoBio;
    let apChem = body.apChem;
    let apPhysics = body.apPhysics;

    connection.query(queryUpdateProfileInfo, [category, value, id], (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });

  app.post("/deleteStudentsNonAcademicInfo", (req, res) => {
    connection.query(queryDeleteEveryStudent, (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });

  app.post("/deleteStudentsAcademicInfo", (req, res) => {
    connection.query(queryDeleteEveryProfile, (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
}
