'use client'
import Link from "next/link";
import { UserVerify, useUserVerify } from "../utils/userContext";
export default function Navbar(){

    const {user, loading} = useUserVerify();

    return (
        <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-lg font-semibold">
            Home
            </Link>
            <Link href='../product'>Products</Link>
            
            {loading ? null : user?.isUser ? (
                <>
                <span>Welcome, {user.name}</span>
                </>
            ): (
                <div className="space-x-4">
                    <Link href="../signup" className="text-gray-300 hover:text-white">
                    Signup
            </Link>
            <Link href="../login">
            Login
            </Link>
            </div>
            )}
        </div>
        </nav>
    );
}