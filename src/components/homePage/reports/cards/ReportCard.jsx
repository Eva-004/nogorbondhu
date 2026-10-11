
"use client";

import Image from "next/image";
import { Button, Card } from "@heroui/react";
import {
    FaMapMarkerAlt,
    FaRegUser,
    FaArrowRight,
    FaCalendarAlt,
} from "react-icons/fa";

const ReportCard = ({ report }) => {
    const priorityColors = {
        low: "badge-success",
        medium: "badge-warning",
        high: "badge-error",
        critical: "badge-error font-bold",
    };

    const statusColors = {
        pending: "badge-warning",
        "under review": "badge-info",
        "in progress": "badge-primary",
        resolved: "badge-success",
        rejected: "badge-error",
    };

    const priority = report?.priority?.toLowerCase() || "";
    const status = report?.status?.toLowerCase() || "";

    const fullLocation = [
        report?.upazila?.name,
        report?.specificLocation,
    ].filter(Boolean).join(", ");

    const date = report?.createdAt
        ? new Date(report.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "";

    return (
        <Card className="group overflow-hidden rounded-2xl border border-[#D5EADF] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-52 w-full overflow-hidden bg-[#EBF7F0]">
                {report?.evidence?.[0] ? (
                    <Image
                        src={report.evidence[0]}
                        alt={report?.title || "Reported problem"}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#557065]">
                        No image available
                    </div>
                )}

                <span
                    className={`badge absolute left-3 top-3 border-0 capitalize ${priorityColors[priority] || "badge-ghost"
                        }`}
                >
                    {report?.priority || "Normal"} Priority
                </span>
            </div>

            <div className="gap-0 p-5">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-[#0F6848]">
                        {report?.category?.name || "General"}
                    </p>

                    <span
                        className={`badge badge-sm shrink-0 border-0 capitalize ${statusColors[status] || "badge-ghost"
                            }`}
                    >
                        {report?.status || "Unknown"}
                    </span>
                </div>

                <h3 className="mt-3 line-clamp-1 text-lg font-bold text-[#11382B]">
                    {report?.title || "Untitled Report"}
                </h3>

                <div className="mt-4 flex items-start gap-2 text-sm text-[#557065]">
                    <FaMapMarkerAlt className="mt-1 shrink-0 text-[#0F6848]" />

                    <span className="line-clamp-2">
                        {fullLocation || "Location not specified"}
                    </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#557065]">
                    <div className="flex min-w-0 items-center gap-2">
                        <FaRegUser className="shrink-0 text-[#0F6848]" />
                        <span className="truncate">{}</span>
                    </div>

                    {date && (
                        <div className="flex shrink-0 items-center gap-1.5">
                            <FaCalendarAlt className="text-[#0F6848]" />
                            <span>{date}</span>
                        </div>
                    )}
                </div>

                <div className="mt-5 border-t border-[#E4F0E8] pt-4">
                    <Button
                       
                        className="w-full bg-[#0F6848] font-semibold text-white hover:bg-[#0B5037]"
                        radius="lg"
                    >
                        View Details
                        <FaArrowRight className="ml-2 text-xs" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ReportCard;
