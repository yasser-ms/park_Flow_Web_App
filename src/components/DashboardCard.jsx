import React from "react";

const DashboardCard = ({ title, value, subtitle, color }) => {
  const colorClasses = {
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
    violet: "from-violet-500/20 to-violet-500/5 border-violet-500/20",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-5`}
    >
      <p className="text-sm text-slate-400 mb-1">{title}</p>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  );
};

export default DashboardCard;