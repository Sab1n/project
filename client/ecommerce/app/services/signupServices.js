export const signup = async(data)=>{
    try {  
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('address', data.address);
        formData.append('picture', data.picture[0]);
        const a = await fetch ('http://localhost:5000/api/user/signup',{
            method: 'POST',
            body: formData
        })
        const b = await a.json()
        return b
    } catch (error) {
        return {message: 'Signup Services ma error', error: error.message}
    }
}