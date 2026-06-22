"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";

export default function AppointmentsPage() {
  const { data = [], mutate } = useSWR("/appointments", fetcher);

  const updateStatus = async (id, status) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });

    mutate();
  };

  const remove = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    mutate();
  };

  return (
    <div className="p-6 border rounded-3xl bg-white">
      <h1 className="text-2xl font-bold mb-5">My Appointments</h1>

      <div className="space-y-4">
        {data.map((a) => (
          <div key={a._id} className="p-4 border rounded-xl flex justify-between">
            <div>
              <h3 className="font-semibold">{a.doctorName}</h3>
              <p className="text-sm text-gray-500">
                {a.date} • {a.time}
              </p>
              <p className="text-xs mt-1">Status: {a.status}</p>
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-warning"
                onClick={() => updateStatus(a._id, "rescheduled")}
              >
                Reschedule
              </button>

              <button
                className="btn btn-error"
                onClick={() => remove(a._id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}