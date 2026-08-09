const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
     },
    address:{
        type: String,
        required: true
    },
    picture:{
        type: String,
        required: true
    },
    picture_pi:{
        type: String,
        required: true
    }
},{timestamps: true})

userSchema.pre('save', async function(){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 7)
    }
})

userSchema.methods.generateToken = async function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn: '7d'}
    )
}

const user = mongoose.model('user', userSchema)
module.exports = user;