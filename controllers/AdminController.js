const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const { findUserById } = require("../services/userServices");

const getProfile = async (req, res) => {
    if (!req.user?.id) {
        return errorResponseMessage(req, "Something went wrong while validating the token!", 401)
    }
    try {
        const user = await findUserById(req.user.id);
        return successResponseMessage(res, "Get Profile", user)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
module.exports = { getProfile }