import { FaMapMarkerAlt } from "react-icons/fa";

const ReportSidebar = ({ report }) => {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-[#DDF2E4] p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <FaMapMarkerAlt className="text-3xl text-[#0F6848]" />

          <h2 className="text-2xl font-bold text-[#16264A]">
            Location Information
          </h2>
        </div>

        <div className="space-y-3 text-[#16264A] sm:text-lg">
          <p>
            <span className="font-bold">Division:</span>{" "}
            {report.division?.name}
          </p>

          <p>
            <span className="font-bold">District:</span>{" "}
            {report.district?.name}
          </p>

          <p>
            <span className="font-bold">Upazila:</span>{" "}
            {report.upazila?.name}
          </p>

          <p>
            <span className="font-bold">Area/Ward:</span>{" "}
            {report.areaWard}
          </p>

          <p>
            <span className="font-bold">Specific:</span>{" "}
            {report.specificLocation}
          </p>
        </div>
      </div>

      {/* <AuthorityReportAction report={report} /> */}
    </div>
  );
};

export default ReportSidebar;