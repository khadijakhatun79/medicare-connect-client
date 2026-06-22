import FeaturedCard from "./FeaturedCard";
import { fetchFeaturedAppointment } from "@/lib/appointment/data";

const FeaturedDoctors = async () => {
  let doctors = [];

  try {
    doctors = await fetchFeaturedAppointment();
  } catch (error) {
    console.error("Featured fetch error:", error);
    doctors = [];
  }

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Meet Our Featured Doctors
          </h1>

          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Empathetic bedside manners paired with outstanding academic qualifications.
          </p>
        </div>

        {/* Grid */}
        {Array.isArray(doctors) && doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <FeaturedCard
                key={doctor._id}
                doctor={doctor}
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

export default FeaturedDoctors;