"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { HiArrowRight } from "react-icons/hi2";
import { 
  FaRoad, 
  FaDroplet, 
  FaTrashCan, 
  FaLightbulb, 
  FaTrafficLight, 
  FaTree 
} from "react-icons/fa6";

const popularCategories = [
  { name: "Road & Transport", icon: FaRoad, color: "text-amber-600", bg: "bg-amber-50" },
  { name: "Water & Drainage", icon: FaDroplet, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Waste Management", icon: FaTrashCan, color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "Electricity & Lighting", icon: FaLightbulb, color: "text-yellow-500", bg: "bg-yellow-50" },
  { name: "Traffic & Road Safety", icon: FaTrafficLight, color: "text-red-500", bg: "bg-red-50" },
  { name: "Environment", icon: FaTree, color: "text-green-600", bg: "bg-green-50" },
];

export default function PopularCategories() {
  return (
    <section className=" w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-16 flex items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center text-center">
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#11382B] tracking-tight">
          Problem Categories
        </h2>

        <p className="text-sm sm:text-base text-[#557065] max-w-xl font-medium mt-2 mb-10">
          Report problems that affect your community.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {popularCategories.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                shadow="none"
                className="p-5 bg-[#F8FCF9] border border-[#E2F2E8] hover:border-[#0F6848]/40 hover:shadow-sm transition-all duration-200 flex flex-row items-center gap-4 rounded-2xl group text-left"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <span className="text-base font-semibold text-[#11382B] group-hover:text-[#0F6848] transition-colors">
                  {item.name}
                </span>
              </Card>
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#0F6848] hover:text-[#0b5037] border border-[#9BD3B6] hover:bg-[#EBF7F0] px-6 py-3 rounded-xl transition-all duration-200"
          >
            <span>View All Categories</span>
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}