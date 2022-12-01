const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");

const routes = require("../api/routes");
require("./passport.config");
const prismaErrorHandler = require("../api/middlewares/prisma_error_handler");
const genericErrorHandler = require("../api/middlewares/generic_error_handler");

const app = express();

// request logging. dev: console | production: file
app.use(morgan("dev"));

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

// passport
app.use(passport.initialize());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(routes);

// prisma error handler
app.use(prismaErrorHandler);

// general error handler
app.use(genericErrorHandler);

module.exports = app;
