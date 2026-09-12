"use client";

import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, Gear } from "@gravity-ui/icons";
import { Avatar, Dropdown } from "@heroui/react";
import Link from "next/link";

const ProfileDropdown = ({ handleLogOut, image, name, email, role }) => {
  const userData = authClient.useSession();
  const user = userData?.data?.user;

  console.log(user);

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full cursor-pointer">
        <Avatar className="size-9 sm:size-10">
          <Avatar.Image
            alt={name}
            src={user?.image}
            className="object-cover"
          />
          <Avatar.Fallback delayMs={600}>
            {name?.[0]}
          </Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover className="w-[calc(100vw-2rem)] max-w-xs sm:w-80">
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/dashboard/profile"
              className="shrink-0"
            >
              <Avatar size="sm">
                <Avatar.Image
                  alt={name}
                  src={image}
                  className="object-cover"
                />
                <Avatar.Fallback delayMs={600}>
                  {name?.[0]}
                </Avatar.Fallback>
              </Avatar>
            </Link>

            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {name}
              </p>

              <p className="text-xs text-gray-500 truncate">
                {email}
              </p>
            </div>
          </div>
        </div>

        <Dropdown.Menu>
          <Dropdown.Item
            key="dashboard"
            href={`/dashboard/${role}`}
          >
            <div className="flex items-center gap-2">
              <Gear className="size-4 shrink-0" />
              <span>Dashboard</span>
            </div>
          </Dropdown.Item>

          <Dropdown.Item
            key="logout"
            color="danger"
            onClick={handleLogOut}
          >
            <div className="flex items-center justify-between w-full gap-2">
              <span>Log Out</span>

              <ArrowRightFromSquare className="size-4 shrink-0 text-red-500" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default ProfileDropdown;