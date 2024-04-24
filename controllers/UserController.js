const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const User = require("../models/User");
const { findOneAndUpdate, findSocialMediaById, createSocialMedia, updateSocialMediaByID, updateSocialMediaById } = require("../services/SocialMediaServices");
const { updateUserProfile } = require("../services/profileServices");
const {
    deleteUserById,
    updateUserByID,
    findUserById,
    totalUsers,
    getUsers
} = require("../services/userServices");

const getAllUsers = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;

    const skip = (page - 1) * pageSize;

    try {
        const totalItems = await totalUsers();
        const users = await getUsers(skip, pageSize);
        res.json({
            users,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: "get all users"
        });
    } catch (err) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const getUserById = async (req, res) => {
    try {
        if (!req.params.id) {
            return errorResponseMessage(res, "Id is required!", 401);
        }
        const user = await findUserById(req.params.id);
        return successResponseMessage(res, "User get successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return errorResponseMessage(res, "Id is required!", 401);
        }
        const user = await deleteUserById(req.params.id);
        return successResponseMessage(res, "User deleted successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const updateUser = async (req, res) => {
    try {
        const { username } = req.body;
        if (!req.params.id) {
            return errorResponseMessage(res, "Id is required!", 401);
        }
        const userInfo = {
            username
        }
        const user = await updateUserByID(req.params.id, userInfo)
        return successResponseMessage(res, "User update successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const getProfile = async (req, res) => {
    if (!req.user?.id) {
        return errorResponseMessage(req, "Something went wrong while validating the token!", 401)
    }
    try {
        const user = await findUserById(req.user.id);
        return successResponseMessage(res, "Get Profile", user)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const updateProfile = async (req, res) => {
    if (!req.user?.id) {
        return errorResponseMessage(req, "Something went wrong while validating the token!", 401)
    }
    try {
        const user = await findUserById(req.user.id);// get profile Id
        const profile = await updateUserProfile(user.profile._id, req.body);// update profile data
        const profileData = await findUserById(req.user.id); // get updated data  
        return successResponseMessage(res, "User Profile updated successfully!", profileData);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const updateSocialMedia = async (req, res) => {
    if (!req.user?.id) {
        return errorResponseMessage(req, "Something went wrong while validating the token!", 401)
    }
    const userId = req.user?.id;
    const { id, platform, link, visibility } = req.body;
    try {
        let socialMedia;
        // Find or create the social media entry
        if (id) {
            socialMedia = await updateSocialMediaById(id, { platform, link, visibility });
        } else {
            socialMedia = await createSocialMedia({ platform, link, visibility });
            // Find the user by ID and update the socials array

            const result = await User.findByIdAndUpdate(userId, { $push: { socials: socialMedia._id } }, { new: true });
        }
        return successResponseMessage(res, "Social Media updated successfully!", socialMedia);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    getProfile, updateProfile, updateSocialMedia
};
