// Update with your config settings.
module.exports = {
  development: {
    client: "mysql",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./seeds/dev"
    }
  },

  production: {
    client: "mysql",
    connection: "mysql://test-laboratorio:RY2alo08@HQl@208.109.41.227/test-api",
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      migrations: {
        directory: "./migrations",
        tableName: "knex_migrations"
      }
    },
    seeds: {
      directory: "./api/db/seeds/prod"
    }
  },
  schema: {
    users: "users"
  }
};
