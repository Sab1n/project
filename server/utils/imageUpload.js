const cloudinary = require('../config/cloudinaryConfig')
const fs = require('fs')

const uploadImage = async (filePath) => {
    try {
        console.log("Uploading file from path:", filePath);
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'userProfile'
        })
        fs.unlinkSync(filePath)
        return result
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error('Image upload failed')
    }
}



module.exports = uploadImage;