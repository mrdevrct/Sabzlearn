import React from "react";

export default function CourseDetailBox({ icon, title, text }) {
  return (
    <div className="flex flex-col md:flex-row text-center md:text-right items-center justify-center sm:justify-start gap-x-2 gap-y-2 bg-white sm:py-5 px-6 py-4 rounded-xl">
      <div className="w-10 sm:w-11 h-10 sm:h-11 text-green-500 text-[2.5rem]">
        {icon}
      </div>

      <div className="space-y-0.5 sm:space-y-1">
        <span className="block font-danaDemibold text-sm sm:text-base">
          {title}
        </span>
        <span className="block font-danaLight text-sm opacity-70">{text}</span>
      </div>
    </div>
  );
}
