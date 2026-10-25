import React from "react";
import { Card } from "@heroui/react";
import {
    FiClipboard,
    FiClock,
    FiRefreshCw,
    FiCheckCircle,
} from "react-icons/fi";

const ProblemStatCards = ({reports}) => {
    const pending = reports.filter(rp => rp.status === "pending");
    const underReview = reports.filter(rp => rp.status === "under-review");
    const resolved = reports.filter(rp => rp.status === "resolved");
    const stats = [
        {
            title: "Total Reports",
            value: reports.length,
            icon: FiClipboard,
            color: "border-t-[#36835B]",
            iconColor: "bg-[#E8F5EC] text-[#36835B]",
        },
        {
            title: "Pending",
            value: pending.length,
            icon: FiClock,
            color: "border-t-[#E5A000]",
            iconColor: "bg-[#FFF4DF] text-[#D97706]",
        },
        {
            title: "Under Review",
            value: underReview.length,
            icon: FiRefreshCw,
            color: "border-t-[#3984E8]",
            iconColor: "bg-[#E8F1FF] text-[#2563EB]",
        },
        {
            title: "Resolved",
            value: resolved.length,
            icon: FiCheckCircle,
            color: "border-t-[#16A36A]",
            iconColor: "bg-[#DDF7E8] text-[#16834A]",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <Card
                        key={stat.title}
                        className={`rounded-2xl border border-[#E2EBE5] border-t-4 ${stat.color} bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
                    >
                        <Card.Content >
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-xs font-medium text-[#71847B] sm:text-sm">
                                    {stat.title}
                                </p>

                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.iconColor}`}
                                >
                                    <Icon size={20} />
                                </div>
                            </div>

                            <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#11382B] sm:text-3xl">
                                {stat.value}
                            </h3>

                        </Card.Content>
                    </Card>
                );
            })}
        </div>
    );
};

export default ProblemStatCards;