const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3")
const {
    RESPONSE_PAYLOAD_STATUS_WARNING,
    RESPONSE_STATUS_CODE_OK,
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_PAYLOAD_STATUS_SUCCESS
} = require("../../constants/global.constants")
const { CUSTOMER_MESSAGES } = require("../../controller_messages/customer.messages")
const { generateCustomerCode, getCurrentLoginUser } = require("../../helpers/fn")
const customerModel = require("../../models/customer.model")
const { s3Client } = require("../../services/fileUpload")

const addCustomer = async (req, res) => {
    try {
        const {
            branch, first_name, middle_name, last_name,
            address, pincode, city, state,
            email, phone_number, joining_date } = req.body

        const existsCustomer = await customerModel.findOne({ email: email })

        if (existsCustomer) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_WARNING,
                message: CUSTOMER_MESSAGES.CUSTOMER_ALREADY_EXISTS,
                data: null,
                error: CUSTOMER_MESSAGES.CUSTOMER_ALREADY_EXISTS
            }
            return res.status(RESPONSE_STATUS_CODE_OK).send(responsePayload);
        }

        const file = req.files.profile_photo;
        const originalFileName = file.name;
        const fileExtension = originalFileName.split('.').pop();
        const profile_photo = `customer/profile_photo/${first_name}_${Date.now()}.${fileExtension}`;

        const bucketParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: profile_photo,
            Body: file.data
        };

        try {
            const data = await s3Client.send(new PutObjectCommand(bucketParams))
        } catch (error) {
            console.log('Error occurred while uploading image to S3', error);
        }

        const code = await generateCustomerCode();

        const addCustomerData = {
            code,
            branch,
            profile_photo,
            first_name,
            middle_name,
            last_name,
            address,
            pincode,
            city,
            state,
            email,
            phone_number,
            joining_date
        }

        if (req.files) {
            const addUser = await customerModel.create(addCustomerData)

            if (addUser) {
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                    message: CUSTOMER_MESSAGES.CUSTOMER_ADD,
                    data: addUser,
                    error: null
                }
                return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
            } else {
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_ERROR,
                    message: CUSTOMER_MESSAGES.CUSTOMER_NOT_ADDED,
                    data: null,
                    error: null
                }
                return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
            }
        }
    } catch (error) {
        console.log(error);
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
        }
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)
    }
}

const updateCustomer = async (req, res) => {
    try {
        let { id } = req.params
        const {
            branch, first_name, middle_name, last_name,
            address, pincode, city, state,
            email, phone_number, joining_date } = req.body

        const existingCustomer = await customerModel.findById(id);
        if (existingCustomer) {
            const existingProfilePhoto = existingCustomer.profile_photo;

            if (existingProfilePhoto) {
                const deleteParams = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: existingProfilePhoto
                };
                try {
                    await s3Client.send(new DeleteObjectCommand(deleteParams))
                } catch (error) {
                    return res.status(RESPONSE_PAYLOAD_STATUS_ERROR).json(error.message)
                }
            }
        }

        const file = req.files.profile_photo;
        const originalFileName = file.name;
        const fileExtension = originalFileName.split('.').pop();
        const profile_photo = `customer/profile_photo/${first_name}_${Date.now()}.${fileExtension}`;

        const bucketParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: profile_photo,
            Body: file.data,
        };

        try {
            const data = await s3Client.send(new PutObjectCommand(bucketParams));
        } catch (error) {
            return res.status(RESPONSE_PAYLOAD_STATUS_ERROR).json(error.message);
        }

        const updateUser = {
            profile_photo,
            branch,
            first_name,
            middle_name,
            last_name,
            address,
            pincode,
            city,
            state,
            email,
            phone_number,
            joining_date,
            updatedAt: Date.now()
        }

        if (req.files) {
            const updateCustomerData = await customerModel.findByIdAndUpdate(id, updateUser, { new: true })
            if (updateCustomerData) {
                const customerObj = updateCustomerData.toJSON();

                delete customerObj.password;
                delete customerObj.token;
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                    message: CUSTOMER_MESSAGES.CUSTOMER_UPDATED,
                    data: customerObj,
                    error: null
                }
                return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
            } else {
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_ERROR,
                    message: CUSTOMER_MESSAGES.CUSTOMER_NOT_UPDATED,
                    data: null,
                    error: CUSTOMER_MESSAGES.CUSTOMER_NOT_UPDATED
                }
                return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
            }
        }
    } catch (error) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
        }
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)
    }
}

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;

        const getCustomer = await customerModel.findById(id)

        if (getCustomer) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: CUSTOMER_MESSAGES.CUSTOMER_ID_FOUND,
                data: getCustomer,
                error: null
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: CUSTOMER_MESSAGES.CUSTOMER_ID_NOT_FOUND,
                data: null,
                error: CUSTOMER_MESSAGES.CUSTOMER_ID_NOT_FOUND
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
    } catch (error) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
        };
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

const getAllCustomer = async (req, res) => {
    try {
        const customerData = await customerModel.find({ is_deleted: false })

        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
            message: CUSTOMER_MESSAGES.CUSTOMER_ID_FOUND,
            data: customerData || [],
            error: null
        }
        return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } catch (error) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        // const user = await getCurrentLoginUser(req);

        const deleteCustomer = await customerModel.findByIdAndUpdate(
            id,
            {
                is_deleted: true,
                deleted_by: id,
                deleted_at: new Date(),
            }, { new: true }
        );

        if (deleteCustomer) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: CUSTOMER_MESSAGES.CUSTOMER_DELETED,
                data: null,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: CUSTOMER_MESSAGES.CUSTOMER_NOT_DELETED,
                data: null,
                error: CUSTOMER_MESSAGES.CUSTOMER_NOT_DELETED,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
    } catch (error) {
        console.log(error);
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
}

module.exports = {
    addCustomer,
    updateCustomer,
    getCustomerById,
    getAllCustomer,
    deleteCustomer,
}
