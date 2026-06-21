"use client";

import { Button, Chip } from "@heroui/react";
import { Clock, LocationEdit, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FeaturedCard = ({ appointment = {} }) => {
  const router = useRouter();

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

  // ================= SAFE AUTH CHECK =================
  const isAuthenticated = () => {
    if (typeof window === "undefined") return false;

    const token = localStorage.getItem("token");

    return (
      token &&
      token !== "undefined" &&
      token !== "null" &&
      token.trim() !== ""
    );
  };

  // ================= HANDLE CLICK =================
  const handleClick = () => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    router.push(`/appointment/${_id}`);
  };

  return (
    <div className="group flex flex-col bg-white rounded-3xl border overflow-hidden">

      {/* IMAGE */}
      <div className="relative aspect-[16/10]">
        <Image
          alt={name || "Doctor"}
          src={
            image ||
            "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600"
          }
          fill
          className="object-cover group-hover:scale-110 transition"
        />

        <div className="absolute top-4 right-4">
          <Chip className="bg-white/90">{hospital}</Chip>
        </div>

        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {rating}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-4">

        <h3
          onClick={handleClick}
          className="text-xl font-bold cursor-pointer hover:text-[#132573]"
        >
          {name}
        </h3>

        <p className="text-sm text-slate-500">{specialty}</p>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          {experience} Experience
        </div>

        <div className="flex items-center gap-2 text-sm">
          <LocationEdit className="w-4 h-4" />
          {location}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t pt-4">

          <div>
            <p className="text-xs text-slate-400">Fee</p>
            <p className="text-2xl font-black text-[#132573]">
              ${fee}
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