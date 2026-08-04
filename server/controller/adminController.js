const adminModal = require('../modals/adminModal')
const bcrypt = require('bcryptjs')
const uploadImg = require('../utils/imageUpload')

const adminSignup = async (req,res) =>{
    try {
        const {name, email, password} = req.body;
        const existingCheck = await adminModal.findOne({email});
        const filePath = req.file?.path;
        if(existingCheck){
            return res.status(400).json({message: 'Admin already exists'})
        }else{
            const result = await uploadImg(filePath);
            const newAdmin = await adminModal.create({
                name,
                email,
                password,
                picture: result.secure_url,
                picture_pi: result.public_id
            })
            return res.status(201).json({message: 'Admin created successfully', newAdmin})
        }
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error.message})
    }
}

const adminLogin = async(req,res)=>{
    try{
        console.log("Login garda aako",req.body)
        const {email, password} = req.body;
        const loginAdmin = await adminModal.findOne({email:email});
        console.log(loginAdmin)
        if(!loginAdmin){
            return res.status(404).json({message: 'Admin not found'})
        }else{
            const decode = await bcrypt.compare(password, loginAdmin.password);
            if(decode){
                const adminToken =await loginAdmin.generateAdminToken();
                res.cookie('adminToken', adminToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                     expires: new Date(Date.now()+3*24*60*60*1000)
                })
                return res.status(200).json({message: 'Admin logged in successfully', loginAdmin})
            }else{
                return res.status(400).json({message: 'Incorrect password'})
            }
        }
    }catch(error){
        return res.status(500).json({message: 'Internal server error', error: error.message})
    }
}

const verifyAdmin = async(req,res)=>{
    try {
        const adminVerify = req.admin;
        if(adminVerify){
         return    res.status(200).json({message: 'admin verified', 'isAdmin':true})
        }
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error.message})
    }
}

const logoutAdmin = async(req, res)=>{
    try {
        res.cookie('adminToken','',{
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now()+3*24*60*60*1000)
        })
        return res.status(200).json({message:'Logged Out successfully'})
    } catch (error) {
        return res.status(500).json({message: 'logoutadmin ma error', error: error.message})
    }
}

module.exports = {adminSignup,adminLogin,verifyAdmin,logoutAdmin}