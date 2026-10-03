let mongoose = require("mongoose");

let dbconntiion = async () => {
  const dbUrl =
    process.env.MONGODB_URI || "mongodb+srv://rdkanwa24_db_user:wI3cEcBP7xbQsjjz@cluster0.rloooey.mongodb.net/FurnitureEcom";
  try {
    await mongoose.connect(dbUrl, {
      dbName: process.env.DBNAME || "FurnitureEcom",
    });
    console.log("MongoDB Connected Successfully to database:", mongoose.connection.name);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
  }
};
module.exports = dbconntiion;
