const userModal = require('../modals/userModal')
const bcrypt = require('bcryptjs')
const uploadImg = require('../utils/imageUpload')

const Signup = async (req, res) => {
    try {
        const { name, email, password, address } = req.body
        const exisitingUser = await userModal.findOne({email});
        const filePath = req.file?.path;
        console.log(filePath)
        if (exisitingUser){
            return res.status(400).json({messsage: 'User already exists'})
        }else{
            const result = await uploadImg(filePath)
            console.log("Image ma issue")
            const newUser = await userModal.create({
                name,
                email,
                password,
                address,
                picture : result.secure_url,
                picture_pi: result.public_id
            })
            return res.status(201).json({message: 'User created successfully', newUser})
        }
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error.message})
    }
}

const Login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const loginUser = await userModal.findOne({email});
        if (!loginUser){
            return res.status(400).json({message: 'User not found'})
        }else{
            const decode = await bcrypt.compare(password, loginUser.password);
            if(decode){
                const userToken = loginUser.generateToken();
                res.cookie('token', userToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'development',
                    expires: new Date(Date.now()+3*24*60*60*1000)
                })
                return res.status(200).json({message: 'Login successful', loginUser})
            }else{
                return res.status(400).json({message: 'password milenaaa'})
            }
        }
    } catch (error) {
        return res.status(500).json({message: 'vayena', error: error.message})
    }
}

module.exports = {Signup, Login}