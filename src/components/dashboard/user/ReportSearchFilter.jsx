"use client";

import { Input } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

const ReportSearchFilter = ({ search, setSearch, status, setStatus, sort, setSort }) => {
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="relative md:col-span-2">
                <FiSearch className="absolute left-2 top-1/2 z-10 -translate-y-1/2 text-lg text-[#71847B]" />
                <Input
                    aria-label="Search reports"
                    placeholder="Search your reports..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-7"
                    
                />
            </div>
            <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="w-full rounded-xl border border-[#DCEBE3] bg-white px-4 py-3 text-sm text-[#11382B] outline-none focus:border-[#0F6848]">
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort reports" className="w-full rounded-xl border border-[#DCEBE3] bg-white px-4 py-3 text-sm text-[#11382B] outline-none focus:border-[#0F6848]">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
            </select>
        </div>
    );
};

export default ReportSearchFilter;