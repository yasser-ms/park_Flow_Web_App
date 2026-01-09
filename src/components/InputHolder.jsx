import React from "react";

function InputHolder({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  maxLength,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-200 font-mono uppercase"
        required
      />
      <p className="mt-2 text-xs text-slate-500">
        Format: AA-000-BB (plaque française)
      </p>
    </div>
  );
}

export default InputHolder;
