import AppointmentCard from "@/components/AppointmentCard";
import AppointmentHeader from "@/components/AppointmentHeader";
import Breadcrumb from "@/components/Breadcrumb";
import { fetchAppointments } from "@/lib/appointment/data";

import { Button } from "@heroui/react";
import { Filter } from "lucide-react";

const AppointmentsPage = async ({ searchParams }) => {

 
  const params = await searchParams;

  const search = params?.search || "";

  const appointments = await fetchAppointments(search);

  return (
    <div className="min-h-screen bg-slate-50">

      <Breadcrumb />

      {/* Header */}
      <AppointmentHeader />

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center mb-12">

          <h2 className="text-2xl font-bold flex items-center gap-2">
            All Appointments
          </h2>

          <Button
            variant="flat"
            startContent={<Filter className="w-4 h-4" />}
            className="rounded-full font-bold"
          >
            Filters
          </Button>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {appointments?.length > 0 ? (
            appointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h2 className="text-2xl font-bold text-gray-600">
                No Doctor Found
              </h2>
            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default AppointmentsPage;