"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log(
          "API URL:",
          process.env.NEXT_PUBLIC_API_URL
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/featured-doctors`
        );

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Doctors:", data);

        setDoctors(data);
      } catch (error) {
        console.error(
          "Failed to fetch doctors:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto text-center">
          Loading doctors...
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Trusted Healthcare Specialists
          </h2>

          <p className="text-gray-500 mt-3">
            Connect with verified doctors and book
            appointments with confidence.
          </p>
        </div>

        {doctors.length === 0 ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold">
              No verified doctors available right now
            </h3>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white border rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={
                      doctor.profileImage ||
                      "https://i.pravatar.cc/150?img=12"
                    }
                    alt={doctor.doctorName}
                    width={70}
                    height={70}
                    className="rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-bold text-lg">
                      {doctor.doctorName}
                    </h3>

                    <p className="text-gray-500">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <p>
                    Experience:
                    <span className="font-semibold ml-2">
                      {doctor.experience} Years
                    </span>
                  </p>

                  <p>
                    Consultation Fee:
                    <span className="font-semibold text-green-600 ml-2">
                      ৳{doctor.consultationFee}
                    </span>
                  </p>
                </div>

                <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg">
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}