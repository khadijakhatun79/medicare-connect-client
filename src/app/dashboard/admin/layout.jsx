import Breadcrumb from "@/components/Breadcrumb";
import { DashboarAdminSidebar } from "@/components/DashboarAdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div>
     <Breadcrumb /> 
    <div className="flex min-h-screen bg-slate-50 max-w-7xl mx-auto ">
      <DashboarAdminSidebar />

      <main className="flex-1 p-6"> 
        {children}
      </main>
    </div>
    </div>
  );
}