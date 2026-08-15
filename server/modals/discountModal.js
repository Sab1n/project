const mongoose = require('mongoose')

const discountSchema =  new mongoose.Schema({
    code:{
        type: String,
        required: true,
        unique: true,
    },
    quantity:{
        type: Number,
        required: true
    },
    type:{
        type: String,
        enum: ['%','Rs'],
        default: 'Rs'
    },
    value:{
        type: Number,
        required: true
    }
},{timestamps: true})

const discount = mongoose.model('discount codes',discountSchema)
module.exports = discount