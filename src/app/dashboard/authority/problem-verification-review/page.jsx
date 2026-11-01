import ProblemVerifyTable from "@/components/dashboard/authority/ProblemVerifyTable";
import { getReports } from "@/lib/fetchData";
import React from "react";

const ProblemVerifyAndReviewPage = async () => {
    const reportsData = await getReports();
  const reports = reportsData.filter(report => report.status === "under-review");
  console.log(reports);
    return (
        <div className="space-y-6 p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold text-[#11382B]">
                    Problem Verification & Review
                </h1>
                <p className="mt-1 text-sm text-[#71847B]">
                    Review submitted reports and take appropriate actions.
                </p>
            </div>

            <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5">
                <p className="text-sm font-medium text-[#71847B]">
                    Reports Under Review
                </p>
                <h2 className="mt-2 text-3xl font-bold text-[#11382B]">
                    {reports.length}
                </h2>
            </div>

            <ProblemVerifyTable reports={reports} />
        </div>
    );
};

export default ProblemVerifyAndReviewPage;