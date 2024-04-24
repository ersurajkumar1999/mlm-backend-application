const { errorResponseMessage, successResponseMessage, paginationResponseMessage } = require("../helper/responseMessage");
const { getCountryById } = require("../services/countryServices");
const { createState, getAllStates, totalState } = require("../services/stateService");

const create = async (req, res) => {
    try {
        const { stateName, countryId } = req.body;
        if (!countryId) {
            return errorResponseMessage(res, "Country Id is required!");
        }
        const countryInfo = await getCountryById(countryId);
        if (!countryInfo) {
            return errorResponseMessage(res, "Invalid Country Id");
        }
        if (!stateName) {
            return errorResponseMessage(res, "State Name is required!");
        }
        const state = await createState({ country:countryId, stateName })
        return successResponseMessage(res, "Country created successfully!", state);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const getStates = async (req, res) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const pageSize = parseInt(req.body.pageSize) || 2;
        const skip = (page - 1) * pageSize;
        const total = await totalState();
        const data = await getAllStates(skip, pageSize);

        // res.json({
        //     message: "get All State successfully!",
        //     state: true,
        //     data,
        //     page,
        //     pageSize,
        //     total,
        //     totalPages: Math.ceil(total / pageSize),
        // });
        return paginationResponseMessage(res, {
            message: "get All State successfully!",
            state: true,
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
module.exports = { create, getStates }