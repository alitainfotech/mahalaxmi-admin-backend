const mongoose = require('mongoose');
const { ROLE, USER } = require('../constants/collection.constants');
const { collections } = require('../constants/enum.constants');
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roles: [
      {
        db: {
          type: String,
          default: null,
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
      }
    ]
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model(ROLE,roleSchema)
