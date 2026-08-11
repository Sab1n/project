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
    status:{
        type: String,
        enum: ['pending', 'cancelled', 'delivered'],
        default: 'pending'
    },
    phone:{
        type:Number,
        required: true
    },
   product:[
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'product',
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }
   ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps: true})

const order = mongoose.model('order', orderSchema)
module.exports = order