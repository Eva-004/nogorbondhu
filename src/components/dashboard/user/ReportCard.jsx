import { Button } from "@heroui/react";
import Image from "next/image";
import { FiMapPin, FiCalendar, FiEye, FiEdit2, FiTrash2, FiClock } from "react-icons/fi";

const statusStyles = {
    pending: "bg-amber-100 text-amber-700",
    "under review": "bg-blue-100 text-blue-700",
    "in progress": "bg-purple-100 text-purple-700",
    resolved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
};

const ReportCard = ({ report, onView, onEdit, onDelete }) => {
    const date = new Date(report.createdAt);
    const status = report.status?.toLowerCase();
    const statusLabel = status?.replace(/\b\w/g, (char) => char.toUpperCase());

    const location = [
        report.upazila?.name,
        report.district?.name,
    ].filter(Boolean).join(", ");

    const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="rounded-xl border border-[#DCEBE3] bg-white p-3 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-lg bg-[#EBF7F0] sm:h-24 sm:w-32">
                    {report.evidence?.[0] ? (
                        <Image
                            src={report.evidence[0]}
                            alt={report.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 128px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-xs text-[#71847B]">
                            No Image
                        </div>
                    )}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="truncate text-sm font-bold text-[#11382B]">
                        {report.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-[#71847B]">
                        <FiMapPin className="shrink-0" />
                        <span className="truncate">{location || "Location unavailable"}</span>
                    </div>
                    <p className="line-clamp-1 text-xs text-gray-500">
                        {report.description}
                    </p>
                </div>

                <div className="flex shrink-0 items-center lg:justify-center lg:border-r lg:border-[#EBF1ED] lg:px-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-700"}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {statusLabel}
                    </span>
                </div>

                <div className="flex shrink-0 items-center gap-2 text-xs text-[#71847B] lg:w-28 lg:flex-col lg:items-start lg:justify-center lg:gap-1">
                    <div className="flex items-center gap-1.5">
                        <FiCalendar className="shrink-0" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 lg:pl-5">
                        <FiClock className="shrink-0 lg:hidden" />
                        <span>{formattedTime}</span>
                    </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-[#EBF1ED] pt-3 lg:border-0 lg:pt-0">
                    <Button size="sm" onPress={onView} className="h-8 min-w-0 gap-1 rounded-lg bg-[#0F6848] px-3 text-xs text-white">
                        <FiEye /> View
                    </Button>
                    <Button size="sm" onPress={onEdit} variant="bordered" className="h-8 min-w-0 gap-1 rounded-lg border-[#0F6848] px-3 text-xs text-[#0F6848]">
                        <FiEdit2 /> Edit
                    </Button>
                    <Button size="sm" onPress={onDelete} variant="bordered" className="h-8 min-w-0 gap-1 rounded-lg border-red-400 px-3 text-xs text-red-600">
                        <FiTrash2 /> Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReportCard;