"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Modal } from "@heroui/react";
import {
  FiBell,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";

const NotificationModal = ({notifications = [],onMarkAllRead,}) => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  const recentNotifications = notifications.slice(0, 4);

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        isIconOnly
        variant="light"
        onPress={() => setIsOpen(true)}
        className="relative text-[#0F6848] hover:bg-[#DDF2E4] rounded-full min-w-10 h-10"
      >
        <FiBell size={22} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="w-full max-w-md bg-white rounded-2xl border border-[#D5EADF] shadow-xl">
            <Modal.CloseTrigger />

            <Modal.Header className="flex items-center justify-between border-b border-[#D5EADF] px-5 py-4">
              <div className="flex items-center gap-2">
                <Modal.Heading className="text-lg font-bold text-[#11382B]">
                  Notifications
                </Modal.Heading>

                {unreadCount > 0 && (
                  <span className="bg-[#DDF2E4] text-[#0F6848] rounded-full px-2.5 py-0.5 text-xs font-semibold">
                    {unreadCount}
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllRead}
                  className="flex items-center gap-1 text-sm text-[#0F6848] hover:text-[#0b5037] font-medium"
                >
                  <FiCheckCircle size={17} />
                  Mark all as read
                </button>
              )}
            </Modal.Header>

            <Modal.Body className="p-0 max-h-[380px] overflow-y-auto">
              {recentNotifications.length > 0 ? (
                recentNotifications.map((item) => (
                  <div
                    key={item._id}
                    className={`flex gap-3 px-5 py-4 border-b border-[#D5EADF] hover:bg-[#EBF7F0] transition ${
                      !item.isRead ? "bg-[#F0F8F3]" : ""
                    }`}
                  >
                    <div className="relative flex-shrink-0">
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
            </Modal.Body>

            <Modal.Footer className="border-t border-[#D5EADF] p-3">
              <Link
                href="/dashboard/user/notifications"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Button className="w-full bg-[#0F6848] text-white font-semibold hover:bg-[#0b5037]">
                  See All Notifications
                </Button>
              </Link>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default NotificationModal;