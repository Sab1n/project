const discountModal = require('../modals/discountModal');

const addCoupon = async(req,res) =>{
    try {
        const {code,quantity,type,value} = req.body;
        const exisitingCoupon = await discountModal.findOne({code});
        if(exisitingCoupon){
            return res.status(400).json({message: 'coupon with the code already exists'})
        }else{
            const addcoupon = await discountModal.create({
                code,
                quantity,
                type,
                value
            })
        }
    } catch (error) {
        return res.status(500).json({message:"add coupon discount controller", error: error.message})
    }
}

module.exports = {addCoupon}