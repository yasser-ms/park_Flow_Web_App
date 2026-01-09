import React from 'react'

const DetailRow = ({ label, value, mono }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
    <span className="text-sm text-slate-400">{label}</span>
    {typeof value === "string" ? (
      <span className={`text-white ${mono ? "font-mono" : ""}`}>{value}</span>
    ) : (
      value
    )}
  </div>
);

export default DetailRow;