const mysql = require('mysql');
const express = require('path');

const sliderConfig = require('./constants');
const {
  admissionRate,
  costOfAttendance,
  rank,
  size,
  avgSAT,
  avgACT,
} = sliderConfig;
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
const queryGetCollegesFromStudentDecs =
  'SELECT c.*, cd.questionable, cd.acceptanceStatus FROM college c, college_declaration cd WHERE c.collegeName=cd.collegeName AND cd.studentID=?;';

const queryGetStudentProfile =
  'SELECT s.residenceState, p.studentID, p.highSchoolGPA, p.SATMath, p.SATEBRW, p.ACTComp FROM student s, profile p WHERE s.userID=? AND s.userID = p.studentID;';
const queryGetNumOfNonNullFields =
  'SELECT SUM(!ISNULL(highSchoolGPA)+!ISNULL(SATMath)+!ISNULL(SATEBRW)+!ISNULL(ACTComp)) AS numOfNonNullFields FROM profile p WHERE p.studentID=?;';
const queryGetSimilarStudentProfiles =
  'SELECT f.studentID FROM profile f WHERE f.studentID<>? AND (f.highSchoolGPA BETWEEN ?-0.2 AND ?+0.2) AND (f.SATMath BETWEEN ?-40 AND ?+40) AND (f.SATEBRW BETWEEN ?-40 AND ?+40) AND (f.ACTComp BETWEEN ?-3 AND ?+3);';
const queryGetSimilarStudentAcceptanceStatus =
  'SELECT acceptanceStatus FROM college_declaration WHERE studentID=? AND collegeName=?';
const querygetCollegeAvg =
  'SELECT state, GPA, SATMathScore, SATEBRWScore, ACTScore FROM college WHERE collegeName=?;';
// const queryMajor = 'majors LIKE "%?%"';
// const queryTwoMajors = '(majors LIKE "%?%" OR majors LIKE "%?%")';
// const queryMajorLax = '(majors LIKE "%?%" OR majors IS NULL)';
// const queryTwoMajorsLax =
//   '((majors LIKE "%?%" OR majors LIKE "%?%") OR majors IS NULL)';

