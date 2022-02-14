const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

var app = express();

mongoose.connect("mongodb://localhost:27017/todoapp");

require('./config/passport')(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'google auth',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/index"));

app.listen(3000);