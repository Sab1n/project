'use client'
import { useMutation } from "@tanstack/react-query"
import { login } from "../services/loginServices"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export default function Login(){

const router = new useRouter();
const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(5, { message: 'Password must be at least 5 characters' })
});

const{register, handleSubmit, reset, formState:{errors}} = useForm({
    resolver: zodResolver(formSchema)
})

const userMutation = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (data) => {
        console.log('User logged in successfully', data)
        router.push('/')
        reset();
    },onError: (error) => {
        console.error('Error logging in user', error)
    }
})

function onSubmit(data){
    userMutation.mutate(data)
}
return (
<>
    <div>
        <h2>LOGIN</h2>
    </div>
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type="email"
                name="email"
                placeholder="Enter Your Email"
                {...register('email')}
                 />
                 {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <input type="password"
                name="password"
                placeholder="Enter Your Password"
                {...register('password')}/>
                {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div>
                <button type="submit">
                    Log In
                </button>
            </div>
        </form>
    </div>
</>
)
}
