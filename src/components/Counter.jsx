"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, CalendarCheck, Star } from "lucide-react";

export default function PlatformStatistics() {
  const stats = [
    {
      title: "Total Doctors",
      value: 120,
      icon: Users,
    },
    {
      title: "Total Patients",
      value: 5400,
      icon: UserPlus,
    },
    {
      title: "Total Appointments",
      value: 8900,
      icon: CalendarCheck,
    },
    {
      title: "Total Reviews",
      value: 3200,
      icon: Star,
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b bg-[#ebeced4d] overflow-hidden">

      {/* HEADER (Framer Motion Section 1) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          Platform Statistics
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Real-time overview of our healthcare platform performance and activity.
        </p>
      </motion.div>

      {/* STATS GRID */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-slate-100 rounded-3xl shadow-lg hover:shadow-2xl transition p-8 text-center"
            >
              {/* ICON */}
              <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-[#132573]" />
              </div>

              {/* VALUE */}
              <h3 className="text-3xl font-extrabold text-slate-900">
                {item.value.toLocaleString()}+
              </h3>

              {/* TITLE */}
              <p className="mt-2 text-slate-600 font-medium">
                {item.title}
              </p>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}