export const login = async(req)=>{
    console.log("Calal vako xa hai myg")
    try {
        const a = await fetch('http://localhost:5000/api/user/login',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(req),
            credentials: 'include'
        })
        const b = await a.json()
        return b
    } catch (error) {
        return {message: 'Error logging in user', error: error.message}
    }
}