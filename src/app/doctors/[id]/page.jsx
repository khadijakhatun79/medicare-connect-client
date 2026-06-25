
import Breadcrumb from "@/components/Breadcrumb";
import { Chip } from "@heroui/react";
import {
  GraduationCap,
  History,
  MapPin,
  CircleDollarSign,
  Star,
  CalendarDays,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ================= FETCH DOCTOR ================= */

const fetchSingleDoctor = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

/* ================= PAGE ================= */

export default async function DoctorDetailsPage({
  params,
}) {
  const { id } = await params;

  const doctor = await fetchSingleDoctor(id);

  if (!doctor) {
    return <NotFound />;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Breadcrumb title={doctor.doctorName} />

      <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* Doctor Card */}
            <div className="bg-white rounded-3xl border shadow-sm p-8">

              <div className="flex flex-col md:flex-row gap-6">

                <div className="relative w-44 h-44 rounded-3xl overflow-hidden border">
                  <Image
                    src={
                      doctor.profileImage ||
                      "https://i.pravatar.cc/400"
                    }
                    alt={doctor.doctorName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Chip color="primary">
                      {doctor.specialization}
                    </Chip>

                    {doctor.verificationStatus ===
                      "verified" && (
                      <Chip color="success">
                        Verified Doctor
                      </Chip>
                    )}
                  </div>

                  <h1 className="text-4xl font-bold text-slate-900">
                    {doctor.doctorName}
                  </h1>

                  <p className="text-slate-600 mt-3">
                    {doctor.description ||
                      `${doctor.doctorName} is an experienced ${doctor.specialization} specialist dedicated to providing exceptional patient care.`}
                  </p>

                </div>

              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

              <div className="bg-white border rounded-2xl p-5">
                <Star className="text-yellow-500 mb-3" />
                <h4 className="font-bold text-xl">
                  {doctor.rating || 4.9}
                </h4>
                <p className="text-sm text-slate-500">
                  Rating
                </p>
              </div>

              <div className="bg-white border rounded-2xl p-5">
                <History className="text-green-600 mb-3" />
                <h4 className="font-bold text-xl">
                  {doctor.experience || 0} Years
                </h4>
                <p className="text-sm text-slate-500">
                  Experience
                </p>
              </div>

              <div className="bg-white border rounded-2xl p-5">
                <MapPin className="text-red-500 mb-3" />
                <h4 className="font-bold">
                  {doctor.hospitalName}
                </h4>
                <p className="text-sm text-slate-500">
                  Hospital
                </p>
              </div>

              <div className="bg-white border rounded-2xl p-5">
                <CircleDollarSign className="text-[#132573] mb-3" />
                <h4 className="font-bold text-xl">
                  ৳{doctor.consultationFee}
                </h4>
                <p className="text-sm text-slate-500">
                  Consultation Fee
                </p>
              </div>

            </div>

            {/* About Doctor */}
            <div className="bg-white border rounded-3xl p-8 shadow-sm">

              <h2 className="text-2xl font-bold mb-4">
                About Doctor
              </h2>

              <p className="text-slate-600 leading-8">
                {doctor.description ||
                  `${doctor.doctorName} is a highly skilled ${doctor.specialization} specialist with ${doctor.experience} years of experience. Currently serving at ${doctor.hospitalName}, the doctor is committed to delivering quality healthcare services and patient-centered treatment.`}
              </p>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div>

            <div className="sticky top-24 bg-white border rounded-3xl shadow-sm p-8">

              <h3 className="text-2xl font-bold">
                Book Appointment
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                Schedule a consultation with this doctor.
              </p>

              <div className="mt-6">
                <p className="text-sm text-slate-500">
                  Consultation Fee
                </p>

                <h2 className="text-5xl font-black text-[#132573]">
                  ৳{doctor.consultationFee}
                </h2>
              </div>

              {/* Available Days */}
              <div className="mt-8">

                <div className="flex items-center gap-2 mb-3">
                  <CalendarDays size={18} />
                  <span className="font-semibold">
                    Available Days
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {doctor.availableDays?.map(
                    (day, index) => (
                      <Chip
                        key={index}
                        color="success"
                        variant="flat"
                      >
                        {day}
                      </Chip>
                    )
                  )}
                </div>

              </div>

              {/* Form */}
              <form className="space-y-4 mt-8">

                <input
                  type="date"
                  className="w-full border rounded-xl p-3"
                />

                <select className="w-full border rounded-xl p-3">
                  <option>Select Time Slot</option>
                  <option>09:00 AM</option>
                  <option>11:00 AM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                </select>

                <textarea
                  rows={4}
                  placeholder="Describe your symptoms..."
                  className="w-full border rounded-xl p-3"
                />

                <button
                  type="submit"
                  className="w-full bg-[#132573] hover:bg-[#0f1d5e] text-white py-3 rounded-xl font-semibold transition"
                >
                  Book Appointment
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

/* ================= NOT FOUND ================= */

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">

        <div className="text-8xl mb-6">
          🩺
        </div>

        <h1 className="text-4xl font-bold">
          Doctor Not Found
        </h1>

        <p className="text-slate-500 mt-3">
          The doctor profile you are looking for
          does not exist.
        </p>

        <Link
          href="/doctors"
          className="inline-block mt-6 px-6 py-3 bg-[#132573] text-white rounded-xl"
        >
          Browse Doctors
        </Link>

      </div>
    </div>
  );
}

