const jwt = require('jsonwebtoken');

// const strategy = new JwtStrategy(opts, (payload, next) => {
//   // get user from db
//   console.log('IN THE STRAT');
//   connection.query(queryGetUserFromID, [payload.id], (err, results, fields) => {
//     if (err) {
//       console.log(err);
//     }
//     // or results[0]>
//     next(null, results[0]);
//   });
// });

const checkToken = (req, res, next) => {
  console.log('Checking token');
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
      if (err) {
        console.log('was was not decoded damn');
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        console.log('was decoded nice');
        req.userID = decoded;
        next();
      }
    });
  } else {
    console.log('TOKEN does not exist');
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
};
