"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/Loading";
import AppointmentCard from "@/components/AppointmentCard";
import toast from "react-hot-toast";

export default function DoctorDashboard() {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    reviews: 0,
    totalAppointments: 0,
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDoctorData();
    fetchAppointments();
  }, []);

  const fetchDoctorData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (data.success) {
        setDoctor(data.data);
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

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

        // Calculate stats
        const today = new Date().toDateString();
        const todayApps = data.data.filter(
          (a) =>
            new Date(a.appointmentDate).toDateString() === today &&
            a.appointmentStatus === "Accepted",
        );

        const totalPatients = new Set(data.data.map((a) => a.patientId)).size;
        const reviews = data.data.filter(
          (a) => a.appointmentStatus === "Completed",
        ).length;

        setStats({
          totalPatients,
          todayAppointments: todayApps.length,
          reviews,
          totalAppointments: data.data.length,
        });
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute allowedRoles={["Doctor"]}>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome, Dr. {user?.name} 👨‍⚕️
              </h1>
              <p className="text-gray-600">
                Manage your patients and appointments
              </p>
              {doctor && (
                <div className="mt-2 flex items-center gap-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {doctor.specialization}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {doctor.verificationStatus === "Verified"
                      ? "✅ Verified"
                      : "⏳ Pending Verification"}
                  </span>
                </div>
              )}
            </div>
            <Link
              href="/doctor/schedule"
              className="btn btn-primary mt-4 md:mt-0"
            >
              Manage Schedule
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalPatients}
              </div>
              <div className="text-gray-600">Total Patients</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.todayAppointments}
              </div>
              <div className="text-gray-600">Today's Appointments</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.totalAppointments}
              </div>
              <div className="text-gray-600">Total Appointments</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.reviews}
              </div>
              <div className="text-gray-600">Reviews Received</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link
              href="/doctor/appointments"
              className="card hover:bg-blue-50 text-center"
            >
              <div className="text-3xl mb-2">📋</div>
              <div className="font-semibold">Appointment Requests</div>
            </Link>
            <Link
              href="/doctor/prescriptions"
              className="card hover:bg-purple-50 text-center"
            >
              <div className="text-3xl mb-2">💊</div>
              <div className="font-semibold">Prescriptions</div>
            </Link>
            <Link
              href="/doctor/schedule"
              className="card hover:bg-green-50 text-center"
            >
              <div className="text-3xl mb-2">📅</div>
              <div className="font-semibold">Schedule</div>
            </Link>
            <Link
              href="/doctor/profile"
              className="card hover:bg-yellow-50 text-center"
            >
              <div className="text-3xl mb-2">⚙️</div>
              <div className="font-semibold">Profile Settings</div>
            </Link>
          </div>

          {/* Today's Appointments */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Today's Appointments</h2>
              <Link
                href="/doctor/appointments"
                className="text-blue-500 hover:text-blue-700"
              >
                View All
              </Link>
            </div>

            {appointments.filter(
              (a) =>
                new Date(a.appointmentDate).toDateString() ===
                new Date().toDateString(),
            ).length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No appointments for today
              </p>
            ) : (
              <div className="space-y-4">
                {appointments
                  .filter(
                    (a) =>
                      new Date(a.appointmentDate).toDateString() ===
                      new Date().toDateString(),
                  )
                  .slice(0, 5)
                  .map((appointment) => (
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
      </div>
    </ProtectedRoute>
  );
}
