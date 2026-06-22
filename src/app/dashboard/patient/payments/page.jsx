"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";

export default function PaymentsPage() {
  const { data = [] } = useSWR("/payments", fetcher);

  return (
    <div className="p-6 border rounded-3xl bg-white">
      <h1 className="text-2xl font-bold mb-5">Payment History</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Transaction</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p._id} className="text-center border-t">
              <td>{p.transactionId}</td>
              <td>${p.amount}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}