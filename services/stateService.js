const State = require('../models/State');

const createState = async (stateData) => {
    return await State.create(stateData);
};

const getAllStates = async (skip, pageSize) => {
    return await State.find().sort({ createdAt: -1 }).populate('country', 'name')
        .skip(skip)
        .limit(pageSize)
        .exec() // Populate the 'country' field with only the 'name' property
};

const getStateById = async (stateId) => {
    return await State.findById(stateId).populate('country', 'name');
};

const updateStateById = async (stateId, updatedData) => {
    return await State.findByIdAndUpdate(stateId, updatedData, { new: true });
};

const deleteStateById = async (stateId) => {
    return await State.findByIdAndDelete(stateId);
};
const totalState = async () => {
    return await State.countDocuments()
};

module.exports = {
    createState,
    getAllStates,
    getStateById,
    updateStateById,
    deleteStateById,
    totalState
};
