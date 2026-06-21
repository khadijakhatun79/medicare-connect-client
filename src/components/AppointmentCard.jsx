import { Button, Chip } from "@heroui/react";
import { Clock3, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AppointmentCard = ({ appointment }) => {
  const {
    _id,
    name,
    specialty,
    image,
    hospital,
    rating,
    experience,
    location,
    fee,
  } = appointment;

  return (
    <div className="group bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2">

      {/* IMAGE SECTION */}
      <div className="relative h-72 overflow-hidden">

        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200"
          }
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition duration-700"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* HOSPITAL BADGE */}
        <div className="absolute top-4 left-4">
          <Chip
            size="sm"
            className="bg-white/90 text-slate-700 font-semibold shadow-md"
          >
            {hospital}
          </Chip>
        </div>

        {/* RATING BADGE */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-sm text-slate-800">
            {rating}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-4">

        {/* NAME */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-[#132573] transition">
            {name}
          </h2>

          <p className="text-slate-500 font-medium">
            {specialty}
          </p>
        </div>

        {/* INFO */}
        <div className="space-y-2 text-slate-600 text-sm">

          <div className="flex items-center gap-2">
            <Clock3 className="w-4 h-4 text-[#132573]" />
            <span>{experience} Experience</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#132573]" />
            <span>{location}</span>
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex items-end justify-between pt-4 border-t border-slate-100">

          <div>
            <p className="text-xs text-slate-500">
              Consultation Fee
            </p>

            <h3 className="text-3xl font-black text-[#132573]">
              ৳{fee}
            </h3>
          </div>

          <Link href={`/appointment/${_id}`}>
            <Button className="rounded-full px-6 py-2 bg-[#132573] text-white font-semibold shadow-md hover:shadow-xl hover:bg-[#ef4d4d] transition">
              View Details
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;