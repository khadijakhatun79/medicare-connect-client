
import SearchBar from "./SearchBar";

const AppointmentHeader = () => {
  return (
  
    <header className="bg-white border-b py-16">

      <div className="max-w-7xl mx-auto px-4 text-center space-y-6">

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          Find Your{" "}
          <span className="bg-gradient-to-r from-[#132573] to-[#132573] bg-clip-text text-transparent">
            Doctor
          </span>{" "}
          Appointment
        </h1>

        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Search and book appointments with top-rated doctors in Bangladesh.
        </p>

        <div className="max-w-2xl mx-auto pt-4">
          <SearchBar />
        </div>

      </div>
    </header>
  );
};

export default AppointmentHeader;