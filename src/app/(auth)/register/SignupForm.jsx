"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
    photo: "", 
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password) {
      return setError("All required fields are required");
    }

    if (!passwordRegex.test(form.password)) {
      return setError(
        "Password must be 6+ chars with 1 number & 1 special character"
      );
    }

    setLoading(true);

    try {
      const { error: authError } = await signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.photo || "",
        role: form.role,
        gender: form.gender,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          createdAt: new Date(),
        }),
      });

      setSuccess("Account created successfully!");

      setTimeout(() => router.push("/"), 800);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 px-4">

      <Card className="w-full max-w-[520px] p-8 rounded-3xl border shadow-sm">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#163a33]">
            Create Medical Profile
          </h1>
          <p className="text-sm text-zinc-500">
            Join verified healthcare system
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">

          {/* NAME */}
          <TextField>
            <Label>Full Name</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Dr. Sarah Johnson"
            />
          </TextField>

          {/* EMAIL */}
          <TextField>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="sarah@email.com"
            />
          </TextField>

          {/* PASSWORD WITH EYE ICON */}
          <TextField>
            <Label>Password</Label>

            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Secure password"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </TextField>

          {/* ROLE */}
          <TextField>
            <Label>Role</Label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </TextField>

          {/* GENDER */}
          <TextField>
            <Label>Gender</Label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </TextField>

          {/* PHOTO */}
          <TextField>
            <Label>Photo URL (optional)</Label>
            <Input
              name="photo"
              value={form.photo}
              onChange={handleChange}
              placeholder="https://..."
            />
          </TextField>

          {/* ERROR */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* SUCCESS */}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          {/* SUBMIT */}
          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-[#1f5c4d] text-white font-semibold py-3 rounded-xl"
          >
            Create Account
          </Button>

          {/* FOOTER */}
          <p className="text-center text-sm text-zinc-500">
            Already have account?{" "}
            <Link href="/login" className="font-semibold text-black">
              Login
            </Link>
          </p>

        </form>
      </Card>
    </div>
  );
}