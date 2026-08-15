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
            return res.status(201).json({message: 'Coupon added successfully'})
        }
    } catch (error) {
        return res.status(500).json({message:"add coupon discount controller", error: error.message})
    }
}

const displayCoupon = async(req,res)=>{
    try {
        const coupon = await discountModal.find({});
        if(coupon.length===0){
            return res.status(404).json({message: 'No Coupon Added'})
        }else{
            return res.status(200).json({message: 'this is all coupon',coupon})
        }
    } catch (error) {        
        return res.status(500).json({message: "displayCoupon ma error", error: error.message})
    }
}

const verifyCoupon = async(req, res)=>{
    try {
        const {code} = req.body.code;
        const couponCheck = await discountModal.find({code})
        if(!couponCheck){
            return res.status(404).json({message: "Coupon Code not found"})
        }else{
            if(couponCheck.quantity < 0){
                return res.status(204).json({message: "Coupon is already used"})
            }else{
                return res.status(200).json({message: "Coupon applied", coupon: couponCheck})
            }
        }
    } catch (error) {
        return res.status(500).json({message: "applyCoupon ma error", error: error.message})
    }
}
module.exports = {addCoupon, displayCoupon, verifyCoupon}