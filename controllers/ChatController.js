const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const User = require("../models/User");
const Chat = require("../models/Chat");
const { findUserById } = require("../services/userServices");

const searchUsers = async (req, res) => {
    const search = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } },
            ],
        }
        : {};

    const users = await User.find(search).find({ _id: { $ne: req.rootUserId } });
    return res.status(200).send(users);

    try {
        const user = await findUserById(req.user.id);
        return successResponseMessage(res, "Get Profile", user)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const fetchAllChats = async (req, res) => {
    try {
        const chats = await Chat.find({
            users: { $elemMatch: { $eq: req.user.id } },
        })
            .populate('users')
            .populate('latestMessage')
            .populate('groupAdmin')
            .sort({ updatedAt: -1 });

        const finalChats = await User.populate(chats, {
            path: 'latestMessage.sender',
            select: 'name email profilePic',
        });
        res.json({
            data: finalChats,
            status: true,
            message: "get all users send"
        });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
};
module.exports = { searchUsers, fetchAllChats }