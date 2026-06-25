"use client";

import Link from "next/link";
import {
  LayoutSideContentLeft,
  Calendar,
  Person,
  House,
  ListUl,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";

export function DashboardDoctorSidebar() {
  const navItems = [
    {
      icon: House,
      href: "/dashboard/doctor",
      label: "Overview",
    },
    {
      icon: Calendar,
      href: "/dashboard/doctor/appointments",
      label: "Appointments",
    },
    {
      icon: ListUl,
      href: "/dashboard/doctor/prescriptions",
      label: "Prescriptions",
    },
    {
      icon: Person,
      href: "/dashboard/doctor/profile",
      label: "My Profile",
    },
  ];

  const navContent = (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-green-50"
        >
          <item.icon className="size-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 border-r bg-white p-5">
        <div className="mb-8 border-b pb-5">
          <h2 className="text-xl font-bold">
            MediCare Connect
          </h2>

          <p className="text-sm text-gray-500">
            Doctor Dashboard
          </p>
        </div>

        {navContent}
      </aside>

      {/* Mobile Sidebar */}
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
                  Doctor Dashboard
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}