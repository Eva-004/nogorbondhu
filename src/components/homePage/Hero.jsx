import Image from "next/image";
import { FaEdit, FaMapMarkerAlt, FaBell, FaUsers } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="bg-[#EBF7F0] w-full min-h-[550px] px-4 sm:px-6 py-8 sm:py-12 lg:px-16 flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <div className="lg:col-span-6 flex flex-col items-start space-y-5 sm:space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-[#DDF2E4] text-[#0F6848] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
            <HiOutlineSparkles className="w-4 h-4 text-[#0F6848]" />
            <span>Make Your Community Better</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-[52px] font-extrabold text-[#11382B] tracking-tight leading-[1.15]">
            Report Problems. <br className="hidden sm:inline" />
            Improve Your Community.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#557065] max-w-xl font-medium leading-relaxed">
            NagarBondhu connects citizens with relevant authorities to report, track and resolve public issues more efficiently.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 bg-[#0F6848] hover:bg-[#0b5037] text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm w-full sm:w-auto cursor-pointer">
              <FaEdit className="w-4 h-4" />
              <span>Report a Problem</span>
            </button>

            <button className="flex items-center justify-center gap-2 border border-[#9BD3B6] hover:bg-[#d5eedf] text-[#0F6848] px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 w-full sm:w-auto cursor-pointer">
              <span>Explore Problems</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 sm:pt-8 border-t border-[#D5EADF]">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DDF2E4] flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="w-4 h-4 text-[#0F6848]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#2C4E40] leading-snug">
                Report nearby problems
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DDF2E4] flex items-center justify-center shrink-0">
                <FaBell className="w-4 h-4 text-[#0F6848]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#2C4E40] leading-snug">
                Track updates
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DDF2E4] flex items-center justify-center shrink-0">
                <FaUsers className="w-4 h-4 text-[#0F6848]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#2C4E40] leading-snug">
                Support your community
              </span>
            </div>

          </div>

        </div>

        <div className="lg:col-span-6 relative flex justify-center items-center w-full min-h-[280px] sm:min-h-[380px] lg:min-h-[480px]">
          <div className="relative w-full max-w-[600px] aspect-[4/3]">
            <Image
              src="/images/hero.png"
              alt="NagarBondhu Community Vector Illustration"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}