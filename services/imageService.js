const imageModel = require('../models/Image');

const createImage = async (imageData) => {
    return await imageModel.create(imageData);
};

const getImageById = async (imageId) => {
    return await imageModel.findById(imageId).populate('createdBY');
};

const updateCityById = async (cityId, updatedData) => {
    return await imageModel.findByIdAndUpdate(cityId, updatedData, { new: true });
};

const deleteCityById = async (cityId) => {
    return await imageModel.findByIdAndDelete(cityId);
};
const totalCities = async () => {
    return await imageModel.countDocuments()
};
const getAllCities = async (skip, pageSize) => {
    return await imageModel.find().sort({ createdAt: -1 }).populate('state', 'stateName')
        .skip(skip)
        .limit(pageSize)
        .exec()
};

module.exports = {
    createImage,
    getAllCities,
    getImageById,
    updateCityById,
    deleteCityById,
    totalCities,
};