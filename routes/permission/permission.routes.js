const express = require("express");
const permissionRouters = express.Router();

const auth = require("../../middlewares/auth.guard");
const { addPermission, getPermissionById, getAllPermissions } = require("../../controllers/permission/permission.controller");

permissionRouters.post("/", auth, addPermission);

permissionRouters.get("/:id", auth, getPermissionById);

permissionRouters.get("/", auth, getAllPermissions);

// permissionRouters.put("/add-card-from-archiveList", auth, addCardFromArchiveList);

// permissionRouters.put("/:id", auth, updateBoard);

// permissionRouters.delete("/board/:id", auth, deleteBoard);

// permissionRouters.post("/card-delete", auth, removeCardFromBoard);

module.exports = { permissionRouters };
