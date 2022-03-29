const Knex = require("knex");
const knexFile = require("../db/knexfile");
const { encrypt } = require("../helper/handleBcrypt");

const environment = process.env.NODE_ENV || "development";
const knex = Knex(knexFile[environment]);
const schema = knexFile.schema;

function getUser(email) {
  return knex(schema.users).where({ email }).first();
}

async function saveNewUser(user) {
  return knex(schema.users).insert({
    userName: user.userName,
    fisrtName: user.fisrtName,
    lastName: user.lastName,
    email: user.email,
    password: await encrypt(user.password),
    created_at: knex.fn.now(),
    updated_at: knex.fn.now()
  });
}

function saveTokenReset(userEmail, token) {
  return knex(schema.tokenEmail).insert({
    userEmail,
    token
  });
}

function updateTokenReset(userEmail, token) {
  return knex(schema.tokenEmail).where({ userEmail }).update({
    token,
    created_at: knex.fn.now()
  });
}
function getExistTokenEmail(userEmail) {
  return knex(schema.tokenEmail).where({ userEmail }).first();
}

async function changePasswordUser(email, newPassword) {
  return knex(schema.users)
    .where({ email })
    .update({
      password: await encrypt(newPassword),
      updated_at: knex.fn.now()
    });
}
module.exports = {
  getUser,
  saveNewUser,
  saveTokenReset,
  updateTokenReset,
  getExistTokenEmail,
  changePasswordUser
};
