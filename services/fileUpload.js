const multer = require("multer");
const fs = require('fs');
const path = require('path');
const { profile_photo } = require("./config");
const folderName = "public/images";

const filePath = path.resolve(__dirname + "./../" + folderName)
if (!fs.existsSync("public") || !fs.existsSync(folderName)) {
//   fs.mkdirSync("public");
  fs.mkdirSync("public/images")
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(filePath + `/${profile_photo[file.fieldname]}`))
  },
  filename: function (req, file, cb) {

    const finalName = Date.now() + path.extname(file.originalname)
    const folderCreate = path.resolve(__dirname + "./../" + folderName + `/${profile_photo[file.fieldname]}`)

    if (!fs.existsSync(folderCreate)) fs.mkdirSync(folderCreate)
    req.body[file.fieldname] = `${profile_photo[file.fieldname]}/${finalName}`

    if (!req["fields"]) {
      req["fields"] = [file.fieldname]
    } else {
      req["fields"] = [...req.fields, file.fieldname];
    }

    cb(null, finalName)
  }
})

const uploadProfileImage = multer({ storage: storage })

module.exports = { uploadProfileImage }