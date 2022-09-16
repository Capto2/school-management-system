//jshint:e6
//require modules
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const lodash = require("lodash");
const port = 3000;

//represent modules
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/schooldb", { useNewUrlParser: true }); //mongodb connect

const studentSchema = new mongoose.Schema({
  username: String,
  studentId: String,
  password: String,
});

const studentModel = new mongoose.model("student", studentSchema);

app.route("/").get(function (request, response) {
  response.render("home");
});

app
  .route("/application")
  .get(function (request, response) {
    response.render("application");
  })
  .post(function (request, response) {
    const email = request.body.email;
    const password = request.body.password;
  });

app
  .route("/login")
  .get(function (request, response) {
    response.render("login");
  })
  .post(function (request, response) {});
app
  .route("/enquires")
  .get(function (request, response) {
    response.render("enquires");
  })
  .post(function (request, response) {
    const email = request.body.email;
    const content = request.body.content;
  });

app
  .route("/request-transcript")
  .get(function (request, response) {
    response.render("request-transcript");
  })
  .post(function (request, response) {
    const student_data = request.body.student - data;
    const email = request.body.email;
  });

app.listen(port, function () {
  console.log("server has started on port 3000");
});
