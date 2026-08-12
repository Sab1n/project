'use client'
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { addCoupon } from "../../services/discountServices"

export default function AddCoupon(){
    
const formSchema = z.object({
    code: z.string().min(4,{ message: 'Code is Required' }),
    quantity: z.number().min(1, {messsage: 'Quantity is required'}),
    type: z.enum(['%','Rs'], {message: 'Type is required'}),
    value: z.number().min(1,{messasge: 'Value is required'})
})

const {register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {type: 'Rs'}
})

const couponMutation = useMutation({
    mutationFn: (data) => addCoupon(data),
    onSuccess: (data) => {
        console.log('Coupon added successfully',data);
        reset()
    },
    onError: (error)=>{
        console.log('Error adding coupon',error)
    }
})

function onSubmit(data){
    couponMutation.mutate(data)
}

return(
    <div>
        <form action={handleSubmit(onSubmit)}>
            <input type="text" 
            placeholder="Enter The Coupon Code"
            {...register('code')}/>
            {errors.code && <span>{errors.code.message}</span>}
            <input type="number" 
            placeholder="Enter The Quantity"
            {...register('quantity',{valueAsNumber:true})}/>
            {errors.quantity && <span>{errors.quantity.message}</span>}
            <select {...register('type')} defaultValue="">
                <option value="" disabled>Select Type</option>
                <option value="%">%</option>
                <option value="Rs">Rs</option>
            </select>
            <input type="number" 
            placeholder="Enter The Value"
            {...register('value',{valueAsNumber:true})}/>
            {errors.value && <span>{errors.value.message}</span>}
            <button type="submit">
                Create
            </button>
        </form>
    </div>
)
}