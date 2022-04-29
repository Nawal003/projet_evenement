const jwt = require("jsonwebtoken");
const TOKEN_SECRET =
  "a7b2b336a7dea8143e8fc5c1765b7a7c21cd8305bc4680fc4ee372383f35c52916e276cc3ee31e3238b9e39c97ea0aba80446d14d88ff079e213c2cbc7fcfb1e";

const generateAccessToken = (userDatas) => {
  return jwt.sign(userDatas, TOKEN_SECRET, { expiresIn: "7d" });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader &&
    (authHeader.split(" ")[0] = "Bearer") &&
    authHeader.split(" ")[1];

  if (token == null) {
    res.status(401);
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: err });
    }

    req.user = user;
    next();
  });
};

module.exports = {
  generateAccessToken,
  authenticateToken,
};
