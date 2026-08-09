const orderModal = require('../modals/orderModal')
const productModal = require('../modals/productModal')

const addOrder = async(req, res)=> {
    try {
        console.log(req.body)
        // const exisitingProduct = await productModal.findOne({});
    } catch (error) {
        return res.status(500).json({message: 'addorder controller ma error', error: error.message})
    }
}

module.exports = {addOrder}