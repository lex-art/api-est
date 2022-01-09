const notes = require("express").Router();

notes.get("/list", require("../controllers/Test/notes"));

module.exports = notes;
