const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const { createMode, getModes } = require("../services/ModeServices");
const create = async (req, res) => {
    const { name, emoji, beforeEmoji, afterEmoji } = req.body;
    try {
        if (!name) {
            return errorResponseMessage(res, "Please enter mode name!");
        }
        if (!emoji) {
            return errorResponseMessage(res, "Please enter emoji!");
        }
        if (!afterEmoji) {
            return errorResponseMessage(res, "Please enter afterEmoji");
        }
        if (!beforeEmoji) {
            return errorResponseMessage(res, "Please enter beforeEmoji");
        }
        const emojiInfo = await createMode({ name, emoji, afterEmoji, beforeEmoji });
        return successResponseMessage(res, 'Successfully Get Content!', emojiInfo);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const getAllModes = async (req, res) => {
    try {
        const modes = await getModes()
        return successResponseMessage(res, 'Successfully Get Mode!', modes);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
module.exports = { create, getAllModes }
