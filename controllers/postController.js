const { errorResponseMessage, successResponseMessage, paginationResponseMessage } = require("../helper/responseMessage");
const { createPost, totalPosts, getAllPosts, findPostById } = require("../services/postServices");
const Post = require("../models/Post");
const { createLike, findLikeById } = require("../services/LikeServices");
const create = async (req, res) => {
    try {
        const { titel, content, images } = req.body
        const imageIds = images.map(image => image._id);
        const userId = req.user.id;
        // if (!userId) {
        //     return errorResponseMessage(res, "Something went wrong User!");
        // }
        // if (userId) {
        //     return errorResponseMessage(res,userId);
        // }
        if (!titel) {
            return errorResponseMessage(res, "Titel is required!");
        }
        if (!content) {
            return errorResponseMessage(res, "Content is required!");
        }
        const post = await createPost({
            titel, content, images:imageIds, createdBY: userId
        })
        const updatePost = await findPostById(post._id);
        return successResponseMessage(res, "Post created successfully!", updatePost);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const pageSize = parseInt(req.body.pageSize) || 2;
        const skip = (page - 1) * pageSize;
        const totalItems = await totalPosts();
        const data = await getAllPosts(skip, pageSize);
        return paginationResponseMessage(res, {
            message: "get All State successfully!",
            status: true,
            data,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
        })
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const postLikeOld = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;
        if (!postId) {
            return errorResponseMessage(res, "Post Id is required!");
        }
        const result = await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true });
        if (!result) {
            return errorResponseMessage(res, "Post not found", 404);
        }
        return successResponseMessage(res, "Post Like successfully!", result);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};
const postUnLike = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;
        if (!postId) {
            return errorResponseMessage(res, "Post Id is required!");
        }
        const result = await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });
        if (!result) {
            return errorResponseMessage(res, "Post not found", 404);
        }
        return successResponseMessage(res, "Post UnLike successfully!", result);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const postLike = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;
        if (!postId) {
            return errorResponseMessage(res, "Post Id is required!");
        }
        const like = await createLike({postId, likedBy:userId});
        const result = await Post.findByIdAndUpdate(postId, { $push: { likes: like._id } }, { new: true });
        if (!result) {
            return errorResponseMessage(res, "Post not found", 404);
        }
        const likeData = await findLikeById(like._id);
        return successResponseMessage(res, "Post Like successfully!", likeData);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};
module.exports = {
    create, getPosts,
    postLike, postUnLike
}