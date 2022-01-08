module.exports = (req, res) => {
  const body = req.body;

  const newUser = {
    userName: body.userName,
    fisrtName: body.fisrtName,
    lastName: body.lastName,
    email: body.email,
    password: body.password
  };

  return res.status(201).json(newUser);
};
