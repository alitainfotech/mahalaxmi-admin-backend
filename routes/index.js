var express = require('express');
const { authRouters } = require('./auth/auth.routes');
const { permissionRouters } = require('./permission/permission.routes');
const { rolesRouter } = require('./roles/roles.routes');
const { bankRouter } = require('./bank/bank.routes');

const indexRouter = new express.Router();

indexRouter.use("/auth", authRouters);
indexRouter.use("/permission", permissionRouters);
indexRouter.use("/roles", rolesRouter)
indexRouter.use("/bank", bankRouter)

module.exports = indexRouter;
