const postModel = require("../models/Post");

const createPost = async (post) => {
    return await postModel.create(post);
}
const findPostById = async (userId) => {
    return await postModel.findOne({ _id: userId })
        .populate('createdBY')
        .populate({
            path: 'createdBY',
            select: 'email username',
            populate: {
                path: 'profile', // Populate profile information of the user
                select: 'firstName lastName image'
            }
        })
        .populate({
            path: 'images',
            select: 'imagePath imageId', // Select only the imagePath field from the Image model
            // match: { status: true, isDeleted: false } // Optionally, you can add conditions to filter images
        });
}
// const deleteUserById = async (userId) => {
//     return await postModel.deleteOne({ _id: userId });
// }
// const updateUserByID = async (userId, updatedUserData) => {
//     return await postModel.findOneAndUpdate({ _id: userId }, { $set: updatedUserData }, { new: true });
// }
const totalPosts = async () => {
    return await postModel.countDocuments();
}
const getAllPosts = async (skip, pageSize) => {
    return await postModel.find()
        .populate('createdBY')
        .populate({
            path: 'createdBY',
            select: 'email username',
            populate: {
                path: 'profile', // Populate profile information of the user
                select: 'firstName lastName image'
            }
        })
        .populate({
            path: 'images',
            select: 'imageUrl imageId', // Select only the imagePath field from the Image model
            // match: { status: true, isDeleted: false } // Optionally, you can add conditions to filter images
        })
        // .populate("likes")
        .populate({
            path: 'likes',
            populate: {
                path: 'likedBy', // Populate profile information of the user
                select: 'username email'
            }
        })
        .sort({ createdAt: -1 })
        .skip(skip).
        limit(pageSize).
        exec();
}
module.exports = {
    createPost,
    findPostById,
    // deleteUserById,
    // updateUserByID,
    totalPosts,
    getAllPosts,
}