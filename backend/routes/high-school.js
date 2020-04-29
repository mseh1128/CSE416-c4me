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
};

//
