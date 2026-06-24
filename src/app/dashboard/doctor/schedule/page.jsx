"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

export default function DoctorSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    day: "Monday",
    startTime: "09:00",
    endTime: "17:00",
    isAvailable: true,
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/schedule`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (data.success) {
        setSchedule(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.day || !formData.startTime || !formData.endTime) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Schedule added successfully");
        setShowForm(false);
        setFormData({
          day: "Monday",
          startTime: "09:00",
          endTime: "17:00",
          isAvailable: true,
        });
        fetchSchedule();
      } else {
        toast.error(data.message || "Failed to add schedule");
      }
    } catch (error) {
      toast.error("Error adding schedule");
    }
  };

  const handleRemove = async (id) => {
    if (!confirm("Are you sure you want to remove this schedule?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/schedule/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        toast.success("Schedule removed");
        fetchSchedule();
      } else {
        toast.error("Failed to remove schedule");
      }
    } catch (error) {
      toast.error("Error removing schedule");
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute allowedRoles={["Doctor"]}>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Manage Schedule
              </h1>
              <p className="text-gray-600">
                Set your availability for appointments
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary"
            >
              {showForm ? "Cancel" : "+ Add Schedule"}
            </button>
          </div>

          {/* Add Schedule Form */}
          {showForm && (
            <div className="card mb-8">
              <h2 className="text-xl font-bold mb-4">Add New Schedule</h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Day</label>
                  <select
                    value={formData.day}
                    onChange={(e) =>
                      setFormData({ ...formData, day: e.target.value })
                    }
                    className="input"
                    required
                  >
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    className="input"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isAvailable}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isAvailable: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Available</span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <button type="submit" className="btn btn-primary w-full">
                    Add Schedule
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Schedule List */}
          {schedule.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-800">No Schedule</h3>
              <p className="text-gray-600 mt-2">
                Add your availability schedule
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedule.map((slot) => (
                <div key={slot.id || slot._id} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{slot.day}</h3>
                      <p className="text-gray-600">
                        {slot.startTime} - {slot.endTime}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                          slot.isAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {slot.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemove(slot.id || slot._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
