"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/doctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (doctorId, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/doctors/${doctorId}/verify`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        },
      );

      if (res.ok) {
        toast.success(`Doctor ${status.toLowerCase()} successfully`);
        fetchDoctors();
      } else {
        toast.error("Failed to update doctor status");
      }
    } catch (error) {
      toast.error("Error updating doctor");
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
                Manage Doctors
              </h1>
              <p className="text-gray-600">Verify and manage doctor profiles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="card">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      doctor.profileImage ||
                      `https://ui-avatars.com/api/?name=${doctor.doctorName}&background=8B5CF6&color=fff`
                    }
                    alt={doctor.doctorName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{doctor.doctorName}</h3>
                    <p className="text-sm text-blue-500">
                      {doctor.specialization}
                    </p>
                    <p className="text-sm text-gray-500">
                      {doctor.hospitalName}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Experience:</span>{" "}
                    {doctor.experience} years
                  </p>
                  <p>
                    <span className="font-semibold">Fee:</span> ৳
                    {doctor.consultationFee}
                  </p>
                  <p>
                    <span className="font-semibold">Rating:</span> ⭐{" "}
                    {doctor.rating || 0}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        doctor.verificationStatus === "Verified"
                          ? "bg-green-100 text-green-700"
                          : doctor.verificationStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {doctor.verificationStatus}
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  {doctor.verificationStatus === "Pending" && (
                    <>
                      <button
                        onClick={() => handleVerify(doctor._id, "Verified")}
                        className="btn btn-primary text-sm flex-1"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleVerify(doctor._id, "Rejected")}
                        className="btn btn-danger text-sm flex-1"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {doctor.verificationStatus === "Verified" && (
                    <button
                      onClick={() => handleVerify(doctor._id, "Rejected")}
                      className="btn btn-danger text-sm w-full"
                    >
                      Unverify
                    </button>
                  )}
                  {doctor.verificationStatus === "Rejected" && (
                    <button
                      onClick={() => handleVerify(doctor._id, "Verified")}
                      className="btn btn-primary text-sm w-full"
                    >
                      Re-verify
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {doctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No doctors found</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
