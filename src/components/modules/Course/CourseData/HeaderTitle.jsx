import React from "react";

export default function HeaderTitle({ spanColor, iconColor, icon, title }) {
  return (
    <div className="flex items-center gap-x-2 mb-5 sm:mb-6 relative">
      {/* Span Color */}
      <span
        className={`absolute -right-6 sm:-right-[26px] block w-2 h-[34px] md:h-10 ${spanColor} rounded-r-sm `}
      ></span>
      
      {/* Icon and Icon Color */}
      {icon && (
        <span className={`hidden md:inline-block ${iconColor} text-[35px]`}>
          {icon}
        </span>
      )}

      {/* Title */}
      <h3 className="font-danaDemibold text-xl md:text-2xl">{title}</h3>
    </div>
  );
}
