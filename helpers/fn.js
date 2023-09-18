const bcrypt = require("bcrypt");
const saltRounds = 6;

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

module.exports = {
  passwordHash,
  comparePasswordHash,
  getCurrentLoginUser,
};
