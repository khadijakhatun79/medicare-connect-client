
import AppointmentBooking from '@/components/AppointmentBooking';
import FeaturedAppointment from '@/components/FeaturedDoctors';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import Testimonial from '@/components/Testimonial';
import About from '@/components/About';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Hero />
      <Features />
      <About></About>
     
       <FeaturedAppointment></FeaturedAppointment> 
      <AppointmentBooking></AppointmentBooking>
      <Testimonial></Testimonial>
    </div>
  );
}
