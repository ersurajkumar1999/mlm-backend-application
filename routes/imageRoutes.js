const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require("../middlewares/authMiddleware");
const { imageUpload, deleteImage } = require('../controllers/ImageController');
// const upload = multer({
//     dest: 'uploads/',
//     limits: {
//         fileSize: 1024 * 1024 * 30, // 3MB limit (adjust as needed)
//     },
// });
const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 30, // 30MB limit (adjust as needed)
    },
});

router.post('/image-upload', upload.array('images', 20), imageUpload);
router.delete('/image-delete/:imageId', deleteImage);
module.exports = router;