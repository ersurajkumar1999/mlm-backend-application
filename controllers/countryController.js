const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const { getAllCountries, createCountry, totalCountries, getCountryById } = require("../services/countryServices");

const getCountries = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    const skip = (page - 1) * pageSize;
    try {
        const totalItems = await totalCountries();
        const countries = await getAllCountries(skip, pageSize);
        res.json({
            countries,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: "Get all countries!"
        });
    } catch (err) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return errorResponseMessage(res, "Country Name is required!");
        }
        const country = await createCountry({ name });
        return successResponseMessage(res, "Country created successfully!", country)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const findCountry = async (req, res) => {
    try {
        if (!req.params.id) {
            return errorResponseMessage(res, "Id is required!", 401);
        }
        const user = await getCountryById(req.params.id);
        return successResponseMessage(res, "Country get successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = {
    getCountries,
    create,
    findCountry
}  