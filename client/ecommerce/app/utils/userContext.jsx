'use client'
import { useContext, createContext, useState , useEffect } from "react";

const User = createContext();

export function UserVerify({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const verifyUser = async()=>{
            try {
                const a = await fetch('http://localhost:5000/api/user/verifyUser',{
                method: 'GET',
                credentials: 'include'
            });
            const b = await a.json()
            setUser(b)
            } catch (error) {
               setUser(null)
            } finally {
                setLoading(false)
            }
        };
        verifyUser();
    },[])

    return(
    <User.Provider value={{user, setUser, loading}}>
        {children}
    </User.Provider>
    )
}

export function useUserVerify(){
    return useContext(User)
}