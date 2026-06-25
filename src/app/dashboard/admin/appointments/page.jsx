"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";

export default function AppointmentsPage() {
  const { data, error, isLoading } = useSWR(
    "/admin/appointments",
    fetcher
  );

  const appointments = Array.isArray(data?.data)
    ? data.data
    : [];

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">Error loading data</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Appointments
      </h1>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        appointments.map((a) => (
          <div key={a._id} className="border p-4 rounded-xl mb-3">
            <p className="font-semibold">{a.doctorName}</p>
            <p>{a.patientEmail}</p>
            <p>{a.date} - {a.time}</p>
            <p className="text-sm">{a.status}</p>
          </div>
        ))
      )}
    </div>
  );
}