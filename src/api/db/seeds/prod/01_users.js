const { encrypt } = require("../../../helper/handleBcrypt");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(async function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          userName: "lex-art",
          fisrtName: "Oscar",
          lastName: "Chanax",
          email: "drummerkoka@gmail.com",
          password: await encrypt("123456"),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now()
        }
      ]);
    });
};
