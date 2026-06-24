import BookingButton from "@/components/BookingButton";
import { auth } from "@/lib/auth";
import { Chip } from "@heroui/react";
import {
  BriefcaseMedical,
  Clock3,
  MapPin,
  Star,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";

/* ================= FETCH DOCTOR ================= */
const fetchSingleDoctor = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

/* ================= PAGE ================= */
export default async function DoctorDetailsPage({ params }) {
  const { id } = params;

  const doctor = await fetchSingleDoctor(id);

  if (!doctor) {
    return <NotFound />;
  }

  const {
    doctorName,
    profileImage,
    specialization,
    consultationFee,
    rating,
    hospitalName,
    experience,
    availableSlots,
    verificationStatus,
    description,
  } = doctor;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          {/* IMAGE */}
          <div className="relative overflow-hidden rounded-[2.5rem] aspect-video">

            <Image
              src={
                profileImage ||
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
              }
              alt={doctorName}
              fill
              className="object-cover"
            />

            <div className="absolute top-6 left-6 flex gap-2">
              <Chip color="primary">{specialization}</Chip>

              {verificationStatus === "verified" && (
                <Chip color="success">Verified</Chip>
              )}
            </div>

          </div>

          {/* CONTENT */}
          <div>
            <h1 className="text-4xl font-black">{doctorName}</h1>
            <p className="text-gray-500 mt-3">
              {description || "Experienced doctor dedicated to patient care."}
            </p>
          </div>

          {/* INFO */}
          <div className="grid sm:grid-cols-2 gap-5 pt-8 border-t">

            <div className="p-5 border rounded-2xl">
              <Star className="text-yellow-500" />
              <p className="font-bold">{rating || 4.5}</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>

            <div className="p-5 border rounded-2xl">
              <Clock3 className="text-green-500" />
              <p className="font-bold">{experience || 0} Years</p>
              <p className="text-sm text-gray-500">Experience</p>
            </div>

            <div className="p-5 border rounded-2xl">
              <MapPin className="text-red-500" />
              <p className="font-bold">{hospitalName}</p>
              <p className="text-sm text-gray-500">Hospital</p>
            </div>

            <div className="p-5 border rounded-2xl">
              <BriefcaseMedical className="text-blue-600" />
              <p className="font-bold">{specialization}</p>
              <p className="text-sm text-gray-500">Specialization</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-1">

          <div className="sticky top-24 bg-white/70 backdrop-blur-md p-8 rounded-3xl border shadow-xl space-y-6">

            {/* FEE */}
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase">
                Appointment Fee
              </p>
              <p className="text-5xl font-black text-[#132573]">
                ৳{consultationFee}
              </p>
            </div>

            {/* SLOTS */}
            <div>
              <p className="font-bold mb-2">Available Slots</p>

              <div className="flex flex-wrap gap-2">
                {availableSlots?.length > 0 ? (
                  availableSlots.map((slot, i) => (
                    <Chip key={i} color="success" variant="flat">
                      {slot}
                    </Chip>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No slots available
                  </p>
                )}
              </div>
            </div>

            {/* FEATURES */}
            <div className="text-sm text-gray-600 space-y-1 border-t pt-4">
              <p>✔ Trusted Doctor</p>
              <p>✔ Secure Booking</p>
              <p>✔ Instant Confirmation</p>
              <p>✔ 24/7 Support</p>
            </div>

            {/* BOOKING */}
            <BookingButton doctor={doctor} />

          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= NOT FOUND ================= */
const NotFound = () => {
  return (
    <div className="text-center py-24">
      <h2 className="text-3xl font-bold text-red-500">
        Doctor Not Found
      </h2>
      <p className="text-gray-500 mt-2">
        Invalid doctor ID
      </p>
    </div>
  );
};