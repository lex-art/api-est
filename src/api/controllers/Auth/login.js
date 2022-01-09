const db = require("../../models/users");
const { compare } = require("../../helper/handleBcrypt");
const { generateAccesToken } = require("../../helper/jwt");

module.exports = (req, res) => {
  const { email, password } = req.body;

  db.getUser(email)
    .then(async (result) => {
      const checkPass = await compare(password, result.password);
      if (checkPass) {
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
      } else
        return res.json({
          message: "Password invalid"
        });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
