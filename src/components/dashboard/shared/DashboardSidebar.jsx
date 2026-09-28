"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NavLink from "@/components/shared/NavLink";

export default function DashboardSidebar({ role }) {
  const [open, setOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/roles/${role}`
      );

      const data = await res.json();

      setPermissions(data.permissions || []);
    };

    fetchPermissions();
  }, [role]);

  const NavList = (
    <>
      <nav className="flex flex-col gap-1">
        {permissions.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="flex items-center text-emerald-100 gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 hover:bg-emerald-800/60 hover:text-white"
          >
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

            <h1 className="text-2xl font-bold text-white">
              NogorBondhu
            </h1>
          </div>

          {NavList}
        </div>
      </div>
    </>
  );
}