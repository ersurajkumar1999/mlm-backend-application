var fs = require('fs');
const {
    errorResponseMessage,
    successResponseMessage
} = require("../helper/responseMessage");
const { checkImageType } = require("../helper/ImageValidation");
const { IMAGE_KIT } = require("../utilities/config");
const { createImage } = require('../services/imageService.js');
const { getImageById } = require('../services/imageService.js');

const imageUploadd = async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return errorResponseMessage(res, "Please select Images");
        }
        const imageFolderName = req.body?.type || 'upload'; // this is folder name
        const images = [];
        for (const file of files) {
            if (!checkImageType(file.mimetype)) {
                return errorResponseMessage(res, "Invalid file type. Only JPG and PNG are allowed.");
            }
        }
        for (const file of files) {
            const fileContent = fs.readFileSync(file.path); // Read file content
            await new Promise((resolve, reject) => {
                IMAGE_KIT.upload({
                    file: fileContent,
                    fileName: file.originalname,
                    folder: "public/" + imageFolderName
                }, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        const fileInfo = {
                            imageId: response.fileId,
                            filePath: response.filePath,
                            url: response.url,
                        };
                        images.push(fileInfo);
                        resolve();
                    }
                });
            });
        }
        return successResponseMessage(res, "Successfully uploaded files", images);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};
const imageUpload = async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return errorResponseMessage(res, 'Please select Images');
        }
        const imageFolderName = req.body?.type || 'images'; // this is folder name
        const images = [];

        for (const file of files) {
            if (!checkImageType(file.mimetype)) {
                return errorResponseMessage(res, 'Invalid file type. Only JPG and PNG are allowed.');
            }
        }

        for (const file of files) {
            await new Promise((resolve, reject) => {
                IMAGE_KIT.upload(
                    {
                        file: file.buffer, // Use file buffer directly
                        fileName: file.originalname,
                        folder: 'public/' + imageFolderName,
                    },
                    async (err, response) => {
                        if (err) {
                            reject(err);
                        } else {
                            const fileInfo = {
                                createdBY: req?.user?.id ?? "660eadc9a8f63ceb173ff3a3",
                                imageId: response.fileId,
                                imageType: response.fileType,
                                imageSize: response.size,
                                imagePath: response.filePath,
                                imageUrl: response.url,
                                folderName:imageFolderName
                            };
                            const imageInfo = await createImage(fileInfo);
                            const imageData = await getImageById(imageInfo._id);
                            images.push(imageData);
                            resolve();
                        }
                    }
                );
            });
        }

        return successResponseMessage(res, 'Successfully uploaded files', images);
    } catch (error) {
        return errorResponseMessage(res, 'Something went wrong: ' + error.message);
    }
};
const deleteImage = async (req, res) => {
    try {
        // const imageId = req.params?.imageId;
        // if (!imageId) {
        //     return errorResponseMessage(res, "Image Id is required!", 401);
        // }
        // IMAGE_KIT.deleteFile(imageId, (err, response) => {
        //     if (err) {
        //         return errorResponseMessage(res, "Failed to delete image: " + err.message);
        //     } else {
        //         return successResponseMessage(res, "Image deleted successfully", response);
        //     }
        // });
        const imageId = req.params.imageId; // Assuming the imageId is passed as a parameter in the URL

        if (!imageId) {
            return errorResponseMessage(res, 'Image ID is required for deletion');
        }

        await new Promise((resolve, reject) => {
            IMAGE_KIT.deleteFile(imageId, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        return successResponseMessage(res, 'Successfully deleted image');
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};
module.exports = { imageUpload, deleteImage }
