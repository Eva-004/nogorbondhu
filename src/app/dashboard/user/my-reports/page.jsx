"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiFileText } from "react-icons/fi";
import ReportCard from "@/components/dashboard/user/ReportCard";
import ReportSearchFilter from "@/components/dashboard/user/ReportSearchFilter";
import ReportStats from "@/components/dashboard/user/ReportStats";
import { getReports } from "@/lib/fetchData";
import { authClient } from "@/lib/auth-client";

const MyReportsPage = () => {
    const router = useRouter();
    const [reports, setReports] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [sort, setSort] = useState("newest");

    const userData = authClient.useSession();
    const user = userData?.data?.user;

    useEffect(() => {
        const fetchReports = async () => {
            const data = await getReports();
            const filteredData = data.filter(dt => dt.userId === user?.id);
            setReports(filteredData);
        }
        fetchReports();
    }, [user?.id])

    const filteredReports = useMemo(() => {
        let result = [...reports];

        if (search.trim()) {
            const searchText = search.toLowerCase();
            result = result.filter((report) =>
                [report.title, report.description, report.category?.name, report.areaWard, report.upazila?.name, report.district?.name]
                    .some((value) => value?.toLowerCase().includes(searchText))
            );
        }

        if (status !== "All") {
            result = result.filter((report) => report.status?.toLowerCase() === status.toLowerCase());
        }

        result.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sort === "newest" ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [reports, search, status, sort]);



    return (
        <div className="min-h-screen bg-[#F5F8F6] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-[#11382B] sm:text-3xl">My Reports</h1>
                    <p className="text-sm text-[#71847B] sm:text-base">Track and manage the reports you have submitted.</p>
                </div>

                <ReportStats reports={reports} />

                <ReportSearchFilter search={search} setSearch={setSearch} status={status} setStatus={setStatus} sort={sort} setSort={setSort} />

                <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-[#11382B]">
                        <FiFileText className="text-[#0F6848]" />
                        Your Reports
                    </h2>
                    <span className="text-sm text-[#71847B]">{filteredReports.length} reports found</span>
                </div>

                {filteredReports.length > 0 ? (
                    <div className="space-y-3">
                        {filteredReports.map((report) => (
                            <ReportCard
                                key={report._id}
                                report={report}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-[#BBD7C8] bg-white py-16 text-center">
                        <h3 className="text-lg font-semibold text-[#11382B]">No Reports Found</h3>
                        <p className="mt-2 text-sm text-[#71847B]">Try changing your search or filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReportsPage;