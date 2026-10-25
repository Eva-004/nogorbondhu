import AssignedProblemsTable from "@/components/dashboard/authority/AssignedProblemsTable";
import ProblemStatCards from "@/components/dashboard/authority/ProblemStatCards";
import { auth } from "@/lib/auth";
import { getCategories, getReports } from "@/lib/fetchData";
import { headers } from "next/headers";
import React from "react";
import { FiSearch, FiCalendar, FiFlag } from "react-icons/fi";

const AssignedProblemsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    const allCategories = await getCategories();
    const allReports = await getReports();
    const filteredReports = allReports.filter((report) => {
        const category = allCategories.find(
        (cat) => cat._id === report.category.id
    );
    return category?.authorityId === user?.authority;
    });
    console.log(filteredReports);
    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px] space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#11382B] md:text-3xl">
                        Assigned Problem Reports
                    </h1>
                    <p className="mt-2 text-sm text-[#71847B]">
                        Review and manage public reports assigned to your department.
                    </p>
                </div>

                <ProblemStatCards reports={filteredReports}/>

                <section className="overflow-hidden rounded-2xl border border-[#E2EBE5] bg-white shadow-sm">
                    <div className="border-b border-[#E8EFEA] p-4 md:p-5">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center">
                            <div className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-[#DCE8E0] px-3 focus-within:border-[#36835B]">
                                <FiSearch className="shrink-0 text-[#81958A]" size={17} />
                                <input
                                    type="search"
                                    placeholder="Search by title or reporter..."
                                    className="w-full bg-transparent text-sm text-[#11382B] outline-none placeholder:text-[#9AAA9F]"
                                />
                            </div>

                            <div className="flex h-10 items-center gap-2 rounded-lg border border-[#DCE8E0] px-3 focus-within:border-[#36835B] md:w-48">
                                <FiCalendar className="shrink-0 text-[#81958A]" size={17} />
                                <input
                                    type="date"
                                    className="w-full min-w-0 bg-transparent text-sm text-[#294B3D] outline-none"
                                />
                            </div>

                            <div className="flex h-10 items-center gap-2 rounded-lg border border-[#DCE8E0] px-3 focus-within:border-[#36835B] md:w-44">
                                <FiFlag className="shrink-0 text-[#81958A]" size={17} />
                                <select
                                    defaultValue="all"
                                    aria-label="Filter by priority"
                                    className="w-full bg-transparent text-sm text-[#294B3D] outline-none"
                                >
                                    <option value="all">All priorities</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <AssignedProblemsTable reports={filteredReports}/>
                </section>
            </div>
        </div>
    );
};

export default AssignedProblemsPage;