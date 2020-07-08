require(`dotenv`).config()

module.exports = {
  local: {
    username: process.env.DBUSER || `root`,
    password: process.env.DBPASS || `root`,
    database: process.env.DB || `paralela`,
    logging: process.env.DB_LOGGING != null,
    host: process.env.DBHOST || `127.0.0.1`,
    dialect: `mysql`,
    timezone: process.env.TIMEZONE || `America/Santiago`,
  },
  development: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB,
    logging: process.env.DB_LOGGING != null,
    host: process.env.DBHOST,
    dialect: `mysql`,
    timezone: process.env.TIMEZONE || `America/Santiago`,
  },
  production: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB,
    logging: process.env.DB_LOGGING != null,
    host: process.env.DBHOST,
    dialect: `mysql`,
    timezone: process.env.TIMEZONE || `America/Santiago`,
  },
}
