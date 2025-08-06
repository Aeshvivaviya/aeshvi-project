const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/mydb");

// Check if database connected or not
connect
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });

// Create a schema
const Loginschema = new mongoose.Schema({
 name:String,
 password:String,
});

// Collection part (model)
const collection = mongoose.model("users", Loginschema);

module.exports = collection;
