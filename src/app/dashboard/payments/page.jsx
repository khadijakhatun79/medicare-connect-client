"use client";

import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] =
    useState([]);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment-history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then(setPayments);
  }, []);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-black mb-6">
        Payment History
      </h1>

      <div className="space-y-4">

        {payments.map((payment) => (
          <div
            key={payment._id}
            className="border p-5 rounded-2xl"
          >
            <p>
              Doctor:
              <b> {payment.doctorName}</b>
            </p>

            <p>
              Amount:
              <b> ৳{payment.amount}</b>
            </p>

            <p>
              Status:
              <b> {payment.status}</b>
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}