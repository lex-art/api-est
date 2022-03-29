const db = require("../../models/users");
const {
  checkUser,
  resetPasswordUser,
  saveTokenReset
} = require("../../helper/utilitiesDB/userUtilities");

const login = (req, res) => {
  const { email, password } = req.body;
  checkUser(res, email, password);
};

const register = (req, res) => {
  const body = req.body;
  const newUser = {
    userName: body.userName,
    fisrtName: body.fisrtName,
    lastName: body.lastName,
    email: body.email,
    password: body.password
  };

  db.saveNewUser(newUser)
    .then((result) => {
      if (result)
        return res.status(201).json({
          message: "succes"
        });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
const forgotPassword = (req, res) => {
  const { userEmail } = req.body;
  if (!userEmail)
    res.status(404).json({
      message: "email field requerid"
    });
  saveTokenReset(res, userEmail);
};
const createNewPassword = (req, res) => {
  const { newPassword } = req.body;
  const tokenReset = req.headers["token-reset"];
  if (!(newPassword && tokenReset))
    return res.status(404).json({
      message: "email and token field requerid"
    });
  resetPasswordUser(res, newPassword, tokenReset);
};
module.exports = {
  login,
  register,
  forgotPassword,
  createNewPassword
};
