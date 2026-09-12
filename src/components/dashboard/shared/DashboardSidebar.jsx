"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import {
  FaUsers,
  FaBuilding,
  FaBullhorn,
  FaCog,
  FaFileAlt,
} from "react-icons/fa";
import NavLink from "@/components/shared/NavLink";

export default function DashboardSidebar({ role }) {

  const [open, setOpen] = useState(false);

  const dashboardItems = {
    admin: [
      { icon: RxDashboard, label: "Overview", href: "/dashboard/admin" },

      {
        icon: FaFileAlt,
        label: "Issue & Report Management",
        href: "/dashboard/admin/issue-report-management",
      },

      {
        icon: FaUsers,
        label: "Citizen & User Management",
        href: "/dashboard/admin/citizen-user-management",
      },

      {
        icon: FaBuilding,
        label: "Department & Authority Management",
        href: "/dashboard/admin/department-authority-management",
      },

      {
        icon: FaBullhorn,
        label: "Public Announcements & Notices",
        href: "/dashboard/admin/public-announcements-notices",
      },

      {
        icon: FaCog,
        label: "System Settings & Logs",
        href: "/dashboard/admin/system-settings-logs",
      },
    ],
  };

  const navItems = dashboardItems[role] || dashboardItems.admin;

  const NavList = (
    <>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            className="flex items-center text-emerald-100 gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 hover:bg-emerald-800/60 hover:text-white"
          >
            <item.icon className="size-5 text-white" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      <div className="hidden md:flex bg-[#047857] w-60 border-r border-emerald-800/40 min-h-screen">
        <div className="w-full p-3">

          <div className="flex items-center gap-3 mb-6 px-1">
            <Image
              src="/images/logo.jpeg"
              width={30}
              height={30}
              alt="logo"
              className="rounded-full ring-2"
            />
            <h1 className="text-2xl font-bold text-white ">
              NogorBondhu
            </h1>
          </div>

          {NavList}
        </div>
      </div>
    </>
  );
}