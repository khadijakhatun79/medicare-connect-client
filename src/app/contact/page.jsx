"use client";

import { useState } from "react";
import { Button, Input, TextArea } from "@heroui/react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Message sent successfully!");
    }, 1000);
  };

  return (
    <div>
    <Breadcrumb></Breadcrumb>
    <div className="relative bg-gradient-to-b from-white to-slate-50 py-24 overflow-hidden">
    

      {/* background blur shapes (Medixal style feel) */}
      <div className="absolute top-[-120px] left-[-100px] w-[300px] h-[300px] bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-sky-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#132573] font-semibold tracking-wide uppercase text-sm">
            Contact Us
          </span>

          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-slate-900">
            Get in Touch with Us
          </h1>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Have questions about appointments, doctors, or healthcare services?
            Our support team is always ready to help you.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* FORM CARD */}
          <div className="bg-white rounded-[28px] border border-slate-100 shadow-xl p-10 hover:shadow-2xl transition">

            <h2 className="text-2xl font-bold text-slate-900">
              Send a Message
            </h2>

            <p className="text-slate-500 mt-2 mb-8">
              Fill the form and we will respond within 24 hours.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  variant="bordered"
                />

                <Input
                  type="email"
                  label="Email Address"
                  placeholder="john@email.com"
                  variant="bordered"
                />
              </div>

              <Input
                label="Phone Number"
                placeholder="+8801XXXXXXXXX"
                variant="bordered"
              />

              <Input
                label="Subject"
                placeholder="Appointment Inquiry"
                variant="bordered"
              />

             <TextArea
                label="Message"
                placeholder="Write your message..."
                variant="bordered"
                rows={5}
                />

              <Button
                type="submit"
                color="primary"
                size="lg"
                isLoading={loading}
                className="w-full font-semibold shadow-md hover:shadow-lg transition"
              >
                Send Message
              </Button>

            </form>
          </div>

          {/* INFO CARD */}
          <div className="space-y-6">

            {/* contact card */}
            <div className="bg-white rounded-[28px] border border-slate-100 shadow-xl p-10">

              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Need Immediate Help?
              </h2>

              <div className="space-y-7">

                {/* phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-50">
                    <Phone className="w-6 h-6 text-[#132573]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Emergency Hotline
                    </h3>
                    <p className="text-slate-600">999</p>
                    <p className="text-sm text-slate-500">24/7 Available</p>
                  </div>
                </div>

                {/* email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-50">
                    <Mail className="w-6 h-6 text-[#132573]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Email Support
                    </h3>
                    <p className="text-slate-600">
                      support@medicareconnect.com
                    </p>
                  </div>
                </div>

                {/* address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-50">
                    <MapPin className="w-6 h-6 text-[#132573]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Hospital Address
                    </h3>
                    <p className="text-slate-600">
                      123 Healthcare Avenue, Medical City, Bangladesh
                    </p>
                  </div>
                </div>

                {/* time */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-50">
                    <Clock className="w-6 h-6 text-[#132573]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Working Hours
                    </h3>
                    <p className="text-slate-600">
                      Sat - Thu: 8:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* MAP */}
            <div className="rounded-[28px] overflow-hidden shadow-xl border border-slate-100">
              <iframe
                title="MediCare Location"
                src="https://maps.google.com/maps?q=Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[320px]"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
    </div>
  );
}