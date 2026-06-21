// src/components/UpdateBookingButton.jsx

"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Calendar,
  Clock3,
  User,
  X,
} from "lucide-react";

export default function UpdateBookingButton({
  booking,
}) {
  const [open, setOpen] = useState(false);

  const [patientName, setPatientName] =
    useState(booking?.patientName || "");

  const [date, setDate] = useState(
    booking?.date || ""
  );

  const [time, setTime] = useState(
    booking?.appointmentTime || ""
  );

  const [reason, setReason] = useState(
    booking?.reason || ""
  );

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${booking?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            patientName,
            date,
            appointmentTime: time,
            reason,
          }),
        }
      );

      if (res.ok) {
        toast.success(
          "Appointment updated successfully!"
        );

        setOpen(false);

        window.location.reload();
      } else {
        toast.error(
          "Failed to update appointment"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Server connection failed"
      );
    }
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold"
      >
        Update
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-5">

              <div>
                <h2 className="text-2xl font-black">
                  Update Appointment
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Modify your booking information
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={18} />
              </button>

            </div>

            {/* BODY */}
            <div className="p-6 space-y-5">

              {/* DOCTOR NAME READONLY */}
              <div>
                <label className="text-sm font-semibold text-slate-600 mb-2 block">
                  Doctor Name
                </label>

                <input
                  type="text"
                  value={booking?.doctorName}
                  disabled
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 bg-slate-100 text-slate-600"
                />
              </div>

              {/* PATIENT NAME */}
              <div>
                <label className="text-sm font-semibold text-slate-600 mb-2 block">
                  Patient Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) =>
                      setPatientName(
                        e.target.value
                      )
                    }
                    className="w-full h-12 rounded-2xl border border-slate-200 pl-12 pr-4 outline-none focus:border-sky-500"
                  />

                </div>
              </div>

              {/* DATE + TIME */}
              <div className="grid md:grid-cols-2 gap-4">

                {/* DATE */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 mb-2 block">
                    Date
                  </label>

                  <div className="relative">

                    <Calendar
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="date"
                      value={date}
                      onChange={(e) =>
                        setDate(
                          e.target.value
                        )
                      }
                      className="w-full h-12 rounded-2xl border border-slate-200 pl-12 pr-4 outline-none focus:border-sky-500"
                    />

                  </div>
                </div>

                {/* TIME */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 mb-2 block">
                    Time
                  </label>

                  <div className="relative">

                    <Clock3
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="time"
                      value={time}
                      onChange={(e) =>
                        setTime(
                          e.target.value
                        )
                      }
                      className="w-full h-12 rounded-2xl border border-slate-200 pl-12 pr-4 outline-none focus:border-sky-500"
                    />

                  </div>
                </div>

              </div>

              {/* REASON */}
              <div>
                <label className="text-sm font-semibold text-slate-600 mb-2 block">
                  Reason
                </label>

                <textarea
                  rows={4}
                  value={reason}
                  onChange={(e) =>
                    setReason(
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-slate-200 p-4 outline-none resize-none focus:border-sky-500"
                />
              </div>

            </div>

            {/* FOOTER */}
            <div className="border-t px-6 py-5 flex justify-end gap-3">

              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}