"use client";

import Link from "next/link";
import {
  LayoutSideContentLeft,
  House,
  Person,
  Calendar,
  CreditCard,
  Star,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

export function DashboarAdminSidebar () {
  const navItems = [
    {
      icon: House,
      href: "/dashboard/admin",
      label: "Overview",
    },
    {
      icon: Person,
      href: "/dashboard/admin/users",
      label: "Manage Users",
    },
    {
      icon: Person,
      href: "/dashboard/admin/doctors",
      label: "Manage Doctors",
    },
    {
      icon: Calendar,
      href: "/dashboard/admin/appointments",
      label: "Appointments",
    },
    {
      icon: CreditCard,
      href: "/dashboard/admin/payments",
      label: "Payments",
    },
    {
      icon: Star,
      href: "/dashboard/admin/analytics",
      label: "Analytics",
    },
    {
      icon: Person,
      href: "/dashboard/admin/profile",
      label: "admin Profile",
    },
  ];

  const navContent = (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-blue-50"
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
            Admin Dashboard
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
                  Admin Dashboard
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