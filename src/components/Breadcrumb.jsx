"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = ({ title }) => {
  const pathname = usePathname();

  const pathSegments = pathname
    .split("/")
    .filter(Boolean);

  return (
    <div className="relative bg-[url('/assets/breadcumb-bg.jpg')] bg-cover bg-center min-h-[445px] pt-[150px] pb-[70px]">

      {/* Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(-90deg,transparent_25%,#132573_55.11%)]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center h-full">

        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          {title ||
            pathSegments[pathSegments.length - 1]
              ?.replace(/-/g, " ")}
        </h1>

        {/* Breadcrumb */}
        <div className="flex items-center flex-wrap gap-2 text-white">

          <Link
            href="/"
            className="text-white/70 hover:text-white transition"
          >
            Home
          </Link>

          {pathSegments.map((segment, index) => {
            const href =
              "/" +
              pathSegments
                .slice(0, index + 1)
                .join("/");

            const isLast =
              index === pathSegments.length - 1;

            const text =
              isLast && title
                ? title
                : segment.replace(/-/g, " ");

            return (
              <div
                key={href}
                className="flex items-center gap-2"
              >
                <span className="text-white/50">
                  /
                </span>

                {isLast ? (
                  <span className="capitalize font-semibold text-white">
                    {text}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="capitalize text-white/70 hover:text-white transition"
                  >
                    {text}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Breadcrumb;