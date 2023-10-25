const bcrypt = require("bcrypt");
const saltRounds = 6;
const CryptoJS = require('crypto-js');
const customerModel = require("../models/customer.model");
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

const generateCustomerCode = async () => {
  const customerCode = await customerModel
      .findOne({}, { code: 1 })
      .sort({ code: -1 })
      .limit(1);

  let nextCode = "000001";
  if (customerCode) {
      const currentCode = customerCode.code;
      const currentNumber = parseInt(currentCode, 10);
      if (!isNaN(currentNumber)) {
          nextCode = (currentNumber + 1).toString().padStart(6, "0");
      }
  }

  return nextCode;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  passwordHash,
  comparePasswordHash,
  getCurrentLoginUser,
  encryptString,
  decryptObjectID,
  generateCustomerCode,
  generateRandomNumber
};
