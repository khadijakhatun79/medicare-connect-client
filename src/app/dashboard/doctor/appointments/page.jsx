"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

 

 const fetchAppointments = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/doctor/appointments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (data.success) {
      setAppointments(data.data);
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    toast.error("Failed to load appointments");
  } finally {
    setLoading(false);
  }
};

  const filteredAppointments = appointments.filter((app) => {
    if (filter === "all") return true;

    return (
      app.status?.toLowerCase() === filter.toLowerCase()
    );
  });

  const statuses = [
    "all",
    "pending",
    "confirmed",
    "completed",
    "cancelled",
  ];

  if (loading) return <Loading />;

  return (
    <ProtectedRoute allowedRoles={["doctor"]}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">

          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Doctor Appointments
            </h1>

            <p className="text-gray-500">
              Manage your patient appointments
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-3 mb-6">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg capitalize transition ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Appointment List */}
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm">
              <h2 className="text-xl font-semibold">
                No Appointments Found
              </h2>

              <p className="text-gray-500 mt-2">
                No appointments available.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white rounded-2xl border p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start flex-wrap gap-4">

                    <div>
                      <h3 className="text-xl font-bold">
                        {appointment.patientName ||
                          appointment.patientEmail}
                      </h3>

                      <p className="text-gray-500">
                        {appointment.patientEmail}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : appointment.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-5">

                    <div>
                      <p className="text-sm text-gray-500">
                        Appointment Date
                      </p>

                      <p className="font-medium">
                        {appointment.date || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Time
                      </p>

                      <p className="font-medium">
                        {appointment.time || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Payment Status
                      </p>

                      <p className="font-medium">
                        {appointment.paymentStatus ||
                          "unpaid"}
                      </p>
                    </div>
                  </div>

                  {appointment.problem && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        Problem
                      </p>

                      <p>{appointment.problem}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}