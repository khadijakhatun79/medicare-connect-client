"use client";

import { useState } from "react";
import {
  Button,
  Modal,
} from "@heroui/react";

import toast from "react-hot-toast";
import { Phone, Play } from "lucide-react";

export default function AppointmentBooking() {
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    doctor: "",
    department: "",
    message: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.doctor) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!form.agree) {
      toast.error("You must agree to Terms & Privacy Policy");
      return;
    }

    toast.success("Appointment booked successfully!");

    setForm({
      name: "",
      email: "",
      location: "",
      doctor: "",
      department: "",
      message: "",
      agree: false,
    });

    closeModal();
  };

  return (
    <div className="">

      {/* OPEN BUTTON */}
      <div className="">
        <Button
          className="bg-[#132573] text-white font-bold px-6 py-3"
          onPress={openModal}
        >
          Book Appointment
        </Button>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[600px]">

              {/* HEADER */}
              <Modal.Header>
                <div>
                  <h2 className="text-2xl font-black">
                    Book Appointment
                  </h2>
                  <p className="text-sm text-gray-500">
                    Fill the form to get expert consultation
                  </p>
                </div>
              </Modal.Header>

              {/* BODY */}
              <Modal.Body>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >

                  {/* NAME + EMAIL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      name="name"
                      value={form.name}
                      placeholder="Patient Name"
                      onChange={handleChange}
                      className="border p-3 rounded-xl w-full"
                    />

                    <input
                      name="email"
                      value={form.email}
                      placeholder="Email"
                      onChange={handleChange}
                      className="border p-3 rounded-xl w-full"
                    />
                  </div>

                  {/* DOCTOR */}
                  <select
                    name="doctor"
                    value={form.doctor}
                    onChange={handleChange}
                    className="border p-3 rounded-xl w-full"
                  >
                    <option value="">Choose Doctor</option>
                    <option>Dr. Rahman</option>
                    <option>Dr. Sultana</option>
                    <option>Dr. Karim</option>
                  </select>

                  {/* MESSAGE */}
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write message..."
                    className="border p-3 rounded-xl w-full"
                    rows={4}
                  />

                  {/* CHECKBOX */}
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                    />
                    I agree to Terms & Privacy Policy
                  </label>

                  {/* SUBMIT */}
                  <Button
                    type="submit"
                    className="w-full bg-[#132573] text-white font-bold"
                  >
                    Make Appointment
                  </Button>

                </form>
              </Modal.Body>

              {/* FOOTER */}
              <Modal.Footer>
                <Button
                  variant="light"
                  onPress={closeModal}
                >
                  Close
                </Button>
              </Modal.Footer>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

    </div>
  );
}