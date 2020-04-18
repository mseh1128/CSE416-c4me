const getStudentInfo =
  'select u.username, u.name, p.passedAPAmount, p.highSchoolGPA, p.SATMath, p.SATEBRW, p.ACTEng, p.ACTMath, p.ACTReading, p.ACTSci, p.ACTComp, p.SATLit, p.SATUSHist, p.SATWorldHist, p.SATMath1, p.SATMath2, p.SATEcoBio, p.SATMolBio, p.SATChem, p.SATPhysics, residenceState, s.highSchoolCity, s.major1, s.major2, s.highSchoolName, s.highSchoolState, s.collegeClass from user u, profile p, student s where u.userID=s.userID and p.studentID = s.userID and s.userID=?;';

const updateUserInfo = 'UPDATE user SET username = ?, name=? WHERE userID = ?';
const updateStudentInfo =
  'UPDATE student SET residenceState = ?, highSchoolCity = ?, major1 = ?, major2 = ?, highSchoolName = ?, highSchoolState = ?, collegeClass = ? WHERE userID = ?';
const updateProfileInfo =
  'UPDATE profile SET highSchoolGPA = ?, SATMath = ?, SATEBRW = ?, ACTEng = ?, ACTMath = ?, ACTReading = ?, ACTSci = ?, ACTComp = ?, SATLit = ?, SATUSHist = ?, SATWorldHist = ?, SATMath1 = ?, SATMath2 = ?, SATEcoBio = ?, SATMolBio = ?, SATChem = ?, SATPhysics = ?, passedAPAmount = ? WHERE studentID = ?';

module.exports = function (app, connection) {
  app.get('/getStudentInfo', (req, res) => {
    console.log(req.query);
    const { userID } = req.query;
    // inclues student & profile info for student

    connection.query(getStudentInfo, [userID], (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500).json('error occurred!');
      }
      console.log(results);
      res.send(results);
    });
  });

  app.post('/updateStudentInfo', (req, res) => {
    const { state, userID } = req.body;
    console.log(state);
    console.log(userID);
    // res.send(state);
    // try {
    Promise.all([
      connection.query(updateUserInfo, [state.username, state.name, userID]),

      connection.query(updateStudentInfo, [
        state.residenceState,
        state.highSchoolCity,
        state.major1,
        state.major2,
        state.highSchoolName,
        state.highSchoolState,
        state.collegeClass,
        userID,
      ]),

      connection.query(updateProfileInfo, [
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
        return res.sendStatus(500).json('error occurred!');
      });
  });
};
