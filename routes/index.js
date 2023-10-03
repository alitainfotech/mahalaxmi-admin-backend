var express = require('express');
const { authRouters } = require('./auth/auth.routes');
const { permissionRouters } = require('./permission/permission.routes');
const { rolesRouter } = require('./roles/roles.routes');
const { bankRouter } = require('./bank/bank.routes');
const { payment_modeRouter } = require('./payment_mode/payment_mode.routes');
const { designationRouter } = require('./designation/designation.routes');
const { branchRouter } = require('./branch/branch.routes');
const { userRouters } = require('./users/users.routes');

const indexRouter = new express.Router();

indexRouter.use("/auth", authRouters);
indexRouter.use("/permission", permissionRouters);
indexRouter.use("/roles", rolesRouter)
indexRouter.use("/bank", bankRouter)
indexRouter.use("/paymentMode", payment_modeRouter)
indexRouter.use("/designation", designationRouter)
indexRouter.use("/branch", branchRouter)
indexRouter.use("/users", userRouters)


module.exports = indexRouter;
