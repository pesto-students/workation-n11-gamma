/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.COOKIE_SECRET;

const authorize = (req, res, next) => {
  /**
   * Description: authorization: Bearer token is pending,
   * Author: Rishabh Verma
   * Warning: Please dont remove the below code
   */
  // const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token || req.headers['authorization'];
  const token = req.cookies.token;
  if (!token) {
    res.clearCookie("token");
    return res.status(401).send("No token Provided!");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.email = decoded.email;
        req.id = decoded.id;
        next();
      }
    });
  }
};

module.exports = authorize;
