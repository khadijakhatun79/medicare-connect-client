"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";

export default function AppointmentTable() {
  const { data, mutate } = useSWR(
    "/admin/appointments",
    fetcher
  );

  const appointments = data?.data || [];

  const updateStatus = async (id, status) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-3xl border p-6">
      <h2 className="text-2xl font-bold mb-6">
        Recent Appointments
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Patient</th>
              <th className="py-3">Doctor</th>
              <th className="py-3">Date</th>
              <th className="py-3">Time</th>
              <th className="py-3">Status</th>
              <th className="py-3">Payment</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr
                key={item._id}
                className="border-b"
              >
                <td className="py-4">
                  {item.patientEmail}
                </td>

                <td>{item.doctorName}</td>

                <td>{item.date}</td>

                <td>{item.time}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs
                    ${
                      item.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs
                    ${
                      item.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() =>
                      updateStatus(
                        item._id,
                        "confirmed"
                      )
                    }
                    className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        item._id,
                        "cancelled"
                      )
                    }
                    className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No appointments found
          </div>
        )}
      </div>
    </div>
  );
}