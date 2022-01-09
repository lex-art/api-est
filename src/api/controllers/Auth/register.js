const db = require("../../models/users");

module.exports = (req, res) => {
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
      console.log(result);
      if (result)
        return res.status(201).json({
          message: "succes"
        });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
