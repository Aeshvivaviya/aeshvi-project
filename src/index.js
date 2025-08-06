const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

//convert date into json format

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// use ejs as the viw engine

app.set("view engine", "ejs");

//static file

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("Login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// Register user

app.post("/signup", async (req, res) => {
  const date = {
    name: req.body.username,
    password: req.body.password,
  };
  // check if the  user already exuts in the datebase

  const existingUser = await collection.findOne({ name: date.name });
  if (existingUser) {
    res.send("user already expists. please choose a diffrent username.");
  } else {
    //hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(date.password, saltRounds);

    date.password = hashedPassword;
  }

  const userdate = await collection.insertMany(date);
  console.log(userdate);
  res.send('User registered successfully');
});

app.post("/Login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });

    if (!check) {
      res.send("user name cannot found");
    }

    //cpmpare the hash password from the database with the plain text

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.render("home");
    } else {
      req.send("wrong password");
    }
  } catch (error){
    res.send("an error occurred");
    console.error(error)
  }
});

const port = 5000;
app.listen(port, () => {
  console.log("server is running on port: $(port)");
});
