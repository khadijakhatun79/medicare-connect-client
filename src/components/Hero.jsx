"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0d1b40] overflow-hidden flex items-center">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero_bg_1.jpeg"
          alt="Background"
          fill
          priority
          className="object-cover object-center opacity-40 mix-blend-overlay blur-[1px]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(270deg,transparent_25%,#132573_55.11%)] opacity-95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* LEFT */}
          <div className="text-white lg:col-span-7 space-y-6">
            <span className="uppercase tracking-[2px] text-xs font-bold text-gray-300 block">
              Expert Medical Treatment
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              We Follow A
              <br />
              <span className="block mt-1">Holistic Approach</span>
              <span className="block mt-1">to Health care.</span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed">
              Protect your smile and keep it healthy, with the latest technology available in your neighbourhood.
            </p>

            {/* BUTTONS FIXED */}
            <div className="flex flex-wrap gap-4 pt-2">  

              <button
                id="btn-banner-cta"
                className="bg-white text-[#00001b] font-extrabold text-sm px-6 py-3.5 rounded-2xl transition flex items-center gap-2 group shadow-lg shadow-emerald-500/20"
              >
                <span>Find a Specialist</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>

              <button
                id="btn-banner-auth"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-6 py-3.5 rounded-2xl transition"
              >
                Register Patient Account
              </button>

            </div>
          </div>

          {/* RIGHT */}
          <div className="relative lg:col-span-5 h-[500px] lg:h-[650px] w-full flex items-end justify-center lg:justify-end">

            {/* BADGE 1 */}
            <div className="absolute top-[25%] left-[-20px] lg:left-0 z-20 bg-white/10 backdrop-blur-md rounded-[2rem] px-5 py-6 text-white text-center shadow-xl w-28 flex flex-col items-center transition-transform hover:scale-105">

              <div className="flex -space-x-2 mb-2">
              
                <Image
                  src="/assets/doctor_group_1.png"
                  alt="doctor 2"
                  width={84}
                  height={54}
                  className="rounded-full object-cover"
                />
              </div>

              <h3 className="text-xl font-extrabold leading-none">870+</h3>
              <p className="text-[11px] text-gray-200 mt-1">Doctors</p>
            </div>

            {/* BADGE 2 */}
            <div className="absolute bottom-[12%] right-0 lg:right-4 z-20 bg-[#11236a] border border-white/10 rounded-full pl-4 pr-8 py-3.5 flex items-center gap-4 shadow-2xl transition-transform hover:scale-105">

              <div className="flex -space-x-3">
                <Image
                  src="/assets/user1.jpg"
                  alt="patient"
                  width={160}
                  height={70}
                  className="rounded-full object-cover"
                />
              </div>

              <div className="text-white text-left">
                <h3 className="text-lg font-black leading-none">150K+</h3>
                <p className="text-[11px] text-gray-300 whitespace-nowrap">
                  Satisfied Patients
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="hidden lg:flex absolute left-8 bottom-24 origin-left -rotate-90 items-center gap-3 text-white/70 font-semibold text-xs tracking-[0.2em] uppercase select-none">
        <span>← Scroll for more</span>
      </div>

    </section>
  );
}