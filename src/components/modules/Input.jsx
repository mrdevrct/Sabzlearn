import React from "react";

export default function Input({ type, name , placeholder, icon: Icon , onChange , minLength , maxLength , value , disabled }) {
  return (
    <div className="relative">
      <input
        type={type || "text"}
        name={name}
        value={value}
        className={`${disabled ? "bg-[#e5e7eb]" : "bg-[#f3f4f6]"}  h-[3.25rem] w-full rounded-[10px] text-sm text-[#64748b]`}
        placeholder={placeholder || ""}
        style={{ paddingLeft: "2.35rem", paddingRight: "0.85rem" }}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
      />
      {Icon && <Icon className="absolute top-0 bottom-0 left-3 my-auto text-[#64748b] text-[20px]" />}
    </div>
  );
}
  