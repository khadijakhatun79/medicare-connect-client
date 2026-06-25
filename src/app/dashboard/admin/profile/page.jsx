"use client";

import { useEffect, useState } from "react";
import { Mail, Shield, User } from "lucide-react";

export default function AdminProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/me`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();

        setUser(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border p-8 shadow-sm">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white rounded-3xl border p-8 shadow-sm text-center">
        <h2 className="text-xl font-bold text-red-500">
          Profile Not Found
        </h2>

        <p className="text-slate-500 mt-2">
          Please login again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#132573] text-white rounded-3xl p-8">
        <h1 className="text-4xl font-bold">
          Admin Profile
        </h1>

        <p className="mt-2 text-white/80">
          Manage your administrator account
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border shadow-sm p-8">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="h-24 w-24 rounded-full bg-[#132573]/10 flex items-center justify-center">
            <User
              size={42}
              className="text-[#132573]"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {user.name}
            </h2>

            <p className="text-slate-500">
              System Administrator
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard
            icon={<User size={18} />}
            label="Full Name"
            value={user.name}
          />

          <InfoCard
            icon={<Mail size={18} />}
            label="Email"
            value={user.email}
          />

          <InfoCard
            icon={<Shield size={18} />}
            label="Role"
            value={user.role}
          />

          <div className="border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={18} />
              <span className="font-semibold">
                Status
              </span>
            </div>

            <p
              className={`font-medium ${
                user?.status?.toLowerCase() === "active"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {user.status || "Active"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-semibold">
          {label}
        </span>
      </div>

      <p>{value || "N/A"}</p>
    </div>
  );
}