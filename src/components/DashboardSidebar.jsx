"use client";

import Link from "next/link";
import {
  LayoutSideContentLeft,
  Calendar,
  CreditCard,
  Star,
  Heart,
  Person,
  House,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

export function DashboardSidebar() {
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
      icon: Heart,
      href: "/dashboard/patient/favorites",
      label: "Favorite Doctors",
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
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-green-50"
        >
          <item.icon className="size-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block w-72 shrink-0 border-r bg-white p-5">
        <div className="mb-8 border-b pb-5">
          <h2 className="text-xl font-bold">
            MediCare Connect
          </h2>
          <p className="text-sm text-gray-500">
            Patient Dashboard
          </p>
        </div>

        {navContent}
      </aside>

      <Drawer>
        <Button className="lg:hidden">
          <LayoutSideContentLeft />
          Menu
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>
                  Patient Dashboard
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}