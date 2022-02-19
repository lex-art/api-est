const jwt = require("jsonwebtoken");
const { checkUser } = require("./utilities");

function validateToken(req, res, next) {
  const token = req.headers.authorization;
  let clearedToken = "";
  if (String(token).startsWith("Bearer ")) clearedToken = token.split(" ")[1];
  else clearedToken = token;
  jwt.verify(clearedToken, process.env.SECRET_KEY_JWT, (err, user) => {
    if (err)
      res
        .status(401)
        .json({ message: "Acces denied, token expired or invalid" });
    else {
      req.user = user;
      next();
    }
  });
}

function refreshToken(req, res) {
  const token = req.headers.authorization;
  let clearedToken = "";
  if (String(token).startsWith("Bearer ")) clearedToken = token.split(" ")[1];
  else clearedToken = token;
  jwt.verify(clearedToken, process.env.SECRET_KEY_JWT, (err, user) => {
    if (err)
      res
        .status(401)
        .json({ message: "Acces denied, token expired or invalid" });
    else {
      const { email } = user;
      checkUser(res, email);
      /* db.getUser(email)
        .then(async (result) => {
          const user = {
            userName: result.userName,
            fisrtName: result.fisrtName,
            lastName: result.lastName,
            email: result.email
          };
          const accessToken = generateAccesToken(user);
          return res.header("authorization", `Bearer ${accessToken}`).json({
            succes: true,
            access_token: accessToken,
            user: user
          });
        })
        .catch((error) => {
          res.status(404).json({ userNotFountTokenRefresh: error });
        }); */
    }
  });
}

module.exports = {
  validateToken,
  refreshToken
};
