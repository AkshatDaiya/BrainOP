const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    return res.status(400).json("The token is not available");
  } else {
    jwt.verify(access_token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return res.json("Token is invalid");
      next();
    });
  }
};

module.exports = verifyUser;
