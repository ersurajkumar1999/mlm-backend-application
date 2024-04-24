const mongoose = require('mongoose');
const friendShipSchema = new mongoose.Schema({
    // requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // status: { type: String, enum: ['pending', 'accepted', 'rejected'] },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FriendShip', friendShipSchema);
