const Knex = require("knex");
const knexFile = require("../db/knexfile");

const environment = process.env.NODE_ENV || "development";
const knex = Knex(knexFile[environment]);

const schema = knexFile.schema;

function getUser(email) {
  return knex(schema.users).where({ email }).first();
}

module.exports = {
  getUser
};
