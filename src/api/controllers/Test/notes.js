module.exports = (req, res) => {
  const body = req.body;
  const user = req.user;
  console.log("====================================");
  console.log(user);
  console.log("====================================");
  const newUser = {
    userName: body.userName,
    fisrtName: body.fisrtName,
    lastName: body.lastName,
    email: body.email,
    password: body.password
  };

  return res.status(201).json(newUser);
};
