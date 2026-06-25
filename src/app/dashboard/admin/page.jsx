"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";
import {
  Users,
  UserCheck,
  Calendar,
  DollarSign,
} from "lucide-react";

export default function AnalyticsPage() {
  const { data, isLoading } = useSWR(
    "/admin/analytics",
    fetcher
  );

  if (isLoading) {
    return (
      <div className="text-center py-20">
        Loading Analytics...
      </div>
    );
  }

  const stats = [
    {
      title: "Total Patients",
      value: data?.totalPatients || 0,
      icon: Users,
      color: "bg-blue-50",
    },
    {
      title: "Verified Doctors",
      value: data?.totalDoctors || 0,
      icon: UserCheck,
      color: "bg-green-50",
    },
    {
      title: "Appointments",
      value: data?.totalAppointments || 0,
      icon: Calendar,
      color: "bg-orange-50",
    },
    {
      title: "Revenue",
      value: `$${data?.revenue || 0}`,
      icon: DollarSign,
      color: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="rounded-3xl bg-[#132573] text-white p-8">
        <h1 className="text-4xl font-bold">
          Admin
        </h1>

        <p className="mt-2 text-white">
          Monitor patients, doctors, appointments
          and healthcare revenue.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`${item.color} p-4 rounded-2xl`}
                >
                  <Icon size={28} />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Insights */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl border p-6">
          <h2 className="text-xl font-bold mb-4">
            Platform Overview
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li>
              ✅ Registered Patients:
              {" "}
              {data?.totalPatients || 0}
            </li>

            <li>
              ✅ Verified Doctors:
              {" "}
              {data?.totalDoctors || 0}
            </li>

            <li>
              ✅ Appointments Booked:
              {" "}
              {data?.totalAppointments || 0}
            </li>

            <li>
              ✅ Revenue Generated:
              {" "}
              ${data?.revenue || 0}
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <h2 className="text-xl font-bold mb-4">
            Admin Actions
          </h2>

          <div className="space-y-3">

            <div className="p-4 rounded-xl bg-slate-50">
              Manage User Accounts
            </div>

            <div className="p-4 rounded-xl bg-slate-50">
              Verify Doctor Licenses
            </div>

            <div className="p-4 rounded-xl bg-slate-50">
              Manage Appointments
            </div>

            <div className="p-4 rounded-xl bg-slate-50">
              Review Payments
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}