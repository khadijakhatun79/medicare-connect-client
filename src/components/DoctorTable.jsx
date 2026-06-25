"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";

export default function DoctorTable() {
  const { data, mutate } = useSWR(
    "/admin/doctors",
    fetcher
  );

  const doctors = data?.data || [];

  const verifyDoctor = async (id) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/doctors/${id}/verify`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Verified",
          }),
        }
      );

      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-3xl border p-6">
      <h2 className="text-2xl font-bold mb-6">
        Doctor Verification
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">
                Doctor
              </th>

              <th className="py-3 text-left">
                Specialty
              </th>

              <th className="py-3 text-left">
                Experience
              </th>

              <th className="py-3 text-left">
                Fee
              </th>

              <th className="py-3 text-left">
                Status
              </th>

              <th className="py-3 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr
                key={doctor._id}
                className="border-b"
              >
                <td className="py-4">
                  <div>
                    <p className="font-semibold">
                      {doctor.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {doctor.email}
                    </p>
                  </div>
                </td>

                <td>
                  {doctor.specialty}
                </td>

                <td>
                  {doctor.experience || 0} Years
                </td>

                <td>
                  ${doctor.fee || 0}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs
                    ${
                      doctor.verificationStatus ===
                      "Verified"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {doctor.verificationStatus}
                  </span>
                </td>

                <td>
                  {doctor.verificationStatus !==
                    "Verified" && (
                    <button
                      onClick={() =>
                        verifyDoctor(
                          doctor._id
                        )
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {doctors.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No Doctors Found
          </div>
        )}
      </div>
    </div>
  );
}