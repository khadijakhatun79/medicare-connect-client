"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="relative bg-[url('/assets/breadcumb-bg.jpg')] bg-cover bg-center pt-32 pb-32 mb-6">

        {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2159]/70 to-[#1A2159]/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

        {/* Breadcrumb */}
        <div className="flex items-center justify-center flex-wrap gap-2 text-white text-sm md:text-base font-medium">

          {/* Home */}
          <Link
            href="/"
            className="text-white hover:text-white transition"
          >
            Home
          </Link>

          {/* Dynamic paths */}
          {pathSegments.map((segment, index) => {
            const href =
              "/" + pathSegments.slice(0, index + 1).join("/");

            const isLast = index === pathSegments.length - 1;

            return (
              <div key={href} className="flex items-center gap-2">

                <span className="text-white">/</span>

                <Link
                  href={href}
                  className={`capitalize transition ${
                    isLast
                      ? "text-white font-semibold text-base md:text-lg"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {segment.replace(/-/g, " ")}
                </Link>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Breadcrumb;