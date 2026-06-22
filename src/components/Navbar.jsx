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

  const role = session?.user?.role;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#00001b] backdrop-blur-md shadow-sm py-2"
          : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            width={40}
            height={40}
            alt="logo"
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
        <div className="hidden md:flex items-center gap-4">

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
              <div className="absolute right-0 top-8 hidden group-hover:flex flex-col bg-white shadow-xl rounded-xl w-52 overflow-hidden">

                <Link
                  href="/profile"
                  className="px-4 py-3 flex items-center gap-2 hover:bg-gray-100"
                >
                  <User size={16} />
                  Profile
                </Link>

                <Link
                  href={getDashboardRoute()}
                  className="px-4 py-3 flex items-center gap-2 hover:bg-gray-100"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
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
          className="md:hidden bg-[#132573] p-2 rounded-lg text-white"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 space-y-3 border-t">

          <Link href="/">Home</Link>
          <Link href="/doctors">Find Doctors</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/emergency">Emergency</Link>

          <Link href={getDashboardRoute()}>Dashboard</Link>

          {!session ? (
            <div className="flex gap-3 pt-3">
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 pt-3">
                <Image
                  src={
                    session?.user?.image ||
                    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
                  }
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="user"
                />

                <div>
                  <p className="font-semibold">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session?.user?.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="text-red-500 pt-2"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </nav>
  );
}