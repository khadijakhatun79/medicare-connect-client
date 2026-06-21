"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#030616] text-slate-400 py-16 px-6 sm:px-12 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* 3 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-16">

          {/* COLUMN 1 - BRAND */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="">
               <Image
                                src="/assets/logo.png"
                                height={50}
                                width={40} 
                                alt="logo"
                              />
              </div>
              <span className="font-black text-2xl tracking-tight">
                MediCare 
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 pt-2">

              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.05H8v-2.9h2.5V9.3c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4H15.2c-1.2 0-1.6.8-1.6 1.5v1.8H17l-.4 2.9h-2.2v7.05A10 10 0 0 0 22 12z"/>
                </svg>
              </a>

              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
                </svg>
              </a>

              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28z"/>
                </svg>
              </a>

            </div>
          </div>

          {/* COLUMN 2 - LINKS */}
          <div className="space-y-5">
            <h3 className="text-white text-lg font-extrabold">Links</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* COLUMN 3 - OFFICE */}
          <div className="space-y-5">
            <h3 className="text-white text-lg font-extrabold">Office</h3>
            <p className="text-sm">
              America - 66 Brooklyn Golden Street, New York, USA
            </p>
            <div className="text-2xl font-black text-white">
              +1 (212) 621-5896
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-8 text-xs text-slate-500 flex flex-col sm:flex-row justify-between gap-4">
          <p>Medixal © 2024</p>
          <Link href="/privacy">Privacy Policy</Link>
        </div>

      </div>
    </footer>
  );
}