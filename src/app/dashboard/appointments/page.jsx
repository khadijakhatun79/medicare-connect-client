"use client";

import { useEffect, useState } from "react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] =
    useState([]);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", 
      }
    )
      .then((res) => res.json())
      .then(setAppointments);
  }, []);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-black mb-6">
        My Appointments
      </h1>

      <div className="space-y-4">

        {appointments.map((item) => (
          <div
            key={item._id}
            className="border rounded-2xl p-5"
          >
            <h2 className="font-bold text-xl">
              {item.doctorName}
            </h2>

            <p>
              Status:
              <span className="font-bold ml-2">
                {item.status}
              </span>
            </p>

            <p>
              Payment:
              <span className="font-bold ml-2">
                {item.paymentStatus}
              </span>
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}