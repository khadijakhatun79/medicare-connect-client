import Breadcrumb from "@/components/Breadcrumb";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function PatientLayout({ children }) {
  return (
    <div>
     <Breadcrumb /> 
    <div className="flex min-h-screen bg-slate-50 max-w-7xl mx-auto ">
      <DashboardSidebar />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
    </div>
  );
}