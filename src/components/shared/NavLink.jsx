"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ href, children }) => {
    const pathName = usePathname();
    const isActive = href === pathName;
    if (pathName.includes("dashboard")) {
        return (
        <Link
            href={href}
            className={`${isActive
                    ? "flex items-center border-b-2 border-white text-emerald-100 gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200"
                    : "flex items-center text-emerald-100 gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 hover:bg-emerald-800/60 hover:text-white"
                }`}
        >
            {children}
        </Link>
    );
    }
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