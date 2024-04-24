const mongoose = require('mongoose');
const stateSchema = new mongoose.Schema({
    stateName: {
        type: String,
        trim: true,
        required: true,
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});
module.exports = mongoose.model('State', stateSchema);
