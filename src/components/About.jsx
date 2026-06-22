"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function AboutSection() {
  const features = [
    "Top quality Technician team",
    "World Class Reputed Hospital",
    "Discount on all Pathology & Radiology treatment",
  ];

  return (
    <section id="about" className="relative py-24 bg-[#ebeced4d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT SIDE */}
          <div className="relative">

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src="/assets/about_1.jpg"
                alt="About"
                width={600}
                height={700}
                className="w-full h-[520px] object-cover"
              />

              {/* Video button */}
              <Link
                href="https://www.youtube.com/embed/rRid6GCJtgc"
                target="_blank"
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full flex items-center gap-3 shadow-lg hover:scale-105 transition"
              >
                <div className="w-10 h-10 bg-[#132573] rounded-full flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <span className="text-sm font-semibold text-[#132573]">
                  How We Works
                </span>
              </Link>
            </div>

           

            {/* EXPERIENCE BOX */}
            <div className="absolute top-10 -right-10 bg-[#132573] text-white rounded-full w-36 h-36 flex flex-col items-center justify-center shadow-2xl">
              <p className="text-3xl font-black">30+</p>
              <p className="text-sm font-medium">Experience</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <p className="text-[#132573] font-semibold uppercase tracking-widest text-sm">
              About us
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 leading-tight">
              Advanced technology and{" "}
              <span className="text-[#132573]">Specialist Doctors.</span>
            </h2>

            <p className="text-slate-500 mt-5 leading-relaxed">
              Adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
              Wiusmod tempor incididunt ut labore et dolore magna.
            </p>

            {/* FEATURES */}
            <ul className="mt-6 space-y-4">
              {features.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="text-[#132573] w-5 h-5 mt-1" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <Link
              href="/about"
              className="inline-flex mt-8 bg-[#132573] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0f1e52] transition"
            >
              More About Us
            </Link>
          </div>
        </div>
      </div>

      {/* BACKGROUND SHAPES */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#132573]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#132573]/5 rounded-full blur-3xl"></div>
    </section>
  );
}