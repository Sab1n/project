export const addProduct = async(req)=>{
    try {
        const formData = new FormData();
        formData.append('name', req.name);
        formData.append('desc', req.desc);
        formData.append('slug', req.slug);
        formData.append('costPrice', req.costPrice);
        formData.append('sellingPrice', req.sellingPrice);
        formData.append('discount', req.discount);
        formData.append('stock', req.stock);
        formData.append('picture', req.picture[0]);
        const a = await fetch('http://localhost:5000/api/product/addProduct',{
            method: 'POST',
            body: formData,
            credentials:'include'
        })
        const b = await a.json()
        return b
    } catch (error) {
        return {message: 'Add Product Services ma error', error: error.message}
    }
}

export const getProduct = async(req)=>{
    try {
        const a = await fetch('http://localhost:5000/api/product/getProduct',{
            method: 'GET',
        })
        const b = await a.json()
        return b
    } catch (error) {
        return {message:'get API ma problem cha', error: error.message}
    }
}