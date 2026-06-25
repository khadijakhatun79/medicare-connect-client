"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token =
          localStorage.getItem("token");

        const userData =
          localStorage.getItem("user");

        if (!token) {
          router.replace("/login");
          return;
        }

        const user = userData
          ? JSON.parse(userData)
          : null;

        if (
          allowedRoles.length > 0 &&
          user &&
          !allowedRoles.includes(
            user.role?.toLowerCase()
          )
        ) {
          router.replace("/");
          return;
        }

        setAuthorized(true);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-lg font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  if (!authorized) return null;

  return children;
}