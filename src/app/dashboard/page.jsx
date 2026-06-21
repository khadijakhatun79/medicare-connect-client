// src/app/dashboard/page.jsx

import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import CancelBookingButton from "@/components/CancelBookingButton";
import UpdateBookingButton from "@/components/UpdateBookingButton";
import ProfileUpdateButton from "@/components/ProfileUpdateButton";

const fetchBookings = async (email, token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function DashboardPage() {

  // SESSION
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const token = session?.token;
  const user = session?.user;

  // GUEST SAFE BOOKINGS
  const bookings =
    user && token
      ? await fetchBookings(user.email, token)
      : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* TOP */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* PROFILE */}
        <div className="lg:w-[320px]">

          <div className="bg-white border rounded-3xl p-6 shadow-sm sticky top-24">

            <div className="text-center">

              <Image
                src={
                  user?.image ||
                  "https://i.ibb.co/2FsfXqM/user.png"
                }
                alt="profile"
                width={110}
                height={110}
                className="rounded-full mx-auto border-4 border-[#132573]/20"
              />

              <h2 className="text-2xl font-black mt-4">
                {user?.name || "Guest User"}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                {user?.email || "guest@example.com"}
              </p>

              {/* SHOW BUTTON ONLY IF LOGIN */}
              {user && (
                <div className="mt-4">
                  <ProfileUpdateButton user={user} />
                </div>
              )}

            </div>

            {/* STATS */}
            <div className="mt-8 space-y-3">

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-sm text-slate-500">
                  Total Bookings
                </span>

                <span className="font-black text-[#132573]">
                  {bookings.length}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-sm text-slate-500">
                  Status
                </span>

                <Chip
                  color={user ? "success" : "warning"}
                  size="sm"
                >
                  {user ? "Active" : "Guest"}
                </Chip>
              </div>

            </div>

          </div>
        </div>

        {/* BOOKINGS */}
        <div className="flex-1">

          {/* TITLE */}
          <div className="flex items-center justify-between mb-8">

            <div>
              <h1 className="text-4xl font-black">
                My Appointments
              </h1>

              <p className="text-slate-500 mt-1">
                Manage your doctor bookings
              </p>
            </div>

            <Link href="/appointments">
              <Button className="bg-[#132573] text-white font-bold">
                Browse Doctors
              </Button>
            </Link>

          </div>

          {/* EMPTY */}
          {bookings.length === 0 ? (
            <div className="border rounded-3xl p-16 text-center bg-slate-50">

              <h2 className="text-2xl font-black">
                No Appointments Found
              </h2>

              <p className="text-slate-500 mt-3 mb-6">
                You have not booked any appointments yet.
              </p>

              <Link href="/appointments">
                <Button className="bg-[#132573] text-white">
                  Book Appointment
                </Button>
              </Link>

            </div>
          ) : (
            <div className="space-y-5">

              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all"
                >

                  <div className="flex flex-col md:flex-row gap-5">

                    {/* IMAGE */}
                    <div className="relative w-full md:w-[180px] h-[180px] overflow-hidden rounded-2xl">

                      <Image
                        src={
                          booking.doctorImage ||
                          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200"
                        }
                        alt="doctor"
                        fill
                        className="object-cover"
                      />

                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 flex flex-col justify-between">

                      {/* TOP */}
                      <div>

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <h2 className="text-2xl font-black">
                              {booking.doctorName}
                            </h2>

                            <p className="text-slate-500 mt-1">
                              {booking.specialty}
                            </p>

                          </div>

                          <Chip color="success">
                            Confirmed
                          </Chip>

                        </div>

                        {/* INFO */}
                        <div className="grid sm:grid-cols-2 gap-4 mt-6">

                          <div className="p-4 rounded-2xl bg-slate-50">
                            <p className="text-xs text-slate-500 uppercase">
                              Appointment Time
                            </p>

                            <h3 className="font-bold mt-1">
                              {booking.appointmentTime}
                            </h3>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-50">
                            <p className="text-xs text-slate-500 uppercase">
                              Booking Date
                            </p>

                            <h3 className="font-bold mt-1">
                              {new Date(
                                booking.createdAt
                              ).toDateString()}
                            </h3>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-50">
                            <p className="text-xs text-slate-500 uppercase">
                              Patient Name
                            </p>

                            <h3 className="font-bold mt-1">
                              {booking.patientName}
                            </h3>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-50">
                            <p className="text-xs text-slate-500 uppercase">
                              Fee
                            </p>

                            <h3 className="font-bold mt-1 text-[#132573]">
                              ৳{booking.fee}
                            </h3>
                          </div>

                        </div>

                      </div>

                      {/* ACTIONS */}
                      <div className="flex flex-wrap gap-3 mt-6">

                        <UpdateBookingButton
                          booking={booking}
                        />

                        <CancelBookingButton
                          id={booking._id}
                        />

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}