const jwt = require("jsonwebtoken");

const verify = require("../utilities/verify-token");
const { errorResponseMessage } = require("../helper/responseMessage");

const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return errorResponseMessage(res, "No token provided", 401);
    }
    try {
        try {
            let decode = jwt.verify(verify(req), process.env.JWT_SECRET);
            if (!decode) {
                return errorResponseMessage(res, "Wrong token", 401);
            }
            req.user = decode
            next();
        } catch (error) {
            console.log("error===>", error);
            return errorResponseMessage(res, "Token is missing", 401);
        }
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong while validating the token", 401);
    }
}

const isUser = async (req, res, next) => {
    try {
        if (req.user.userType !== "User") {
            return errorResponseMessage(res, "This is a protected route for User only", 401);
        }
    } catch (error) {
        return errorResponseMessage(res, "User role cannot be verified, try again", 401);
    }
}

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.userType !== "Admin") {
            return errorResponseMessage(res, "This is a protected route for Admin only", 401);
        }
        next();
    } catch (error) {
        return errorResponseMessage(res, "User role cannot be verified, try again", 401);
    }
}

module.exports = { auth, isUser, isAdmin }