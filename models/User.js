const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
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
    },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    friendRequestsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FriendShip' }],

    friendRequestsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FriendShip' }],

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],

    socials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SocialMedia' }],

    token: {
        type: String,
    }
});

module.exports = mongoose.model("User", UserSchema);
