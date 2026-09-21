'use client'
import AddAuthorityModal from "@/components/Modals/AddAuthorityModal";
import AddDepartmentModal from "@/components/Modals/AddDepartmentModal";
import { HiPlus } from "react-icons/hi2";

export default function ActionsAndTabs({departments ,activeTab, setActiveTab }) {

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("departments")}
          className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === "departments"
            ? "bg-[#EBF7F0] text-[#0F6848] border border-[#0F6848]/20 shadow-sm"
            : "text-gray-600 hover:text-[#11382B] hover:bg-gray-100"
            }`}
        >
          Departments
        </button>
        <button
          onClick={() => setActiveTab("authorities")}
          className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === "authorities"
              ? "bg-[#EBF7F0] text-[#0F6848] border border-[#0F6848]/20 shadow-sm"
              : "text-gray-600 hover:text-[#11382B] hover:bg-gray-100"
            }`}
        >
          Authorities
        </button>
      </div>

      <div className="flex items-center gap-3">
        <AddDepartmentModal/>
        <AddAuthorityModal departments={departments}/>
      </div>
    </div>
  );
}