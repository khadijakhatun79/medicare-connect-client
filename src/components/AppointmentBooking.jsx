"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope, HeartPulse } from "lucide-react";

export default function AppointmentBooking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.appointmentDate || !form.appointmentTime) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!form.agree) {
      toast.error("Please accept Terms & Privacy Policy");
      return;
    }

    toast.success("Appointment Request Submitted");

    setForm({
      name: "",
      email: "",
      appointmentDate: "",
      appointmentTime: "",
      symptoms: "",
      agree: false,
    });
  };

  const features = [
    {
      icon: ShieldCheck,
      title: "100% Safe & Trusted",
      desc: "We ensure secure healthcare services with verified doctors.",
    },
    {
      icon: Stethoscope,
      title: "Specialist Doctors",
      desc: "Get treatment from experienced specialist physicians.",
    },
    {
      icon: HeartPulse,
      title: "24/7 Care Support",
      desc: "Emergency medical support available all the time.",
    },
  ];

  return (
    <section className="relative py-28 bg-[#132573] overflow-hidden">

      {/* background glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-white/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white/80 uppercase text-sm font-semibold">
              Appointment
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 leading-tight">
              Get Amazing Treatment From Our Specialist Doctors
            </h2>

            <div className="mt-10 space-y-6">

              {features.map((item, i) => {
                const Icon = item.icon;

                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Icon className="text-white w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-sm mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-10"
          >

            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Make an Appointment
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-200"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-200"
              />

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  type="date"
                  name="appointmentDate"
                  value={form.appointmentDate}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />

                <select
                  name="appointmentTime"
                  value={form.appointmentTime}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="">Select Time</option>
                  <option>09:00 AM</option>
                  <option>11:00 AM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                </select>

              </div>

              <textarea
                rows="4"
                name="symptoms"
                placeholder="Write Message"
                value={form.symptoms}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                I agree to Terms & Privacy Policy
              </label>

              <Button
                type="submit"
                className="w-full bg-[#132573] hover:bg-blue-800 text-white font-semibold py-3 rounded-xl"
              >
                Book An Appointment
              </Button>

            </form>

          </motion.div>

        </div>
      </div>
    </section>
  );
}