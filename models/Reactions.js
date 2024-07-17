const { Schema, Types } = require('mongoose');

const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

const reactionSchema= new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate,
    },
  }
);

module.exports= reactionSchema;
