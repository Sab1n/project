'use client'

import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getProduct } from '../services/productServices'
import { useCartList } from '../utils/cartContext'


export default function Product() {
   
    const { data:productData, isLoading, isError } = useQuery({
        queryKey: ['clientproduct'],
        queryFn: getProduct
    })
        console.log(productData)
    const [quantity, setQuantity] = useState(0);
    const {cart, setCart} = useCartList();


 
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

    function minus(id){
        console.log(id)
        const a = productData?.a?.find((item=> item._id === id))
        if(a){
            if(quantity > 0){
                setQuantity(quantity - 1)
            }else{
                alert('Quantity cannot be less than 0')
            }
        }
    }
    
    function plus(id){
        console.log(id)
        const a = productData?.a?.find((item => item._id === id))
        const productStock = a?.stock
        if(a){
            if(quantity < productStock){
                setQuantity(quantity + 1)
            }else{
                alert('Stock limit reached')
            }
        }
        console.log(a)
    }

    function atc(id){
        console.log(cart)
        const a = productData?.a?.find((item=> item._id === id));
        console.log(a)
        if(a){
            const b = cart?.find((item)=> item._id === id)
            if(b){
                setCart(cart.map((item)=> item._id === id ?
                {...item, quantity: item.quantity + quantity} : item))
            }else{
                setCart([...cart, {...a, quantity: quantity}])
            }
        setQuantity(0)
        }
    }

    return (
        <div className="min-h-screen bg-[#0D1117] px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-10 text-2xl font-semibold tracking-tight text-slate-100">
                    Products
                </h1>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {productData?.a?.map((item, index) => (
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
                                <p className="pt-1 font-mono text-sm font-semibold tracking-tight text-indigo-400">
                                    ${item.sellingPrice}
                                </p>
                                <p className="pt-1 font-mono text-sm font-semibold tracking-tight text-indigo-400">
                                    {item.stock}
                                </p>
                            </div>
                            <div>
                                <button onClick={()=>minus(item._id)}>-</button>
                                <span>{quantity}</span>
                                <button onClick={()=>plus(item._id)}>+</button>
                            </div>

                            <div>
                                <button onClick={()=>atc(item._id)}>
                                    Add To Cart
                                </button>
                            </div>

                            <div className="pointer-events-none absolute inset-y-0 left-0 w-[2px] scale-y-0 bg-indigo-500 transition-transform duration-200 group-hover:scale-y-100" />
                        </div>
                    ))}
                </div>

                <div>
                    {
                        cart?.map(item=>(
                            <div>
                            <img src={item.picture}/>
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                            <span>{item.desc}</span>
                            <span>{item.quantity}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}