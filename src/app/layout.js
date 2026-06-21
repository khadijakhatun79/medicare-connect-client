import { Jost } from "next/font/google";
import "./globals.css";
import { MainNavbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});
 
export const metadata = {
  title: {
    default:
      "MediCare Connect — Hospital Appointment & Healthcare Management System",
    template: "%s | MediCare Connect",
  },
  description:
    "A Doctor Appointment Booking System where users can browse available doctors, view details, and book appointments. Users can manage bookings, reviews, and profiles using secure authentication.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jost.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col text-slate-900 font-sans">
              <MainNavbar />
        <main className="grow">{children}</main> 
         <Footer />
        <Toaster />
        
      </body>
    </html>
  );
}