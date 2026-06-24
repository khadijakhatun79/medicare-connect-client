"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

export default function DoctorPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    diagnosis: "",
    medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
    notes: "",
    followUpDate: "",
  });

  useEffect(() => {
    fetchPrescriptions();
    fetchCompletedAppointments();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/prescriptions/doctor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (data.success) {
        setPrescriptions(data.data);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompletedAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/doctor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (data.success) {
        const completed = data.data.filter(
          (a) => a.appointmentStatus === "Completed",
        );
        setAppointments(completed);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleMedicationChange = (index, field, value) => {
    const updated = [...formData.medications];
    updated[index][field] = value;
    setFormData({ ...formData, medications: updated });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        { name: "", dosage: "", frequency: "", duration: "" },
      ],
    });
  };

  const removeMedication = (index) => {
    if (formData.medications.length > 1) {
      const updated = formData.medications.filter((_, i) => i !== index);
      setFormData({ ...formData, medications: updated });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAppointment || !formData.diagnosis) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/prescriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentId: selectedAppointment,
            diagnosis: formData.diagnosis,
            medications: formData.medications,
            notes: formData.notes,
            followUpDate: formData.followUpDate,
          }),
        },
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Prescription created successfully");
        setShowForm(false);
        setFormData({
          diagnosis: "",
          medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
          notes: "",
          followUpDate: "",
        });
        fetchPrescriptions();
      } else {
        toast.error(data.message || "Failed to create prescription");
      }
    } catch (error) {
      toast.error("Error creating prescription");
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
                Prescriptions
              </h1>
              <p className="text-gray-600">Manage patient prescriptions</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary"
            >
              {showForm ? "Cancel" : "+ New Prescription"}
            </button>
          </div>

          {/* Create Prescription Form */}
          {showForm && (
            <div className="card mb-8">
              <h2 className="text-xl font-bold mb-4">Create Prescription</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Appointment
                  </label>
                  <select
                    value={selectedAppointment}
                    onChange={(e) => setSelectedAppointment(e.target.value)}
                    className="input"
                    required
                  >
                    <option value="">Select completed appointment</option>
                    {appointments.map((app) => (
                      <option key={app.id} value={app.id}>
                        {app.patientName} -{" "}
                        {new Date(app.appointmentDate).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                  {appointments.length === 0 && (
                    <p className="text-sm text-yellow-600 mt-1">
                      No completed appointments available
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Diagnosis *
                  </label>
                  <textarea
                    value={formData.diagnosis}
                    onChange={(e) =>
                      setFormData({ ...formData, diagnosis: e.target.value })
                    }
                    className="input"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Medications
                  </label>
                  {formData.medications.map((med, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2 p-3 bg-gray-50 rounded"
                    >
                      <input
                        placeholder="Medicine name"
                        value={med.name}
                        onChange={(e) =>
                          handleMedicationChange(index, "name", e.target.value)
                        }
                        className="input"
                      />
                      <input
                        placeholder="Dosage"
                        value={med.dosage}
                        onChange={(e) =>
                          handleMedicationChange(
                            index,
                            "dosage",
                            e.target.value,
                          )
                        }
                        className="input"
                      />
                      <input
                        placeholder="Frequency"
                        value={med.frequency}
                        onChange={(e) =>
                          handleMedicationChange(
                            index,
                            "frequency",
                            e.target.value,
                          )
                        }
                        className="input"
                      />
                      <div className="flex gap-1">
                        <input
                          placeholder="Duration"
                          value={med.duration}
                          onChange={(e) =>
                            handleMedicationChange(
                              index,
                              "duration",
                              e.target.value,
                            )
                          }
                          className="input flex-1"
                        />
                        {formData.medications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMedication(index)}
                            className="btn btn-danger text-sm px-2"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMedication}
                    className="btn btn-outline text-sm"
                  >
                    + Add Medication
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="input"
                    rows="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={formData.followUpDate}
                    onChange={(e) =>
                      setFormData({ ...formData, followUpDate: e.target.value })
                    }
                    className="input"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Create Prescription
                </button>
              </form>
            </div>
          )}

          {/* Prescriptions List */}
          {prescriptions.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">💊</div>
              <h3 className="text-xl font-bold text-gray-800">
                No Prescriptions
              </h3>
              <p className="text-gray-600 mt-2">
                You haven't created any prescriptions yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{prescription.patientName}</h3>
                      <p className="text-sm text-gray-600">
                        Diagnosis: {prescription.diagnosis}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(prescription.createdAt).toLocaleDateString()}
                      </p>
                      {prescription.followUpDate && (
                        <p className="text-sm text-blue-600">
                          Follow-up:{" "}
                          {new Date(
                            prescription.followUpDate,
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <button className="text-blue-500 hover:text-blue-700">
                      View Details
                    </button>
                  </div>

                  {prescription.medications &&
                    prescription.medications.length > 0 && (
                      <div className="mt-3">
                        <p className="font-semibold text-sm">Medications:</p>
                        <ul className="text-sm text-gray-600">
                          {prescription.medications.map((med, i) => (
                            <li key={i}>
                              • {med.name} - {med.dosage} ({med.frequency}) for{" "}
                              {med.duration}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {prescription.notes && (
                    <p className="mt-2 text-sm text-gray-500">
                      Notes: {prescription.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
