import { Award, Clock, Users, ShieldCheck } from "lucide-react";

const ChooseSection = () => {
  const items = [
    {
      icon: Users,
      title: "Expert Doctors",
      desc: "Highly qualified and experienced medical professionals.",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      desc: "Get medical support anytime, anywhere without delay.",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Trusted",
      desc: "Secure booking system with verified doctors only.",
    },
    {
      icon: Award,
      title: "Best Care",
      desc: "We ensure top-quality healthcare for every patient.",
    },
  ];

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* TITLE */}
        <div className="text-center mb-16">
          <p className="text-[#132573] font-bold tracking-widest uppercase text-sm">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">
            Exceptional Care for Every Patient
          </h2>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            We provide trusted healthcare services with expert doctors,
            modern facilities, and 24/7 support.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1 border"
            >

              <div className="w-14 h-14 rounded-2xl bg-[#132573]/10 flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-[#132573]" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="text-slate-500 mt-2">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ChooseSection;