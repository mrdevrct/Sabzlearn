import React from "react";
import '../../css/ElementProprety/button.css'

export default function Button({ text, onClick , className , icon }) {
  return (
    <button
      onClick={onClick}
      className={className || "bg-[#22c55e] text-white rounded-full text-[1rem] px-[1rem] h-[52px] gap-1 w-full"}
    >
      {text}
      {icon}
    </button>
  );
}
