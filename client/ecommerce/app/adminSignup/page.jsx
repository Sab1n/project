'use client'
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { adminRegister } from '../services/adminServices'

export default function AdminSignup() {

    const formSchema = z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(5, { message: 'Password must be at least 5 characters' }),
        picture: z.custom((value) => {
            if (typeof window === 'undefined' || !(value instanceof FileList)) {
                return false;
            }
            const files = Array.from(value);
            if (files.length === 0) {
                return false;
            }
            const file = files[0];
            return (
                file.size <= 5 * 1024 * 1024 && // File size less than 5MB
                ['image/jpeg', 'image/png', 'image/gif'].includes(file.type) // Valid file types
            );
        }, { message: 'Please upload a valid picture (JPEG, PNG, GIF) less than 5MB' }),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    });

    const adminMutation = useMutation({
        mutationFn: (data) => adminRegister(data),
        onSuccess: (data) => {
            console.log('Admin created successfully', data);
            reset();
        },
        onError: (error) => {
            console.error('Error creating admin', error);
        }
    });

    function onSubmit(data) {
        adminMutation.mutate(data);
    }

    return (
        <>
            <div>
                <h2>Admin Signup</h2>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input type="text"
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
                        <input type="file"
                            accept="image/*"
                            {...register('picture')} />
                        {errors.picture && <p>{errors.picture.message}</p>}
                    </div>

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}