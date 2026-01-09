import React from "react";

const StatCard = ({ label, value, icon, trend, trendUp }) => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-slate-400 text-sm">{label}</span>
      <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
        {icon}
      </div>
    </div>
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    {trend && (
      <p
        className={`text-xs ${
          trendUp === true
            ? "text-emerald-400"
            : trendUp === false
            ? "text-amber-400"
            : "text-slate-500"
        }`}
      >
        {trend}
      </p>
    )}
  </div>
);

export default StatCard;
