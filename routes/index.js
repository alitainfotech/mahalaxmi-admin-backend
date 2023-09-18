var express = require('express');
const { authRouters } = require('./auth/auth.routes');
const { permissionRouters } = require('./permission/permission.routes');

const indexRouter = new express.Router();

indexRouter.use("/auth", authRouters);
indexRouter.use("/permission", permissionRouters);

module.exports = indexRouter;
