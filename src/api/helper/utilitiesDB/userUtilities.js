const db = require("../../models/users");
const { compare } = require("../handleBcrypt");
const jwt = require("jsonwebtoken");
const tranporterConfig = require("../nodeMailerSettings");
const templates = require("../../utilities/templatesEmail/resetEmail");

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
          return res.status(400).json({
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
      res.status(401).json({ message: "User not dound", error });
    });
}

async function sendEmailReset(res, email, token) {
  const tranporter = tranporterConfig();
  const urlReset = process.env.URL_FRONT_END + "/auth/reset-password/" + token;
  const templateHTML = templates.resetPassword(urlReset);
  const info = await tranporter.sendMail({
    from: "'Iglesia Palabra en Acción <registro@palabraenaccion.org>'",
    to: email,
    subject: "Reestabler su contraseña",
    html: templateHTML
  });
  if (info.messageId)
    return res.status(200).json({
      message: "ok",
      url: urlReset
    });
  else
    return res.status(400).json({
      message: "The email could not be sent",
      url: urlReset
    });
}

function saveTokenReset(res, userEmail) {
  db.getUser(userEmail)
    .then(async (response) => {
      const email = response.email;
      const tokenReset = jwt.sign({ email }, process.env.SECRET_KEY_JWT_RESET, {
        expiresIn: "10m"
      });
      const existTokenEmail = await db.getExistTokenEmail(userEmail);
      if (existTokenEmail) {
        db.updateTokenReset(userEmail, tokenReset)
          .then(async () => sendEmailReset(res, email, tokenReset))
          .catch((error) =>
            res.status(400).json({ message: "Fail update token reset", error })
          );
      } else {
        db.saveTokenReset(userEmail, tokenReset)
          .then(async () => sendEmailReset(res, userEmail, tokenReset))
          .catch((error) =>
            res
              .status(400)
              .json({ message: "Fail to create token reset", error })
          );
      }
    })
    .catch((error) =>
      res.status(401).json({ message: "User not found", error })
    );
}

function resetPasswordUser(res, newPassword, token) {
  jwt.verify(token, process.env.SECRET_KEY_JWT_RESET, async (err, user) => {
    if (err)
      return res.status(401).json({
        succes: false,
        message: "Acces denied, token expired or invalid"
      });
    else {
      const existToken = await db.getExistTokenEmail(user.email);
      if (existToken)
        return db.changePasswordUser(user.email, newPassword).then(
          () => {
            db.deleteTokenEmail(user.email).then();
            return res.status(200).json({
              succes: true,
              message: "success"
            });
          },
          (error) => {
            res.status(400).json({ message: "Error change password", error });
          }
        );
      else
        return res.status(401).json({
          succes: false,
          message: "Acces denied, token expired or invalid"
        });
    }
  });
}
module.exports = {
  checkUser,
  saveTokenReset,
  resetPasswordUser
};
