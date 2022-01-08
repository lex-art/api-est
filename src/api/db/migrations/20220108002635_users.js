exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("userName");
    table.string("fisrtName").notNullable();
    table.string("lastName").notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable().primary();
    table.timestamp("created_at").notNullable();
    table.timestamp("updated_at").notNullable();
    // table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
