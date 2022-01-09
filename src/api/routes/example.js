const notes = require("express").Router();

notes.get("/list", require("../controllers/Example/example"));

module.exports = notes;
