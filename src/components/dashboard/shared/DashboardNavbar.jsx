"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import { Bars } from "@gravity-ui/icons";

import ProfileDropdown from "@/components/shared/ProfileDropdown";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import NavLink from "@/components/shared/NavLink";

const DashboardNavbar = ({ user,permissions }) => {
  const role = user?.role ?? "user";
  const [open, setOpen] = useState(false);
  const router = useRouter();

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

  const handleLogOut = async () => {
    await authClient.signOut();
    toast.success("Logout successfully!");
    router.push("/login");
  };

  return (
    <div className="navbar bg-[#F0FDF4] border-b border-emerald-100 shadow-sm px-4 py-2 flex items-center justify-between w-full">
    
      <div className="flex items-center gap-3">
        <Button
          className="md:hidden bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 min-w-10 h-10"
          variant="flat"
          isIconOnly
          onPress={() => setOpen(true)}
        >
          <Bars />
        </Button>
        <h2 className="text-lg md:text-xl font-semibold text-emerald-950 capitalize">
          {role ? role : "Admin"} Dashboard
        </h2>
      </div>

      
      <div className="flex gap-3">
        <ProfileDropdown
          handleLogOut={handleLogOut}
          image={user?.image}
          name={user?.name}
          email={user?.email}
          role={user?.role}
        />
      </div>

    
      <Drawer isOpen={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left" className="max-w-64">
            <Drawer.Dialog className="bg-emerald-950 border-r border-emerald-800/40">
              <Drawer.CloseTrigger className="text-emerald-300 hover:text-white" />

              <Drawer.Header>
                <Drawer.Heading className="text-2xl font-bold text-white tracking-wide">
                  Nogor<span className="text-emerald-400">Bondhu</span>
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{NavList}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
};

export default DashboardNavbar;