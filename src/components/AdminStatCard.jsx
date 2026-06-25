import React from "react";
import StatCard from "./StatCard";

const AdminStatCard = ({ analytics }) => {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <StatCard
        title="Users"
        value={analytics?.totalUsers || 0}
      />

      <StatCard
        title="Doctors"
        value={analytics?.totalDoctors || 0}
      />

      <StatCard
        title="Appointments"
        value={analytics?.totalAppointments || 0}
      />

      <StatCard
        title="Revenue"
        value={`$${analytics?.revenue || 0}`}
      />
    </div>
  );
};

export default AdminStatCard;