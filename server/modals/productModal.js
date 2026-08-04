const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    costPrice:{
        type: Number,
        required: true
    },
    sellingPrice:{
        type: Number,
        required: true
    },
    picture:{
        type: String,
        required: true
    },
    picture_pi:{
        type: String,
        required: true
    },
    discount:{
        type: Number,
        required: false
    },
    stock:{
        type: Number,
        required: true
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    }
})

const product = mongoose.model('product', productSchema)
module.exports = product
// name,slug,desc,CP,SP,picture,picture_pi,discount_price,admin