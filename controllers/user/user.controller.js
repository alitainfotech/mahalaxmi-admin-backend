const bcrypt = require("bcrypt");
// const { USER_MESSAGES } = require("../../controller-messages/user.messages");

const {
  RESPONSE_PAYLOAD_STATUS_SUCCESS,
  RESPONSE_STATUS_CODE_OK,
  RESPONSE_PAYLOAD_STATUS_ERROR,
  RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
  AUTH_USER_DETAILS,
  RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_CODE_VALIDATION_ERROR,
} = require("../../constants/global.constants");
const userModel = require("../../models/user.model");

// const {
//   forgotPasswordMailer,
// } = require("../../services/mailer/forgotPasswordMailTemplate");

const addLogInToken = async (token, id) => {
  try {
    await userModel.findOneAndUpdate({ _id: id }, { $set: { token: token } });
  } catch (err) {
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: null,
      data: null,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    };

    return res
      .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
      .json(responsePayload);
  }
};

// const addResetPasswordToken = async (token, email) => {
//   try {
//     const dt = new Date();
//     dt.setHours(dt.getHours() + 2);
//     await forgotPasswordMailer(token, email);

//     return User.findOneAndUpdate(
//       { email: email },
//       {
//         reset_password_token: token,
//         reset_password_expiry_time: dt,
//       }
//     );
//   } catch (err) {
//     const responsePayload = {
//       status: RESPONSE_PAYLOAD_STATUS_ERROR,
//       message: null,
//       data: null,
//       error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//     };

//     return res
//       .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//       .json(responsePayload);
//   }
// };

// const getUser = async (req, res) => {
//   try {
//     const { _id } = req[AUTH_USER_DETAILS];
//     const user = await User.findOne({ _id });

//     if (user) {
//       let userObj = user.toJSON();
//       delete userObj.password;
//       delete userObj.token;
//       delete userObj.reset_password_token;
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//         message: USER_MESSAGES.USERS_FOUND,
//         data: userObj,
//         error: null,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     } else {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_ERROR,
//         message: USER_MESSAGES.USERS_NOT_FOUND,
//         data: null,
//         error: null,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     }
//   } catch (err) {
//     const responsePayload = {
//       status: RESPONSE_PAYLOAD_STATUS_ERROR,
//       message: null,
//       data: null,
//       error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//     };

//     return res
//       .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//       .json(responsePayload);
//   }
// };

// const getUserAll = async (req, res) => {
//   try {
//     const users = await User.find({});

//     if (users) {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//         message: USER_MESSAGES.USERS_FOUND,
//         data: users,
//         error: null,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     } else {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_ERROR,
//         message: USER_MESSAGES.USERS_NOT_FOUND,
//         data: null,
//         error: null,
//       };

//       return res.status(RESPONSE_PAYLOAD_STATUS_ERROR).json(responsePayload);
//     }
//   } catch (err) {
//     const responsePayload = {
//       status: RESPONSE_PAYLOAD_STATUS_ERROR,
//       message: null,
//       data: null,
//       error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//     };

//     return res
//       .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//       .json(responsePayload);
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const { _id } = req[AUTH_USER_DETAILS];
//     const {
//       first_name,
//       last_name,
//       phone_number,
//       address,
//       city,
//       state,
//       pincode,
//       country,
//     } = req.body;
//     const updateUser = await User.findByIdAndUpdate(
//       { _id },
//       {
//         first_name: first_name,
//         last_name: last_name,
//         phone_number: phone_number,
//         address: address,
//         city: city,
//         state: state,
//         pincode: pincode,
//         country: country,
//       },
//       { new: TRUE }
//     );

//     if (updateUser) {
//       const userObj = updateUser.toJSON();
//       delete userObj.password;
//       delete userObj.token;
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//         message: USER_MESSAGES.USERS_UPDATED,
//         data: userObj,
//         error: null,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     } else {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_ERROR,
//         message: USER_MESSAGES.USERS_NOT_UPDATED,
//         data: null,
//         error: null,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     }
//   } catch (err) {
//     const responsePayload = {
//       status: RESPONSE_PAYLOAD_STATUS_ERROR,
//       message: null,
//       data: null,
//       error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//     };

//     return res
//       .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//       .json(responsePayload);
//   }
// };

// const addUsers = async (req, res) => {
//   try {
//     const {
//       first_name,
//       last_name,
//       email,
//       phone_number,
//       address,
//       city,
//       state,
//       pincode,
//       password,
//       country,
//     } = req.body;

//     let existUser = await User.find({ email: email });

//     if (existUser.length === 1) {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_ERROR,
//         message: USER_MESSAGES.EMAIL_EXISTS,
//         data: null,
//         error: USER_MESSAGES.EMAIL_EXISTS,
//       };

//       return res
//         .status(RESPONSE_STATUS_CODE_VALIDATION_ERROR)
//         .json(responsePayload);
//     } else {
//       let new_password = bcrypt.hashSync(password, 12);
//       const user = User.create({
//         first_name: first_name,
//         last_name: last_name,
//         email: email,
//         phone_number: phone_number,
//         address: address,
//         city: city,
//         state: state,
//         pincode: pincode,
//         country: country,
//         password: new_password,
//       });

//       if (user) {
//         const responsePayload = {
//           status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//           message: USER_MESSAGES.USERS_ADDED,
//           data: user,
//           error: null,
//         };

//         return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//       } else {
//         const responsePayload = {
//           status: RESPONSE_PAYLOAD_STATUS_ERROR,
//           message: USER_MESSAGES.USERS_NOT_ADDED,
//           data: null,
//           error: USER_MESSAGES.USERS_NOT_ADDED,
//         };

//         return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//       }
//     }
//   } catch (err) {
//     const responsePayload = {
//       status: RESPONSE_PAYLOAD_STATUS_ERROR,
//       message: null,
//       data: null,
//       error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//     };

//     return res
//       .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//       .json(responsePayload);
//   }
// };

module.exports = {
  addLogInToken,
  // addResetPasswordToken,
  // getUser,
  // getUserAll,
  // updateUser,
  // addUsers,
};
