const dbconfig = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbconfig.database,
  dbconfig.user,
  dbconfig.password,
  {
    host: dbconfig.host,
    dialect: dbconfig.dialect,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database cutie patootie");
  })
  .catch((error) => console.error(error));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/user")(sequelize, DataTypes);

db.sequelize
  .sync({ force: false })
  .then(() => console.log("Database sync patootie"))
  .catch((error) => console.error("error kapag kinikiss kita", error));

module.exports = db;
