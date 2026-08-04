    'use client'
    import { useMutation } from "@tanstack/react-query"
    import { useForm } from "react-hook-form"
    import { z } from "zod"
    import { useRouter } from "next/navigation"
    import { zodResolver } from "@hookform/resolvers/zod"
    import { adminLogin } from "../services/adminServices"

    export default function AdminLogin(){

        const router = new useRouter();
        const formSchema = z.object({
            email: z.string().email({ message: 'Invalid email address' }),
            password: z.string().min(5, { message: 'Password must be at least 5 characters' })
        });
        
        const{register, handleSubmit, reset, formState:{errors}} = useForm({
            resolver: zodResolver(formSchema)
        })

        const adminMutation = useMutation({
            mutationFn : (data) => adminLogin(data),
            onSuccess: (data) => {
                console.log('Admin logged in successfully', data)
                router.push('/admin')
                reset()
            },onError: (error) => {
                console.error('Error logging in admin', error)
            }
        })  

        function onSubmit(data){
            adminMutation.mutate(data)
        }

        return (
            <>
            <div>
                <h2>ADMIN LOGIN</h2>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input type="email"
                        placeholder="Enter Your Email"
                        {...register('email')}/>
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div>
                        <input type="password"
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