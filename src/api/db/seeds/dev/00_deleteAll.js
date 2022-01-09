exports.seed = function (knex) {
  // Deletes ALL existing entries
  return Promise.resolve().then(() => knex("users").del());
};
