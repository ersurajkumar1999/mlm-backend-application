const successResponseMessage = async (res, message, data = []) => {
    return res.status(200).send({ status: true, message, data });
}
const errorResponseMessage = async (res, message, errorCode = 400) => {
    return res.status(errorCode).send({ status: false, message });
}

const paginationResponseMessage = async (res, data) => {
    return res.status(200).send(data);
}
module.exports = {
    successResponseMessage,
    errorResponseMessage,
    paginationResponseMessage
}