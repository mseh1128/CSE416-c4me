const {
  collegeRankingToSQL,
  collegeDataToSQL,
  collegeScorecardCSVToSQL,
} = require('../scraping/sql-imports.js');

// console.log(collegeRankingToSQL);

module.exports = function (app, connection) {
  app.get('/scrapeCollegeRankings', async (req, res) => {
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

  app.get('/scrapeCollegeData', async (req, res) => {
    try {
      await collegeDataToSQL();
      return res.send('College data was succesfully scraped & saved to DB!');
    } catch (err) {
      console.log(err);
      return res.sendStatus(500).json('error occurred!');
    }
  });

  app.get('/importCollegeScorecard', async (req, res) => {
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
};
