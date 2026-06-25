"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#030616] text-slate-400 py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          {/* BRAND */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-white">
              <Image
                src="/assets/logo.png"
                height={50}
                width={40}
                alt="MediCare logo"
              />
              <span className="font-black text-2xl tracking-tight">
                MediCare Connect
              </span>
            </Link>

            <p className="text-sm leading-relaxed">
              Connecting patients with trusted healthcare professionals. Book
              appointments, manage medical records, and access quality
              healthcare services anytime, anywhere.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
              >
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.05H8v-2.9h2.5V9.3c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4H15.2c-1.2 0-1.6.8-1.6 1.5v1.8H17l-.4 2.9h-2.2v7.05A10 10 0 0 0 22 12z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
              >
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
              >
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.5 8h4v12h-4V8zm7 0h3.8v1.7h.1c.5-.95 1.75-1.95 3.6-1.95 3.85 0 4.55 2.53 4.55 5.82V20h-4v-5.55c0-1.32-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93V20h-4V8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/doctors"
                  className="hover:text-white transition"
                >
                  Find Doctors
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="/dashboard" className="hover:text-white transition">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">
              Contact Information
            </h3>

            <div className="space-y-3 text-sm">
              <p>66 Brooklyn Golden Street, New York, USA</p>
              <p>support@medicareconnect.com</p>
              <a
                href="tel:+12126215896"
                className="block hover:text-white transition"
              >
                +1 (212) 621-5896
              </a>
            </div>
          </div>

          {/* EMERGENCY HOTLINE */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">
              Emergency Hotline
            </h3>

            <a
              href="tel:999"
              className="text-3xl font-black text-red-500 hover:text-red-400 transition"
            >
              999
            </a>

            <p className="text-sm mt-3">
              Available 24/7 for emergency healthcare assistance.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            © {new Date().getFullYear()} MediCare Connect. All rights reserved.
          </p>

          <Link
            href="/privacy"
            className="hover:text-white transition"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}