const { errorResponseMessage, successResponseMessage, paginationResponseMessage } = require("../helper/responseMessage");
const { createCity, totalCities, getAllCities } = require("../services/cityService");
const { createState, getAllStates, totalState, getStateById } = require("../services/stateService");

const create = async (req, res) => {
    try {
        const { cityName, stateId } = req.body;
        if (!stateId) {
            return errorResponseMessage(res, "state Id Id is required!");
        }
        const stateInfo = await getStateById(stateId);
        if (!stateInfo) {
            return errorResponseMessage(res, "Invalid State Id");
        }
        if (!cityName) {
            return errorResponseMessage(res, "City Name is required!");
        }
        const state = await createCity({ state: stateId, cityName })
        return successResponseMessage(res, "City created successfully!", state);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const getCities = async (req, res) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const pageSize = parseInt(req.body.pageSize) || 2;
        const skip = (page - 1) * pageSize;
        const total = await totalCities();
        const data = await getAllCities(skip, pageSize);

        return paginationResponseMessage(res, {
            message: "get All Cities successfully!",
           
            data,
            page,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        })
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
module.exports = { create, getCities }