"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ href, children }) => {
    const pathName = usePathname();
    const isActive = href === pathName;
    return (
        <Link
            href={href}
            className={`${isActive
                    ? "border-b-2 border-[#006A4E] text-[#006A4E] dark:border-[#52B788] dark:text-[#52B788] font-bold"
                    : ""
                }`}
        >
            {children}
        </Link>
    );
};

export default NavLink;