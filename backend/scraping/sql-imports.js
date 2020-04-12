const scrapeCollegeScorecard = require('./CollegeScorecard/college-scorecard');
const scrapeCollegeData = require('./college-data');
const scrapeCollegeRanking = require('./college-ranking');
const mysql = require('mysql');
const queryInsertCollegeScorecard = `INSERT INTO college (collegeName, city, state, admissionRatePercent, institutionType, medianCompletedStudentDebt, size) 
  VALUES (?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    city=?, state=?,admissionRatePercent=?,institutionType=?,medianCompletedStudentDebt=?,size=?`;
const queryInsertCollegeData = `INSERT INTO college (collegeName, inStateAttendanceCost, outOfStateAttendanceCost, completionRate, GPA, SATMathScore, SATEBRWScore, ACTScore) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    inStateAttendanceCost=?, outOfStateAttendanceCost=?, completionRate=?, GPA=?, SATMathScore=?, SATEBRWScore=?, ACTScore=?`;

const queryInsertMajor = `INSERT IGNORE INTO major (collegeName, major) 
  VALUES (?, ?)`;

const queryUpdateRank = 'UPDATE college SET ranking=? WHERE collegeName=?';

// const queryInsertCollegeData = `INSERT INTO college (collegeName, city, state, admissionRatePercent, institutionType, medianCompletedStudentDebt, size)
//   VALUES (?, ?, ?, ?, ?, ?, ?)
//   ON DUPLICATE KEY UPDATE
//     city=?, state=?,admissionRatePercent=?,institutionType=?,medianCompletedStudentDebt=?,size=?`;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'gas pedal',
  database: 'college_recommender',
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
// all scraping functions return promises!

const NaNToNull = (potentialNullField) => {
  if (isNaN(potentialNullField)) return null;
  return potentialNullField;
};

const collegeRankingToSQL = async () => {
  try {
    const collegeRanking = await scrapeCollegeRanking();
    const promises = [];
    for (const college in collegeRanking) {
      const rank = collegeRanking[college];
      promises.push(connection.query(queryUpdateRank, [rank, college]));
    }
    // return Promise.all(promises);
  } catch (err) {
    console.log('ERROR OCCURRED');
    throw err;
  }
};

collegeRankingToSQL()
  .then((res) =>
    console.log('All college ranking data was succesfully saved to DB!')
  )
  .catch((err) => console.log(err));

const collegeDataToSQL = async () => {
  try {
    const collegeData = await scrapeCollegeData();
    const promises = [];

    for (const college in collegeData) {
      let {
        InStateAttendanceCost,
        OutStateAttendanceCost,
        completionRate,
        majors,
        avgGPA,
        avgSATMath,
        avgSATEBRW,
        avgACTComposite,
      } = collegeData[college];

      InStateAttendanceCost = NaNToNull(InStateAttendanceCost);
      OutStateAttendanceCost = NaNToNull(OutStateAttendanceCost);
      completionRate = NaNToNull(completionRate);
      // majors = NaNToNull(majors);
      avgGPA = NaNToNull(avgGPA);
      avgSATMath = NaNToNull(avgSATMath);
      avgSATEBRW = NaNToNull(avgSATEBRW);
      avgACTComposite = NaNToNull(avgACTComposite);
      promises.push(
        new Promise(async (resolve, reject) => {
          try {
            await connection.query(queryInsertCollegeData, [
              college,
              InStateAttendanceCost,
              OutStateAttendanceCost,
              completionRate,
              avgGPA,
              avgSATMath,
              avgSATEBRW,
              avgACTComposite,
              InStateAttendanceCost,
              OutStateAttendanceCost,
              completionRate,
              avgGPA,
              avgSATMath,
              avgSATEBRW,
              avgACTComposite,
            ]);
            const majorPromises = majors.map((major) =>
              connection.query(queryInsertMajor, [college, major])
            );

            await Promise.all(majorPromises);
            resolve();
          } catch (err) {
            console.log('ERROR OCCURRED');
            throw err;
          }
        })
      );
    }
    return Promise.all(promises);
  } catch (err) {
    console.log('ERROR OCCURRED');
    throw err;
  }
};

const collegeScorecardStreamToSQL = async () => {
  // scrapes directly from huge college scorecard file site (stream) so will take a long time
  try {
    const collegeScorecardData = await scrapeCollegeScorecard();
    // console.log(type(collegeScorecardData));
    const promises = [];

    for (const college in collegeScorecardData) {
      const {
        city,
        state,
        admissionRatePercent,
        institutionType,
        medianCompletedStudentDebt,
        size,
      } = collegeScorecardData[college];

      promises.push(
        connection.query(queryInsertCollegeScorecard, [
          college,
          city,
          state,
          admissionRatePercent,
          institutionType,
          medianCompletedStudentDebt,
          size,
          city,
          state,
          admissionRatePercent,
          institutionType,
          medianCompletedStudentDebt,
          size,
        ])
      );
    }
    return Promise.all(promises);
    // return new Promise((resolve) => resolve('hi'));
    // console.log(promiseResult);
    // console.log(promiseResult);
  } catch (err) {
    console.log('Error occurred when scraping college scorecard');
    // console.log(err);
    throw err;
  }
};

// collegeDataToSQL()
//   .then((res) => {
//     console.log('All college data was succesfully pushed!');
//     collegeScorecardStreamToSQL();
//   })
//   .then((res) =>
//     console.log('All college scorecard data was succesfully saved to DB!')
//   )
//   .catch((err) => console.log(err));

// collegeScorecardStreamToSQL()
//   .then((res) =>
//     console.log('All college scorecard data was succesfully saved to DB!')
//   )
//   .catch((err) => console.log(err));
