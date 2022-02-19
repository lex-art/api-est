const { checkUser } = require("../../helper/utilities");

module.exports = (req, res) => {
  const { email, password } = req.body;
  checkUser(res, email, password);
};
