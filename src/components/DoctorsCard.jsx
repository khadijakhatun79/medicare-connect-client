import Image from "next/image";
import Link from "next/link";

export default function DoctorsCard({ doctor }) {
  return (
    <Link href={`/doctors/${doctor._id}`} className="group block h-full w-full">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col w-full">
        
        {/* Image Box - w-full handles responsive sizing inside the grid container */}
        <div className="relative h-64 w-full bg-slate-50 flex-shrink-0">
          <Image
            src={doctor.profileImage || "/default-doctor.jpg"}
            alt={doctor.doctorName || "Doctor"}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow justify-between gap-4 w-full">
          
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between w-full">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                Verified
              </span>
              <span className="font-semibold text-amber-500 text-sm flex items-center gap-1">
                ⭐ {doctor.rating || 4.8}
              </span>
            </div>

            {/* line-clamp-1 keeps headers on one single line */}
            <h3 className="text-xl font-bold text-slate-900 line-clamp-1 pt-1">
              {doctor.doctorName}
            </h3>

            <p className="text-[#205A44] font-semibold text-sm">
              {doctor.specialization}
            </p>

            <p className="text-slate-500 text-xs md:text-sm line-clamp-1">
              {doctor.hospitalName}
            </p>
          </div>

          {/* Footer - Metadata block aligned at bottom */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-600 mt-auto w-full">
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-400">Experience</span>
              <span className="font-medium text-slate-900">{doctor.experience} Years</span>
            </div>

            <div className="flex justify-between items-center w-full">
              <span className="text-gray-400">Consultation Fee</span>
              <span className="font-bold text-[#205A44] text-base">
                ৳{doctor.consultationFee}
              </span>
            </div>
          </div>

        </div>

      </div>
    </Link>
  );
}