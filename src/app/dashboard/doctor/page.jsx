"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { Calendar, Person } from "@gravity-ui/icons";

export default function DoctorDashboard() {
    const { data: user } = useSWR("/doctor/profile", fetcher);
  const { data: appointmentsData } = useSWR(
    "/doctor/appointments",
    fetcher
  );

  const { data: prescriptionsData } = useSWR(
    "/doctor/prescriptions",
    fetcher
  );

  const appointments = Array.isArray(appointmentsData)
    ? appointmentsData
    : [];

  const prescriptions = Array.isArray(prescriptionsData)
    ? prescriptionsData
    : [];

  const stats = {
    totalAppointments: appointments.length,
    pending: appointments.filter(
      (a) => a.status === "pending"
    ).length,
    completed: appointments.filter(
      (a) => a.status === "completed"
    ).length,
    prescriptions: prescriptions.length,
  };

  return (
    <div className="space-y-8">

      <section className="rounded-3xl bg-blue-700 p-8 text-white">
         <h1 className="text-4xl font-bold">
    Welcome, {user?.name || "Patient"}!
  </h1>
  <p>Email: {user?.email}</p>

        <p className="opacity-90">
          Manage appointments and prescriptions
        </p>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard
          icon={<Calendar />}
          label="Appointments"
          value={stats.totalAppointments}
        />

        <StatCard
          icon={<Calendar />}
          label="Pending"
          value={stats.pending}
        />

        <StatCard
          icon={<Calendar />}
          label="Completed"
          value={stats.completed}
        />

        <StatCard
          icon={<Person />}
          label="Prescriptions"
          value={stats.prescriptions}
        />

      </section>

      <section className="grid md:grid-cols-2 gap-6">

        <Box title="Recent Appointments">
          {appointments.length === 0 ? (
            <p className="text-gray-500">
              No appointments found
            </p>
          ) : (
            appointments.slice(0, 5).map((a, i) => (
              <Item
                key={i}
                title={
                  a.patientName ||
                  a.patientEmail ||
                  "Patient"
                }
                sub={`${a.date || ""} • ${
                  a.time || ""
                }`}
              />
            ))
          )}
        </Box>

        <Box title="Recent Prescriptions">
          {prescriptions.length === 0 ? (
            <p className="text-gray-500">
              No prescriptions found
            </p>
          ) : (
            prescriptions.slice(0, 5).map((p, i) => (
              <Item
                key={i}
                title={
                  p.patientName ||
                  p.patientEmail ||
                  "Patient"
                }
                sub={p.createdAt || ""}
              />
            ))
          )}
        </Box>

      </section>

    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="p-5 border rounded-2xl bg-white shadow-sm flex gap-4 items-center">
      <div className="p-3 bg-gray-100 rounded-xl">
        {icon}
      </div>

      <div>
        <h3 className="text-xl font-bold">
          {value}
        </h3>

        <p className="text-sm text-gray-500">
          {label}
        </p>
      </div>
    </div>
  );
}

function Box({ title, children }) {
  return (
    <div className="p-6 border rounded-3xl bg-white">
      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function Item({ title, sub }) {
  return (
    <div className="flex justify-between p-3 border rounded-xl">
      <div>
        <p className="font-medium">{title}</p>

        <p className="text-sm text-gray-500">
          {sub}
        </p>
      </div>
    </div>
  );
}