//jshint:e6
//require modules
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const lodash = require("lodash");
const port = 3000;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

//represent modules
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "Our school websites.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost/schooldb", { useNewUrlParser: true }); //mongodb connect

const studentSchema = new mongoose.Schema({
  username: String,
  studentId: String,
  password: String,
});

studentSchema.plugin(passportLocalMongoose); //salt schema
// studentSchema.plugin(findOrCreate);

const studentModel = new mongoose.model("student", studentSchema);
passport.use(studentModel.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  studentModel.findById(id, function (err, user) {
    done(err, user);
  });
});

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
    // studentModel.register(

    // );
  });

app
  .route("/application/take-a-test")
  .get(function (request, response) {
    response.render("take-test");
  })
  .post(function (request, response) {});

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

app.get("/index", function (request, response) {
  response.render("student-dashboard/home");
});
app
  .route("/index/clearance")
  .get(function (request, response) {
    response.render("student-dashboard/uploads");
  })
  .post(function (request, response) {});

app
  .route("/index/study-course")
  .get(function (request, response) {
    response.render("student-dashboard/study-course");
  })
  .post(function (request, response) {});

app.route("/index/accomodation").get(function (request, response) {
  response.render("student-dashboard/accomodation");
});

app
  .route("/index/profile")
  .get(function (request, response) {
    response.render("student-dashboard/profile");
  })
  .post(function (request, response) {});

app
  .route("/index/message")
  .get(function (request, response) {
    response.render("student-dashboard/message");
  })
  .post(function (request, response) {});

app.get("/index/check-result", function (request, response) {
  response.render("student-dashboard/check-result");
});

app.get("/index/logout", function (request, response) {
  request.logout();
  response.redirect("/login");
});

app.listen(port, function () {
  console.log("server has started on port 3000");
});
