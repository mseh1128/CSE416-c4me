const bcrypt = require('bcrypt');
const {
  collegeRankingToSQL,
  collegeDataToSQL,
  collegeScorecardCSVToSQL,
} = require('../scraping/sql-imports.js');
const scrapeNicheHighSchool = require('../scraping/niche-high-school.js');

const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const {
  getPrimaryCollegeStatsQuery,
  getPrimaryStudentStatsQuery,
  checkIfQuestionable,
} = require('../utils');
const salt = 10;

const deleteAllStudentProfilesQuery =
  'DELETE u FROM User u, Student S WHERE S.userID = u.userID;';

const insertDatasetToUserQuery =
  'insert ignore into user(username, userPassword, userID, name) values (?, ?, ?, ?); ';

const insertDatasetToStudentQuery =
  'insert ignore into student(userID, residenceState, major1, major2, highSchoolName, highSchoolCity, highSchoolState, collegeClass) values (?, ?, ?, ?, ?, ?, ?, ?); ';

const insertDatasetToProfileQuery =
  'insert ignore into profile(studentID, highSchoolGPA, SATMath, SATEBRW, ACTEng, ACTMath, ACTReading, ACTSci, ACTComp, SATLit, SATUSHist, SATWorldHist, SATMath1, SATMath2, SATEcoBio, SATMolBio, SATChem, SATPhysics, passedAPAmount) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ';

const insertDatasetToHighSchoolQuery =
  'INSERT IGNORE INTO high_school(highSchoolName, highSchoolCity, highSchoolState, numOfStudents, institutionType, studentRatio, avgGradRatePerc, avgSAT, avgACT, APEnrollmentPerc, numSATResponses, numACTResponses) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

const checkHighSchoolExistenceQuery =
  'SELECT EXISTS(SELECT * FROM high_school WHERE highSchoolName=? and highSchoolCity=? and highSchoolState=?) AS highSchoolExists;';

const insertDatasetToDeclarationQuery =
  'insert ignore into college_declaration(studentID, collegeName, acceptanceStatus, questionable) values (?, ?, ?, ?); ';

const getQuestionableAcceptanceInfoQuery =
  'select u.name, s.userID, s.highSchoolName, s.major1, s.major2, p.SATMath, p.SATEBRW, p.ACTComp, cd.acceptanceStatus, c.collegeName, c.state, c.city, c.ACTScore, c.SATEBRWScore, c.SATMathScore, c.admissionRatePercent, c.institutionType, c.medianCompletedStudentDebt, c.size, c.completionRate, c.inStateAttendanceCost, c.outOfStateAttendanceCost, c.ranking  from user u, student s, college_declaration cd, profile p, college c where questionable=1 and s.userID=cd.studentID and c.collegeName=cd.collegeName and s.userID=p.studentID and u.userID=s.userID;';

const markQuestionableDecisionFalseQuery =
  'UPDATE college_declaration SET questionable=false WHERE studentID=? AND collegeName=?;';

const removeQuestionableDecisionQuery =
  'DELETE FROM college_declaration WHERE studentID=? AND collegeName=?;';

