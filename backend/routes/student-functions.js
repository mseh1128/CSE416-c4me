const getStudentInfo =
  'select u.username, u.name, p.passedAPAmount, p.highSchoolGPA, p.SATMath, p.SATEBRW, p.ACTEng, p.ACTMath, p.ACTReading, p.ACTSci, p.ACTComp, p.SATLit, p.SATUSHist, p.SATWorldHist, p.SATMath1, p.SATMath2, p.SATEcoBio, p.SATMolBio, p.SATChem, p.SATPhysics, residenceState, s.highSchoolCity, s.major1, s.major2, s.highSchoolName, s.highSchoolState, s.collegeClass from user u, profile p, student s where u.userID=s.userID and p.studentID = s.userID and s.userID=?;';
const getCollegeDecAcceptanceStatus =
  'SELECT acceptanceStatus FROM college_declaration WHERE studentID=? AND collegeName=?;';
const updateDecQuestionable =
  'UPDATE college_declaration SET questionable=? WHERE studentID=? AND collegeName=?;';
const getCollegeNamesFromStudentDecs =
  'SELECT collegeName FROM college_declaration WHERE studentID=?;';

const updateUserInfo = 'UPDATE user SET username = ?, name=? WHERE userID = ?';
const updateStudentInfo =
  'UPDATE student SET residenceState = ?, highSchoolCity = ?, major1 = ?, major2 = ?, highSchoolName = ?, highSchoolState = ?, collegeClass = ? WHERE userID = ?';
const updateProfileInfo =
  'UPDATE profile SET highSchoolGPA = ?, SATMath = ?, SATEBRW = ?, ACTEng = ?, ACTMath = ?, ACTReading = ?, ACTSci = ?, ACTComp = ?, SATLit = ?, SATUSHist = ?, SATWorldHist = ?, SATMath1 = ?, SATMath2 = ?, SATEcoBio = ?, SATMolBio = ?, SATChem = ?, SATPhysics = ?, passedAPAmount = ? WHERE studentID = ?';
const {
  getPrimaryCollegeStatsQuery,
  getPrimaryStudentStatsQuery,
  checkIfQuestionable,
} = require('../utils');

module.exports = function (app, connection) {
  promisifyQuery = (sql, args) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  };

  app.post('/updateQuestionableDecs', (req, res) => {
    const { userID } = req.body;
    promisifyQuery(getCollegeNamesFromStudentDecs, [userID]).then((cNames) => {
      return Promise.all(
        cNames.map((cNameRow) => {
          const collegeName = cNameRow.collegeName;
          return new Promise((resolve, reject) => {
            Promise.all([
              promisifyQuery(getPrimaryStudentStatsQuery, [userID]),
              promisifyQuery(getPrimaryCollegeStatsQuery, [collegeName]),
              promisifyQuery(getCollegeDecAcceptanceStatus, [
                userID,
                collegeName,
              ]),
            ])
              .then((results) => {
                console.log(results);
                const isQuestionable = checkIfQuestionable(
                  results[0][0],
                  results[1][0],
                  results[2][0].acceptanceStatus
                );
                console.log(isQuestionable);
                promisifyQuery(updateDecQuestionable, [
                  isQuestionable,
                  userID,
                  collegeName,
                ]);
              })
              .then((results) => {
                console.log(results);
                resolve();
              })
              .catch((err) => {
                console.log(err);
                console.log('Error occurred');
                reject(err);
              });
          });
        })
      )
        .then((result) => {
          console.log('Finished successfully');
          return res.send('Successfully updated decs!');
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    });
  });

  app.get('/getStudentInfo', (req, res) => {
    console.log(req.query);
    const { userID } = req.query;
    // inclues student & profile info for student
    promisifyQuery(getStudentInfo, [userID])
      .then((results) => {
        console.log(results);
        res.send(results);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err });
      });
  });

  app.post('/updateStudentInfo', (req, res) => {
    const { state, userID } = req.body;
    console.log(state);
    console.log(userID);
    // res.send(state);
    // try {
    Promise.all([
      promisifyQuery(updateUserInfo, [state.username, state.name, userID]),
      promisifyQuery(updateStudentInfo, [
        state.residenceState,
        state.highSchoolCity,
        state.major1,
        state.major2,
        state.highSchoolName,
        state.highSchoolState,
        state.collegeClass,
        userID,
      ]),
      promisifyQuery(updateProfileInfo, [
        state.highSchoolGPA,
        state.SATMath,
        state.SATEBRW,
        state.ACTEng,
        state.ACTMath,
        state.ACTReading,
        state.ACTSci,
        state.ACTComp,
        state.SATLit,
        state.SATUSHist,
        state.SATWorldHist,
        state.SATMath1,
        state.SATMath2,
        state.SATEcoBio,
        state.SATMolBio,
        state.SATChem,
        state.SATPhysics,
        state.passedAPAmount,
        userID,
      ]),
    ])
      .then((result) => {
        console.log('in here result page');
        return res.send('Everything updated properly');
      })
      .catch((err) => {
        // mysql overriding this for some annoying reason!
        console.log('in here error page');
        console.log('error occurred');
        console.log(err);
        return res.status(500).json({ error: err });
      });
  });
};
