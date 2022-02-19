const auth = require("express").Router();

auth.post("/login", require("../controllers/Auth/login"));
auth.post("/register", require("../controllers/Auth/register"));
auth.get("/refresh-token", require("../helper/jwt").refreshToken);

module.exports = auth;
