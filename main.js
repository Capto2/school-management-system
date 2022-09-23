//jshint:e6
//require modules
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const lodash = require("lodash");
const random = require("random");
const port = 3000;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

//represent modules
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/schooldb", { useNewUrlParser: true }); //mongodb connect

const studentSchema = mongoose.Schema({
  username: String,
  studentId: String,
  passCode: String,
  email: String,
  gender: String,
  jambReg: String,
  jambScores: String,
  ssceReg1: String,
  ssceReg2: String,
});

const studentModel = mongoose.model("student", studentSchema);

app.route("/").get(function (request, response) {
  response.render("home");
});

app
  .route("/news/:news")
  .get(function (request, response) {
    console.log(request.params);
    response.render("index");
  })
  .post(function (request, response) { });

app
  .route("/register")
  .get(function (request, response) {
    response.render("register");
  })
  .post(function (request, response) {
    const email = request.body.email;
    const username = request.body.username;
    const gender = request.body.gender;
    const jambReg = request.body.jambReg;
    const jambScores = request.body.jambScores;
    const ssceReg1 = request.body.ssceReg1;
    const ssceReg2 = request.body.ssceReg2;

    const applicationData = new studentModel({
      email: email,
      username: username,
      gender: gender,
      jambReg: jambReg,
      jambScores: jambScores,
      ssceReg1: ssceReg1,
      ssceReg2: ssceReg2,
    });

    applicationData.save(function (error) {
        if (error) {
          response.send(error);
        } else {
          response.redirect("/register/take-a-test");
        }
      }
    );
  });

app
  .route("/register/take-a-test")
  .get(function (request, response) {
    response.render("take-test");
  })
  .post(function (request, response) {
    const questn1 = request.body.answerOne;
    const questn2 = request.body.answerTwo;
    const questn3 = request.body.answerThree;
    const questn4 = request.body.answerFour;
    const questn5 = request.body.answerFive;
    const questn6 = request.body.answerSix;
    const questn7 = request.body.answerSeven;
    const questn8 = request.body.answerEight;
    const questn9 = request.body.answerNine;
    const questn10 = request.body.answerTen;

    let Result = parseInt(questn1) + parseInt(questn2) + parseInt(questn3) + parseInt(questn4) + parseInt(questn5) + parseInt(questn6) + parseInt(questn7) + parseInt(questn8) + parseInt(questn9) + parseInt(questn10);
    Result = (Result / 10) * 100;
    console.log("The is the result of the User: " + Result + "%");
    //results conditions
    if (Result < 50) {
      response.render("take-test", { studentId: random.uniformInt(1085000, 108700) });
    }else{
      response.render("take-a-test")
      // {: 185063, passcode: 616904}
    }
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

app
  .route("/login")
  .get(function (request, response) {
    response.render("login");
  })
  .post(function (request, response) { });
app
  .route("/enquires")
  .get(function (request, response) {
    response.render("enquires");
  })
  .post(function (request, response) {
    const email = request.body.email;
    const content = request.body.content;
  });

app.get("/index", function (request, response) {
  response.render("student-dashboard/home");
});
app
  .route("/index/clearance")
  .get(function (request, response) {
    response.render("student-dashboard/uploads");
  })
  .post(function (request, response) { });

app
  .route("/index/applicationdata")
  .get(function (request, response) {
    response.render("student-dashboard/applicationData");
  })
  .post(function (request, response) { });

app
  .route("/index/study-course")
  .get(function (request, response) {
    response.render("student-dashboard/study-course");
  })
  .post(function (request, response) { });

app.route("/index/accomodation").get(function (request, response) {
  response.render("student-dashboard/accomodation");
});

app
  .route("/index/profile")
  .get(function (request, response) {
    response.render("student-dashboard/profile");
  })
  .post(function (request, response) { });

app
  .route("/index/message")
  .get(function (request, response) {
    response.render("student-dashboard/message");
  })
  .post(function (request, response) { });

app.get("/index/check-result", function (request, response) {
  response.render("student-dashboard/check-result");
});

app.get("/logout", function (request, response) {
  response.redirect("/login");
});

app.listen(port, function () {
  console.log("server has started on port 3000");
});
