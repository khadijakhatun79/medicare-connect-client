
"use client";

import Link from "next/link";

const specializations = [
  {
    title: "Cardiology",
    description: "Heart and cardiovascular care by experienced specialists.",
    icon: "/assets/department_icon_1.svg",
    href: "#",
  },
  {
    title: "Neurology",
    description: "Diagnosis and treatment of brain and nervous system disorders.",
    icon: "/assets/department_icon_2.svg",
    href: "#",
  },
  {
    title: "Orthopedics",
    description: "Comprehensive care for bones, joints, and muscles.",
    icon: "/assets/department_icon_3.svg",
    href: "#",
  },
  {
    title: "Pediatrics",
    description: "Specialized healthcare services for infants and children.",
    icon: "/assets/department_icon_4.svg",
    href: "#",
  },
  {
    title: "Dermatology",
    description: "Expert treatment for skin, hair, and nail conditions.",
    icon: "/assets/department_icon_5.svg",
    href: "#",
  },
  {
    title: "General Medicine",
    description: "Primary healthcare services for everyday medical needs.",
    icon: "/assets/department_icon_6.svg",
    href: "#",
  },
];

export default function DepartmentSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <p className="text-[#132573] font-semibold tracking-widest uppercase text-sm">
            Medical Specializations
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 leading-tight">
            Our Medical{" "}
            <span className="text-[#132573]">Specializations</span>
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-slate-600 text-base md:text-lg">
            Access expert healthcare services across multiple specialties with
            experienced and verified medical professionals dedicated to
            providing quality care for your health and well-being.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specializations.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#132573]/10 mb-5">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-7 h-7"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#132573] transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-transparent to-[#132573]/5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

