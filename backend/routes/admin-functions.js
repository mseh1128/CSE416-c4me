const {
  collegeRankingToSQL,
  collegeDataToSQL,
  collegeScorecardCSVToSQL,
} = require('../scraping/sql-imports.js');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const deleteAllStudentProfilesQuery =
  'DELETE u FROM User u, Student S WHERE S.userID = u.userID;';

const insertDatasetToUserQuery =
  'insert ignore into user(username, userPassword, userID) values (?, ?, ?); ';

const insertDatasetToStudentQuery =
  'insert ignore into student(userID, residenceState, major1, major2, highSchoolName, highSchoolCity, highSchoolState, collegeClass) values (?, ?, ?, ?, ?, ?, ?, ?); ';

const insertDatasetToProfileQuery =
  'insert ignore into profile(studentID, highSchoolGPA, SATMath, SATEBRW, ACTEng, ACTMath, ACTReading, ACTSci, ACTComp, SATLit, SATUSHist, SATWorldHist, SATMath1, SATMath2, SATEcoBio, SATMolBio, SATChem, SATPhysics, passedAPAmount) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ';

const insertDatasetToDeclarationQuery =
  'insert ignore into college_declaration(studentID, collegeName, acceptanceStatus, questionable) values (?, ?, ?, ?); ';

// console.log(collegeRankingToSQL);
module.exports = function (app, connection) {
  app.post('/scrapeCollegeRankings', async (req, res) => {
    try {
      await collegeRankingToSQL();
      return res.send(
        'College ranking data was succesfully scraped & saved to DB!'
      );
    } catch (err) {
      console.log(err);
      return res.sendStatus(500).json('error occurred!');
    }
  });

  app.post('/scrapeCollegeData', async (req, res) => {
    try {
      await collegeDataToSQL();
      return res.send('College data was succesfully scraped & saved to DB!');
    } catch (err) {
      console.log(err);
      return res.sendStatus(500).json('error occurred!');
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
      return res.sendStatus(500).json('error occurred!');
    }
  });

  app.post('/importStudentProfiles', async (req, res) => {
    const readStream = fs
      .createReadStream(
        path.resolve(__dirname, './StudentDataset/student_profile_dataset.csv')
      )
      .pipe(csv());

    readStream
      .on('data', async (data) => {
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
        } = data;
        await connection.query(insertDatasetToUserQuery, [
          username,
          password,
          userid,
        ]);
        await connection.query(insertDatasetToStudentQuery, [
          userid,
          residence_state,
          major_1,
          major_2,
          high_school_name,
          high_school_city,
          high_school_state,
          college_class,
        ]);
        await connection.query(insertDatasetToProfileQuery, [
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
      .on('end', () => {
        const applicationReadStream = fs
          .createReadStream(
            path.resolve(__dirname, './StudentDataset/application_file.csv')
          )
          .pipe(csv());

        applicationReadStream
          .on('data', async (appData) => {
            const { userid, college, status } = appData;
            await connection.query(insertDatasetToDeclarationQuery, [
              userid,
              college,
              status,
              false,
            ]);
          })
          .on('end', () => {
            console.log('Data has all finished processing');
            return res.send('All student profiles were imported successfully!');
          })
          .on('error', (e) => {
            console.log(err);
            return res.sendStatus(500).json('error occurred!');
          });
        // return res.send('All student profiles were imported successfully!');
      })
      .on('error', (e) => {
        // error occurs b/c closing stream prematurely
        // so may attemp to push after EOF
        console.log(err);
        return res.sendStatus(500).json('error occurred!');
      });
    // try {
    //   await connection.query(
    //     'DELETE u FROM User u, Student S WHERE S.userID = u.userID;'
    //   );
    //   return res.send('All student profiles were deleted successfully!');
    // } catch (err) {
    //   console.log(err);
    //   console.log(err);
    //   return res.sendStatus(500).json('error occurred!');
    // }
  });

  app.delete('/deleteStudentProfiles', async (req, res) => {
    try {
      await connection.query(deleteAllStudentProfilesQuery);
      return res.send('All student profiles were deleted successfully!');
    } catch (err) {
      console.log(err);
      console.log(err);
      return res.sendStatus(500).json('error occurred!');
    }
  });
};
