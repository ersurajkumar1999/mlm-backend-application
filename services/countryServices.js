const Country = require('../models/Country');

const createCountry = async (countryData) => {
    return await Country.create(countryData);
};
const getCountryById = async (countryId) => {
    return await Country.findById(countryId);
};

const updateCountryById = async (countryId, updatedData) => {
    return await Country.findByIdAndUpdate(countryId, updatedData, { new: true });
};

const deleteCountryById = async (countryId) => {
    return await Country.findByIdAndDelete(countryId);
};
const totalCountries = async () => {
    return await Country.countDocuments();
}
const getAllCountries = async (skip, pageSize) => {
    return await Country.find().sort({ createdAt: -1 })
    .skip(skip).limit(pageSize).exec();
}

module.exports = {
    createCountry,
    getCountryById,
    updateCountryById,
    deleteCountryById,
    totalCountries,
    getAllCountries
};