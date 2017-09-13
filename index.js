'use strict';

const mongoose = require('mongoose');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = (options) => {
  const app = options.app;
  // const passport = options.passport;
  const db = options.db;

  mongoose.connect(db);

  // configure passport before anything else
  require('./config/passport')(passport);

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set('view engine', 'ejs');

  app.use(session({ secret: 'olafishtaroctavia', resave: false })); // make this env
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  require('./app/routes')(app, passport);
};
