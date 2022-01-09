const router = require("express").Router();
const validateUser = require("./middlewares/validateUser");
const PORT = process.env.PORT || 5000;
router.get("/", (req, res) => {
  res.json({
    message: "Welcome API-TEST",
    auth: `${req.protocol}://${req.hostname}:${PORT}/api/auth/login`,
    register: `${req.protocol}://${req.hostname}:${PORT}/api/auth/register`,
    example: `${req.protocol}://${req.hostname}:${PORT}/api/example/list`
  });
});

// Todo: add your routes
router.use("/auth", require("./routes/auth"));
router.use("/example", validateUser, require("./routes/example"));

module.exports = router;
