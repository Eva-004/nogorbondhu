"use client";

import { useEffect, useState } from "react";
import { FileText, Clock3, CheckCircle2, Tags } from "lucide-react";

import AllReports from "@/components/dashboard/admin/AllReports";
import ProblemCategories from "@/components/dashboard/admin/ProblemCategories";

export default function IssueReportManagement() {
  const [activeTab, setActiveTab] = useState("reports");
  const [categories, setCategories] = useState([]);

   const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/problemCategories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
      fetchCategories();
    }, []);

  const cards = [
    {
      title: "Total Reports",
      count: 0,
      icon: FileText,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Pending Reports",
      count: 0,
      icon: Clock3,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      title: "Resolved Reports",
      count: 0,
      icon: CheckCircle2,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Problem Categories",
      count: categories.length || 0,
      icon: Tags,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto bg-[#EBF7F0] min-h-screen">
      <div className="mb-6">
        <h1 className="sm:text-2xl font-bold text-[#11382B]">
          Issue & Report Management
        </h1>

        <p className="text-sm text-gray-600 mt-1">
          Manage citizen reports and problem categories across NogorBondhu.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((card) => {
          const IconComponent = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {card.title}
                </p>

                <h3 className="text-2xl font-bold text-[#11382B] mt-1">
                  {card.count}
                </h3>
              </div>

              <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2 mb-5 flex items-center justify-between">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === "reports"
                ? "bg-[#EBF7F0] text-[#0F6848] border border-[#0F6848]/20 shadow-sm"
            : "text-gray-600 hover:text-[#11382B] hover:bg-gray-100"
            }`}
          >
            All Reports
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === "categories"
                ? "bg-[#EBF7F0] text-[#0F6848] border border-[#0F6848]/20 shadow-sm"
            : "text-gray-600 hover:text-[#11382B] hover:bg-gray-100"
            }`}
          >
            Problem Categories
          </button>
        </div>
      </div>

      {activeTab === "reports" ? <AllReports /> : <ProblemCategories categories={categories}/>}
    </div>
  );
}