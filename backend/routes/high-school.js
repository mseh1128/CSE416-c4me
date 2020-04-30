const getUniqueHS =
  'SELECT * FROM high_school WHERE highSchoolName=? AND highSchoolCity=? AND highSchoolState=?';
const getOtherHS =
  'SELECT * FROM high_school WHERE highSchoolName<>? AND highSchoolCity<>? AND highSchoolState<>?';
const getAvgStatsHS =
  'SELECT AVG(highSchoolGPA) AS avgGPA, AVG(SATMath) AS avgSATMath, AVG(SATEBRW) AS avgSATEBRW, AVG(ACTComp) AS avgACTComp FROM profile p, student s WHERE s.highSchoolName=? AND s.highSchoolState=? AND s.highSchoolCity=? and s.userID=p.studentID;';

module.exports = function (app, connection) {
  promisifyQuery = (sql, args) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  };

  app.get('/getHighSchoolFromName', (req, res) => {
    const { highSchoolName } = req.query;
    console.log(highSchoolName);
    // // inclues student & profile info for student
    promisifyQuery(
      `SELECT * FROM high_school WHERE highSchoolName LIKE "%${highSchoolName}%"`
    )
      .then((results) => {
        console.log(results);
        res.send(results);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err });
      });
  });

  const calculateScore = (
    totalCap,
    fieldScore,
    fieldsToCompare,
    amtDiff,
    penaltyMultiplier
  ) => {
    console.log(fieldsToCompare);
    const HSField = fieldsToCompare[0];
    const OtherHSField = fieldsToCompare[1];
    if (HSField == null || OtherHSField == null) {
      totalCap -= fieldScore;
      fieldScore = 0;
    } else {
      fieldScore -=
        penaltyMultiplier *
        Math.floor(Math.abs((HSField - OtherHSField) / amtDiff));
    }
    console.log(totalCap, fieldScore);
    return [totalCap, fieldScore < 0 ? 0 : fieldScore];
  };

  const calculateNicheSimilarity = (highSchool, highSchoolToCompare) => {
    // highSchoolName, highSchoolCity, highSchoolState, numOfStudents, institutionType, studentRatio, avgGradRatePerc, avgSAT, avgACT, APEnrollmentPerc, numSATResponses, numACTResponses
    let cap = 100;
    let institutionTypeScore = 10;
    if (
      highSchool.institutionType == null ||
      highSchoolToCompare.institutionType == null
    ) {
      cap -= institutionTypeScore;
      institutionTypeScore = 0;
    } else {
      if (highSchool.institutionType !== highSchoolToCompare.institutionType)
        institutionTypeScore = 0;
    }

    let numOfStudentsScore = 10;
    [cap, numOfStudentsScore] = calculateScore(
      cap,
      numOfStudentsScore,
      [highSchool.numOfStudents, highSchoolToCompare.numOfStudents],
      200,
      3
    );

    let teacherStudentRatioScore = 10;
    [cap, teacherStudentRatioScore] = calculateScore(
      cap,
      teacherStudentRatioScore,
      [highSchool.studentRatio, highSchoolToCompare.studentRatio],
      2,
      3
    );

    let avgGradRatePercScore = 10;
    [cap, avgGradRatePercScore] = calculateScore(
      cap,
      avgGradRatePercScore,
      [highSchool.avgGradRatePerc, highSchoolToCompare.avgGradRatePerc],
      10,
      3
    );

    let APEnrollmentPercScore = 20;
    [cap, APEnrollmentPercScore] = calculateScore(
      cap,
      APEnrollmentPercScore,
      [highSchool.APEnrollmentPerc, highSchoolToCompare.APEnrollmentPerc],
      10,
      3
    );

    let SATScore = 20;
    [cap, SATScore] = calculateScore(
      cap,
      SATScore,
      [highSchool.avgSAT, highSchoolToCompare.avgSAT],
      50,
      3
    );

    let ACTScore = 20;
    [cap, ACTScore] = calculateScore(
      cap,
      ACTScore,
      [highSchool.avgACT, highSchoolToCompare.avgACT],
      1,
      1
    );

    return (
      (institutionTypeScore +
        numOfStudentsScore +
        teacherStudentRatioScore +
        avgGradRatePercScore +
        APEnrollmentPercScore +
        SATScore +
        ACTScore) /
      cap
    );
  };

  const calculateStudentSimilarity = async (
    highSchoolStudentStats,
    highSchoolToCompare
  ) => {
    const avgStatsHSData = await promisifyQuery(getAvgStatsHS, [
      highSchoolToCompare.highSchoolName,
      highSchoolToCompare.highSchoolState,
      highSchoolToCompare.highSchoolCity,
    ]);
    const avgStatsHS = avgStatsHSData[0];
    if (avgStatsHS === undefined || avgStatsHS.length == 0) {
      return null;
    } else {
      let totalScore = 100;
      if (avgStatsHS.avgGPA && highSchoolStudentStats.avgGPA) {
        totalScore -=
          2 *
          Math.floor(
            Math.abs(
              (avgStatsHS.avgGPA * 10 - highSchoolStudentStats.avgGPA * 10) / 2
            )
          );
      }
      if (avgStatsHS.avgSATMath && highSchoolStudentStats.avgSATMath) {
        totalScore -= Math.floor(
          Math.abs(
            (avgStatsHS.avgSATMath - highSchoolStudentStats.avgSATMath) / 5
          )
        );
      }
      if (avgStatsHS.avgSATEBRW && highSchoolStudentStats.avgSATEBRW) {
        totalScore -= Math.floor(
          Math.abs(
            (avgStatsHS.avgSATEBRW - highSchoolStudentStats.avgSATEBRW) / 5
          )
        );
      }
      if (avgStatsHS.avgACTComp && highSchoolStudentStats.avgACTComp) {
        totalScore -=
          3 *
          Math.floor(
            Math.abs(
              (avgStatsHS.avgACTComp - highSchoolStudentStats.avgACTComp) / 1
            )
          );
      }
      if (totalScore < 0) totalScore = 0;
      return totalScore / 100;
    }
    // .then((HSToCompareStats) => {
    //   console.log(HSToCompareStats);
    //   console.log(highSchoolStudentStats);
    // })
    // .catch((err) => reject(err));
    // get all students from this high school in our system & calculate avg b/w them ...?
  };

  const getSimilarityScore = (highSchool, otherHS, highSchoolStudentStats) => {
    return new Promise(async (resolve, reject) => {
      let similarityScore = null;
      const nicheSimilarScore =
        calculateNicheSimilarity(highSchool, otherHS) * 100;
      if (
        highSchoolStudentStats === undefined ||
        highSchoolStudentStats.length == 0
      ) {
        similarityScore = nicheSimilarScore;
      } else {
        const studentSimilarityScore = await calculateStudentSimilarity(
          highSchoolStudentStats,
          otherHS
        );

        if (!studentSimilarityScore) {
          similarityScore = nicheSimilarScore;
          // means that other hs has no students in system
        } else {
          similarityScore =
            0.7 * nicheSimilarScore + 0.3 * studentSimilarityScore;
        }
      }
      const { highSchoolName, highSchoolCity, highSchoolState } = otherHS;
      console.log(highSchoolName);
      resolve({
        highSchoolName,
        highSchoolCity,
        highSchoolState,
        similarityScore: nicheSimilarScore,
      });
    });
  };

  app.get('/getHighSchoolSimilarities', (req, res) => {
    const { highSchoolName, highSchoolState, highSchoolCity } = req.query;
    // const [highSchoolName, highSchoolState, highSchoolCity] = [
    //   'academic magnet high school',
    //   'north charleston',
    //   'sc',
    // ];
    // // inclues student & profile info for student
    Promise.all([
      promisifyQuery(getUniqueHS, [
        highSchoolName,
        highSchoolState,
        highSchoolCity,
      ]),
      promisifyQuery(getOtherHS, [
        highSchoolName,
        highSchoolState,
        highSchoolCity,
      ]),
    ])
      .then(([givenHSData, otherHS]) => {
        if (givenHSData === undefined || givenHSData.length == 0) {
          return res
            .status(500)
            .json({ error: 'Could not find this high school!' });
        } else {
          const givenHS = givenHSData[0];
          promisifyQuery(getAvgStatsHS, [
            givenHS.highSchoolName,
            givenHS.highSchoolState,
            givenHS.highSchoolCity,
          ])
            .then((givenHSStudentStats) => {
              return Promise.all(
                otherHS.map((otherHighSchool) => {
                  return getSimilarityScore(
                    givenHS,
                    otherHighSchool,
                    givenHSStudentStats[0]
                  );
                })
              );
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err });
      });
  });
};

//
