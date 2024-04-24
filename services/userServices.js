const userModel = require("../models/User");

const createUser = async (user) => {
    return await userModel.create(user);
}
const findUserByEmail = async (email) => {
    return await userModel.findOne({ email: email });
}
const findUserById = async (userId) => {
    return await userModel.findOne({ _id: userId }).populate('profile').populate({
        path: 'socials',
        options: { sort: { createdAt: -1 } } // Sort socials by createdAt field in descending order
    });
}
const deleteUserById = async (userId) => {
    return await userModel.deleteOne({ _id: userId });
}
const updateUserByID = async (userId, updatedUserData) => {
    return await userModel.findOneAndUpdate({ _id: userId }, { $set: updatedUserData }, { new: true });
}
const totalUsers = async () => {
    return await userModel.countDocuments({ userType: "User" });
}
const getUsers = async (skip, pageSize, loggedInUserId) => {
    return await userModel.find({ userType: "User", _id: { $ne: loggedInUserId } })
        .populate('profile')
        .populate('friendRequestsSent')
        .populate('friendRequestsReceived')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .exec();
}
const generateAccountNumber = async () => {
    const accountNumber = Math.floor(100000000000 + Math.random() * 900000000000);
    const existingUser = await userModel.findOne({ accountNumber });
    if (existingUser) {
        return generateAccountNumber();
    }
    return accountNumber;
}
module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    deleteUserById,
    updateUserByID,
    totalUsers,
    getUsers,
    generateAccountNumber,
}