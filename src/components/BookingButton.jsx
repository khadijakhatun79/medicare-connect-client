"use client";

import { useEffect, useState } from "react";
import { Button, Modal } from "@heroui/react";
import toast from "react-hot-toast";

export default function AppointmentBooking({ doctor }) {
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    agree: false,
    doctor: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  /* ================= AUTO FILL ================= */
  useEffect(() => {
    if (!doctor?.doctorName) return;

    setForm((prev) => ({
      ...prev,
      doctor: doctor.doctorName,
    }));
  }, [doctor]);

  return null;
}

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      toast.error("Please fill required fields");
      return;
    }

    if (!form.agree) {
      toast.error("You must agree to terms");
      return;
    }

    try {
      /* ================= TOKEN ================= */
      const token = localStorage.getItem("token");

      /* ================= 1. CREATE APPOINTMENT ================= */
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            doctorId: doctor._id,
            doctorName: doctor.doctorName,
            patientName: form.name,
            email: form.email,
            message: form.message,
            status: "pending",
            paymentStatus: "unpaid",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error("Appointment failed");
        return;
      }

      const appointmentId = data.insertedId || data._id;

      /* ================= 2. STRIPE CHECKOUT ================= */
      const paymentRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appointmentId,
            doctorName: doctor.doctorName,
            fee: doctor.consultationFee,
          }),
        }
      );

      const paymentData = await paymentRes.json();

      if (paymentData?.url) {
        window.location.href = paymentData.url;
      } else {
        toast.error("Payment session failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>

      {/* BUTTON */}
      <Button
        className="bg-[#132573] text-white font-bold px-6 py-3 w-full"
        onPress={openModal}
      >
        Book Appointment
      </Button>

      {/* MODAL (SAFE VERSION) */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <div className="p-6 bg-white rounded-2xl max-w-md mx-auto">

          {/* HEADER */}
          <div className="mb-4">
            <h2 className="text-2xl font-black">
              Book Appointment
            </h2>
            <p className="text-sm text-gray-500">
              Fill form to continue payment
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Patient Name"
              className="border p-3 rounded-xl w-full"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-3 rounded-xl w-full"
            />

            <input
              name="doctor"
              value={form.doctor}
              readOnly
              className="border p-3 rounded-xl w-full bg-gray-100"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              className="border p-3 rounded-xl w-full"
              rows={4}
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              I agree to Terms & Privacy Policy
            </label>

            <Button
              type="submit"
              className="w-full bg-[#132573] text-white font-bold"
            >
              Continue to Payment
            </Button>

          </form>

          {/* CLOSE */}
          <Button
            variant="light"
            onPress={closeModal}
            className="mt-3 w-full"
          >
            Close
          </Button> 

        </div>
      </Modal>

    </div>
  );
