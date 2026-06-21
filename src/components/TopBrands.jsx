"use client";

const brands = [
  {
    name: "Nike",
    logo: "/assets/brand_1_1.svg"
  },
  
  {
    name: "Zara",
    logo: "/assets/brand_1_2.svg"
  },
  {
    name: "H&M",
    logo: "/assets/brand_1_3.svg"
  },
 
  {
    name: "Uniqlo",
    logo: "/assets/brand_1_4.svg"
  },
    {
    name: "Adidas",
    logo: "/assets/brand_1_5.svg"
  },
  {
    name: "H&M",
    logo: "/assets/brand_1_3.svg"
  },
 
  {
    name: "Uniqlo",
    logo: "/assets/brand_1_4.svg"
  },
 
    {
    name: "Adidas",
    logo: "/assets/brand_1_5.svg"
  }
];

const TopBrands = () => {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-8xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Trusted by Top Brands
          </h2>
          <p className="text-gray-500 mt-2">
            Global brands you love & trust
          </p>
        </div>

        {/* Brand Strip */}
        <div className="relative overflow-hidden brand-mask">

          <div className="flex gap-20 items-center animate-marquee w-max">

            {[...brands, ...brands].map((brand, i) => (
              <img
                key={i}
                src={brand.logo}
                alt={brand.name}
                className="h-10 md:h-12 w-auto transition duration-300"
              />
            ))}

          </div>

        </div>

      </div>

      {/* Styles */}
      <style jsx>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .brand-mask {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
      `}</style>

    </section>
  );
};

export default TopBrands;