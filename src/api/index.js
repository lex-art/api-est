const router = require("express").Router();
const validateUser = require("./middlewares/validateUser");

router.get("/", (req, res) => {
  const environment = process.env.NODE_ENV || "development";
  let hostName = "http://localhost:5000";
  if (environment === "production")
    // TODO: add your hostname
    hostName = "https://limitless-ravine-85932.herokuapp.com";
  // TODO: add yours endpoints list
  res.json({
    message: "Welcome API-TEST",
    auth: `${hostName}/api/auth/login`,
    register: `${hostName}/api/auth/register`,
    example: `${hostName}/api/example/list`
  });
});

// Todo: add your routes
router.use("/auth", require("./routes/auth"));
router.use("/example", validateUser, require("./routes/example"));

module.exports = router;
