"use client";

import { useState } from "react";
import { FaCheck, FaLock, FaTimes } from "react-icons/fa";

const AuthorityReportAction = ({ report }) => {
  const [status, setStatus] = useState(report.status);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div className="rounded-3xl bg-[#DDF2E4] p-5 sm:p-6">
      <p className="mb-2 text-sm font-bold uppercase text-[#0F8A4D]">
        Authority User
      </p>

      <div className="flex items-center gap-3">
        <FaLock className="text-2xl text-[#0F6848]" />

        <h2 className="text-2xl font-bold text-[#16264A]">
          Authority Controls
        </h2>
      </div>

      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="mt-5 w-full rounded-xl border border-[#CBD2DA] bg-white px-4 py-3 font-medium text-[#24344F] outline-none"
      >
        <option value="pending">Status: Pending</option>
        <option value="in-progress">Status: In Progress</option>
        <option value="resolved">Status: Resolved</option>
        <option value="rejected">Status: Rejected</option>
      </select>

      <button
        onClick={() => handleStatusChange("resolved")}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F6848] py-3 font-bold text-white transition hover:bg-[#0b5037]"
      >
        <FaCheck />
        Mark as Resolved
      </button>

      <button
        onClick={() => handleStatusChange("rejected")}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F6848] py-3 font-bold text-white transition hover:bg-[#0b5037]"
      >
        <FaTimes />
        Reject (Fake Report)
      </button>
    </div>
  );
};

export default AuthorityReportAction;