'use client'
import { useCartList } from '../utils/cartContext'
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { checkout } from '../services/orderServices'


export default function Checkout(){

    const {cart, setCart} = useCartList();
    console.log(cart)
    const formSchema = z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        email: z.string().email({ message: 'Invalid email address' }),
        address: z.string().min(1, { message: 'Address is required' }),
        phone: z.number().min(10, { message: 'Phone number must be at least 10 digits' }),
    })

    const{register, handleSubmit, reset, formState:{errors}} = useForm({
        resolver: zodResolver(formSchema)
    })

    const checkoutMutation = useMutation({
        mutationFn: ({data,product}) => checkout({data,product}),
        onSuccess: (data) => {
            console.log('Checkout successful', data)
            setCart([]);
            reset();
            window.location.href = '/product'
        },onError: (error) => {
            console.error('Error during checkout', error)
        }
    })

    function onSubmit(data){
        const product = cart.map(item => ({
            _id: item._id,
            quantity: item.quantity,
        }));
        console.log('yo product hooo',product)
        
        checkoutMutation.mutate({data,product})
    }
     
    return(
        <div>
            <h1>Checkout</h1>
            <div>
                {cart?.map((item, index) => (
                    <div>
                        <img src={item.picture} />
                        <h2>{item?.name}</h2>
                        <p>Price: {item?.sellingPrice}</p>
                        <span>{item?.desc}</span>
                        <span>Discount: {item?.discount}</span>
                        <span>Quantity: {item?.quantity}</span>
                    </div>
                ))}
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" placeholder="Enter Your Name" {...register('name')}/>
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div>
                    <input type="email" placeholder="Enter Your Email" {...register('email')} />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <input type="text" placeholder="Enter Your Address" {...register('address')} />
                    {errors.address && <span>{errors.address.message}</span>}
                </div>
                <div>
                    <input type="number" placeholder="Enter Your Phone Number" {...register('phone',{valueAsNumber: true})}/>
                    {errors.phone && <span>{errors.phone.message}</span>}
                </div>
                <div>
                    <button type="submit">
                        Place Order
                    </button>
                </div>
                
                </form>
            </div>
        </div>
    )

}