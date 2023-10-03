const bcrypt = require("bcrypt");
const saltRounds = 6;
const CryptoJS = require('crypto-js');
require("dotenv").config()

const passwordHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, parseInt(saltRounds), (err, hash) => {
      if (err) {
        return reject(err);
      }
      return resolve(hash);
    });
  });
};

const comparePasswordHash = (password, hash) => {
  return new Promise((resolve) => {
    bcrypt.compare(password, hash).then((isValid) => {
      if (isValid) {
        return resolve(isValid);
      }
      return resolve(isValid);
    });
  });
};

const getCurrentLoginUser = async (req) => {
  let userData = req["x-auth-user-details"];
  let user = userData._id;
  return user;
};

// Function to encrypt an ObjectID
const encryptString = (text, secretKey) => {
  const encrypted = CryptoJS.AES.encrypt(text, secretKey);
  return encrypted.toString();
}

// Function to decrypt an encrypted ObjectID
const decryptObjectID = (encryptedId, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedId, secretKey);
  const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedId;
}


module.exports = {
  passwordHash,
  comparePasswordHash,
  getCurrentLoginUser,
  encryptString,
  decryptObjectID
};
