"use client";

import { Card} from "@heroui/react";

import { HiOutlineCog, HiMiniSparkles } from "react-icons/hi2";
import { 
  MdOutlineAddAPhoto, 
  MdOutlineGroups, 
  MdOutlineDomain, 
  MdOutlineCheckCircle 
} from "react-icons/md";

const steps = [
  {
    number: "01",
    title: "Report",
    description: "Submit an issue with photo and location.",
    icon: MdOutlineAddAPhoto,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    number: "02",
    title: "Community Supports",
    description: "Nearby citizens can support the report.",
    icon: MdOutlineGroups,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    number: "03",
    title: "Authority Reviews",
    description: "Relevant authority reviews and takes action.",
    icon: MdOutlineDomain,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    number: "04",
    title: "Problem Resolved",
    description: "Citizen gets status updates until resolution.",
    icon: MdOutlineCheckCircle,
    iconColor: "text-teal-500",
    bgColor: "bg-teal-50",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#EBF7F0] w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-16 flex items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 bg-[#DDF2E4] text-[#0F6848] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4">
          <HiOutlineCog className="w-4 h-4 text-[#0F6848] animate-spin-slow" />
          <span>Simple. Clear. Effective.</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#11382B] tracking-tight text-center">
          How <span className="text-[#0F6848]">NogorBondhu</span> Works
        </h2>

        <p className="text-sm sm:text-base text-[#557065] text-center max-w-xl font-medium mt-3 mb-12 ">
          From reporting a problem to getting it resolved — see how NogorBondhu connects citizens and authorities.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative flex items-center">
                <Card 
                  shadow="sm" 
                  className="w-full bg-white border border-[#D5EADF]/70 hover:shadow-md transition-all duration-300 rounded-2xl"
                >
                  <div className="p-6 flex flex-col items-center text-center relative overflow-hidden">
                    
                    <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-[#DDF2E4] flex items-center justify-center text-xs font-bold text-[#0F6848]">
                      {step.number}
                    </div>

                    <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full ${step.bgColor} flex items-center justify-center mt-4 mb-6 shadow-inner`}>
                      <IconComponent className={`w-12 h-12 ${step.iconColor}`} />
                    </div>

                    <h3 className="text-lg font-bold text-[#11382B] mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#557065] leading-relaxed">
                      {step.description}
                    </p>

                  </div>
                </Card>

              
              </div>
            );
          })}
        </div>

        <div className="mt-12 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0F6848]">
          <HiMiniSparkles className="w-4 h-4 text-[#0F6848]" />
          <span>Better Reporting</span>
          <span className="text-gray-300">|</span>
          <span>Stronger Communities</span>
        </div>

      </div>
    </section>
  );
}