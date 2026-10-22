'use client'
const StatCard = ({ title, value, icon, iconStyle }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${iconStyle}`}
        >
          {icon}
        </div>
      </div>

      <h2 className="mt-3 text-3xl font-bold text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-xs text-slate-400">
        Account overview
      </p>
    </div>
  );
};

export default StatCard;
