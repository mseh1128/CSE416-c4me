const mysql = require('mysql');
const express = require('path');

//the tables really do have 12 variables,
//and I would really like to add them all at once
//because this is meant to be a complete thing.
var queryInsertCollege = "INSERT INTO college VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

//this is quick and dirty, make sure to make a separate table for alternate
//spellings and other things that college is called.
var queryFetchCollege = "SELECT * FROM college WHERE college=?";

module.exports = function(app, connection){
  app.post("/insertCollege", (req, res) => {
    console.log(req.body);
    let body = JSON.parse(req.body);
    let state = body.state;
    let cost = body.cost;
    let majors = body.majors;     //majors offered at this
    let satEBRW = body.satEBRW;   //SAT EBRW score
    let satMath = body.satMath;   //SAT Math Score
    let actComposite = body.actComposite //ACT Composite Score
    let admissionRatePerc = body.admissionRatePerc;
    let averageDebt = body.averageDebt;
    let size = body.size; //amount of people the college can handle
    let region = body.region;
    connection.query(queryInsertCollege, [state, cost, majors, satEBRW, satMath, actComposite, admissionRatePerc, averageDebt, size, region], (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });


  app.get("/retrieveCollege", (req, res) => {
    let college = req.query.college;
    connection.query(queryAdd, [college], (err, rows, params) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows[0]);
    });
  });
}
