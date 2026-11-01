"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaCar,
  FaExclamationTriangle,
  FaThumbsDown,
  FaThumbsUp,
  FaUser,
} from "react-icons/fa";
import ReportSidebar from "../homePage/reports/ReportSidebar";

const ReportDetails = ({ report }) => {
  const priorityColors = {
  critical: "bg-[#FFD8DF] text-[#D4111E]",
  high: "bg-[#FFF0D2] text-[#C96B00]",
  medium: "bg-[#FFF7CC] text-[#B88600]",
  low: "bg-[#DDF2E4] text-[#0F6848]",
 };
  const [supportCount, setSupportCount] = useState(
    report?.supportCount || 184
  );
  const [fakeCount, setFakeCount] = useState(report?.fakeCount || 27);
  const [isSupported, setIsSupported] = useState(false);
  const [isFake, setIsFake] = useState(false);

  if (!report) {
    return <div>Report not found</div>;
  }

  const formattedDate = new Date(report.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );


  return (
    <section className="  px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-white p-5 shadow-xl shadow-[#0F6848]/10 sm:p-8 lg:p-9">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-[#FFF0D2] px-4 py-2 font-bold text-[#C96B00]">
              <FaExclamationTriangle />
              {report.status?.toUpperCase()}
            </div>

            <div className="flex items-center gap-2 rounded-full bg-[#DDF2E4] px-4 py-2 font-bold text-[#0F6848]">
              <FaCar />
              {report.category?.name}
            </div>
          </div>

        <div className={`flex items-center gap-2 rounded-full px-4 py-2 font-bold ${
         priorityColors[report.priority.toLowerCase()] || "bg-gray-100 text-gray-600" }`}>
         <FaExclamationTriangle />
         {report?.priority.toUpperCase()} PRIORITY
       </div>
        </div>

        <h1 className="text-4xl font-extrabold capitalize text-[#11382B] sm:text-5xl">
          {report.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[#24344F] sm:text-lg">
          <FaUser className="text-[#5E9B82]" />

          <span>
            Reported by{" "}
            <span className="font-bold">{report.userName}</span>
          </span>

          <span className="text-[#5E9B82]">•</span>

          <FaCalendarAlt className="text-[#5E9B82]" />

          <span>{formattedDate}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-7 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {report.evidence?.[0] && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
                <Image
                  src={report.evidence[0]}
                  alt={report.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <div className="h-9 w-1.5 rounded-full bg-[#0F6848]" />

                <h2 className="text-2xl font-bold text-[#16264A]">
                  Problem Description
                </h2>
              </div>

              <p className="mt-3 text-base leading-relaxed text-[#24344F] sm:text-lg">
                {report.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                className={`flex items-center gap-3 rounded-full border px-6 py-3 font-bold transition`}
              >
                <FaThumbsUp className="text-xl" />
                Support

                <span className="rounded-full bg-[#CDEFD9] px-3 py-1">
                  {supportCount}
                </span>
              </button>

              <button
                className={`flex items-center gap-3 rounded-full border px-6 py-3 font-bold text-[#52606D] transition`}
              >
                <FaThumbsDown className="text-xl" />
                Fake

                <span className="rounded-full bg-[#E8EBEE] px-3 py-1">
                  {fakeCount}
                </span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ReportSidebar report={report} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportDetails;