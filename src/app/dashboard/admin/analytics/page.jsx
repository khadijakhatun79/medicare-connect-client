"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function AnalyticsPage() {
  const { data, error, isLoading } = useSWR(
    "/admin/analytics",
    fetcher
  );

  if (isLoading)
    return (
      <div className="p-10 text-xl font-semibold">
        Loading analytics...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-red-500">
        Failed to load analytics
      </div>
    );

  const stats = data || {};

  const chartData = [
    { name: "Doctors", value: stats.totalDoctors || 0 },
    { name: "Patients", value: stats.totalPatients || 0 },
    { name: "Appointments", value: stats.totalAppointments || 0 },
    { name: "Reviews", value: stats.totalReviews || 0 },
  ];

  const COLORS = ["#4F46E5", "#16A34A", "#F59E0B", "#EF4444"];

  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Admin Analytics Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of MediCare Connect system performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Doctors" value={stats.totalDoctors} />
        <Card title="Patients" value={stats.totalPatients} />
        <Card title="Appointments" value={stats.totalAppointments} />
        <Card title="Reviews" value={stats.totalReviews} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Platform Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Simple Trend Line */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">
          System Growth Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#16A34A"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------------- CARD COMPONENT ---------------- */

function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">
        {value ?? 0}
      </p>
    </div>
  );
}