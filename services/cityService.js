const City = require('../models/City');

const createCity = async (cityData) => {
    return await City.create(cityData);
};

const getCityById = async (cityId) => {
    return await City.findById(cityId).populate('state', 'name');
};

const updateCityById = async (cityId, updatedData) => {
    return await City.findByIdAndUpdate(cityId, updatedData, { new: true });
};

const deleteCityById = async (cityId) => {
    return await City.findByIdAndDelete(cityId);
};
const totalCities = async () => {
    return await City.countDocuments()
};
const getAllCities = async (skip, pageSize) => {
    return await City.find().sort({ createdAt: -1 }).populate('state', 'stateName')
        .skip(skip)
        .limit(pageSize)
        .exec()
};

module.exports = {
    createCity,
    getAllCities,
    getCityById,
    updateCityById,
    deleteCityById,
    totalCities,
};