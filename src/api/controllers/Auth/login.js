const db = require("../../models/users");
const { compare } = require("../../helper/handleBcrypt");
module.exports = (req, res, next) => {
  const { email, password } = req.body;

  db.getUser(email)
    .then(async (result) => {
      const checkPass = await compare(password, result.password);
      if (checkPass)
        return res.json({
          succes: true,
          access_token: "token.pueba",
          user: result
        });
      else
        return res.json({
          message: "Password Invalid"
        });
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
};
