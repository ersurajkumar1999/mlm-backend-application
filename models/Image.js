const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    createdBY: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imageId: {
        type: String,
        trim: true,
        required: true,
    },
    imageType: {
        type: String,
        trim: true,
        required: true,
    },
    imageSize: {
        type: String,
        trim: true,
        required: true,
    },
    imagePath: {
        type: String,
        trim: true,
        required: true,
    },
    imageUrl: {
        type: String,
        trim: true,
        required: true,
    },
    folderName: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Image", imageSchema);
