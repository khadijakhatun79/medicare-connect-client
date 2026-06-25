import Breadcrumb from "@/components/Breadcrumb";
import { DashboardDoctorSidebar } from "@/components/DashboardDoctorSidebar";

export default function DoctorLayout({ children }) {
  return (
    <div>
     <Breadcrumb /> 
    <div className="flex min-h-screen bg-slate-50 max-w-7xl mx-auto ">
      <DashboardDoctorSidebar />

      <main className="flex-1 p-6"> 
        {children}
      </main>
    </div>
    </div>
  );
}