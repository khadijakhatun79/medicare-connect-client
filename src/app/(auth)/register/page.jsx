"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Link,
  TextField,
  Label,
  InputGroup,
  Input,
  Radio,
  RadioGroup,
} from "@heroui/react";

import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";

import { signUp } from "@/lib/auth-client";
import Breadcrumb from "@/components/Breadcrumb";

export default function SignupPage() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");

  // UI state
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Password validation
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // validation
      if (!name || !email || !password) {
        setError("All required fields must be filled.");
        setIsLoading(false);
        return;
      }

      if (!passwordRegex.test(password)) {
        setError(
          "Password must be 6+ chars with 1 number & 1 special character"
        );
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      // Auth signup
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        image: photo,
        role,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Signup failed");
        setIsLoading(false);
        return;
      }

      // Save user in DB (IMPORTANT for your assignment)
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          photo,
          role,
          status: role === "doctor" ? "pending" : "active",
          createdAt: new Date(),
        }),
      });

      setSuccess("Account created successfully!");

      // reset
      setName("");
      setEmail("");
      setPhoto("");
      setPassword("");
      setConfirmPassword("");
      setRole("patient");
    } catch (err) {
      setError("Unexpected error occurred. Try again.");
    } finally {
      setIsLoading(false);
    }
  };
  <Breadcrumb></Breadcrumb>

  return (
    <div>
    <Breadcrumb />
    
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      
      <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

        {/* Header */}
        <div className="text-center pb-5 border-b mb-5">
          <h1 className="text-2xl font-semibold">
            Create Account
          </h1>
          <p className="text-sm text-gray-500">
            Join MediCare Connect
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">

          {/* Name */}
          <TextField isRequired>
            <Label>Name</Label>
            <InputGroup>
              <Person size={16} />
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </TextField>

          {/* Email */}
          <TextField isRequired>
            <Label>Email</Label>
            <InputGroup>
              <At size={16} />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </TextField>

          {/* Photo */}
          <TextField>
            <Label>Photo URL</Label>
            <Input
              type="url"
              placeholder="https://..."
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </TextField>

          {/* Password */}
          <TextField isRequired>
            <Label>Password</Label>
            <InputGroup>
              <ShieldKeyhole size={16} />
              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? <EyeSlash /> : <Eye />}
              </button>
            </InputGroup>
          </TextField>

          {/* Confirm Password */}
          <TextField isRequired>
            <Label>Confirm Password</Label>
            <Input
              type={isVisible ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </TextField>

          {/* Role */}
          <div className="flex flex-col gap-4"> 
                        <RadioGroup defaultValue="patient" name="rule" onChange={value => setRole(value)} orientation="horizontal">
                            <Radio selected value="patient">
                            <Radio.Control>
                                <Radio.Indicator />
                            </Radio.Control>
                            <Radio.Content>
                                <Label>Patient</Label>
                            </Radio.Content>
                            </Radio>
                            <Radio value="doctor">
                            <Radio.Control>
                                <Radio.Indicator />
                            </Radio.Control>
                            <Radio.Content>
                                <Label>Doctor</Label>
                            </Radio.Content>
                            </Radio>
                           
                        </RadioGroup>
                        </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Success */}
          {success && (
            <p className="text-green-500 text-sm">{success}</p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
            color="primary"
          >
            Create Account
          </Button>

          {/* Login link */}
          <p className="text-center text-sm">
            Already have account?{" "}
            <Link href="/login">Login</Link>
          </p>

        </form>
      </Card>
    </div>

    </div>
  );
}