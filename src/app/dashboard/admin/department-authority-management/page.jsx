'use client'
import ActionsAndTabs from "@/components/dashboard/admin/ActionsAndTabs";
import AuthoritiesTable from "@/components/dashboard/admin/AuthoritiesTable";
import DepartmentsTable from "@/components/dashboard/admin/DepartmentsTable";
import React, { useEffect, useState } from "react";
import {
  HiOutlineBuildingOffice2,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const DepartmentAndAuthorityManagementPage = () => {
 const [departments,setDepartment]=useState([]);
  useEffect(()=>{
     const fetchData = async()=>{
       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/departments`,{
         headers: {
                    "Content-Type": "application/json",
                },
       });
         const data = await res.json();
         setDepartment(data);
     }
     fetchData();
    
  },[]);
  console.log(departments);
  const cards = [
    {
      title: "Total Departments",
      count: departments.length,
      icon: HiOutlineBuildingOffice2,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Authorities",
      count: "0",
      icon: HiOutlineShieldCheck,
      color: "text-[#0F6848]",
      bg: "bg-[#EBF7F0]",
    },
    {
      title: "Active Authorities",
      count: "0",
      icon: HiOutlineCheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];
  const [activeTab, setActiveTab] = useState("departments");
  

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto bg-[#EBF7F0] min-h-screen">

      <div className="mb-6">
        <h1 className=" sm:text-2xl font-bold text-[#11382B]">
          Department & Authority Management
        </h1>

        <p className="text-sm text-gray-600 mt-1">
          Manage departments and authorities across NogorBondhu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {cards.map((card, idx) => {
          const IconComponent = card.icon;

          return (
            <div
              key={idx}
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
      <ActionsAndTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "departments" ? (
        <DepartmentsTable departments={departments} />
      ) : (
        <AuthoritiesTable />
      )}
    </div>
  );
};

export default DepartmentAndAuthorityManagementPage;