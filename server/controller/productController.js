const productModal = require('../modals/productModal')
const uploadImg = require('../utils/imageUpload')

const addProduct = async(req, res) => {
    try {
        const {name, desc, slug, costPrice, sellingPrice, discount, stock} = req.body
        const filePath = req.file?.path;
        const existingProduct = await productModal.findOne({slug});
        if(existingProduct){
            return res.status(400).json({message: 'Product already exists'})
        }else{
            const result = await uploadImg(filePath);
            console.log('cloudinary upload result',result)
            const product = await productModal.create({
                name,
                desc,
                slug,
                costPrice,
                sellingPrice,
                picture: result.secure_url,
                picture_pi: result.public_id,
                discount,
                stock,
                admin: req.admin._id
            })
            return res.status(201).json({message: 'Product added successfully', product})
        }
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error.message})
    }
}

const displayProduct = async(req, res) => {
    try {
        const a = await productModal.find({}).populate('admin','name');
        console.log(a,'display product controller ma a')
        if(a.length===0){
            return res.status(404).json({message:'kei chaina'})
        }else{
            return res.status(200).json({message:'product haru',a})
        }
    } catch (error) {
        return res.status(500).json({message:'server error displayproduct ko'})
    }
}

module.exports = {addProduct,displayProduct}