"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}doctors`
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

  // pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentDoctors = doctors.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(doctors.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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
            Connect with verified doctors and book appointments with confidence.
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
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && currentDoctors.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentDoctors.map((doctor) => (
                <div
  key={doctor._id}
  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
>
  {/* Doctor Image */}
  <div className="relative h-56 bg-slate-100">
    <Image
      src={
        doctor.profileImage ||
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
      }
      alt={doctor.doctorName || "Doctor Profile"}
      fill
      className="object-cover"
    />
  </div>

  {/* Doctor Info */}
  <div className="p-6">
    <div className="mb-5">
      <Link href={`/doctors/${doctor._id}`}>
        <h3 className="font-bold text-xl text-slate-900 hover:text-[#132573] transition">
          {doctor.doctorName}
        </h3>
      </Link>

      <p className="text-[#132573] font-medium mt-1">
        {doctor.specialization || "General Physician"}
      </p>

      {doctor.title && (
        <p className="text-sm text-slate-600 mt-1">
          {doctor.title}
        </p>
      )}

      <p className="text-sm text-slate-500 mt-1">
        {doctor.hospitalName || "MediCare Hospital"}
      </p>
    </div>

    {/* Stats */}
    <div className="space-y-3 text-sm border-t pt-4">
      <div className="flex justify-between">
        <span className="text-slate-600">
          Experience
        </span>
        <span className="font-semibold">
          {doctor.experience || 0} Years
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-600">
          Consultation Fee
        </span>
        <span className="font-semibold text-green-600">
          ৳{doctor.consultationFee || 0}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-600">
          Rating
        </span>
        <span className="font-semibold">
          ⭐ {doctor.rating || 4.8}
        </span>
      </div>
    </div>

    {/* Button */}
    <Link
      href={`/doctors/${doctor._id}`}
      className="block mt-5"
    >
      <button className="w-full bg-[#132573] text-white py-3 rounded-lg hover:bg-[#0f1d5c] transition">
        View Profile
      </button>
    </Link>
  </div>
</div>
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-5 py-2 rounded-lg bg-slate-200 disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-slate-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-5 py-2 rounded-lg bg-slate-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}