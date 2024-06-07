const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  console.log(req.cookies);
  const jwtoken = req.cookies.jwtoken;

  if (!jwtoken) {
    return res.status(400).json({ message: "The token is not available" });
  } else {
    jwt.verify(jwtoken, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Token is invalid" });
      }
      req.user = decoded;
      next();
    });
  }
};

module.exports = verifyUser;
