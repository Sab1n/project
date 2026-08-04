const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
     },
    picture: {
        type:String,
        required:true
    },
    picture_pi: {
        type:String,
        required:true
    }
},{timestamps: true})

adminSchema.pre('save', async function(){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 7);
    }
})

adminSchema.methods.generateAdminToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            name: this.name
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn: '7d'}
    )
}

const admin = mongoose.model('admin', adminSchema)
module.exports = admin