"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import {
  Card,
  Button,
  Input,
  Label,
} from "@heroui/react";

import { At, ShieldKeyhole } from "@gravity-ui/icons";
import Breadcrumb from "@/components/Breadcrumb";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // LOGIN
const handleLogin = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    const { error: authError } = await signIn.email({
      email,
      password,
    });

    if (authError) {
      setError(authError.message || "Invalid credentials");
      return;
    }

    // User Info
    const userRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${email}`
    );

    const user = await userRes.json();

    // Express JWT
    const jwtRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      }
    );

    const jwtData = await jwtRes.json();

    console.log("JWT DATA:", jwtData);

    if (!jwtData.token) {
      throw new Error("JWT token not received");
    }

    localStorage.setItem(
      "token",
      jwtData.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    if (user.role === "doctor") {
      router.push("/dashboard/doctor");
    } else if (user.role === "admin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/patient");
    }

  

  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

 

  // GOOGLE LOGIN
  const handleGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
     <div>
    <Breadcrumb />
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7f9] px-4">

      <Card className="w-full max-w-md p-8 rounded-2xl shadow-lg border">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            Access Secure Portal
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Synchronize schedules, pay, and manage healthcare
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div>
            <Label>Email Address</Label>

            <div className="flex items-center border rounded-xl px-3 py-2 bg-white">
              <At size={16} className="text-gray-400" />

              <Input
                type="email"
                placeholder="khadija@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-0 outline-none w-full"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <Label>Secure Passkey</Label>

            <div className="flex items-center border rounded-xl px-3 py-2 bg-white">
              <ShieldKeyhole size={16} className="text-gray-400" />

              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-0 outline-none w-full"
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-[#132573] text-white font-semibold rounded-xl h-12"
          >
            Authorize Sign In
          </Button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-xs text-gray-400">
            OR GOOGLE SSO
          </span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <Button
          onClick={handleGoogle}
          variant="bordered"
          className="w-full h-12 rounded-xl"
        >
          <img
            src="https://www.google.com/favicon.ico"
            className="w-5 h-5"
          />
          <span className="ml-2">
            Authorize with Google
          </span>
        </Button>

        {/* FOOTER */}
        <p className="text-center text-sm mt-5">
          Donot have a healthcare profile?{" "}
          <a href="/register" className="text-[#132573] font-semibold">
            Create personal account
          </a>
        </p>

      </Card>
    </div>
    </div>
  );
}