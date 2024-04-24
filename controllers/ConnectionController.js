const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const User = require("../models/User");
const { getMyFriendShip } = require("../services/friendShipServices");

const {
    totalUsers,
    getUsers
} = require("../services/userServices");

const userListForConnections = async (req, res) => {
    const loggedInUserId = req.user.id;
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 2;

    const skip = (page - 1) * pageSize;

    try {
        const totalItems = await totalUsers();
        const users = await getUsers(skip, pageSize, loggedInUserId);
        res.json({
            data: users,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: "get all users"
        });
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const getMyReceivedConnections = async (req, res) => {
    const loggedInUserId = req.user.id;
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 2;
    const status = "pending";// "accepted";
    const skip = (page - 1) * pageSize;

    try {
        // Find the user by ID and populate the 'friendRequestsSent' and 'friendRequestsReceived' fields with pagination
        const user = await User.findById(loggedInUserId)
            // .populate({
            //     path: 'friends',
            //     model: 'FriendShip',
            //     match: { status: status },// Filter by status: 'accepted'
            //     populate: {
            //         path: 'requester',
            //         model: 'User', // Assuming your user model is named 'User'
            //         select: 'username email',
            //         populate: {
            //             path: 'profile', // Populate the profile field
            //             model: 'Profile', // Assuming your profile model is named 'Profile'
            //             select: 'firstName lastName displayName image',
            //         }
            //     }
            // })
            .populate({
                path: 'friendRequestsReceived',
                model: 'FriendShip',
                match: { status: status }, // Filter by status: 'accepted'
                populate: {
                    path: 'requester',
                    model: 'User', // Assuming your user model is named 'User'
                    select: 'username email',
                    populate: {
                        path: 'profile', // Populate the profile field
                        model: 'Profile', // Assuming your profile model is named 'Profile'
                        select: 'firstName lastName displayName image',
                    }
                }
            })
            .skip(skip)
            .limit(pageSize);

        if (user) {
            // Extract and return the populated friend request details

            res.json({
                data: user.friendRequestsReceived,
                page,
                pageSize,
                status: true,
                message: "get all users"
            });
        } else {
            return null; // Or you can return an empty object/array if needed
        }


    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const getMySendConnections = async (req, res) => {
    const loggedInUserId = req.user.id;
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 2;
    const status = "pending";// "accepted";
    const skip = (page - 1) * pageSize;

    try {
        // Find the user by ID and populate the 'friendRequestsSent' and 'friendRequestsReceived' fields with pagination
        const user = await User.findById(loggedInUserId)
            .populate({
                path: 'friendRequestsSent',
                model: 'FriendShip',
                match: { status: status }, // Filter by status: 'accepted'
                populate: {
                    path: 'recipient',
                    model: 'User', // Assuming your user model is named 'User'
                    select: 'username email',
                    populate: {
                        path: 'profile', // Populate the profile field
                        model: 'Profile', // Assuming your profile model is named 'Profile'
                        select: 'firstName lastName displayName image',
                    }
                }
            })
            .skip(skip)
            .limit(pageSize)
            .sort({ 'FriendShip.createdAt': -1 })

        if (user) {
            res.json({
                data: user.friendRequestsSent,
                page,
                pageSize,
                status: true,
                message: "get all users send"
            });
        } else {
            return null; // Or you can return an empty object/array if needed
        }


    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const getMyFollowerOrFollowing = async (req, res) => {
    const loggedInUserId = req.user.id;
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 2;
    const status = "pending";// "accepted";
    const skip = (page - 1) * pageSize;

    try {
        // Find the user by ID and populate the 'friendRequestsSent' and 'friendRequestsReceived' fields with pagination
        const user = await User.findById(loggedInUserId)
            .populate({
                path: 'friendRequestsSent',
                model: 'FriendShip',
                match: { status: status } // Filter by status: 'accepted'
            })
            .populate({
                path: 'friendRequestsReceived',
                model: 'FriendShip',
                match: { status: status } // Filter by status: 'accepted'
            })
            .skip(skip)
            .limit(pageSize);

        if (user) {
            // Extract and return the populated friend request details
            const friendShip = {
                friendRequestsSent: user.friendRequestsSent,
                friendRequestsReceived: user.friendRequestsReceived
            };
            res.json({
                data: friendShip,
                page,
                pageSize,
                status: true,
                message: "get all users"
            });
        } else {
            return null; // Or you can return an empty object/array if needed
        }


    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
module.exports = { userListForConnections, getMyReceivedConnections, getMySendConnections }