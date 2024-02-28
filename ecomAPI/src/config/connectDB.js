const { Sequelize } = require("sequelize");

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD || null,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: "mysql",
    logging: false,
    query: { raw: true },
    timezone: "+07:00",
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
