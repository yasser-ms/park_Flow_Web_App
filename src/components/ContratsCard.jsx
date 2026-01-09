import React from "react";
const ContratsCard = ({ label, value, onClick, active, color }) => {
  const colorClasses = {
    slate: active
      ? "bg-slate-800 border-slate-600"
      : "bg-slate-900/50 border-slate-800 hover:border-slate-700",
    emerald: active
      ? "bg-emerald-500/20 border-emerald-500/50"
      : "bg-slate-900/50 border-slate-800 hover:border-emerald-500/30",
    red: active
      ? "bg-red-500/20 border-red-500/50"
      : "bg-slate-900/50 border-slate-800 hover:border-red-500/30",
  };

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all duration-200 text-left ${colorClasses[color]}`}
    >
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </button>
  );
};

export default ContratsCard;