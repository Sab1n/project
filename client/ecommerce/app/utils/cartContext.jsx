'use client'
import { useContext, createContext, useState  } from "react";

const Cart = createContext();

export function CartList({children}){
    const [cart, setCart] = useState([]);
    return<>
    <Cart.Provider value={{cart,setCart}}>
        {children}
    </Cart.Provider>
    </>
}

export function useCartList(){
    return useContext(Cart)
}