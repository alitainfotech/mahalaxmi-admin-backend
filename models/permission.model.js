const mongoose = require('mongoose');
const { PERMISSION, USER } = require('../constants/collection.constants');
const { collections } = require('../constants/enum.constants')
const permissionSchema = new mongoose.Schema(
    {
        db: {
            type: String,
            enum: collections, 
        },
        action: [
            {
                type: String
            }
        ],
        is_deleted: { type: Boolean, default: false, required: false },
        deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: USER, required: false, default: null },
        deleted_at: { type: Date, required: false, default: null },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model(PERMISSION,permissionSchema)
