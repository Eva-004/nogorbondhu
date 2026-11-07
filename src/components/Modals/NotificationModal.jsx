"use client";

import Link from "next/link";
import { Button, Dropdown } from "@heroui/react";
import {
    FiBell,
    FiCheckCircle,
    FiFileText,
} from "react-icons/fi";

const NotificationModal = ({
    notifications = [],
    onMarkRead,
}) => {
    const unreadCount = notifications.filter(
        (item) => !item.isRead
    ).length;

    const recentNotifications = notifications.slice(0, 4);

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span
                    type="button"
                    className="relative text-[#0F6848] hover:bg-[#DDF2E4] rounded-full min-w-10 h-10 flex items-center justify-center transition"
                >
                    <FiBell size={22} />

                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                </span>
            </Dropdown.Trigger>

            <Dropdown.Popover
                placement="bottom end"
                className="w-[min(90vw,420px)] p-0 bg-white rounded-2xl border border-[#D5EADF] shadow-xl"
            >
                <div className="w-full">
                    <div className="flex items-center justify-between border-b border-[#D5EADF] px-5 py-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-[#11382B]">
                                Notifications
                            </h3>

                            {unreadCount > 0 && (
                                <span className="bg-[#DDF2E4] text-[#0F6848] rounded-full px-2.5 py-0.5 text-xs font-semibold">
                                    {unreadCount}
                                </span>
                            )}
                        </div>

                        {unreadCount > 0 && (
                            <button
                                className="flex items-center gap-1 text-sm text-[#0F6848] hover:text-[#0b5037] font-medium"
                            >
                                <FiCheckCircle size={17} />
                                <span className="hidden sm:inline">
                                    Mark all as read
                                </span>
                            </button>
                        )}
                    </div>

                    <div className="max-h-[380px] overflow-y-auto">
                        {recentNotifications.length > 0 ? (
                            recentNotifications.map((item) => (
                                <div onClick={() => !item.isRead && onMarkRead(item._id)}
                                    key={item._id}
                                    className={`flex gap-3 px-5 py-4 border-b border-[#D5EADF] hover:bg-[#EBF7F0] transition ${!item.isRead ? "bg-[#F0F8F3]" : ""
                                        }`}
                                >
                                    <div className="relative shrink-0">
                                        <div className="w-11 h-11 rounded-xl bg-[#DDF2E4] flex items-center justify-center text-[#0F6848]">
                                            <FiFileText size={21} />
                                        </div>

                                        {!item.isRead && (
                                            <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-[#0F6848] border-2 border-white" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-[#11382B]">
                                            {item.title}
                                        </h4>

                                        <p className="text-sm text-[#557065] mt-1 leading-5">
                                            {item.message}
                                        </p>

                                        <p className="text-xs text-[#71847B] mt-2">
                                            {new Date(item.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 flex flex-col items-center text-center">
                                <FiBell size={30} className="text-[#9BD3B6]" />
                                <p className="text-[#11382B] font-medium mt-3">
                                    No notifications yet
                                </p>
                                <p className="text-sm text-[#557065] mt-1">
                                    You are all caught up!
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-[#D5EADF] p-3">
                        <Link
                            href="/dashboard/user/notifications"
                            className="block w-full text-center bg-[#0F6848] hover:bg-[#0b5037] text-white font-semibold py-2.5 rounded-xl transition"
                        >
                            See All Notifications
                        </Link>
                    </div>
                </div>
            </Dropdown.Popover>
        </Dropdown>
    );
};

export default NotificationModal;