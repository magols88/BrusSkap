const jwt = require("jsonwebtoken");

function decodeJWT(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log("Failed to authenticate token", err);
    return res.status(403).json({ message: "Failed to authenticate token" });
  }
}

module.exports = { decodeJWT };
