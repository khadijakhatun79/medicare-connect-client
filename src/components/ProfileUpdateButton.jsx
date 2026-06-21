"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function ProfileUpdateButton({ user, booking, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= PROFILE =================
  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState(user?.image || "");

  // ================= APPOINTMENT =================
  const [date, setDate] = useState(booking?.date || "");
  const [time, setTime] = useState(booking?.time || "");
  const [reason, setReason] = useState(booking?.reason || "");

  const isDoctor = user?.role === "doctor";

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      setLoading(true);

      // validation
      if (!photo) return toast.error("Photo is required");

      if (!isDoctor && (!name || !date || !time || !reason)) {
        return toast.error("All fields are required");
      }

      const payload = {
        image: photo,
      };

      if (!isDoctor) {
        payload.name = name;
        payload.date = date;
        payload.time = time;
        payload.reason = reason;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Update failed");

      toast.success("Profile updated successfully!");

      onUpdate?.(payload);

      setOpen(false);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-xl"
      >
        Update Profile
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-100 px-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden">

            {/* HEADER */}
            <div className="flex justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-lg">
                Update Profile
              </h2>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-4">

              {/* NAME */}
              <div>
                <label className="text-sm text-gray-600">
                  {isDoctor ? "Doctor Name" : "Patient Name"}
                </label>

                <input
                  value={name}
                  disabled={isDoctor}   // ✅ DOCTOR READONLY (FIXED)
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border p-3 rounded-xl bg-gray-50"
                />
              </div>

              {/* PHOTO */}
              <div>
                <label className="text-sm text-gray-600">
                  Photo URL
                </label>

                <input
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="w-full border p-3 rounded-xl"
                />
              </div>

              {/* APPOINTMENT FIELDS (ONLY PATIENT) */}
              {!isDoctor && (
                <>
                  {/* DATE */}
                  <div>
                    <label className="text-sm text-gray-600">
                      Date
                    </label>

                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border p-3 rounded-xl"
                    />
                  </div>

                  {/* TIME */}
                  <div>
                    <label className="text-sm text-gray-600">
                      Time
                    </label>

                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full border p-3 rounded-xl"
                    />
                  </div>

                  {/* REASON */}
                  <div>
                    <label className="text-sm text-gray-600">
                      Reason
                    </label>

                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full border p-3 rounded-xl h-24"
                    />
                  </div>
                </>
              )}
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">

              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-5 py-2 bg-pink-500 text-white rounded-xl"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}