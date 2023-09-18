var express = require('express');
const { authRouters } = require('./auth/auth.routes');

const indexRouter = new express.Router();

/* GET home page. */
indexRouter.use("/auth", authRouters);

module.exports = indexRouter;
