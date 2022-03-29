const auth = require("express").Router();
const AuthCotroller = require("../controllers/Auth/AuthCotroller");

auth.post("/login", AuthCotroller.login);
auth.post("/register", AuthCotroller.register);
auth.get("/refresh-token", require("../helper/jwt").refreshToken);
auth.put("/forgot-password", AuthCotroller.forgotPassword);
auth.put("/reset-password", AuthCotroller.createNewPassword);

module.exports = auth;
