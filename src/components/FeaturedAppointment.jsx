import FeaturedCard from "./FeaturedCard";
import { fetchFeaturedAppointment } from "@/lib/appointment/data";

const FeaturedAppointments = async () => {
  let appointments = [];

  try {
    appointments = await fetchFeaturedAppointment();
  } catch (error) {
    console.error("Featured fetch error:", error);
    appointments = [];
  }

  return (
    <section className="py-24 bg-[#f4f6f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-center text-center gap-5 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Top Rated Doctors
            </h1>

            <p className="text-gray-500 mt-2 max-w-xl">
              Find highly experienced doctors trusted by thousands of patients
              for quality healthcare and expert consultation.
            </p>
          </div>
        </div>

        {/* Grid */}
        {Array.isArray(appointments) && appointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appointments.map((appointment) => (
              <FeaturedCard
                key={appointment?._id}
                appointment={appointment}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No featured doctors found
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedAppointments;