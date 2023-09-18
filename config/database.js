require("dotenv").config();
const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const bankModel = require("../models/bank.model");
const branchModel = require("../models/branch.model");
const designationModel = require("../models/designation.model");
const paymentModeModel = require("../models/paymentMode.model");
const permissionModel = require("../models/permission.model");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");
const { bankSeed } = require("../seed/bank.seed");
const { branchSeed } = require("../seed/branch.seed");
const { designationSeed } = require("../seed/designation.seed");
const { paymentModeSeed } = require("../seed/paymentMode.seed");
const { permissionsSeed } = require("../seed/permissions.seed");
const { roleSeed } = require("../seed/role.seed");

mongoose.set("strictQuery", false);
// mongoose.set("debug", true);

const db = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    const permissionCount = await permissionModel.estimatedDocumentCount();
    const roleCount = await roleModel.estimatedDocumentCount();
    const userCount = await userModel.estimatedDocumentCount();
    if(!permissionCount){
      await permissionModel.insertMany(permissionsSeed)
    }
    if(!roleCount){
      var role = await roleModel.insertMany(roleSeed)
    }
    // var bank = await bankModel.insertMany(bankSeed)
    // var paymentMode = await paymentModeModel.insertMany(paymentModeSeed)
    // var designation = await designationModel.insertMany(designationSeed)
    // var branch = await branchModel.insertMany(branchSeed)
    if(!userCount){
      await userModel.insertMany([
        {
          code: "MAHO-01",
          role: role[0]._id,
          branch: branch[0]._id,
          designation: designation[0]._id,
          first_name: "henish",
          last_name: "patel",
          email: "admin@gmail.com",
          password: bcrypt.hashSync("password", 12),
          phone_number: "9979732688",
        }
      ])
    }
  } catch (err) {
    console.error("Error", err);
  }
};

module.exports = db;