// Update with your config settings.
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: "./api/db/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./api/db/seeds/dev"
    }
  },

  production: {
    client: "mysql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      migrations: {
        directory: "./api/db/migrations",
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
