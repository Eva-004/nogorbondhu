import Image from 'next/image';
import Link from 'next/link';
import {
    FaHome,
    FaEdit,
    FaTasks,
    FaTrashAlt,
    FaGlobe,
    FaFileAlt,
    FaPhoneAlt,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaEnvelope,
    FaPhone
} from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-[#022213] text-[#d1e7dd] pt-10 pb-6 border-t border-emerald-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">

                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <Link href="/" className="flex items-center gap-2.5">
                                <Image
                                    src="/images/logo.jpeg"
                                    alt="NogorBondhu Logo"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 object-contain rounded-lg"
                                />
                               <span className="text-xl font-semibold text-white tracking-tight">
                                NogorBondhu
                            </span>
                            </Link>
                            
                        </div>
                        <p className="text-xs text-[#a3d3bd] leading-relaxed max-w-xs">
                            NogorBondhu - Build a cleaner city, together.<br />
                            Connect with your city. Make a change.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            QUICK LINKS
                        </h3>
                        <ul className="space-y-2.5 text-xs text-[#b8e2d0]">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
                                    <FaHome className="text-emerald-400 text-xs" />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/submit-report" className="hover:text-white transition-colors flex items-center gap-2">
                                    <FaEdit className="text-emerald-400 text-xs" />
                                    <span>Submit Report</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-status" className="hover:text-white transition-colors flex items-center gap-2">
                                    <FaTasks className="text-emerald-400 text-xs" />
                                    <span>Track Status</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            PUBLIC SERVICES
                        </h3>
                        <ul className="space-y-2.5 text-xs text-[#b8e2d0]">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors flex items-center gap-2">
                                    <FaTrashAlt className="text-emerald-400 text-xs" />
                                    <span>Waste Collection</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors flex items-center gap-2">
                                    <FaGlobe className="text-emerald-400 text-xs" />
                                    <span>Citizen Portal</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors flex items-center gap-2">
                                    <FaFileAlt className="text-emerald-400 text-xs" />
                                    <span>Online Forms</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors flex items-center gap-2">
                                    <FaPhoneAlt className="text-emerald-400 text-xs" />
                                    <span>Contact Office</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                            STAY CONNECTED
                        </h3>

                        <p className="text-xs text-[#a3d3bd]">Follow Us:</p>
                        <div className="flex items-center gap-3 text-sm text-[#b8e2d0]">
                            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                        </div>

                        <p className="text-xs text-[#a3d3bd] pt-2">Contact:</p>
                        <div className="space-y-1.5 text-xs text-[#b8e2d0]">
                            <p className="flex items-center gap-2">
                                <FaEnvelope className="text-emerald-400 text-xs" />
                                <span>contact@nogorbondhu.gov.bd</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <FaPhone className="text-emerald-400 text-xs" />
                                <span>000-2354 2990</span>
                            </p>
                        </div>
                    </div>

                </div>

                <div className="pt-4 border-t border-emerald-900/40 flex flex-col sm:flex-row items-center justify-center text-[11px] text-[#81b29a] gap-2">
                    <p>&copy; {new Date().getFullYear()} NogorBondhu. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy" className="underline hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="underline hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}