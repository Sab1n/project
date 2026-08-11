'use client'
export const checkout = async({data,product}) =>{
    try {
        const a = await fetch('http://localhost:5000/api/checkout/order',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({data,product}),
            credentials: 'include'
        }
        )
        const b = await a.json()
        return b
    } catch (error) {
        return {message: 'Order Services ma error', error: error.message}
        
    }
}

export const getOrder = async()=> {
    try {
        const a = await fetch('http://localhost:5000/api/checkout/getorder',{
            method: 'GET',
            credentials: 'include'
        })
        const b = await a.json()
        return b
    } catch (error) {
        return {message: 'GET Order Services ma error', error: error.message}
    }
}
