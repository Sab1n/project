const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required:true
    },
    phone:{
        type:Number,
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps: true})

const order = mongoose.model('order', orderSchema)
module.exports = order