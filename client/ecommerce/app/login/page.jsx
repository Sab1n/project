'use client'
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { login } from "../services/loginServices"

export default function Login(){

const [formData, setForm] = useState(
    {email:'',
    password:''}
);

const userMutation = useMutation({
    mutationFn: (formData) => login(formData),
    onSuccess: (data) => {
        console.log('User logged in successfully', data)
    },onError: (error) => {
        console.error('Error logging in user', error)
    }
})

function populateForm(e){
    const a = e.target.name;
    const b = e.target.value;
    console.log( a ,b)
    setForm(prevState=>({
        ...prevState,[a]:b
    }))
}

function handleSubmit(e){
    e.preventDefault()
    userMutation.mutate(formData)
}
return (
<>
    <div>
        <h2>LOGIN</h2>
    </div>
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={(e)=>populateForm(e)}
                value={formData.email}/>
            </div>
            <div>
                <input type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={(e)=>populateForm(e)}
                value={formData.password}/>
            </div>
            <div>
                <button type="submit">
                    Submit
                </button>
            </div>
        </form>
    </div>
</>
)
}
