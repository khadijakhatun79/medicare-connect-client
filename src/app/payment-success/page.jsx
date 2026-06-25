"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const appointmentId =
      params.get("appointmentId");

    if (!appointmentId) return;

    const updatePayment = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments/payment-success/${appointmentId}`,
          {
            method: "PATCH",
          }
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    updatePayment();
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
        {loading ? (
          <h2 className="text-xl font-bold">
            Processing Payment...
          </h2>
        ) : (
          <>
            <h1 className="text-4xl font-black text-green-600">
              Payment Successful
            </h1>

            <p className="mt-3 text-gray-500">
              Appointment confirmed successfully.
            </p>
          </>
        )}
      </div>
    </div>
  );
}