const mongoose = require("mongoose");

const modeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    emoji: {
        type: String,
        trim: true,
        required: true,
    },
    afterEmoji: {
        type: String,
        trim: true,
        required: true,
    },
    beforeEmoji: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Mode", modeSchema);
