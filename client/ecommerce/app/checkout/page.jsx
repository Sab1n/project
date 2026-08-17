'use client'
import { useCartList } from '../utils/cartContext'
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { checkout } from '../services/orderServices'
import { useState } from 'react'
import { verifyCoupon } from '../services/discountServices'


export default function Checkout(){

    const {cart, setCart} = useCartList();
    console.log(cart)
    const formSchema = z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        email: z.string().email({ message: 'Invalid email address' }),
        address: z.string().min(1, { message: 'Address is required' }),
        phone: z.number().min(10, { message: 'Phone number must be at least 10 digits' }),
    })

    const [discount, setDiscount] = useState('')

    const{register, handleSubmit, reset, formState:{errors}} = useForm({
        resolver: zodResolver(formSchema)
    })

    const totalCart = cart?.reduce((acc,item)=>{
        return acc + (item.sellingPrice*item.quantity)
    },0) || 0

    const checkoutMutation = useMutation({
        mutationFn: ({data,product,appliedCoupon,finalTotal}) => checkout({data,product,appliedCoupon,finalTotal}),
        onSuccess: (data) => {
            console.log('Checkout successful', data)
            setCart([]);
            reset();
            window.location.href = '/product'
        },onError: (error) => {
            console.error('Error during checkout', error)
        }
    })

    const [appliedCoupon, setappliedCoupon] = useState();

    const discountMutation = useMutation({
        mutationFn: (discount) => verifyCoupon(discount),
        onSuccess: (discount) => {
            console.log('discount code successfully send to backend', discount)
            setDiscount('')
            setappliedCoupon(discount.coupon)
        },onError: (error) => {
            console.error('Error during applying discount', error)
        }
    })

    let discountAmt;
    if(appliedCoupon){
        if(appliedCoupon.type === '%'){
            discountAmt = totalCart * (appliedCoupon.value / 100);
        }else{
            discountAmt = Math.min(appliedCoupon.value, totalCart)
        }
    }
    const finalTotal = totalCart - discountAmt
     
    function onSubmit(data){
        const product = cart.map(item => ({
            _id: item._id,
            quantity: item.quantity,
        }));
        console.log('yo product hooo',product)
        checkoutMutation.mutate({data,product,appliedCoupon,finalTotal})
    }

    function applyDiscount(e){
        e.preventDefault()
        console.log(discount)
        discountMutation.mutate(discount)
    }
     
    return(
        <div className="min-h-screen bg-[#0a0e1a] text-slate-200 font-mono px-4 py-10 md:px-10">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-indigo-300 mb-8 border-l-2 border-indigo-500 pl-4">
                Checkout
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

                {/* Cart summary */}
                <div className="bg-[#0f1424] border border-indigo-900/40 rounded-lg p-5 space-y-4">
                    {cart?.map((item, index) => (
                        <div
                            key={item._id ?? index}
                            className="flex gap-4 items-center bg-[#131a2e] border border-indigo-900/30 rounded-md p-3 transition-all duration-200 hover:border-l-2 hover:border-l-indigo-400 hover:shadow-[0_0_12px_rgba(99,102,241,0.25)]"
                        >
                            <img
                                src={item.picture}
                                className="w-16 h-16 object-cover rounded-md border border-indigo-900/40"
                            />
                            <div className="flex-1 text-sm">
                                <h2 className="text-slate-100 font-semibold">{item?.name}</h2>
                                <p className="text-indigo-300">Price: {item?.sellingPrice}</p>
                                <span className="block text-slate-400 text-xs">{item?.desc}</span>
                                <span className="block text-slate-400 text-xs">Discount: {item?.discount}</span>
                                <span className="block text-slate-400 text-xs">Quantity: {item?.quantity}</span>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center pt-4 border-t border-indigo-900/40">
                        <span className="text-slate-400 text-sm">Gross Total</span>
                        <span className="text-lg font-bold text-indigo-300">{totalCart}</span>
                    </div>
                    <div>
                        {appliedCoupon ? (
                            <p>Total After Coupon applied: {finalTotal}</p>
                        ): (
                            <p></p>
                        )}
                    </div>
                </div>

                {/* Checkout form */}
                <div className="bg-[#0f1424] border border-indigo-900/40 rounded-lg p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                {...register('name')}
                                className="w-full bg-[#0a0e1a] border border-indigo-900/40 rounded-md px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:border-l-2 focus:border-l-indigo-400 focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                            />
                            {errors.name && <span className="block mt-1 text-xs text-red-400">{errors.name.message}</span>}
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                {...register('email')}
                                className="w-full bg-[#0a0e1a] border border-indigo-900/40 rounded-md px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:border-l-2 focus:border-l-indigo-400 focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                            />
                            {errors.email && <span className="block mt-1 text-xs text-red-400">{errors.email.message}</span>}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter Your Address"
                                {...register('address')}
                                className="w-full bg-[#0a0e1a] border border-indigo-900/40 rounded-md px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:border-l-2 focus:border-l-indigo-400 focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                            />
                            {errors.address && <span className="block mt-1 text-xs text-red-400">{errors.address.message}</span>}
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Enter Your Phone Number"
                                {...register('phone',{valueAsNumber: true})}
                                className="w-full bg-[#0a0e1a] border border-indigo-900/40 rounded-md px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:border-l-2 focus:border-l-indigo-400 focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                            />
                            {errors.phone && <span className="block mt-1 text-xs text-red-400">{errors.phone.message}</span>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm py-2.5 rounded-md transition-all duration-200 hover:shadow-[0_0_16px_rgba(99,102,241,0.4)]"
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                    <form onSubmit={applyDiscount}>
                        <input type="text"
                        placeholder='Enter Your Discount Code'
                        value={discount}
                        onChange={(e)=>setDiscount(e.target.value)}/>
                        <button type='submit'>Apply Discount</button>
                     </form>
                </div>
            </div>
        </div>
    )
}