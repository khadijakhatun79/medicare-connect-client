"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Phone, Play } from "lucide-react";
import toast from "react-hot-toast";

const AppointmentBooking = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    doctor: "",
    department: "",
    message: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.doctor) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!form.agree) {
      toast.error("You must agree to Terms & Privacy Policy");
      return;
    }

    toast.success("Appointment booked successfully!");

    setForm({
      name: "",
      email: "",
      location: "",
      doctor: "",
      department: "",
      message: "",
      agree: false, 
    });
  };

  return (
    <section className="relative py-28 bg-[url('/assets/video_bg_1.jpg')] bg-cover bg-center">
 
      {/* OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(25, 35, 97, 0.65), rgba(25, 35, 97, 0.65))",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT FORM */}
        {/* LEFT SIDE - TABLE */}
<div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">

  {/* TITLE */}
  <div className="mb-6">
    <p className="text-[#132573] font-bold uppercase text-xs tracking-widest">
      Doctor Schedule
    </p>

    <h2 className="text-3xl font-black text-slate-900 mt-2">
      Available Time & Hospitals
    </h2>
  </div>

  {/* TABLE */}
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left border border-slate-200 rounded-xl overflow-hidden">

      <thead className="bg-slate-100 text-slate-700">
        <tr>
          <th className="p-3">Days</th>
          <th className="p-3">Time</th>
          <th className="p-3">Hospital</th>
        </tr>
      </thead>

      <tbody>

        <tr className="border-t">
          <td className="p-3 font-semibold">Sat-Thu</td>
          <td className="p-3">8:00AM - 6:00PM</td>
          <td className="p-3">Ibn Sina Hospital</td>
        </tr>

        <tr className="border-t">
          <td className="p-3 font-semibold">Sat-Thu</td>
          <td className="p-3">6:00PM - 7:00PM</td>
          <td className="p-3">Central Hospital</td>
        </tr>

        <tr className="border-t">
          <td className="p-3 font-semibold">Sun-Fri</td>
          <td className="p-3">7:00PM - 6:00PM</td>
          <td className="p-3">Apollo Hospital</td>
        </tr>

        <tr className="border-t">
          <td className="p-3 font-semibold">Sun-Tue</td>
          <td className="p-3">8:00PM - 6:00PM</td>
          <td className="p-3">NextGen Kids Hospital</td>
        </tr>

        <tr className="border-t">
          <td className="p-3 font-semibold">Sat-Thu</td>
          <td className="p-3">8:00PM - 6:00PM</td>
          <td className="p-3">Blossom Pediatric Care</td>
        </tr>

      </tbody>
    </table>
  </div>

  {/* INFO BOX */}
  <div className="mt-6 p-5 rounded-2xl bg-slate-50 border">

    <span className="font-bold text-slate-800 text-lg">
      Time’s not flexible?
    </span>

    <p className="text-sm text-slate-500 mt-2">
      We offer high-quality, patient-centered healthcare for personalized care and excellent results.
    </p>

    <a
      href="/contact"
      className="inline-flex items-center gap-2 mt-4 text-[#132573] font-bold hover:underline"
    >
      Find a Consultant →
    </a>

  </div>

</div>
        

        {/* RIGHT VIDEO */}
        <div className="flex justify-center">
          <a
            href="https://www.youtube.com/watch?v=i2pMEhEzbEs"
            target="_blank"
            className="group"
          >
            <div className="w-24 h-24 rounded-full bg-[#132573] flex items-center justify-center shadow-xl group-hover:scale-110 transition">
              <Play className="text-white w-10 h-10" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};

export default AppointmentBooking;