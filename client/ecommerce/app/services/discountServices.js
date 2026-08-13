export const addCoupon = async(req)=>{
    try {
        const a = await fetch('http://localhost:5000/api/discount/addCoupon',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(req),
            credentials: 'include'
        })
        const b = await a.json()
        return b
    } catch (error) {
        return {message: 'discountServices addCoupon ma problem', error: error.message}    }
}

export const displayCoupon = async()=>{
    try {
        const a = await fetch('http://localhost:5000/api/discount/displayCoupon',{
            method: 'GET',
        })
        const b = await a.json()
        return b 
    } catch (error) {
        return {message: 'displayCoupon Services ko error', error: error.message}
    }
}