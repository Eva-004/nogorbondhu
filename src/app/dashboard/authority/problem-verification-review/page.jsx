import ProblemVerifyTable from "@/components/dashboard/authority/ProblemVerifyTable";
import { getReports } from "@/lib/fetchData";
import React from "react";

const ProblemVerifyAndReviewPage = async () => {
    const reportsData = await getReports();
  const reports = reportsData.filter(report => ["under-review", "in-progress"].includes(report.status));
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

            <ProblemVerifyTable reports={reports} />
        </div>
    );
};

export default ProblemVerifyAndReviewPage;