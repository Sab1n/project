'use client'
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import {email, file, z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { signup } from "../services/signupServices"

export default function Signup(){
    
    const formSchema = z.object({
        name: z.string().min(1, {message: 'Name is required'}),
        email: z.string().email({message: 'Invalid email address'}),
        password: z.string().min(5, {message: 'Password must be at least 5 characters'}),
        address: z.string().min(1, {message: 'Address is required'}),
        picture: z.instanceof(FileList)
        .refine((files) => files.length > 0, {message: 'Please upload a picture'})
        .refine((files) => files[0].size <= 5 * 1024 * 1024, {message: 'Picture size must be less than 5MB'})
        .refine((files) => ['image/jpeg', 'image/png', 'image/gif'].includes(files[0].type), {message: 'Only JPEG, PNG, and GIF files are allowed'})
    })

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: zodResolver(formSchema)
    })

    const userMutation = useMutation({
        mutationFn: (data) => signup(data),
        onSuccess: (data) => {
            console.log('User created successfully', data)
            reset();
        },
        onError: (error) => {
            console.error('Error creating user', error)
        }
    })

    function onSubmit(data){
        userMutation.mutate(data)
    }

return (
<>

<div>
    <h2>SIGNUP</h2>
</div>

<form onSubmit={handleSubmit(onSubmit)}>
    <div><input type="text"
    placeholder="Enter Your Name"
    {...register('name')} />
    {errors.name && <p>{errors.name.message}</p>}
    </div>

    <div>
    <input type="email"
    placeholder="Enter Your Email"
    {...register('email')} />
    {errors.email && <p>{errors.email.message}</p>}
    </div>

    <div>
    <input type="password"
    placeholder="Enter Your Password"
    {...register('password')} />
    {errors.password && <p>{errors.password.message}</p>}
    </div>

    <div>
    <input type="text"
    placeholder="Enter Your Address"
    {...register('address')}/>
    {errors.address && <p>{errors.address.message}</p>}
    </div>

    <div>
    <input type="file"
    accept="image/*"
    {...register('picture')} />
    {errors.picture && <p>{errors.picture.message}</p>}
    </div>

    <button type="submit">Submit</button>
</form>
</> 
)
}