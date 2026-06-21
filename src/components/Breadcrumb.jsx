"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="relative bg-[url('/assets/breadcumb-bg.jpg')] bg-cover bg-center min-h-[445px] pt-[150px] pb-[70px] mb-6">
      
      {/* Fixed Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(-90deg,transparent_25%,#132573_55.11%)]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

        {/* Breadcrumb Links */}
        <div className="flex items-center justify-center flex-wrap gap-2 text-white text-sm md:text-base font-medium">

          {/* Home */}
          <Link
            href="/"
            className="text-white/70 hover:text-white transition"
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
                <span className="text-white/50">/</span>

                <Link
                  href={href}
                  className={`capitalize transition ${
                    isLast
                      ? "text-white font-bold text-base md:text-xl pointer-events-none"
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