"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/doctors`
        );

        const data = await res.json();
        setDoctors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section className="pt-[120px] pb-[120px]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-[#132573] text-sm font-medium mb-4">
            Featured Doctors
          </span>

          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Trusted Healthcare Specialists
          </h2>

          <p className="text-slate-600 text-lg">
            Connect with verified doctors and book appointments with
            confidence.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10">
            <p className="text-slate-500">Loading doctors...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && doctors.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-2xl font-semibold text-slate-700">
              No verified doctors available right now
            </h3>

            <p className="text-slate-500 mt-2">
              Our admin team is currently reviewing doctor applications.
            </p>
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && doctors.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300"
                >
                  {/* Top */}
                  <div className="flex items-center gap-4">
                    <Image
  src={
    doctor.profileImage ||
    "https://i.pravatar.cc/300"
  }
  alt={doctor.doctorName || "Doctor Profile"}
  width={80}
  height={80}
  className="rounded-full object-cover border"
/>
 
                    <div>
                      <div className="flex items-center gap-2">
                        <Link href={`/doctors/${doctor._id}`}>
                        <h3 className="font-bold text-lg text-slate-900 hover:text-[#132573] transition cursor-pointer">
                          {doctor.doctorName}
                        </h3>
                      </Link>

                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Verified
                        </span>
                      </div>

                      <p className="text-[#132573]">
                        {doctor.specialization}
                      </p>

                      <p className="text-sm text-slate-500">
                        {doctor.hospitalName ||
                          "MediCare Hospital"}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Experience</span>
                      <span className="font-semibold">
                        {doctor.experience || 0} Years
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Consultation Fee</span>
                      <span className="font-semibold text-green-600">
                        ৳{doctor.consultationFee || 0}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Rating</span>
                      <span className="font-semibold">
                        ⭐ {doctor.rating || 4.8}
                      </span>
                    </div>

                    <div>
                      <p className="mb-2">Available Days</p>

                      <div className="flex flex-wrap gap-2">
                        {(doctor.availableDays || [
                          "Sun",
                          "Tue",
                          "Thu",
                        ]).map((day, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded bg-slate-100"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                 
                </div>
              ))}
            </div>

            {/* View All */}
            <div className="text-center mt-12">
              <Link href="/doctors">
                <button className="px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800">
                  View All Doctors
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}