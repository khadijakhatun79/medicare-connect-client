"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/Loading";
import AppointmentCard from "@/components/AppointmentCard";
import toast from "react-hot-toast";

export default function DoctorAppointments() {
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
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/doctor`,
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
    <ProtectedRoute allowedRoles={["Doctor"]}>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Appointment Requests
              </h1>
              <p className="text-gray-600">Manage your patient appointments</p>
            </div>
          </div>

          {/* Filter Buttons */}
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
                {status}
              </button>
            ))}
          </div>

          {/* Pending Count */}
          {filter === "pending" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                <strong>
                  {
                    appointments.filter(
                      (a) => a.appointmentStatus === "Pending",
                    ).length
                  }
                </strong>{" "}
                pending appointments waiting for your response
              </p>
            </div>
          )}

          {/* Appointments List */}
          {filteredAppointments.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-800">
                No Appointments
              </h3>
              <p className="text-gray-600 mt-2">
                You don't have any {filter !== "all" ? filter : ""} appointments
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onUpdate={fetchAppointments}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
