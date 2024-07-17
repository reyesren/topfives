const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorize = (req, res, next) => {
  const authorizationHeader = req.headers.authorization || "";
  if (!authorizationHeader) {
    // req.isAuth = false;
    // return !verify ? throwAuthError() : req;
  }

  const token = authorizationHeader.replace("Bearer ", "");
  if (!token || token === "") {
    // req.isAuth = false;
    // return !verify ? throwAuthError() : req;
  }

  let decodedJWT;
  try {
    decodedJWT = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decodedJWT) {
      req.isAuth = false;
      //   return !verify ? throwAuthError() : req;
    }
    // req.isAuth = true;
    req.userId = decodedJWT.id;
    console.log(req.userId);
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    // req.isAuth = false;
    // return !verify ? throwAuthError() : req;
  }
};

module.exports = authorize;
