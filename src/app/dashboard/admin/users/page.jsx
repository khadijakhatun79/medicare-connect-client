"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";

export default function UsersPage() {
  const { data, error, isLoading } = useSWR("/admin/users", fetcher);

  const users = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load users</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Manage Users
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user?.name || "N/A"}</td>
                <td>{user?.email || "N/A"}</td>
                <td>{user?.role || "user"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}