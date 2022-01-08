const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome API",
    auth: `http://localhost:5000/api/auth/login`
  });
});

router.use("/auth", require("./routes/auth"));

module.exports = router;