// console.log(collegeRankingToSQL);
module.exports = function (app, connection) {
  promisifyQuery = (sql, args) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  };

  app.post('/scrapeCollegeRankings', async (req, res) => {
    try {
      await collegeRankingToSQL();
      return res.send(
        'College ranking data was succesfully scraped & saved to DB!'
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  app.post('/scrapeCollegeData', async (req, res) => {
    try {
      await collegeDataToSQL();
      return res.send('College data was succesfully scraped & saved to DB!');
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  app.post('/importCollegeScorecard', async (req, res) => {
    try {
      await collegeScorecardCSVToSQL();
      return res.send(
        'College scorecard was succesfully scraped & saved to DB!'
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  app.post('/importStudentProfiles', async (req, res) => {
    const readStream = fs
      .createReadStream(
        path.resolve(__dirname, './StudentDataset/student_profile_dataset.csv')
      )
      .pipe(csv());

    const promises = [];
    readStream
      .on('data', (data) => {
        console.log(data);
        for (const key in data) {
          // empty string to null
          if (data[key] === '') data[key] = null;
        }
        const {
          userid,
          password,
          residence_state,
          high_school_name,
          high_school_city,
          high_school_state,
          GPA,
          college_class,
          major_1,
          major_2,
          SAT_math,
          SAT_EBRW,
          ACT_English,
          ACT_math,
          ACT_reading,
          ACT_science,
          ACT_composite,
          SAT_literature,
          SAT_US_hist,
          SAT_world_hist,
          SAT_math_1,
          SAT_math_2,
          SAT_eco_bio,
          SAT_mol_bio,
          SAT_chemistry,
          SAT_physics,
          num_AP_passed,
          username,
          name,
        } = data;
        const encryptedPassword = bcrypt.hashSync(password, salt);
        promises.push(
          promisifyQuery(insertDatasetToUserQuery, [
            username,
            encryptedPassword,
            userid,
            name,
          ])
            .then(() => {
              return promisifyQuery(insertDatasetToStudentQuery, [
                userid,
                residence_state,
                major_1,
                major_2,
                high_school_name,
                high_school_city,
                high_school_state,
                college_class,
              ]);
            })
            .then(() => {
              return promisifyQuery(insertDatasetToProfileQuery, [
                userid,
                GPA,
                SAT_math,
                SAT_EBRW,
                ACT_English,
                ACT_math,
                ACT_reading,
                ACT_science,
                ACT_composite,
                SAT_literature,
                SAT_US_hist,
                SAT_world_hist,
                SAT_math_1,
                SAT_math_2,
                SAT_eco_bio,
                SAT_mol_bio,
                SAT_chemistry,
                SAT_physics,
                num_AP_passed,
              ]);
            })
            .then(() => {
              return promisifyQuery(checkHighSchoolExistenceQuery, [
                high_school_name,
                high_school_city,
                high_school_state,
              ]);
            })
            .then((highSchoolExistsData) => {
              const highSchoolExists = highSchoolExistsData[0].highSchoolExists;
              if (!highSchoolExists) {
                scrapeNicheHighSchool({
                  highSchoolName: high_school_name,
                  highSchoolCity: high_school_city,
                  highSchoolState: high_school_state,
                })
                  .then((scrapedHSData) => {
                    const {
                      highSchoolName,
                      highSchoolCity,
                      highSchoolState,
                      numOfStudents,
                      institutionType,
                      studentRatio,
                      gradRate,
                      avgSAT,
                      avgACT,
                      APEnrollment,
                      numAvgSATResponses,
                      numAvgACTResponses,
                    } = scrapedHSData;
                    return promisifyQuery(insertDatasetToHighSchoolQuery, [
                      highSchoolName,
                      highSchoolCity,
                      highSchoolState,
                      numOfStudents,
                      institutionType,
                      studentRatio,
                      gradRate,
                      avgSAT,
                      avgACT,
                      APEnrollment,
                      numAvgSATResponses,
                      numAvgACTResponses,
                    ]);
                  })
                  .catch((err) => {
                    throw err;
                  });
              }
            })
            .then(() => {
              console.log(`User ${username} successfully saved`);
            })
            .catch((err) => {
              console.log('Error occurred');
              console.log(err);
              // throw err;
            })
        );
      })
      .on('end', async () => {
        await Promise.all(promises);
        const applicationReadStream = fs
          .createReadStream(
            path.resolve(__dirname, './StudentDataset/application_file.csv')
          )
          .pipe(csv());

        applicationReadStream
          .on('data', async (appData) => {
            const { userid, college, status } = appData;
            // console.log(GPA);
            const studentPrimaryStats = await promisifyQuery(
              getPrimaryStudentStatsQuery,
              [userid]
            );
            const collegePrimaryStats = await promisifyQuery(
              getPrimaryCollegeStatsQuery,
              [college]
            );
            // console.log(studentPrimaryStats);
            // console.log(collegePrimaryStats);
            const isQuestionable = checkIfQuestionable(
              studentPrimaryStats[0],
              collegePrimaryStats[0],
              status
            );

            await promisifyQuery(insertDatasetToDeclarationQuery, [
              userid,
              college,
              status,
              isQuestionable,
            ]);
          })
          .on('end', () => {
            console.log('Data has all finished processing');
            return res.send('All student profiles were imported successfully!');
          })
          .on('error', (e) => {
            console.log(err);
            return res.status(500).json(err);
          });
        // return res.send('All student profiles were imported successfully!');
      })
      .on('error', (e) => {
        // error occurs b/c closing stream prematurely
        // so may attemp to push after EOF
        console.log(err);
        return res.status(500).json(err);
      });
    // try {
    //   await connection.query(
    //     'DELETE u FROM User u, Student S WHERE S.userID = u.userID;'
    //   );
    //   return res.send('All student profiles were deleted successfully!');
    // } catch (err) {
    //   console.log(err);
    //   console.log(err);
    //   return res.status(500).json(err);
    // }
  });

  app.delete('/deleteStudentProfiles', async (req, res) => {
    try {
      await promisifyQuery(deleteAllStudentProfilesQuery);
      return res.send('All student profiles were deleted successfully!');
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  app.put('/markQuestionableDecisionFalse', async (req, res) => {
    const { userID, collegeName } = req.body;
    try {
      await promisifyQuery(markQuestionableDecisionFalseQuery, [
        userID,
        collegeName,
      ]);
      return res.send('The decision was marked false!');
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  app.put('/removeQuestionableDecision', async (req, res) => {
    const { userID, collegeName } = req.body;
    try {
      await promisifyQuery(removeQuestionableDecisionQuery, [
        userID,
        collegeName,
      ]);
      return res.send('The decision was marked false!');
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  });

  app.get('/getQuestionableAcceptanceInfo', (req, res) => {
    promisifyQuery(getQuestionableAcceptanceInfoQuery)
      .then((result) => {
        const acceptanceInfo = result.map((allInfo) => {
          const {
            name,
            highSchoolName,
            major1,
            major2,
            SATMath,
            SATEBRW,
            ACTComp,
            acceptanceStatus,
            userID,
          } = allInfo;
          const {
            collegeName,
            state,
            city,
            ACTScore,
            SATEBRWScore,
            SATMathScore,
            admissionRatePercent,
            institutionType,
            medianCompletedStudentDebt,
            size,
            completionRate,
            inStateAttendanceCost,
            outOfStateAttendanceCost,
            ranking,
          } = allInfo;
          return {
            studentInfo: {
              name,
              highSchoolName,
              major1,
              major2,
              SATMath,
              SATEBRW,
              ACTComp,
              acceptanceStatus,
              userID,
            },
            collegeInfo: {
              collegeName,
              state,
              city,
              ACTScore,
              SATEBRWScore,
              SATMathScore,
              admissionRatePercent,
              institutionType,
              medianCompletedStudentDebt,
              size,
              completionRate,
              inStateAttendanceCost,
              outOfStateAttendanceCost,
              ranking,
            },
          };
        });
        res.send(acceptanceInfo);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    // try {
    //   await connection.query(getQuestionableAcceptanceInfoQuery);
    //   return res.send('All student profiles were deleted successfully!');
    // } catch (err) {
    //   console.log(err);
    //   console.log(err);
    //   return res.status(500).json(err);
    // }
  });
};
