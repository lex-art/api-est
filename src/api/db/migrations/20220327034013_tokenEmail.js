exports.up = function (knex) {
  return knex.schema.createTable("tokenEmail", (table) => {
    table
      .string("userEmail")
      .notNullable()
      .references("email")
      .inTable("users")
      .primary();
    table.string("token");
    table.timestamp("created_at").notNullable();
  });
};

exports.down = function (knex) {};
