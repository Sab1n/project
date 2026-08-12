const orderModal = require('../modals/orderModal')
const productModal = require('../modals/productModal')

const addOrder = async(req, res)=> {
    try {
        console.log(req.body)
        console.log(req.user);
        let fakeProduct = []
        let realProduct = []
        const {name, email, address, phone} = req.body.data
        const product = req.body.product;
         for (const singleProduct of product){
            const exisitingProduct = await productModal.findOne({_id: singleProduct._id});
            if(!exisitingProduct){
                fakeProduct.push(singleProduct)
             }
            realProduct.push(singleProduct)
        }
        const order = await orderModal.create({
            name,
            email,
            address,
            phone,
            product: realProduct,
            user: req.user._id
        })
        for (const stockMinus of realProduct){
            console.log(stockMinus._id)
            const product = await productModal.findOne({_id: stockMinus._id})
            console.log(product)
            await productModal.findOneAndUpdate(
                {_id: stockMinus._id},
                {$set: { stock : product.stock - stockMinus.quantity }},
                {new: true}
            );
        }
        return res.status(201).json({message: 'Order placed successfully', order, fakeProduct})
    } catch (error) {
        return res.status(500).json({message: 'addorder controller ma error', error: error.message})
    }
}

const getOrder = async(req,res) =>{
    try{
         const a = await orderModal.find({}).populate('product._id','name picture sellingPrice')
         if(a.length==0){
            return res.status(404).json({message: 'order chaina'})
        }else{
            return res.status(200).json({message: 'Orders fetched successfully', a})
        }
    }catch(error){
        return res.status(500).json({message: 'getorder controller ma error', error: error.message})
    }
}

const updateStatus = async(req,res)=>{
    try {
        const {id, status} = req.body;
        const currentOrder = await orderModal.findOne({_id: id});
        if (!currentOrder) {
            return res.status(404).json({message: 'Order not found'});
        }
        if (currentOrder.status === 'cancelled') {
            return res.status(400).json({message: 'Cannot update a cancelled order'});
        }
        if(status === 'canceled'){
            const cancelledOrder = await orderModal.findOne({_id: id});
            for (const item of cancelledOrder.product){
                const product = await productModal.findOne({_id: item._id});
                const stockUpdate = await productModal.findOneAndUpdate(
                    {_id: item._id},
                    {$set: { stock : product.stock + item.quantity }},
                    {new: true}
                );
                const quantityUpdate = await orderModal.findOneAndUpdate(
                    {_id: id, 'product._id': item._id},
                    {$set: {'product.$.quantity': 0}},
                    {new: true}
                );
            }
        }
        const statusUpdate = await orderModal.findOneAndUpdate(
            {_id: id},
            {$set: {status: status}},
            {new: true}
        );
        return res.status(200).json({message: 'Status updated successfully', order: statusUpdate});
    } catch (error) {
        return res.status(500).json({message: 'update status controller ma error', error: error.message})
    }
}

module.exports = {addOrder, getOrder, updateStatus}