const socialMediaModel = require("../models/SocialMedia");

const createSocialMedia = async (social) => {
    return await socialMediaModel.create(social);
}
const findSocialMediaById = async (socialMediaId) => {
    return await socialMediaModel.findOne({ _id: socialMediaId });
}
const deleteUserById = async (userId) => {
    return await socialMediaModel.deleteOne({ _id: userId });
}
const updateSocialMediaById = async (id, socialMediaData) => {
    return await socialMediaModel.findOneAndUpdate({ _id: id }, { $set: socialMediaData }, { new: true });
}

module.exports = {
    createSocialMedia,
    findSocialMediaById,
    deleteUserById,
    updateSocialMediaById,
}