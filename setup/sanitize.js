const express = require("express");
const xss = require("xss-clean");
const cors = require("cors");
const helmet = require("helmet");

module.exports = (app) => {
  app.use(express.json({ limit: "20mb" }));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: true }));
  app.use(xss());
  app.use(helmet());
};
