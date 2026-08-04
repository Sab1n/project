export const adminRegister = async(req)=>{
    try {
        const formData = new FormData();
        formData.append('name', req.name);
        formData.append('email', req.email);
        formData.append('password', req.password);
        formData.append('picture', req.picture[0]);
        const a = await fetch('http://localhost:5000/api/admin/adminSignup',{
            method: 'POST',
            body: formData
        })
        const b = await a.json()
        return b
    } catch (error) {
        return {message: 'Admin Register Services ma error', error: error.message}
    }
}
export const adminLogin = async (req) => {
    try {
        const response = await fetch('http://localhost:5000/api/admin/adminLogin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req),
            credentials: 'include',
        });

        const data = await response.json();

        // Throw an error for non-OK responses
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data; // Return the successful response
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
};


export const verifyAdmin = async( )=>{
    console.log("APi call vayo")
    try {
        const a = await fetch('http://localhost:5000/api/admin/verifyAdmin',{
            method: "GET",
            credentials:'include',
            cache:'no-cache'
        } )
        const b = await a.json();
        return b
    } catch (error) {
        return {message:'verifyAdmin ko error ho', error: error.message}
    }
}

export const logOut = async()=>{
    try {
        const a = await fetch('http://localhost:5000/api/admin/logoutAdmin',{
            method:'GET',
            credentials: 'include'
            
        })
        const b = await a.json()
        console.log(b)
        return b
    } catch (error) {
        return {message:'logout ko error ho', error: error.message}
    }
}