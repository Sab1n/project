const adminModal = require('../modals/adminModal')
const userModal = require('../modals/userModal')
const jwt = require('jsonwebtoken')

const adminMiddleWare = async(req, res, next)=>{
    try {
        console.log('ya samma ako cha haaai')
        const token = req.cookies.adminToken;
        console.log(token,'admin token')
        if(!token){
            return res.status(404).json({message: 'Token chaina'})
        }
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const selectedAdmin = await adminModal.findById(isVerified._id);
        if(selectedAdmin){
            req.admin = selectedAdmin;
            next();
        }else{
            return res.status(401).json({message: 'Unauthorized Access'})
        }
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error.message})
    }
}

const userMiddleWare = async(req, res, next)=>{
    try {
        const token = req.cookies.userToken;
        console.log(token,'user token')
        if(!token){
            return res.status(404).json({message: 'Token chaina'})
        }
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const selectedUser = await userModal.findById(isVerified._id);
        if(selectedUser){
            req.user = selectedUser;
            next();
        }else{
            return res.status(401).json({message: 'Unauthorized Access'})
        }
    } catch (error) {
        return res.status(500).json({message: 'userMiddleware ko error', error: error.message})
    }
}

module.exports = {adminMiddleWare, userMiddleWare}