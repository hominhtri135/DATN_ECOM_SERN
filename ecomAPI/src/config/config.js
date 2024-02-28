module.exports = {
  development: {
    username: "root",
    password: "0886881305",
    database: "ecom",
    host: "127.0.0.1",
    port: "3307",
    dialect: "mysql",
    timezone: "+07:00",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    host: process.env.MYSQLHOST || "127.0.0.1",
    port: process.env.MYSQLPORT || "3306",
    database: process.env.MYSQLDATABASE || "ecom",
    username: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || null,
    dialect: "mysql",
    timezone: "+07:00",
  },
};
