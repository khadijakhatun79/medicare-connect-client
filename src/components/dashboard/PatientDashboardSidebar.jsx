"use client";

import {
  Calendar,
  Star,
  Person,
  CreditCard,
  House,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { LayoutSideContentLeft } from "@gravity-ui/icons";
import Link from "next/link";

export function PatientDashboardSidebar() {
  const navItems = [
    {
      icon: House,
      href: "/dashboard/patient",
      label: "Overview",
    },
    {
      icon: Calendar,
      href: "/dashboard/patient/appointments",
      label: "My Appointments",
    },
    {
      icon: CreditCard,
      href: "/dashboard/patient/payments",
      label: "Payment History",
    },
    {
      icon: Star,
      href: "/dashboard/patient/reviews",
      label: "My Reviews",
    },
    {
      icon: Person,
      href: "/dashboard/patient/profile",
      label: "My Profile",
    },
  ];

  const navContent = (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all"
        >
          <item.icon className="size-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 border-r bg-white p-5 flex-col">
        {/* User Info */}
        <div className="mb-8 flex items-center gap-3 border-b pb-5">
          <img
            src="/avatar.png"
            alt="Patient"
            className="h-14 w-14 rounded-full object-cover"
          />

          <div>
            <h3 className="font-bold text-lg">Sarah Jenkins</h3>

            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Patient
            </span>
          </div>
        </div>

        {navContent}
      </aside>

      {/* Mobile Drawer */}
      <Drawer>
        <Button className="lg:hidden" variant="flat">
          <LayoutSideContentLeft />
          Menu
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading>Patient Dashboard</Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}