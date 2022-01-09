const jwt = require("jsonwebtoken");

function generateAccesToken(user) {
  return jwt.sign(user, process.env.SECRET_KEY_JWT, { expiresIn: "1h" });
}

function validateToken(req, res, next) {
  const token = req.headers.authorization;
  let clearedToken;
  if (String(token).startsWith("Bearer ")) clearedToken = token.split(" ")[1];
  else clearedToken = token;
  jwt.verify(clearedToken, process.env.SECRET_KEY_JWT, (err, user) => {
    if (err) res.send({ message: "Acces denied, token expired or invalid" });
    else {
      req.user = user;
      next();
    }
  });
}

module.exports = {
  generateAccesToken,
  validateToken
};
