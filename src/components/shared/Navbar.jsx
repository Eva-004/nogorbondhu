'use client'
import Link from 'next/link';
import { Button, Dropdown, Label } from "@heroui/react";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

const Navbar = () => {
    return (
        <div className='bg-[#F0FDF4]  shadow-sm'>
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link href="/">Home</Link>
                            </li>

                            <li >
                                <Link href="">Reports</Link>
                                <ul className="p-2">
                                    <li>
                                        <Link href="/add-report">
                                            Report a Problem
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/reports">
                                            Reports
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <Link href="">Public Services</Link>
                                <ul className="p-2">
                                    <li>
                                        <Link href="/services">
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/announcements">
                                            Announcements
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <Link href="/about">About</Link>
                            </li>
                            <li className="mt-2 pt-2 border-t border-base-200 sm:hidden">
                                <Link
                                    href="/login"
                                    className="btn btn-sm bg-gradient-to-r from-[#059669] to-[#047857] text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg"
                                >
                                    Login <FaArrowRight />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Image src={'/images/logo.jpeg'} alt="logo" width={40} height={40} className="object-cover" />
                        <Link href={'/'} className="btn btn-ghost text-xl text-[#047857] font-semibold">NogorBondhu</Link>
                    </div>

                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-[ #475569]">
                        <li className='hover:bg-[#059669] hover:text-white hover:font-bold'>
                            <Link href="/">Home</Link>
                        </li>

                        <li>
                            <Dropdown>
                                <Dropdown.Trigger className='hover:bg-[#059669] hover:text-white hover:font-bold'>
                                    <span>Reports</span><RiArrowDropDownLine size={24} />
                                </Dropdown.Trigger>
                                <Dropdown.Popover>
                                    <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                                        <Dropdown.Item id="new-file" textValue="New file">
                                            <Label><Link href="/add-report">
                                                Report a Problem
                                            </Link></Label>
                                        </Dropdown.Item>
                                        <Dropdown.Item id="copy-link" textValue="Copy link">
                                            <Label><Link href="/reports">
                                                Reports
                                            </Link></Label>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        </li>

                        <li>
                            <Dropdown>
                                <Dropdown.Trigger className='hover:bg-[#059669] hover:text-white hover:font-bold'>
                                    <span>Public Services</span><RiArrowDropDownLine size={24} />
                                </Dropdown.Trigger>
                                <Dropdown.Popover>
                                    <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                                        <Dropdown.Item id="new-file" textValue="New file">
                                            <Label><Link href="/services">
                                                Services
                                            </Link></Label>
                                        </Dropdown.Item>
                                        <Dropdown.Item id="copy-link" textValue="Copy link">
                                            <Label><Link href="/announcements">
                                                Announcements
                                            </Link></Label>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        </li>

                        <li className='hover:bg-[#059669] hover:text-white hover:font-bold'>
                            <Link href="/about">About</Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end hidden sm:flex">
                    <Link href="/login" className="btn bg-gradient-to-r from-[#059669] to-[#047857] text-white font-bold hover:shadow-2xl hover:zoom-90">
                        Login <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;