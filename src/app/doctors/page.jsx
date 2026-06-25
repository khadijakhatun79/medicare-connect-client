export const dynamic = "force-dynamic";
import Breadcrumb from "@/components/Breadcrumb";
import DoctorsCard from "@/components/DoctorsCard";
import { fetchDoctors } from "@/lib/doctors/data";
import { Button } from "@heroui/react";
import { Filter, Search } from "lucide-react";


const DoctorsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const search =
    typeof params?.search === "string"
      ? params.search
      : "";

   const doctors = await fetchDoctors(search);

     const uniqueDoctors = Array.from(
    new Map(doctors?.map((doctor) => [doctor._id, doctor])).values()
  );
  

  return (
    <div className="min-h-screen bg-[#F7FAF8] w-full overflow-x-hidden">
      <Breadcrumb title="Doctors" />

      <main className="max-w-7xl mx-auto px-4 py-16 w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#163B33]">
            Our Clinicians Catalogue
          </h1>

          <p className="text-gray-500 mt-3 text-base md:text-lg">
            Find professional guidance, sort by experience,
            highest rating, or browse by medical specialties.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="bg-white border rounded-3xl p-6 shadow-sm mb-10 w-full">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search doctor..."
                defaultValue={search}
                className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#205A44] bg-gray-50 text-sm text-gray-700"
              />
            </div>

            <select className="border rounded-xl px-4 py-3 bg-gray-50 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#205A44]">
              <option>All Specializations</option>
            </select>

            <select className="border rounded-xl px-4 py-3 bg-gray-50 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#205A44]">
              <option>Fee: Low to High</option>
              <option>Fee: High to Low</option>
              <option>Highest Rated</option>
              <option>Most Experienced</option>
            </select>

            <Button
              type="submit"
              className="bg-[#132573] text-white font-medium py-3 rounded-xl hover:bg-[#184433] transition-colors"
              startContent={<Filter size={18} />}
            >
              Apply Filters
            </Button>
          </form>
        </div>

        {/* Doctors Grid */}
        {uniqueDoctors?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
            {uniqueDoctors.map((doctor) => (
              <DoctorsCard
                key={doctor._id?.toString()}
                doctor={doctor}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border p-20 text-center w-full">
            <div className="text-6xl mb-4">🩺</div>
            <h2 className="text-2xl font-bold text-gray-700">
              No Doctors Found
            </h2>
            <p className="text-gray-500 mt-2">
              Try changing your search criteria or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorsPage;