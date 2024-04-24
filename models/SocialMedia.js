const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'connections'], // 'public' or 'private'
        default: 'public'
    }
}, { timestamps: true }); // This line should be inside the Schema definition

module.exports = mongoose.model("SocialMedia", socialMediaSchema);
