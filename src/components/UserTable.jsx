"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";
import UserTable from "@/components/UserTable";

export default function UsersPage() {
  const { data, error, isLoading } = useSWR(
    "/admin/users",
    fetcher
  );

  // ✅ Safe normalization (VERY IMPORTANT)
  const users = Array.isArray(data?.data)
    ? data.data
    : [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Manage Users
      </h1>

      <UserTable
        users={users}
        loading={isLoading}
        error={error}
      />
    </div>
  );
}