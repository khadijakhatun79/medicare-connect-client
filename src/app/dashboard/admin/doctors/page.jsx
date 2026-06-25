"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";

export default function DoctorsPage() {
  const { data: doctors = [], mutate } =
    useSWR("/doctors", fetcher);

  const handleVerify = async (id) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/doctors/verify/${id}`,
      {
        method: "PATCH",
      }
    );

    mutate();
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-[#132573] text-white p-8 rounded-3xl">
        <h1 className="text-4xl font-bold">
          Verify Doctor Licenses
        </h1>

        <p className="mt-2 text-white">
          Manage doctor verification requests
        </p>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white p-6 rounded-3xl border">
          <p className="text-gray-500">
            Total Doctors
          </p>

          <h2 className="text-3xl font-bold">
            {doctors.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-3xl border">
          <p className="text-gray-500">
            Verified
          </p>

          <h2 className="text-3xl font-bold text-[#132573]">
            {
              doctors.filter(
                (d) =>
                  d.verificationStatus ===
                  "verified"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white p-6 rounded-3xl border">
          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="text-3xl font-bold text-orange-500">
            {
              doctors.filter(
                (d) =>
                  d.verificationStatus !==
                  "verified"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white border rounded-3xl overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">
            Doctor Registry
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">
                  Doctor
                </th>

                <th className="p-4 text-left">
                  Specialization
                </th>

                <th className="p-4 text-left">
                  Hospital
                </th>

                <th className="p-4 text-left">
                  Experience
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {doctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="border-t"
                >
                  <td className="p-4">
                    {doctor.doctorName}
                  </td>

                  <td className="p-4">
                    {doctor.specialization}
                  </td>

                  <td className="p-4">
                    {doctor.hospitalName}
                  </td>

                  <td className="p-4">
                    {doctor.experience} Years
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        doctor.verificationStatus ===
                        "verified"
                          ? "bg-green-100 text-[#132573]"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {doctor.verificationStatus ||
                        "pending"}
                    </span>

                  </td>

                  <td className="p-4">

                    {doctor.verificationStatus !==
                      "verified" && (
                      <button
                        onClick={() =>
                          handleVerify(
                            doctor._id
                          )
                        }
                        className="bg-[#132573] text-white px-4 py-2 rounded-xl"
                      >
                        Approve
                      </button>
                    )}

                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}