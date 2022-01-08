const auth = require("express").Router();

auth.post("/login", require("../controllers/Auth/login"));
auth.post("/register", require("../controllers/Auth/register"));

module.exports = auth;
