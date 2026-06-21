"use client";

import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Cardiologist",
    image: "/assets/testi_1_2.png",
    text: "DocAppoint made booking appointments so easy and fast. Highly recommended platform for patients.",
  },
  {
    name: "Alexa Milton",
    role: "Physiotherapist",
    image: "/assets/testi_1_1.png",
    text: "Very smooth experience. The doctors are professional and the system is very user-friendly.",
  },
  {
    name: "Dr. Raj Patel",
    role: "Neurologist",
    image: "/assets/testi_1_1.png",
    text: "Excellent platform for managing patient appointments. Everything is well organized.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-[#132573] font-bold uppercase tracking-widest text-sm">
          Testimonials
        </p>
        <h2 className="text-4xl font-extrabold text-slate-900 mt-2">
          What Our Patients Say
        </h2>
        <p className="text-slate-500 mt-3">
          Real feedback from patients who used DocAppoint for booking doctors and consultations.
        </p>
      </div>

      {/* Slider */}
      <div className="max-w-7xl mx-auto px-6">
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="bg-[#F2F3FC] rounded-3xl p-9 shadow-sm xl transition-all duration-300 h-full">

                {/* Stars */}
                <div className="flex gap-1 text-[#132573] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#132573" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-slate-600 leading-relaxed mb-6">
                  “{item.text}”
                </p>

                {/* Profile */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
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
      </div>

      {/* Background blur shape */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#132573]/10 rounded-full blur-3xl"></div>
    </section>  
  );
};

export default TestimonialSection; 