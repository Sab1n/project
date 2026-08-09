'use client'
import { useEffect, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getProduct } from '../services/productServices'
import { useCartList } from '../utils/cartContext'
import { useRouter } from "next/navigation"


export default function Product() {

   
    const { data:productData, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['clientproduct'],
        queryFn: getProduct
    })
        console.log(productData)
    const [quantity, setQuantity] = useState(0);
    const {cart, setCart} = useCartList();
    const [product, setProduct] = useState([])
    const [user, setUser] = useState()
    console.log(product,'yo prdouct state ho')
    const router = new useRouter();

    useEffect(()=>{
        const verifyUser = async()=>{
            try {
                const a = await fetch('http://localhost:5000/api/user/verifyUser',{
                    method: 'GET',
                    credentials: 'include',
                })
                const b = await a.json();
                setUser(b)
            } catch (error) {
                
            }
        };
        verifyUser();
    },[])
    console.log(user,'yo user ho')

    useEffect(()=>{
        if(isSuccess){
        setProduct(productData?.a)
        }
    },[isSuccess, productData])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0D1117] px-6 py-16">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse rounded-xl border border-white/5 bg-[#1E2333] p-4"
                        >
                            <div className="mb-4 aspect-square rounded-lg bg-white/5" />
                            <div className="mb-2 h-3 w-3/4 rounded bg-white/5" />
                            <div className="h-3 w-1/3 rounded bg-white/5" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0D1117] px-6">
                <div className="rounded-xl border border-red-500/20 bg-[#1E2333] px-8 py-10 text-center">
                    <p className="font-mono text-sm tracking-wide text-red-400">
                        Couldn&apos;t load products
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        Please refresh the page or try again shortly.
                    </p>
                </div>
            </div>
        )
    }

    function gotoLogin(){
        router.push('/login')
    }

    function gotoCheckout(){
        router.push('/checkout')
    }

    function minus(id){
        console.log(id)
        const a = product?.find((item=> item._id === id))
        if(a){
            if(quantity > 0){
                setQuantity(quantity - 1)
            }else{
                alert('Quantity cannot be less than 0')
            }
        }
    }
    
    function plus(id){
        const a = product?.find((item=> item._id === id))
        const quanityExist = a?.quantity
        const isStockAvailable = a?.stock;
       if(isStockAvailable >0){
        if(a && quanityExist>0){
            if(quanityExist < a.stock){
                setProduct(product.map((item)=> item._id === id ? {...item, quantity: item.quantity + 1}: item))
            }else{
                alert('Quantity cannot be more than stock')
            }
        }else{
            setProduct(product.map((item)=> item._id === id ? {...item, quantity: 1}: item))
             
        }
       }else{
        alert("STock nai caina")
       }
    
    }

    function atc(id){
        console.log("This is the cart items",product)
        const a = product?.find((item=> item._id === id));
        const existingProduct = cart?.find((item=> item._id === id));
        console.log("Product ma ",a);
        console.log("cart ma",existingProduct)
        if(a && a.quantity > 0 && a.quantity <= a.stock){
            if(existingProduct ){
                console.log("Yeha samma xiryo")
                setCart(cart.map((item)=> item._id === id ? {...item, quantity: item.quantity + a.quantity}: item))
                setProduct((product)=> product.map((item)=> item._id === id ? {...item, quantity: 0, stock: item.stock-a.quantity}: item))
            }else{
                setCart([...cart, {...a}])
                setProduct((product)=> product.map((item)=> item._id === id ? {...item, quantity: 0, stock: item.stock-a.quantity}: item))

            }

    }else{
        console.log("Hello")
    }
}

    return (
        <div className="min-h-screen bg-[#0D1117] px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-10 text-2xl font-semibold tracking-tight text-slate-100">
                    Products
                </h1>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {product?.map((item, index) => (
                        <div
                            key={item._id ?? index}
                            className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#1E2333] transition-colors duration-200 hover:border-indigo-500/40"
                        >
                            <div className="aspect-square overflow-hidden bg-[#161B27]">
                                <img
                                    src={item.picture}
                                    alt={item.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="space-y-1.5 p-4">
                                <h3 className="truncate text-sm font-medium text-slate-100">
                                    {item.name}
                                </h3>
                                <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">
                                    {item.desc}
                                </p>
                                <div className="flex items-center justify-between pt-1">
                                    <p className="font-mono text-sm font-semibold tracking-tight text-indigo-400">
                                        ${item.sellingPrice}
                                    </p>
                                    <p className="font-mono text-xs text-slate-500">
                                        {item.stock} in stock
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-4 border-t border-white/5 px-4 py-3">
                                <button
                                    onClick={()=>minus(item._id)}
                                    className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-[#161B27] text-sm font-medium text-slate-300 transition-colors hover:border-indigo-500/40 hover:text-indigo-400"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center font-mono text-sm text-slate-100">
                                    {item?.quantity || 0} 
                                </span>
                                <button
                                    onClick={()=>plus(item._id)}
                                    className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-[#161B27] text-sm font-medium text-slate-300 transition-colors hover:border-indigo-500/40 hover:text-indigo-400"
                                >
                                    +
                                </button>
                            </div>

                            <div className="px-4 pb-4">
                                <button
                                    onClick={()=>atc(item._id)}
                                    className="w-full rounded-lg bg-indigo-500 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
                                >
                                    Add To Cart
                                </button>
                            </div>



                            <div className="pointer-events-none absolute inset-y-0 left-0 w-[2px] scale-y-0 bg-indigo-500 transition-transform duration-200 group-hover:scale-y-100" />
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <h2 className="mb-6 text-lg font-semibold tracking-tight text-slate-100">
                        Cart
                    </h2>
                    <div className="space-y-3">
                        {cart?.map((item, index)=>(
                            <div
                                key={item._id ?? index}
                                className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#1E2333] p-3"
                            >
                                <img
                                    src={item.picture}
                                    alt={item.name}
                                    className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-slate-100">
                                        {item.name}
                                    </p>
                                    <p className="line-clamp-1 text-xs text-slate-400">
                                        {item.desc}
                                    </p>
                                </div>
                                <p className="font-mono text-sm font-semibold text-indigo-400">
                                    ${item.price}
                                </p>
                                <p className="font-mono text-xs text-slate-500">
                                    x{item.quantity}
                                </p>

                            </div>
                        ))}
                        <div>
                        {
                            cart.length > 0 ? <>
                            {
                            
                            user?.isUser? <><button onClick={()=>gotoCheckout()}>Process To Checkout</button></>:<><button onClick={()=>gotoLogin()}>Login</button> </>
                            }
                            </>:<><p>No items in the catr yet</p></>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}