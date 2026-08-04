const adminModal = require('../modals/adminModal')
const jwt = require('jsonwebtoken')

const adminMiddleWare = async(req, res, next)=>{
    try {
        console.log('ya samma ako cha haaai')
        const token = req.cookies.adminToken;
        console.log(token)
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

module.exports = {adminMiddleWare}