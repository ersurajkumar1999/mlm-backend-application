const FriendShip = require("../models/FriendShip");


const getMyFriendShip = async (skip, pageSize, loggedInUserId) => {
    return await FriendShip.find({ userType: "User",_id: { $ne: loggedInUserId }  }).populate('profile').populate('friendRequestsSent').populate('friendRequestsReceived').sort({ createdAt: -1 })
    .skip(skip).limit(pageSize).exec();
}

module.exports = {
    getMyFriendShip,
}