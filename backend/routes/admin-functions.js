const {
  collegeRankingToSQL,
  collegeDataToSQL,
  collegeScorecardCSVToSQL,
} = require('../scraping/sql-imports.js');

const deleteAllStudentProfilesQuery =
  'DELETE u FROM User u, Student S WHERE S.userID = u.userID;';

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

  app.delete('/deleteStudentProfiles', async (req, res) => {
    try {
      await connection.query(
        'DELETE u FROM User u, Student S WHERE S.userID = u.userID;'
      );
      return res.send('All student profiles were deleted successfully!');
    } catch (err) {
      console.log(err);
      console.log(err);
      return res.sendStatus(500).json('error occurred!');
    }
  });
};
