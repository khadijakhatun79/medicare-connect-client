"use client";

import { useState, useEffect } from "react";

import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";

import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function MainNavbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();

  const { data: session, isPending } = useSession();

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  const handleLogOut = async () => {

    await signOut();

    router.push("/");

  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm py-2"
          : " py-4"
      }`}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex items-center">

            <Link
              href="/"
              className="flex items-center gap-2 group"
            >

              <div className="p-2">
                <Image
                  src="/assets/logo.png"
                  height={50}
                  width={40} 
                  alt="logo"
                />
              </div> 

              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                MediCare 
              </span>

            </Link>

          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">

            <Link
              href="/"
              className="font-medium text-slate-700 hover:text-[#132573] transition-colors"
            >
              Home
            </Link>

            <Link
              href="/appointment"
              className="font-medium text-slate-700 hover:text-[#132573] transition-colors"
            >
              All Appointments
            </Link>

            <Link
              href="/dashboard"
              className="font-medium text-slate-700 hover:text-[#132573] transition-colors"
            >
              Dashboard
            </Link>

          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">

            {!isPending && !session ? (

              <>
                <Link
                  href="/login"
                  className="font-medium text-slate-700 hover:text-[#132573] transition-colors"
                >
                  Login
                </Link>

                <Link href="/register">

                  <Button
                    className="font-bold rounded-full px-8 bg-[#132573]"
                  >
                    Register
                  </Button>

                </Link>
              </>

            ) : (

              <div className="relative group">

                <button className="flex items-center gap-3 p-1">

                  <Image
                    width={40}
                    height={40}
                    src={
                      session?.user?.image ||
                      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/10"
                  />

                  <div className="text-left hidden lg:block">

                    <p className="text-sm font-bold truncate max-w-25">
                      {session?.user?.name}
                    </p>

                  </div>

                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">

                  <div className="px-4 py-3 border-b border-slate-100">

                    <p className="font-bold text-sm">
                      Welcome back!
                    </p>

                    <p className="text-xs truncate text-slate-500">
                      {session?.user?.email}
                    </p>

                  </div>

                  <Link
                    href="/profile"
                    className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>

                  <Link
                    href="/dashboard"
                    className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>

                </div>

              </div>
            )}

          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">

            <button
              onClick={() =>
                setIsMenuOpen(!isMenuOpen)
              }
              className="p-2 rounded-lg bg-[#132573]"
            >

              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}

            </button>

          </div>

        </div>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (

        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">

          <Link
            href="/"
            className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
          >
            Home
          </Link>

          <Link
            href="/appointment"
            className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
          >
            All Appointments
          </Link>

          <Link
            href="/dashboard"
            className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
          >
            Dashboard
          </Link>

          <div className="pt-4 border-t border-border mt-4">

            {/* Not Logged In */}
            {!isPending && !session ? (

              <div className="grid grid-cols-2 gap-4">

                <Link href="/login">

                  <Button
                    variant="bordered"
                    className="rounded-xl w-full"
                  >
                    Login
                  </Button>

                </Link>

                <Link href="/register">

                  <Button
                    color="primary"
                    className="rounded-xl w-full bg-[#132573]"
                  >
                    Register
                  </Button>

                </Link>

              </div>

            ) : (

              /* Logged In */
              <div className="flex flex-col gap-3">

                <div className="flex items-center gap-3 px-2 py-3">

                  <Image
                    width={45}
                    height={45}
                    src={
                      session?.user?.image ||
                      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                    }
                    alt="avatar"
                    className="w-11 h-11 rounded-full object-cover"
                  />

                  <div>

                    <h3 className="font-bold text-sm">
                      {session?.user?.name}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {session?.user?.email}
                    </p>

                  </div>

                </div>

                <Link
                  href="/profile"
                  className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
                >
                  Profile
                </Link>

                <Link
                  href="/dashboard"
                  className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogOut}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 rounded-xl"
                >
                  Log Out
                </button>

              </div>
            )}

          </div>

        </div>
      )}

    </nav>
  );
}