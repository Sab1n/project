'use client'
import { JetBrains_Mono, Inter } from "next/font/google";
import "../globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query";
import { logOut } from "../services/adminServices";



const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const navItems = [
  { label: "Overview", icon: "grid", active: true , link:'/admin'},
  { label: "Orders", icon: "box" , link:'/admin/order'},
  { label: "Products", icon: "tag", link:'/admin/product' },
  { label: "Customers", icon: "users" },
  { label: "Coupon", icon: "wallet", link:'/admin/coupon' },
  { label: "Settings", icon: "settings" }
];


const icons = {
  grid: (
    <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />
  ),
  box: (
    <path d="M21 8 12 3 3 8m18 0-9 5m9-5v9l-9 5m0-9L3 8m9 5v9M3 8v9l9 5" />
  ),
  tag: (
    <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24L3 3v6.59a2 2 0 0 0 .59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.83ZM7 7h.01" />
  ),
  users: (
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm12 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  ),
  wallet: (
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5M18 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
  ),
  settings: (
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm9-3a9.05 9.05 0 0 0-.2-1.9l2-1.6-2-3.4-2.4 1a7.4 7.4 0 0 0-1.6-.9L16.4 3h-4.8l-.4 2.2c-.6.2-1.1.5-1.6.9l-2.4-1-2 3.4 2 1.6a9 9 0 0 0 0 3.8l-2 1.6 2 3.4 2.4-1c.5.4 1 .7 1.6.9l.4 2.2h4.8l.4-2.2c.6-.2 1.1-.5 1.6-.9l2.4 1 2-3.4-2-1.6c.13-.62.2-1.26.2-1.9Z" />
  ),
};

export default function RootLayout({ children }) {

 
  const [admin, setAdmin] = useState(null);
  const router = new useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      const response = await fetch(
        "http://localhost:5000/api/admin/verifyAdmin",
        {
          credentials: "include",
        }
      );
  
      const data = await response.json();
      setAdmin(data);
    };
    verifyAdmin();
  }, []);
  
  useEffect(() => {
    if (admin && !admin.isAdmin) {
      router.push("/adminLogin");
    }
  }, [admin, router]);

  const adminLogout = useMutation({
    mutationFn: () => logOut(),
    onSuccess: ()=>{
     router.push('/adminLogin')
    }, onError: (error)=>{
      console.error('Error logging out admin', error)
  }
  })

  function logout(){
    adminLogout.mutate()
  }
  
  return (
    <div className="bg-[#0D1117] text-slate-200 font-sans antialiased min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-white/[0.06] bg-[#0D1117] flex flex-col">
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-white/[0.06]">
          <div className="h-7 w-7 rounded-md bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
            <span className="font-mono text-[13px] font-semibold text-indigo-400">
              S
            </span>
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-slate-100">
            Storefront
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.link}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors duration-150 border-l-2 ${
                item.active
                  ? "bg-indigo-500/10 border-indigo-500 text-indigo-300"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] hover:border-indigo-500/40"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[17px] w-[17px] shrink-0 opacity-80"
              >
                {icons[item.icon]}
              </svg>
              {item.label}
            </a>
          ))}
        </nav>
        <div>
          <button onClick={logout}>
            Logout
          </button>
        </div>

        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-white/[0.03] transition-colors duration-150 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-[#1E2333] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-slate-300">
              MR
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-slate-200 truncate">
                Maya Reyes
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                admin@storefront.co
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 border-b border-white/[0.06] flex items-center justify-between px-6 bg-[#0D1117]/95 backdrop-blur sticky top-0 z-10">
          <div>
            <h1 className="text-[15px] font-semibold text-slate-100">
              Overview
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search orders, products…"
                className="w-64 bg-[#1E2333] border border-white/[0.08] rounded-lg pl-9 pr-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50"
              />
            </div>
            <button className="h-9 w-9 rounded-lg border border-white/[0.08] bg-[#1E2333] flex items-center justify-center text-slate-400 hover:text-slate-200 hover:border-white/[0.15] transition-colors duration-150">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="h-[17px] w-[17px]"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 px-6 py-6">

          {children}
          </main>
      </div>
    </div>
  );
}