const jwt = require("jsonwebtoken");
const config = require("config");
//verifies json webtoken  that comes in from the client
module.exports = function (req, res, next) {
  //we want to get a token from the header
  const token = req.header("x-auth-token");
  //check if there is no token
  if (!token) {
    return res.status(401).json({ msg: "no toke, auth denied" });
  }
  //if there is a token, verify it
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    // if there is a token but it's not valid
    res.status(401).json({ msg: "Token is not valid" });
  }
};
