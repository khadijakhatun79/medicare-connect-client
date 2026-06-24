"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/Loading";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalReviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);

  // Mock chart data - in production this would come from API
  const appointmentData = [
    { name: "Mon", appointments: 12 },
    { name: "Tue", appointments: 19 },
    { name: "Wed", appointments: 15 },
    { name: "Thu", appointments: 22 },
    { name: "Fri", appointments: 28 },
    { name: "Sat", appointments: 18 },
    { name: "Sun", appointments: 8 },
  ];

  const doctorPerformance = [
    { name: "Dr. Ahmed", rating: 4.8 },
    { name: "Dr. Khan", rating: 4.5 },
    { name: "Dr. Rahman", rating: 4.2 },
    { name: "Dr. Islam", rating: 3.9 },
    { name: "Dr. Ali", rating: 4.6 },
  ];

  const COLORS = ["#0EA5E9", "#8B5CF6", "#10B981", "#F59E0B"];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch stats
      const statsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/stats`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch recent users
      const usersRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users?limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const usersData = await usersRes.json();
      if (usersData.success) {
        setRecentUsers(usersData.data);
      }

      // Fetch recent appointments
      const appsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/appointments?limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const appsData = await appsRes.json();
      if (appsData.success) {
        setRecentAppointments(appsData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute allowedRoles={["Admin"]}>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard 👋
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline">📊 Export Report</button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalUsers}
              </div>
              <div className="text-gray-600">Total Users</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.totalDoctors}
              </div>
              <div className="text-gray-600">Total Doctors</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.totalAppointments}
              </div>
              <div className="text-gray-600">Appointments</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.totalReviews}
              </div>
              <div className="text-gray-600">Reviews</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <h3 className="font-bold text-lg mb-4">Weekly Appointments</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="appointments" fill="#0EA5E9" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3 className="font-bold text-lg mb-4">
                Doctor Performance (Rating)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={doctorPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link
              href="/admin/users"
              className="card hover:bg-blue-50 text-center"
            >
              <div className="text-3xl mb-2">👤</div>
              <div className="font-semibold">Manage Users</div>
            </Link>
            <Link
              href="/admin/doctors"
              className="card hover:bg-purple-50 text-center"
            >
              <div className="text-3xl mb-2">👨‍⚕️</div>
              <div className="font-semibold">Manage Doctors</div>
            </Link>
            <Link
              href="/admin/appointments"
              className="card hover:bg-green-50 text-center"
            >
              <div className="text-3xl mb-2">📋</div>
              <div className="font-semibold">Appointments</div>
            </Link>
            <Link
              href="/admin/payments"
              className="card hover:bg-yellow-50 text-center"
            >
              <div className="text-3xl mb-2">💳</div>
              <div className="font-semibold">Payments</div>
            </Link>
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Recent Users</h3>
                <Link
                  href="/admin/users"
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  View All
                </Link>
              </div>
              {recentUsers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No users</p>
              ) : (
                <div className="space-y-3">
                  {recentUsers.map((u) => (
                    <div
                      key={u._id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            u.photo ||
                            `https://ui-avatars.com/api/?name=${u.name}&background=0EA5E9&color=fff`
                          }
                          alt={u.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-sm">{u.name}</p>
                          <p className="text-xs text-gray-500">{u.role}</p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          u.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {u.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Recent Appointments</h3>
                <Link
                  href="/admin/appointments"
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  View All
                </Link>
              </div>
              {recentAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No appointments
                </p>
              ) : (
                <div className="space-y-3">
                  {recentAppointments.map((app) => (
                    <div
                      key={app._id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-sm">
                          {app.patientName}
                        </p>
                        <p className="text-xs text-gray-500">
                          with Dr. {app.doctorName}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          app.appointmentStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : app.appointmentStatus === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {app.appointmentStatus}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
