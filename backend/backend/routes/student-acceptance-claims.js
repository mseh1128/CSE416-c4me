const mysql = require('mysql');
const express = require('path');

var queryAddDecision = "INSERT INTO college_declaration (personName, collegeName, acceptanceStatus, questionable, userID) VALUES (?, ?, 'pending', ?, ?)"
var queryChangeQuestionability = "UPDATE college_declaration SET questionable=? where userID=?";
var queryGetDecision = "SELECT * FROM college_declaration WHERE collegename=? AND questionable=0";
var queryDeleteEveryAcceptance = "TRUNCATE college_declaration";

module.exports = function(app, connection){
  app.post("/recordStudentAcceptanceDecision", function(req, res) => {
    let body = JSON.parse(req.body);
    let name = body.name;
    let college = body.college;
    let questionable = body.questionablze;
    let id = body.id;
    connection.query(queryAddDecision, [name, college, questionable, id], (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });

  app.post("/changeQuestionableStatus", function(req, res) => {
    let body=JSON.parse(req.body);
    let questiStatus = body.questiStatus;
    let id = body.id;

    connection.query(queryChangeQuestionability, [questiStatus, id], (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });


  app.get("/retrieveDecision", function(req, res) {
    let collegeName = req.query.collegeName;
    connection.query(queryGetDecision, [collegeName], (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //here we want all the people who have been accepted to ...
    });
  });

  app.post("/deleteEveryCollegeDeclaration", function(req, res) => {
    connection.query(queryChangeQuestionability, (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });

}
