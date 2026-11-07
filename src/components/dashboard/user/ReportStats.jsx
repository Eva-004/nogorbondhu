
import { Card } from "@heroui/react";
import {
    FiFileText,
    FiClock,
    FiRefreshCw,
    FiCheckCircle,
} from "react-icons/fi";

const ReportStats = ({ reports }) => {
    const stats = [
        {
            title: "Total Reports",
            value: reports.length,
            icon: FiFileText,
            color: "text-[#0F6848]",
            bg: "bg-[#EBF7F0]",
        },
        {
            title: "Pending",
            value: reports.filter((r) => r.status === "pending").length,
            icon: FiClock,
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
        {
            title: "Under Review",
            value: reports.filter((r) => r.status === "under-review").length,
            icon: FiRefreshCw,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            title: "Resolved",
            value: reports.filter((r) => r.status === "resolved").length,
            icon: FiCheckCircle,
            color: "text-green-600",
            bg: "bg-green-50",
        },
    ];

    return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
    {stats.map((stat) => {
      const Icon = stat.icon;

       return (
        <Card
            key={stat.title}
            className="rounded-xl border border-[#DCEBE3] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
                <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.bg}`} >
                    <Icon className={`text-2xl ${stat.color}`} />
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-[#11382B]">
                        {stat.value}
                    </h3>
                    <p className="text-sm text-[#71847B]">
                        {stat.title}
                    </p>
                </div>
            </div>
        </Card>
      );
    })}
    </div>
    );
};

export default ReportStats;
