'use client'
import Link from "next/link";
import { UserVerify, useUserVerify } from "../utils/userContext";

export default function Navbar() {

    const { user, loading } = useUserVerify();

    return (
        <nav className="bg-gray-900 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link href="/" className="text-white text-xl font-bold tracking-tight">
                    Home
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="../product"
                        className="text-gray-300 hover:text-white text-sm font-medium transition"
                    >
                        Products
                    </Link>
                </div>

                {loading ? (
                    <div className="h-8 w-24 bg-gray-800 rounded-lg animate-pulse" />
                ) : user?.isUser ? (
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-300">
                            Welcome, <span className="text-white font-semibold">{user.name}</span>
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link
                            href="../signup"
                            className="text-gray-300 hover:text-white text-sm font-medium transition"
                        >
                            Signup
                        </Link>
                        <Link
                            href="../login"
                            className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}