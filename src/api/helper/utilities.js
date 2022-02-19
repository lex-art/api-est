const db = require("../models/users");
const { compare } = require("./handleBcrypt");
const jwt = require("jsonwebtoken");

function checkUser(res, email, password) {
  db.getUser(email)
    .then(async (result) => {
      const user = {
        userName: "",
        fisrtName: "",
        lastName: "",
        email: "",
        role: ["admin"] // or not ilncudes roles
      };
      if (password) {
        const checkPass = await compare(password, result.password);
        if (checkPass) {
          user.userName = result.userName;
          user.fisrtName = result.fisrtName;
          user.lastName = result.lastName;
          user.email = result.email;
        } else
          return res.json({
            message: "Password invalid"
          });
      } else {
        user.userName = result.userName;
        user.fisrtName = result.fisrtName;
        user.lastName = result.lastName;
        user.email = result.email;
      }
      const accessToken = jwt.sign(user, process.env.SECRET_KEY_JWT, {
        expiresIn: "30m"
      });
      return res.header("authorization", `Bearer ${accessToken}`).json({
        succes: true,
        access_token: accessToken,
        user: user
      });
    })
    .catch((error) => {
      res.status(404).json({ userNotFount: error });
    });
}

module.exports = {
  checkUser
};
