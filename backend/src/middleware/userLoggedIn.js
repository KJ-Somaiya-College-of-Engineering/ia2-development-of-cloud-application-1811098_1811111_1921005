const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
function isLoggedIn(req, res, next) {
  if (req.headers.authorization) {
    const { authorization } = req.headers;
    const bearerToken = authorization.split(" ")[1];
    try {
      result = jwt.verify(bearerToken, config.jwtSecret);
      req.user = result;
      next();
    } catch (err) {
      res.status(401).send({ code: 0, message: "Something went wrong" });
    }
  } else {
    res.status(401).json({ code: 0, message: "unauthorized" });
  }
}

module.exports = isLoggedIn;
