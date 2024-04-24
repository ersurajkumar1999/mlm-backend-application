const userProfile = require("../models/Profile")
const createProfile = async (profile) => {
    return await userProfile.create(profile);
}
const updateUserProfile = async (profileId, profileData) => {
    return await userProfile.findOneAndUpdate(
        { _id: profileId }, // Assuming profile is associated with the user
        { $set: profileData, updatedAt: new Date() }, // Update profile fields and updatedAt timestamp
        { new: true, upsert: true } // Return the updated profile or create a new one if it doesn't exist
    );
}

module.exports = { createProfile, updateUserProfile }