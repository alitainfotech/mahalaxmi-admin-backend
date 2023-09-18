const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const {
  RESPONSE_PAYLOAD_STATUS_ERROR,
  RESPONSE_STATUS_MESSAGE_AUTHORIZATION_ERROR,
  RESPONSE_STATUS_CODE_AUTHORIZATION_ERROR,
  RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
  AUTH_USER_DETAILS,
} = require("../constants/global.constants");
const userModel = require("../models/user.model");

/** Authorization middleware to check */
const auth = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const authArray = req.headers.authorization.split(" ");
      if (authArray && authArray.length > 0 && authArray[1]) {
        const token = authArray[1];
        const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

        const userObj = await userModel.findOne({
          _id: decodedToken._id,
          email: decodedToken.email,
          token: token,
        });

        if (userObj) {
          const user = userObj.toJSON();
          req[AUTH_USER_DETAILS] = user;
          return next();
        } else {
          const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_AUTHORIZATION_ERROR,
          };

          return res
            .status(RESPONSE_STATUS_CODE_AUTHORIZATION_ERROR)
            .json(responsePayload);
        }
      } else {
        const responsePayload = {
          status: RESPONSE_PAYLOAD_STATUS_ERROR,
          message: null,
          data: null,
          error: RESPONSE_STATUS_MESSAGE_AUTHORIZATION_ERROR,
        };

        return res
          .status(RESPONSE_STATUS_CODE_AUTHORIZATION_ERROR)
          .json(responsePayload);
      }
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: null,
        data: null,
        error: RESPONSE_STATUS_MESSAGE_AUTHORIZATION_ERROR,
      };

      return res
        .status(RESPONSE_STATUS_CODE_AUTHORIZATION_ERROR)
        .json(responsePayload);
    }
  } catch (err) {
    console.log(err)
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

module.exports = auth;
