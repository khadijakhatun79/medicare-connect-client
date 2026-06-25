"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
  const { data: payments = [], isLoading } =
    useSWR("/payments", fetcher);

  if (isLoading) {
    return <p>Loading Payments...</p>;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-[#132573] text-white p-8 rounded-3xl">
        <h1 className="text-4xl font-bold">
          Payment Management
        </h1>

        <p className="text-white mt-2">
          Monitor all healthcare transactions
        </p>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Total Transactions
          </p>

          <h2 className="text-3xl font-bold">
            {payments.length}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold">
            ৳
            {payments.reduce(
              (sum, item) =>
                sum + Number(item.amount || 0),
              0
            )}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Successful Payments
          </p>

          <h2 className="text-3xl font-bold">
            {
              payments.filter(
                (p) =>
                  p.status === "paid"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Payments Table */}
      <div className="bg-white border rounded-3xl overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">
            Transaction History
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">
                  Transaction
                </th>

                <th className="p-4 text-left">
                  Patient
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>

              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} />
                      {payment.transactionId}
                    </div>
                  </td>

                  <td className="p-4">
                    {payment.patientEmail}
                  </td>

                  <td className="p-4 font-semibold">
                    ৳ {payment.amount}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        payment.status === "paid"
                          ? "bg-green-100 text-[#132573]"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {payment.date}
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