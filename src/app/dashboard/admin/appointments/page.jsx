"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/appointments`,
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
    return app.appointmentStatus.toLowerCase() === filter.toLowerCase();
  });

  const statuses = [
    "All",
    "Pending",
    "Accepted",
    "Rejected",
    "Completed",
    "Cancelled",
  ];

  if (loading) return <Loading />;

  return (
    <ProtectedRoute allowedRoles={["Admin"]}>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                All Appointments
              </h1>
              <p className="text-gray-600">
                Monitor all appointments across the platform
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status.toLowerCase())}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === status.toLowerCase()
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {status} (
                {
                  appointments.filter((a) =>
                    status === "all" ? true : a.appointmentStatus === status,
                  ).length
                }
                )
              </button>
            ))}
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.map((app) => (
              <div key={app._id} className="card">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${app.patientName}&background=0EA5E9&color=fff`}
                        alt={app.patientName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-bold">{app.patientName}</p>
                        <p className="text-sm text-gray-600">
                          with Dr. {app.doctorName}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      📅 {new Date(app.appointmentDate).toLocaleDateString()} ⏰{" "}
                      {app.appointmentTime}
                    </p>
                    {app.symptoms && (
                      <p className="text-sm text-gray-500">
                        Symptoms: {app.symptoms}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        app.appointmentStatus === "Pending"
                          ? "bg-yellow-500"
                          : app.appointmentStatus === "Accepted"
                            ? "bg-green-500"
                            : app.appointmentStatus === "Rejected"
                              ? "bg-red-500"
                              : app.appointmentStatus === "Completed"
                                ? "bg-blue-500"
                                : "bg-gray-500"
                      }`}
                    >
                      {app.appointmentStatus}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        app.paymentStatus === "Paid"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {app.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