module.exports = function (app, connection) {
  promisifyQuery = (sql, args) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  };

  calculateAvgDiff = (collegeNames, studentProfile) => {
    const {
      residenceState,
      studentID,
      highSchoolGPA,
      SATMath,
      SATEBRW,
      ACTComp,
    } = studentProfile;
    return Promise.all(
      // console.log(studentProfile);
      collegeNames.map((collegeName) => {
        return new Promise((resolve, reject) => {
          promisifyQuery(querygetCollegeAvg, [collegeName])
            .then((collegesAvgs) => {
              const {
                state,
                GPA,
                SATMathScore,
                SATEBRWScore,
                ACTScore,
              } = collegesAvgs[0];

              let totalScore = 100;
              let numOfComparisons = 0;
              if (GPA && highSchoolGPA) {
                numOfComparisons++;
                totalScore -=
                  2 * Math.floor(Math.abs((highSchoolGPA * 10 - GPA * 10) / 2));
              }
              if (SATMathScore && SATMath) {
                numOfComparisons++;
                totalScore -= Math.floor(
                  Math.abs((SATMath - SATMathScore) / 5)
                );
              }
              if (SATEBRWScore && SATEBRW) {
                numOfComparisons++;
                totalScore -= Math.floor(
                  Math.abs((SATEBRW - SATEBRWScore) / 5)
                );
              }
              if (ACTScore && ACTComp) {
                numOfComparisons++;
                totalScore -=
                  3 * Math.floor(Math.abs((ACTComp - ACTScore) / 1));
              }
              if (state && residenceState !== state) {
                totalScore -= 5;
              }
              if (numOfComparisons < 2) resolve([collegeName, null]);
              if (totalScore < 0) totalScore = 0;
              resolve([collegeName, totalScore / 100]);
            })
            .catch((err) => {
              console.log('Error occurred trying to get college stats');
              return reject(err);
            });
        });
      })
    );
  };

  app.post('/computeCollegeRecs', (req, response) => {
    const { userID, collegeNames } = req.body;
    let studentProfile = null;
    promisifyQuery(queryGetNumOfNonNullFields, [userID])
      .then((res) => {
        if (res[0].numOfNonNullFields < 2) {
          throw 'You need atleast 2 of the following to compute college rec score: GPA, SATMath, SATEBRW, ACT Composite';
        }
      })
      .then(() => {
        return promisifyQuery(queryGetStudentProfile, [userID]);
      })
      .then((results) => {
        // console.log(results[0]);
        studentProfile = results[0];
        const {
          studentID,
          highSchoolGPA,
          SATMath,
          SATEBRW,
          ACTComp,
        } = results[0];

        return promisifyQuery(queryGetSimilarStudentProfiles, [
          studentID,
          highSchoolGPA,
          highSchoolGPA,
          SATMath,
          SATMath,
          SATEBRW,
          SATEBRW,
          ACTComp,
          ACTComp,
        ]);
      })
      .then((results) => {
        const similarStudentIDs = results.map(({ studentID }) => studentID);
        if (results == 0) {
          console.log('results are 0');
          // no similar student profiles
          // immediately do the calcualte avg diff
          return Promise.all([
            this.calculateAvgDiff(collegeNames, studentProfile),
            null,
          ]);
        } else {
          return Promise.all([
            Promise.all(
              collegeNames.map((collegeName) => {
                return new Promise((resolve, reject) => {
                  Promise.all(
                    similarStudentIDs.map((studentID) => {
                      // console.log(studentID);
                      return promisifyQuery(
                        queryGetSimilarStudentAcceptanceStatus,
                        [studentID, collegeName]
                      );
                    })
                  )
                    .then((res) => {
                      let totalSimilarApplied = 0;
                      let totalSimilarAccepted = 0;
                      res.forEach((studentASRow) => {
                        // console.log(studentASRow);
                        if (
                          studentASRow !== undefined &&
                          studentASRow.length != 0
                        )
                          if (!studentASRow) {
                            console.log('Nothing here so they didnt apply');
                          } else {
                            if (
                              studentASRow[0].acceptanceStatus === 'accepted'
                            ) {
                              totalSimilarAccepted++;
                            }
                            totalSimilarApplied++;
                          }
                      });
                      // console.log(collegeName);
                      // console.log(res);
                      resolve([
                        collegeName,
                        totalSimilarAccepted,
                        totalSimilarApplied,
                      ]);
                    })
                    .catch((err) => {
                      // console.log(err);
                      reject(err);
                      // return res.status(500).json('error occurred!');
                    });
                });
              })
            ),
            this.calculateAvgDiff(collegeNames, studentProfile),
          ]);
        }
      })
      .then((res) => {
        const cNameToRecScore = {};
        if (res[1] === null) {
          // ie there were no similar profiles
          const avgResArr = res[0];
          const avgRes = {};
          avgResArr.forEach(([collegeName, totalScoreAsPerc]) => {
            avgRes[collegeName] = {
              totalScoreAsPerc,
            };
          });

          collegeNames.forEach((cName) => {
            const { totalScoreAsPerc } = avgRes[cName];
            if (totalScoreAsPerc === null) {
              // if no similar profiless & totalScoreAsPerc cannot be computed, set score to NULL!
              cNameToRecScore[cName] = null;
            }
            cNameToRecScore[cName] = 100 * avgRes[cName].totalScoreAsPerc;
          });
        } else {
          const similarProfArr = res[0];
          const similarProfRes = {};
          similarProfArr.forEach(
            ([collegeName, totalSimilarAccepted, totalSimilarApplied]) => {
              similarProfRes[collegeName] = {
                totalSimilarAccepted,
                totalSimilarApplied,
              };
            }
          );
          const avgResArr = res[1];
          const avgRes = {};
          avgResArr.forEach(([collegeName, totalScoreAsPerc]) => {
            avgRes[collegeName] = {
              totalScoreAsPerc,
            };
          });

          // console.log(similarProfRes);
          // console.log(avgRes);

          // similarProfRes, avgRes
          collegeNames.forEach((cName) => {
            const {
              totalSimilarAccepted,
              totalSimilarApplied,
            } = similarProfRes[cName];
            const { totalScoreAsPerc } = avgRes[cName];
            if (totalSimilarApplied === 0) {
              // console.log('no similar');
              if (totalScoreAsPerc === null) {
                // console.log('in tscore cant be computed');
                cNameToRecScore[cName] = null;
                // if no applied profs & totalScoreAsPerc cannot be computed, set score to NULL!
              } else {
                // console.log('in totalscore can be computed onlu');
                // no applied profs, but totalScoreAsPerc exists
                cNameToRecScore[cName] = 100 * totalScoreAsPerc;
              }
            } else if (totalSimilarApplied < 20) {
              if (totalScoreAsPerc === null) {
                // if totalScoreAsPerc cannot be computed, base score completely on similar profiles!
                cNameToRecScore[cName] =
                  100 * (totalSimilarAccepted / totalSimilarApplied);
              } else {
                cNameToRecScore[cName] =
                  10 * (totalSimilarAccepted / totalSimilarApplied) +
                  90 * totalScoreAsPerc;
              }
            } else if (totalSimilarApplied >= 20 && totalSimilarApplied < 50) {
              if (totalScoreAsPerc === null) {
                // if totalScoreAsPerc cannot be computed, base score completely on similar profiles!
                cNameToRecScore[cName] =
                  100 * (totalSimilarAccepted / totalSimilarApplied);
              } else {
                cNameToRecScore[cName] =
                  30 * (totalSimilarAccepted / totalSimilarApplied) +
                  70 * totalScoreAsPerc;
              }
            } else if (totalSimilarApplied >= 50 && totalSimilarApplied < 100) {
              if (totalScoreAsPerc === null) {
                // if totalScoreAsPerc cannot be computed, base score completely on similar profiles!
                cNameToRecScore[cName] =
                  100 * (totalSimilarAccepted / totalSimilarApplied);
              } else {
                cNameToRecScore[cName] =
                  50 * (totalSimilarAccepted / totalSimilarApplied) +
                  50 * totalScoreAsPerc;
              }
            } else {
              if (totalScoreAsPerc === null) {
                // if totalScoreAsPerc cannot be computed, base score completely on similar profiles!
                cNameToRecScore[cName] =
                  100 * (totalSimilarAccepted / totalSimilarApplied);
              } else {
                cNameToRecScore[cName] =
                  70 * (totalSimilarAccepted / totalSimilarApplied) +
                  30 * totalScoreAsPerc;
              }
              // greater than equal to 100
            }
            // console.log(cNameToRecScore);
          });
          // if (similarProfRes) console.log(similarProfRes);
        }
        return cNameToRecScore;
      })
      .then((res) => {
        response.send(res);
      })
      .catch((err) => {
        console.log('error occurred');
        console.log(err);
        return response.status(500).send({ error: err });
      });
  });

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
        region,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          res.status(500);
          return;
        }
        res.status(200);
      }
    );
  });

  app.get('/getAllColleges', (req, res) => {
    connection.query(queryGetAllColleges, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json('error occurred!');
      }
      // console.log(results);
      res.send(results);
    });
  });

  app.get('/getCollege', (req, res) => {
    //console.log(req.query);
    const { collegeName } = req.query;
    connection.query(queryGetCollege, [collegeName], (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(500);
        return;
      }
      console.log(results);
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
          res.status(500);
          return;
        }
        res.send(results[0]);
      }
    );
  });

  app.get('/getCollegesFromStudentDecs', (req, res) => {
    const { userID } = req.query;
    connection.query(
      queryGetCollegesFromStudentDecs,
      [userID],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          res.status(500);
          return;
        }
        res.send(results);
      }
    );
  });

  const checkActiveFilter = (lowerBound, upperBound, slider) => {
    console.log(slider);
    const { min, max } = slider;
    if (lowerBound > min || upperBound < max) return true;
    return false;
  };

  //lb = lower bound, hb = higher bound
  app.get('/getFilteredColleges', (req, res) => {
    let { filters } = req.query;
    filters = JSON.parse(filters);
    // since we have sliders need to check if sliders have been moved to determine if filter active
    const {
      admissionRateValues,
      costOfAttendanceValues,
      avgMathScore,
      avgEBRWScore,
      avgACTScore,
      location,
      major1,
      major2,
      strict,
      name,
    } = filters;

    const admissionRateFilterStatus = checkActiveFilter(
      admissionRateValues[0],
      admissionRateValues[1],
      admissionRate
    );
    const costOfAttendanceFilterStatus = checkActiveFilter(
      costOfAttendanceValues[0],
      costOfAttendanceValues[1],
      costOfAttendance
    );
    const rankFilterStatus = checkActiveFilter(
      filters.rank[0],
      filters.rank[1],
      rank
    );
    const sizeFilterStatus = checkActiveFilter(
      filters.size[0],
      filters.size[1],
      size
    );
    const avgSATMathFilterStatus = checkActiveFilter(
      avgMathScore[0],
      avgMathScore[1],
      avgSAT
    );
    const avgSATEBRWFilterStatus = checkActiveFilter(
      avgEBRWScore[0],
      avgEBRWScore[1],
      avgSAT
    );
    const avgACTFilterStatus = checkActiveFilter(
      avgACTScore[0],
      avgACTScore[1],
      avgACT
    );
    const locationFilterStatus = location ? true : false;
    const majorOneFilterStatus = major1 ? true : false;
    const majorTwoFilterStatus = major2 ? true : false;
    const nameFilterStatus = name ? true : false;

    console.log(admissionRateFilterStatus);
    console.log(costOfAttendanceFilterStatus);
    console.log(rankFilterStatus);
    console.log(sizeFilterStatus);
    console.log(avgSATMathFilterStatus);
    console.log(avgSATEBRWFilterStatus);
    console.log(avgACTFilterStatus);
    console.log(majorOneFilterStatus);
    console.log(majorTwoFilterStatus);
    console.log(nameFilterStatus);

    let baseSearchQuery = 'SELECT * FROM college c WHERE ';
    let baseQueryModified = false;

    if (admissionRateFilterStatus) {
      if (baseQueryModified) baseSearchQuery += 'and ';
      baseQueryModified = true;
      baseSearchQuery += `(admissionRatePercent between ${
        admissionRateValues[0] / 100
      } and ${admissionRateValues[1] / 100}`;
      if (!strict) {
        baseSearchQuery += ' OR (admissionRatePercent IS NULL)) ';
      } else {
        baseSearchQuery += ') ';
      }
    }

    if (costOfAttendanceFilterStatus) {
      if (baseQueryModified) baseSearchQuery += 'and ';
      baseQueryModified = true;
      baseSearchQuery += `(outOfStateAttendanceCost between ${costOfAttendanceValues[0]} and ${costOfAttendanceValues[1]}`;
      if (!strict) {
        baseSearchQuery += ' OR (outOfStateAttendanceCost IS NULL)) ';
      } else {
        baseSearchQuery += ') ';
      }
    }

    if (rankFilterStatus) {
      if (baseQueryModified) baseSearchQuery += 'and ';
      baseQueryModified = true;
      baseSearchQuery += `(ranking between ${filters.rank[0]} and ${filters.rank[1]}`;
      if (!strict) {
        baseSearchQuery += ' OR (ranking IS NULL)) ';
      } else {
        baseSearchQuery += ') ';
      }
    }

    if (sizeFilterStatus) {
      if (baseQueryModified) baseSearchQuery += 'and ';
      baseQueryModified = true;
      baseSearchQuery += `(size between ${filters.size[0]} and ${filters.size[1]}`;
      if (!strict) {
        baseSearchQuery += ' OR (size IS NULL)) ';
      } else {
        baseSearchQuery += ') ';
      }
    }

    if (avgSATMathFilterStatus) {
      if (baseQueryModified) baseSearchQuery += 'and ';
      baseQueryModified = true;
      baseSearchQuery += `(SATMathScore between ${avgMathScore[0]} and ${avgMathScore[1]}`;
      if (!strict) {
        baseSearchQuery += ' OR (SATMathScore IS NULL)) ';
      } else {
        baseSearchQuery += ') ';
      }
    }

    if (avgSATEBRWFilterStatus) {
      if (baseQueryModified) baseSearchQuery += 'and ';
      baseQueryModified = true;
      baseSearchQuery += `(SATEBRWScore between ${avgEBRWScore[0]} and ${avgEBRWScore[1]}`;
      if (!strict) {
        baseSearchQuery += ' OR (SATEBRWScore IS NULL)) ';
      } else {
        baseSearchQuery += ') ';
      }
    }

    if (avgACTFilterStatus) {
      if (baseQueryModified) baseSearchQuery += 'and ';
      baseQueryModified = true;
      baseSearchQuery += `(ACTScore between ${avgACTScore[0]} and ${avgACTScore[1]}`;
      if (!strict) {
        baseSearchQuery += ' OR (ACTScore IS NULL)) ';
      } else {
        baseSearchQuery += ') ';
      }
    }
    if (locationFilterStatus) {
      if (baseQueryModified) baseSearchQuery += 'and ';
      baseQueryModified = true;
      baseSearchQuery += `(region=\'${location}\'`;
      if (!strict) {
        baseSearchQuery += ' OR (region IS NULL)) ';
      } else {
        baseSearchQuery += ') ';
      }
    }

    // if (majorOneFilterStatus) {
    //   if (baseQueryModified) baseSearchQuery += 'and ';
    //   baseQueryModified = true;
    //   baseSearchQuery += `(region=\'${location}\'`;
    //   if (!strict) {
    //     baseSearchQuery += ' OR region IS NULL) ';
    //   } else {
    //     baseSearchQuery += ') ';
    //   }
    // }
    if (nameFilterStatus) {
      if (baseQueryModified) baseSearchQuery += 'and ';
      baseQueryModified = true;
      baseSearchQuery += `(collegeName LIKE \'%${name}%\') `;
      // ignoring strict for searching by name for obv reasons
    }

    // console.log(major1);
    // console.log(major2);
    // if (majorOneFilterStatus && majorTwoFilterStatus) {
    //   if (baseQueryModified) baseSearchQuery += 'and ';
    //   baseQueryModified = true;
    //   baseSearchQuery += `((c.collegeName=m.collegeName) and ((m.major LIKE \'%${major1}%\') OR (m.major LIKE \'%${major2}%\')`;
    //   if (!strict) {
    //     baseSearchQuery += ' OR (m.major IS NULL))) ';
    //   } else {
    //     baseSearchQuery += ')) ';
    //   }
    //   // ignoring strict for searching by name for obv reasons
    // } else if (majorOneFilterStatus) {
    //   if (baseQueryModified) baseSearchQuery += 'and ';
    //   baseQueryModified = true;
    //   baseSearchQuery += `((c.collegeName=m.collegeName) and ((m.major LIKE \'%${major1}%\')`;
    //   if (!strict) {
    //     baseSearchQuery += ' OR (m.major IS NULL))) ';
    //   } else {
    //     baseSearchQuery += ')) ';
    //   }
    // } else if (majorTwoFilterStatus) {
    //   if (baseQueryModified) baseSearchQuery += 'and ';
    //   baseQueryModified = true;
    //   baseSearchQuery += `((c.collegeName=m.collegeName) and ((m.major LIKE \'%${major2}%\')`;
    //   if (!strict) {
    //     baseSearchQuery += ' OR (m.major IS NULL))) ';
    //   } else {
    //     baseSearchQuery += ')) ';
    //   }
    // }

    if (!baseQueryModified) {
      // if base query not modified gets rid of WHERE
      baseSearchQuery = 'SELECT * FROM college';
    }

    console.log(baseSearchQuery);

    connection.query(baseSearchQuery, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json('Fetching college data went wrong');
      }
      console.log('reached here');
      // console.log(results);
      res.send(results);
    });
    console.log('reached outside');
    // still need to implement major for sorting!
    // if (majorOneFilterStatus) baseSearchQuery += `and region=${major1}`;
    // if (majorTwoFilterStatus) baseSearchQuery += `and region=${major2}`;

    // res.status(200).send('HELLO');
  });
};
