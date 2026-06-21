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

const fetchSingleDoctor = async (id, token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointment/${id}`,
      {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function AppointmentDetails({ params }) {
  const { id } = await params;

  const session = await auth.api.getToken({
    headers: await headers(),
  });

  const token = session?.token;

  const doctor = await fetchSingleDoctor(id, token);

  if (!doctor) {
    return <NotFound />;
  }

  const {
    name,
    image,
    description,
    specialty,
    fee,
    rating,
    location,
    hospital,
    experience,
    availability,
  } = doctor;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          {/* Doctor Image */}
          <div className="relative group overflow-hidden rounded-[2.5rem] aspect-video">

            <Image
              src={
                image ||
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200"
              }
              alt={name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute top-6 left-6">
              <Chip
                color="primary"
                variant="solid"
                className="font-bold shadow-xl"
              >
                {specialty}
              </Chip>
            </div>

          </div>

          {/* Content */}
          <div className="space-y-5">

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              {name}
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed">
              {description}
            </p>

          </div>

          {/* Info */}
          <div className="grid sm:grid-cols-2 gap-5 pt-8 border-t border-slate-200">

            <div className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-sm border">
              <Star className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="font-bold text-slate-800">
                  {rating || "4.8"}
                </p>
                <p className="text-sm text-slate-500">
                  Doctor Rating
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-sm border">
              <MapPin className="w-6 h-6 text-red-500" />
              <div>
                <p className="font-bold text-slate-800">
                  {location || "Dhaka"}
                </p>
                <p className="text-sm text-slate-500">
                  Location
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-sm border">
              <BriefcaseMedical className="w-6 h-6 text-[#132573]" />
              <div>
                <p className="font-bold text-slate-800">
                  {hospital || "Popular Hospital"}
                </p>
                <p className="text-sm text-slate-500">
                  Hospital
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-sm border">
              <Clock3 className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-bold text-slate-800">
                  {experience || "10 Years"}
                </p>
                <p className="text-sm text-slate-500">
                  Experience
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-1">

          <div className="sticky top-24 bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 shadow-2xl space-y-8">

            {/* Price */}
            <div className="space-y-2">

              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Appointment Fee
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-[#132573]">
                  ৳{fee}
                </span>
              </div>

            </div>

            {/* Availability */}
            <div className="space-y-4">

              <p className="text-slate-700 font-bold">
                Available Schedule
              </p>

              <div className="flex flex-wrap gap-2">

                {availability?.map((time, i) => (
                  <Chip
                    key={i}
                    variant="flat"
                    color="success"
                  >
                    {time}
                  </Chip>
                ))}

              </div>

            </div>

            {/* Features */}
            <div className="space-y-3 border-t pt-6">

              {[
                "Trusted Specialist",
                "Instant Appointment",
                "Secure Booking",
                "24/7 Support",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-600"
                >
                  <div className="w-2 h-2 rounded-full bg-[#132573]"></div>
                  {item}
                </div>
              ))}

            </div>

            {/* Booking Button */}
            <BookingButton doctor={doctor} />

            <p className=" text-xs text-slate-500 font-bold">
              Secure Booking • Trusted Healthcare
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">

      <h2 className="text-3xl font-black text-red-500">
        Doctor Not Found
      </h2>

      <p className="text-slate-500 mt-2">
        Please login to view doctor details.
      </p>

    </div>
  );
};