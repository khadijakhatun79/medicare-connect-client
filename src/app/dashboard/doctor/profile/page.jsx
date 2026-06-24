"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

export default function DoctorProfile() {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    specialization: "",
    qualifications: [],
    experience: "",
    consultationFee: "",
    hospitalName: "",
    hospitalAddress: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDoctorProfile();
  }, []);

  const fetchDoctorProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (data.success) {
        setDoctor(data.data);
        setFormData({
          specialization: data.data.specialization || "",
          qualifications: data.data.qualifications || [],
          experience: data.data.experience || "",
          consultationFee: data.data.consultationFee || "",
          hospitalName: data.data.hospitalName || "",
          hospitalAddress: data.data.hospitalAddress || "",
        });
      }
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "qualifications") {
      setFormData({
        ...formData,
        qualifications: value.split(",").map((q) => q.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        fetchDoctorProfile();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute allowedRoles={["Doctor"]}>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Doctor Profile
              </h1>
              <p className="text-gray-600">
                Manage your professional information
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-primary"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="card">
            {!isEditing ? (
              // View Mode
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <img
                    src={
                      doctor?.profileImage ||
                      user?.photo ||
                      `https://ui-avatars.com/api/?name=${user?.name}&background=8B5CF6&color=fff&size=128`
                    }
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">Dr. {user?.name}</h2>
                    <p className="text-purple-500 font-semibold">
                      {doctor?.specialization}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        doctor?.verificationStatus === "Verified"
                          ? "bg-green-100 text-green-700"
                          : doctor?.verificationStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {doctor?.verificationStatus || "Pending"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-semibold">{doctor?.experience} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Consultation Fee</p>
                    <p className="font-semibold text-green-600">
                      ৳{doctor?.consultationFee}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hospital</p>
                    <p className="font-semibold">{doctor?.hospitalName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-semibold">
                      ⭐ {doctor?.rating || 0} ({doctor?.totalReviews || 0}{" "}
                      reviews)
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Qualifications</p>
                    <p className="font-semibold">
                      {doctor?.qualifications?.join(", ") || "N/A"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Hospital Address</p>
                    <p className="font-semibold">
                      {doctor?.hospitalAddress || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Specialization
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="ENT">ENT</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="General Medicine">General Medicine</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Qualifications (comma separated)
                  </label>
                  <input
                    type="text"
                    name="qualifications"
                    value={formData.qualifications.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualifications: e.target.value
                          .split(",")
                          .map((q) => q.trim()),
                      })
                    }
                    className="input"
                    placeholder="MBBS, MD, PhD"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="input"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Consultation Fee
                  </label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    className="input"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Hospital Address
                  </label>
                  <input
                    type="text"
                    name="hospitalAddress"
                    value={formData.hospitalAddress}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
