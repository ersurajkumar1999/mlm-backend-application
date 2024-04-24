const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    titel: {
        type: String,
        trim: true,
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    // images: {
    //     type: [String], // Array of strings
    //     trim: true,
    //     default: [],
    // },
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
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    comments: [{
        text: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }],
    createdBY: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model("Post", postSchema);
