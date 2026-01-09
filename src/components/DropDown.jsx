import React from "react";

function DropDown({ name, value, onChange, vehicleTypes }) {
  return (
    <select
      name={name} // "type"
      value={value} //{formData.type}
      onChange={onChange} //{handleChange}
      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-200 appearance-none cursor-pointer"
    >
      {vehicleTypes.map((type) => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </select>
  );
}

export default DropDown;
