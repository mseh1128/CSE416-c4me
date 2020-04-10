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

const queryGetFilteredColleges =
  'SELECT * FROM college WHERE ';
const queryAnd = ' AND ';

const queryCollegeName = 'collegeName=?';
const queryCollegeNameLax = '(collegeName=? OR collegeName IS NULL)';
const queryAdmissionRate = 'admissionRatePerc BETWEEN ? AND ?';
const queryAdmissionRateOneSided = 'admissionRatePerc ? ?';
const queryAdmissionRateLax = '(admissionRatePerc BETWEEN ? AND ? OR admissionRatePerc IS NULL)';
const queryAdmissionRateOneSidedLax = '(admissionRatePerc ? ? OR admissionRatePerc IS NULL)';
const queryCost = 'cost BETWEEN ? AND ?';
const queryCostOneSided = 'cost ? ?';
const queryCostLax = '(cost BETWEEN ? AND ? OR cost IS NULL)';
const queryCostOneSidedLax = '(cost ? ? OR cost IS NULL)';
const queryRank = 'rank BETWEEN ? and ?';
const queryRankOneSided = 'rank ? ?';
const queryRankLax = '(rank BETWEEN ? and ? OR rank IS NULL)';
const queryRankOneSidedLax = '(rank ? ? OR rank IS NULL)';
const querySize = 'size BETWEEN ? and ?';
const querySizeOneSided = 'size ? ?';
const querySizeLax = '(size BETWEEN ? and ? OR size IS NULL)';
const querySizeOneSidedLax = '(size ? ? OR size IS NULL)';
const querySATMath = 'SATMathScore BETWEEN ? AND ?';
const querySATMathOneSided = 'SATMathScore ? ?';
const querySATMathLax = '(SATMathScore BETWEEN ? AND ? OR SATMathScore IS NULL)';
const querySATMathOneSidedLax = '(SATMathScore ? ? OR SATMathScore IS NULL)';
const querySATEBRW = 'SATEBRWScore BETWEEN ? AND ?';
const querySATEBRWOneSided = 'SATEBRWScore ? ?';
const querySATEBRWLax = '(SATEBRWScore BETWEEN ? AND ? OR SATEBRWScore IS NULL)';
const querySATEBRWOneSidedLax = '(SATEBRWScore ? ? OR SATEBRWScore IS NULL)';
const queryACTComp = 'ACTScore BETWEEN ? AND ?';
const queryACTCompOneSided = 'ACTScore ? ?';
const queryACTCompLax = '(ACTScore BETWEEN ? AND ? OR ACTScore IS NULL)';
const queryACTCompOneSidedLax = '(ACTScore ? ? OR ACTScore IS NULL)';
const queryLocation = 'region=?'
const queryLocationLax = '(region=? OR region IS NULL)'
const queryMajor = 'majors LIKE \"%?%\"'
const queryTwoMajors = '(majors LIKE \"%?%\" OR majors LIKE \"%?%\")'
const queryMajorLax = '(majors LIKE \"%?%\" OR majors IS NULL)'
const queryTwoMajorsLax = '((majors LIKE \"%?%\" OR majors LIKE \"%?%\") OR majors IS NULL)'




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
      (err, results, fields) => {
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


//lb = lower bound, hb = higher bound
  app.get('/getFilteredColleges', (req, res) => {
    //console.log("What good is love and peace on earth");
    console.log(req.query);
    //console.log("when its exclusive?");
    const filters = req.query;
    //console.log("What truth is there in the written word");


    const sevenFilters = ['', '', '', '', '', '', '']
    const seventeenInputs = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']

    function fillInInputs(lb, hb, sfIndex, query, queryOneSided){
        if (lb && hb){
          sevenFilters[sfIndex] = query
          fourteenInputs[2 * sfIndex] = Number(lb)
          fourteenInputs[2 * sfIndex + 1] = Number(hb)
        }
        else if (lb){
          sevenFilters[sfIndex] = queryOneSided;
          fourteenInputs[2 * sfIndex] = '>';
          fourteenInputs[2 * sfIndex + 1] = Number(lb);
        }
        else if (hb){
          sevenFilters[sfIndex] = queryOneSided;
          fourteenInputs[2 * sfIndex] = '<';
          fourteenInputs[2 * sfIndex + 1] = Number(hb);
        }
        else{
          //Nothing should happen here.
        }
    }


    fillInInputs(filters.admissionRateLB, filters.admissionRateUB, 0, queryAdmissionRate, queryAdmissionRateOneSided);
    //console.log("when no one reads it?")
    fillInInputs(filters.costLB, filters.costUB, 1, queryCost, queryCostOneSided);
    fillInInputs(filters.rankLB, filters.rankUB, 2, queryRank, queryRankOneSided);
    fillInInputs(filters.sizetLB, filters.sizeUB, 3, querySize, querySizeOneSided);
    fillInInputs(filters.lbSATMath, filters.hbSATMath, 4, querySATMath, querySATMathOneSided);
    fillInInputs(filters.lbSATEBRW, filters.hbSATEBRW, 5, querySATEBRW, querySATEBRWOneSided);
    fillInInputs(filters.lbACTComp, filters.hbACTComp, 6, queryACTComp, queryACTCompOneSided);


    const emptyFilterTest = sevenFilters.filter(element => element); //filters out seraches that have not been used.
    if (emptyFilterTest === []){
      res.sendStatus(500).json('You did not send anything');
    }
    let finalQueryString = queryGetFilteredColleges + emptyFilterTest.join(queryAnd);

    //this part takes the location.
    if (filters.location){
      if (finalQueryString !== queryGetFilteredColleges){
        finalQueryString += queryAnd;
      }
      finalQueryString += queryLocation;
      seventeenInputs[14] = filters.location;
    }

    //this last part takes care of the majors, which are not numbers and can't be subject to the easy comparison fillInInputs does.
    //a person can handle two majors, which are weird
    if (filters.major1 && filters.major2){
      if (finalQueryString !== queryGetFilteredColleges){
        finalQueryString += queryAnd;
      }
      finalQueryString += queryTwoMajors;
      seventeenInputs[15] = filters.major1;
      seventeenInputs[16] = filters.major2;
    }
    else if (filters.major1 || filters.major2){
      if (finalQueryString !== queryGetFilteredColleges){
        finalQueryString += queryAnd;
      }
      finalQueryString += queryMajor;
      seventeenInputs[15] = filters.major1;
      seventeenInputs[16] = filters.major2;
    }
    else{
      //nothing is supposed to change if a person does not specify majors
    }
    let finalInputs = seventeenInputs.filter(element => element)

    if (finalQueryString === queryGetFilteredColleges){
      finalQueryString = queryGetAllColleges;
    }

    console.log(finalQueryString)
    console.log(finalInputs)

    connection.query(finalQueryString, finalInputs, (err, results, fields) => {
      if (err){
        console.log(err);
        return res.sendStatus(500).json('Fetching college data went wrong');
      }

      console.log(results);
      res.json(results);
    })

  });


  app.get('/getFilteredColleges', (req, res) => {
    //console.log("What good is love and peace on earth");
    console.log(req.query);
    //console.log("when its exclusive?");
    const filters = req.query;
    //console.log("What truth is there in the written word");


    const sevenFilters = ['', '', '', '', '', '', '']
    const seventeenInputs = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']

    function fillInInputs(lb, hb, sfIndex, query, queryOneSided){
        if (lb && hb){
          sevenFilters[sfIndex] = query
          fourteenInputs[2 * sfIndex] = Number(lb)
          fourteenInputs[2 * sfIndex + 1] = Number(hb)
        }
        else if (lb){
          sevenFilters[sfIndex] = queryOneSided;
          fourteenInputs[2 * sfIndex] = '>';
          fourteenInputs[2 * sfIndex + 1] = Number(lb);
        }
        else if (hb){
          sevenFilters[sfIndex] = queryOneSided;
          fourteenInputs[2 * sfIndex] = '<';
          fourteenInputs[2 * sfIndex + 1] = Number(hb);
        }
        else{
          //Nothing should happen here.
        }
    }


    fillInInputs(filters.admissionRateLB, filters.admissionRateUB, 0, queryAdmissionRate, queryAdmissionRateOneSided);
    //console.log("when no one reads it?")
    fillInInputs(filters.costLB, filters.costUB, 1, queryCost, queryCostOneSided);
    fillInInputs(filters.rankLB, filters.rankUB, 2, queryRank, queryRankOneSided);
    fillInInputs(filters.sizetLB, filters.sizeUB, 3, querySize, querySizeOneSided);
    fillInInputs(filters.lbSATMath, filters.hbSATMath, 4, querySATMath, querySATMathOneSided);
    fillInInputs(filters.lbSATEBRW, filters.hbSATEBRW, 5, querySATEBRW, querySATEBRWOneSided);
    fillInInputs(filters.lbACTComp, filters.hbACTComp, 6, queryACTComp, queryACTCompOneSided);


    const emptyFilterTest = sevenFilters.filter(element => element); //filters out seraches that have not been used.
    if (emptyFilterTest === []){
      res.sendStatus(500).json('You did not send anything');
    }
    let finalQueryString = queryGetFilteredColleges + emptyFilterTest.join(queryAnd);

    //this part takes the location.
    if (filters.location){
      if (finalQueryString !== queryGetFilteredColleges){
        finalQueryString += queryAnd;
      }
      finalQueryString += queryLocation;
      seventeenInputs[14] = filters.location;
    }

    //this last part takes care of the majors, which are not numbers and can't be subject to the easy comparison fillInInputs does.
    //a person can handle two majors, which are weird
    if (filters.major1 && filters.major2){
      if (finalQueryString !== queryGetFilteredColleges){
        finalQueryString += queryAnd;
      }
      finalQueryString += queryTwoMajors;
      seventeenInputs[15] = filters.major1;
      seventeenInputs[16] = filters.major2;
    }
    else if (filters.major1 || filters.major2){
      if (finalQueryString !== queryGetFilteredColleges){
        finalQueryString += queryAnd;
      }
      finalQueryString += queryMajor;
      seventeenInputs[15] = filters.major1;
      seventeenInputs[16] = filters.major2;
    }
    else{
      //nothing is supposed to change if a person does not specify majors
    }
    if (finalQueryString === queryGetFilteredColleges){
      console.log("No college will be filtered out");
      finalQueryString = queryGetAllColleges;
    }

    let finalInputs = seventeenInputs.filter(element => element)

    console.log(finalQueryString)
    console.log(finalInputs)

    connection.query(finalQueryString, finalInputs, (err, results, fields) => {
      if (err){
        console.log(err);
        return res.sendStatus(500).json('Fetching college data went wrong');
      }

      console.log(results);
      res.json(results);
    })

  });

};
