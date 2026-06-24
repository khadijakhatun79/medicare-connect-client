"use client";

import { Button, Chip } from "@heroui/react";
import { Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const FeaturedCard = ({ doctor = {} }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    _id,
    doctorName,
    specialization,
    profileImage,
    hospitalName,
    rating,
    experience,
    consultationFee,
  } = doctor;

  const handleClick = () => {
    if (!session) {
      router.push("/login");
      return;
    }

    router.push(`/doctors/${_id}`);
  };

  return (
    <div className="group flex flex-col bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-lg transition">

      {/* IMAGE */}
      <div className="relative aspect-[16/10]">
        <Image
          alt={doctorName || "Doctor"}
          src={
            profileImage ||
            "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600"
          }
          fill
          className="object-cover group-hover:scale-105 transition"
        />

        <div className="absolute top-4 right-4">
          <Chip className="bg-white/90 text-black">
            {hospitalName || "Hospital"}
          </Chip>
        </div>

        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {rating || "4.5"}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-3">

        <h3
          onClick={handleClick}
          className="text-xl font-bold cursor-pointer hover:text-[#132573]"
        >
          {doctorName}
        </h3>

        <p className="text-sm text-slate-500">
          {specialization}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          {experience || 0} years experience
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4" />
          {hospitalName}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t pt-4">

          <div>
            <p className="text-xs text-slate-400">Fee</p>
            <p className="text-2xl font-black text-[#132573]">
              ${consultationFee || 0}
            </p>
          </div>

          <Button
            onClick={handleClick}
            className="bg-[#132573] text-white font-bold rounded-full px-5"
          >
            View Details
          </Button>

        </div>

      </div>
    </div>
  );
};

export default FeaturedCard;