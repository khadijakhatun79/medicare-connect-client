"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";

export default function ReviewsPage() {
  const { data, mutate } = useSWR("/reviews/me", fetcher);

  // SAFE NORMALIZATION
  const reviews = Array.isArray(data)
    ? data
    : Array.isArray(data?.reviews)
    ? data.reviews
    : [];

  const deleteReview = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    mutate();
  };

  return (
    <div className="p-6 border rounded-3xl bg-white">
      <h1 className="text-2xl font-bold mb-5">My Reviews</h1>

      {reviews.map((r) => (
        <div key={r._id} className="p-4 border rounded-xl mb-3">
          <h3 className="font-semibold">{r.doctorName}</h3>
          <p>⭐⭐⭐⭐⭐</p>
          <p className="text-sm text-gray-500">{r.reviewText}</p>

          <button
            onClick={() => deleteReview(r._id)}
            className="btn btn-error mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}