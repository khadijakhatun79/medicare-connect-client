"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { Calendar, CreditCard, Heart } from "@gravity-ui/icons";

export default function PatientDashboard() {

  const { data: appointmentsData } = useSWR("/appointments", fetcher);
  const { data: paymentsData } = useSWR("/payments", fetcher);
  const { data: reviewsData } = useSWR("/reviews/me", fetcher);

  // SAFE NORMALIZATION (IMPORTANT)
  const appointments = Array.isArray(appointmentsData)
    ? appointmentsData
    : [];

  const payments = Array.isArray(paymentsData)
    ? paymentsData
    : [];

  const reviews = Array.isArray(reviewsData)
    ? reviewsData
    : [];

  const stats = {
    upcoming: appointments.filter(a => a.status === "pending").length,
    history: appointments.length,
    payments: payments.reduce((acc, p) => acc + (p.amount || 0), 0),
    favorites: 5,
  };

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <section className="rounded-3xl bg-emerald-700 p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
        <p className="opacity-90">
          Manage your health journey in one place
        </p>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard icon={<Calendar />} label="Upcoming" value={stats.upcoming} />
        <StatCard icon={<Calendar />} label="Appointments" value={stats.history} />
        <StatCard icon={<CreditCard />} label="Payments" value={`$${stats.payments}`} />
        <StatCard icon={<Heart />} label="Favorites" value={stats.favorites} />

      </section>

      {/* Quick Preview */}
      <section className="grid md:grid-cols-2 gap-6">

        <Box title="Recent Appointments">
          {appointments.slice(0, 3).map((a, i) => (
            <Item key={i} title={a.doctorName} sub={`${a.date} • ${a.time}`} />
          ))}
        </Box>

        <Box title="Recent Payments">
          {payments.slice(0, 3).map((p, i) => (
            <Item key={i} title={p.transactionId} sub={`$${p.amount}`} />
          ))}
        </Box>

      </section>

      <Box title="Recent Reviews">
        {reviews.slice(0, 2).map((r, i) => (
          <div key={i} className="p-4 border rounded-xl">
            <p className="font-semibold">{r.doctorName}</p>
            <p className="text-yellow-500">★★★★★</p>
            <p className="text-sm text-gray-500">{r.reviewText}</p>
          </div>
        ))}
      </Box>

    </div>
  );
}

/* Components unchanged */
function StatCard({ icon, label, value }) {
  return (
    <div className="p-5 border rounded-2xl bg-white shadow-sm flex gap-4 items-center">
      <div className="p-3 bg-gray-100 rounded-xl">{icon}</div>
      <div>
        <h3 className="text-xl font-bold">{value}</h3>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function Box({ title, children }) {
  return (
    <div className="p-6 border rounded-3xl bg-white">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Item({ title, sub }) {
  return (
    <div className="flex justify-between p-3 border rounded-xl">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{sub}</p>
      </div>
    </div>
  );
}