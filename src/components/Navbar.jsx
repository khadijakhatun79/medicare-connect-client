"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Phone,
} from "lucide-react";

import { Button } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [role, setRole] = useState("");

// Get User Role
useEffect(() => {
  const getRole = async () => {
    try {
      if (!session?.user?.email) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.email}`
      );

      const data = await res.json();

      setRole(data?.role?.toLowerCase() || "");
    } catch (err) {
      console.error(err);
    }
  };

  getRole();
}, [session]);

// Navbar Scroll Effect
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const getDashboardRoute = () => {
    if (role === "admin") return "/dashboard/admin";
    if (role === "doctor") return "/dashboard/doctor";
    return "/dashboard/patient";
  };

  return (
   <nav
  className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
    scrolled
      ? "bg-[#00001b]/95 backdrop-blur-md shadow-lg py-2"
      : "bg-transparent py-4"
  }`}
>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
         <Image
          src="/assets/logo.png" 
          width={24}
          height={24}
          style={{ height: "auto" }} alt="logo"
          />
          <span className="font-extrabold text-2xl text-white">
            MediCare
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center text-white">

          <Link href="/">Home</Link>
          <Link href="/doctors">Find Doctors</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          <Link
            href="/emergency"
            className="flex items-center gap-1 text-red-200"
          >
            <Phone size={16} />
            Emergency
          </Link>
        </div>

        {/* AUTH SECTION */}
        <div className=" md:flex items-center gap-4">

          {!isPending && !session ? (
            <>
              <Link href="/login"><button className="text-white">Login</button></Link>

              <Link href="/register">
                <Button className="bg-[#132573] text-white rounded-full px-6">
                 Join Us
                </Button>
              </Link>
            </>
          ) : (
            <div className="relative group">

              {/* USER */}
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={
                    session?.user?.image ||
                    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
                  }
                  width={35}
                  height={35}
                  className="rounded-full"
                  alt="user"
                />

                <span className="text-white text-sm">
                  {session?.user?.name}
                </span>
              </div>

              {/* DROPDOWN */}
              <div className="absolute right-0 top-6 hidden group-hover:flex flex-col bg-white shadow-xl rounded-xl w-52 overflow-hidden">

             

                <Link
                  href={getDashboardRoute()}
                  className="px-4 py-3 flex items-center gap-2 hover:bg-gray-100"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-3 flex items-center gap-2 text-red-500 hover:bg-red-50 text-left"
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </div>
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-[#132573] text-white shadow-lg"
>
  {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
</button>
      </div>

      {/* MOBILE MENU */}
     {isMenuOpen && (
  <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 rounded-b-3xl overflow-hidden animate-in slide-in-from-top duration-300">

    {/* User Info */}
    {session && (
      <div className="p-5 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Image
            src={
              session?.user?.image ||
              "https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
            }
            width={50}
            height={50}
            alt="user"
            className="rounded-full border-2 border-[#132573]"
          />

          <div>
            <h4 className="font-semibold text-slate-900">
              {session?.user?.name}
            </h4>

            <p className="text-xs text-slate-500">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>
    )}

    {/* Navigation */}
    <div className="p-4 space-y-2">

      <Link
        href="/"
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition"
      >
        Home
      </Link>

      <Link
        href="/doctors"
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition"
      >
        Find Doctors
      </Link>

      <Link
        href="/about"
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition"
      >
        About
      </Link>

      <Link
        href="/contact"
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition"
      >
        Contact
      </Link>

      <Link
        href="/emergency"
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-medium"
      >
        <Phone size={18} />
        Emergency
      </Link>

      {session && (
        <>
          <Link
            href={getDashboardRoute()}
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#132573]/10 text-[#132573] font-semibold"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/profile"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700"
          >
            <User size={18} />
            Profile
          </Link>
        </>
      )}
    </div>

    {/* Auth Section */}
    <div className="p-4 border-t border-slate-100">

      {!session ? (
        <div className="grid grid-cols-2 gap-3">

          <Link
            href="/login"
            onClick={() => setIsMenuOpen(false)}
          >
            <button className="w-full py-3 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50">
              Login
            </button>
          </Link>

          <Link
            href="/register"
            onClick={() => setIsMenuOpen(false)}
          >
            <button className="w-full py-3 rounded-xl bg-[#132573] text-white font-semibold hover:bg-[#0f1f5c]">
              Join Us
            </button>
          </Link>

        </div>
      ) : (
        <button
          onClick={() => {
            setIsMenuOpen(false);
            handleLogout();
          }}
          className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      )}
    </div>

  </div>
)}
    </nav>
  );
}