require('dotenv').config();
// const cloudinary = require('cloudinary').v2;
var ImageKit = require("imagekit");
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const SECRET = process.env.SECRET;
const VITE_OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;
// const UPLOAD_PRESET = process.env.UPLOAD_PRESET || 'ml_default';

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });
const IMAGE_KIT = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

module.exports = {
    PORT,
    DATABASE_URL,
    SECRET,
    IMAGE_KIT,
    VITE_OPENAI_API_KEY
    // cloudinary,
    // UPLOAD_PRESET,
};