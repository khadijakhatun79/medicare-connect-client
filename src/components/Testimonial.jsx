"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Cardiologist",
    image: "/assets/testi_1_2.png",
    text: "MediCare Connect made booking appointments simple and stress-free. Highly recommended.",
    rating: 5,
  },
  {
    name: "Alexa Milton",
    role: "Physiotherapist",
    image: "/assets/testi_1_1.png",
    text: "Very smooth experience. Doctors are professional and system is user-friendly.",
    rating: 5,
  },
  {
    name: "Dr. Raj Patel",
    role: "Neurologist",
    image: "/assets/testi_1_1.png",
    text: "Excellent platform for managing patient appointments. Everything is well organized.",
    rating: 4,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-28 bg-gradient-to-b from-[#F7FAF8] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#205A44] font-bold uppercase tracking-widest text-sm">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
            What Our Patients Say
          </h2>

          <p className="text-slate-500 mt-3">
            Real feedback from patients who used our healthcare platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT IMAGE */}
          <div className="relative">
            <img
              src="/assets/doctor.png"
              className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
              alt=""
            />

            <div className="absolute bottom-6 left-6 bg-white px-6 py-4 rounded-2xl shadow-lg">
              <p className="font-bold text-slate-900">
                ✨ 10k+ Happy Patients
              </p>
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div className="relative">

            <Swiper
              modules={[Autoplay, Navigation]}
              slidesPerView={1}
              loop
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              navigation={{
                prevEl: ".prev-btn",
                nextEl: ".next-btn",
              }}
            >
              {testimonials.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white m-4 border border-slate-100 rounded-3xl p-10 shadow-lg relative">

                    {/* quote icon (IMPORTANT missing part) */}
                    <Quote className="text-[#205A44]/20 w-12 h-12 mb-4" />

                    {/* text */}
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                      {item.text}
                    </p>

                    {/* stars */}
                    <div className="flex gap-1 text-amber-500 mb-6">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>

                    {/* user */}
                    <div className="flex items-center gap-4 border-t pt-5">
                      

                      <div>
                        <h4 className="font-bold text-slate-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {item.role}
                        </p>
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* NAVIGATION (FIXED STYLE) */}
            <div className="flex gap-4 mt-8">
              <button className="prev-btn w-12 h-12 rounded-full border bg-white flex items-center justify-center shadow hover:bg-slate-50 transition">
                <ArrowLeft size={18} />
              </button>

              <button className="next-btn w-12 h-12 rounded-full border bg-white flex items-center justify-center shadow hover:bg-slate-50 transition">
                <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}