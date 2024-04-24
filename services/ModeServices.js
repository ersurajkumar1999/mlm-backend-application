const modeModel = require("../models/Mode");

const createMode = async (mode) => {
    return await modeModel.create(mode);
}
const getModes = async () => {
    return await modeModel.find();
}
module.exports = { createMode, getModes }