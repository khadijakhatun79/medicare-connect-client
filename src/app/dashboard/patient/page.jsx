"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { Calendar, CreditCard, Heart } from "@gravity-ui/icons";

export default function PatientDashboard() {
  const { data: user } = useSWR("/patient/profile", fetcher);

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
      <section className="rounded-3xl bg-[#132573] p-8 text-white relative overflow-hidden">
  <h1 className="text-4xl font-bold">
    Welcome, {user?.name || "Patient"}!
  </h1>
  <p>Email: {user?.email}</p>

  <p className="mt-3 text-lg opacity-90 max-w-xl">
    Access real-time schedules, view medical records,
    coordinate with clinicians and manage payments.
  </p>
</section>

      {/* Stats */}
     <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

  <StatCard
    icon={<Calendar />}
    label="Upcoming Clinics"
    value={stats.upcoming}
  />

  <StatCard
    icon={<Calendar />}
    label="Total Appointments"
    value={stats.history}
  />

  <StatCard
    icon={<CreditCard />}
    label="Total Payments"
    value={`$${stats.payments}`}
  />

  <StatCard
    icon={<Heart />}
    label="Reviews"
    value={reviews.length}
  />

</section>

<Box title="Upcoming Consultations">

  {appointments.slice(0, 5).map((a) => (
    <div
      key={a._id}
      className="flex justify-between items-center border rounded-2xl p-4"
    >
      <div>
        <h3 className="font-semibold text-lg">
          {a.doctorName}
        </h3>

        <p className="text-gray-500 text-sm">
          {a.date} • {a.time}
        </p>
      </div>

      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
        {a.status}
      </span>
    </div>
  ))}

</Box>



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