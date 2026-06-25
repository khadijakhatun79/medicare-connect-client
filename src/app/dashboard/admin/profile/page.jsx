"use client";

import { useEffect, useState } from "react";
import { Mail, Shield, User } from "lucide-react";

export default function AdminProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedUser = window.localStorage.getItem("user");

      if (!storedUser || storedUser === "undefined" || storedUser === "null") {
        setUser(null);
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (parsedUser && typeof parsedUser === "object") {
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Invalid user JSON:", error);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-3xl animate-pulse">
        Loading profile...
      </div>
    );
  }

  // No user state
  if (!user) {
    return (
      <div className="bg-white p-6 rounded-3xl text-red-500">
        No user found. Please login again.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-[#132573] text-white rounded-3xl p-8">
        <h1 className="text-4xl font-bold">Admin Profile</h1>
        <p className="mt-2 text-white">
          Manage your administrator account
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border shadow-sm p-8">

        {/* Top section */}
        <div className="flex items-center gap-6 mb-8">

          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <User size={40} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {user?.name ?? "Unknown"}
            </h2>
            <p className="text-gray-500">
              System Administrator
            </p>
          </div>

        </div>

        {/* Info grid */}
        <div className="grid md:grid-cols-2 gap-6">

          <InfoCard
            icon={<User size={18} />}
            label="Full Name"
            value={user?.name}
          />

          <InfoCard
            icon={<Mail size={18} />}
            label="Email"
            value={user?.email}
          />

          <InfoCard
            icon={<Shield size={18} />}
            label="Role"
            value={user?.role}
          />

          {/* Status card */}
          <div className="border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={18} />
              <span className="font-semibold">Status</span>
            </div>

            <p
              className={`font-medium ${
                user?.status === "Active"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {user?.status ?? "Active"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------------- Reusable Card ---------------- */

function InfoCard({ icon, label, value }) {
  return (
    <div className="border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>
      <p>{value ?? "N/A"}</p>
    </div>
  );
}