const jwt = require("jsonwebtoken");

function checkUser(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decodedToken.username;
    } catch (err) {
      console.log(err.message);
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
}

module.exports = { checkUser };
