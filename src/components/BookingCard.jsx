import Image from "next/image";
import { Chip } from "@heroui/react";
import DeleteBookingButton from "./DeleteBookingButton";

const BookingCard = ({ booking }) => {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border">

      <Image
        src={booking.doctorImage}
        alt={booking.doctorName}
        width={120}
        height={100}
        className="rounded-xl object-cover"
      />

      <div className="flex flex-col justify-between grow">

        <div>
          <h2 className="font-bold text-lg">
            {booking.doctorName}
          </h2>

          <p className="text-slate-500">
            {booking.specialty}
          </p>
        </div>

        <div className="flex justify-between items-center">

          <Chip color="success">
            Confirmed
          </Chip>

          <DeleteBookingButton id={booking._id} />
        </div>
      </div>
    </div>
  );
};

export default BookingCard; 