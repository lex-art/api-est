module.exports = (req, res) => {
  const body = req.body;
  const user = req.user;
  // TODO: add your code
  const examapleLsit = {
    user: user,
    value: body.value
  };

  return res.status(201).json(examapleLsit);
};
