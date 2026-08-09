'use client'
import { useContext, createContext, useState  } from "react";

const User = createContext();

export function UserVerify({children}){
    const [user, setUser] = useState();
    return<>
    <User.Provider value={{user,setUser}}>
        {children}
    </User.Provider>
    </>
}

export function useUserVerify(){
    return useContext(User)
}