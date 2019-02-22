"use strict";
const auth = require("./auth")
const patching = require("./json_patching")
const middleware = require("../jwt_auth/middleware")
const thumbnail = require("./image_thumbnail")

module.exports = (app) => {

  // setup CORS
  app.use((req, res, next) => {
    // Websites you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, content-type, Authorization, token, Content-Type"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });

  app.use("/auth", auth);
  app.use("/json-patching", middleware.checkToken, patching);
  app.use("/image-thumbnail", middleware.checkToken, thumbnail);

};