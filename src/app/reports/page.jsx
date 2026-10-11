"use client";

import ReportCard from "@/components/homePage/reports/cards/ReportCard";
import ReportSearchAndFilters from "@/components/homePage/reports/ReportSearchAndFilters";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const AllReportPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const upazila = searchParams.get("upazila") || "";
  const category = searchParams.get("category") || "";
  const priority = searchParams.get("priority") || "";

  const [reports, setReports] = useState([]);

  const fetchReport = async () => {
    const params = new URLSearchParams({
      search,
      upazila,
      category,
      priority,
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/reports?${params.toString()}`
    );

    const data = await res.json();

    console.log(data);
    setReports(data);
  };

  useEffect(() => {
    fetchReport();
  }, [search, upazila, category, priority]);

  const handleFiltersChange = (callback) => {
    const current = {
      search,
      upazila,
      category,
      priority,
    };

    const updatedFilters =
      typeof callback === "function"
        ? callback(current)
        : callback;

    const changedKey = Object.keys(updatedFilters).find(
      (key) => updatedFilters[key] !== current[key]
    );

    const params = new URLSearchParams();

    if (changedKey && updatedFilters[changedKey]) {
      params.set(changedKey, updatedFilters[changedKey]);
    }

    router.replace(`?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#11382B] sm:text-3xl">
            All Public Reports
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#557065] sm:text-base">
            Explore reported problems in your city and find problems
            that need attention.
          </p>
        </div>

        <ReportSearchAndFilters
          filters={{ search, upazila, category, priority }}
          onFiltersChange={handleFiltersChange}
        />

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 ">
          <div>
            <h2 className="text-lg font-bold text-[#11382B]">
              Public Problems
            </h2>

            <p className="mt-1 text-sm text-[#557065]">
              Browse reports submitted by citizens.
            </p>
          </div>

          <span className="rounded-full bg-[#DDF2E4] px-3 py-1.5 text-sm font-semibold text-[#0F6848]">
            {reports.length} Reports
          </span>
        </div>

        <div className="w-11/12 mx-auto">
          {reports.length > 0 ? (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <ReportCard
                  key={report._id}
                  report={report}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed bg-white px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full ">
                <FaSearch className="text-xl text-[#0F6848]" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#11382B]">
                No Reports Yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#557065]">
                Public reports will appear here once they are available.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AllReportPage;