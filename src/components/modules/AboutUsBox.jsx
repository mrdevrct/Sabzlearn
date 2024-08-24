import React from "react";
import "../../css/ElementProprety/AboutUs.css";

export default function AboutUsBox(props) {
  return (
    <div className="flex flex-col items-center p-5 bg-white rounded-2xl lg:flex-row lg:p-6">
      <div
        className={`flex justify-center lg:justify-end items-center w-[94px] h-13 lg:w-13 lg:h-[94px] mb-11 lg:mb-0 lg:ml-11 ${props.bg}  rounded-full`}
      >
        <span
          className={`text-[50px] ${props.style}  translate-y-1/2 lg:translate-y-0 lg:-translate-x-1/2`}
        >
          {props.icon}
        </span>
      </div>
      <div className="space-y-3 lg:text-right text-center">
        <span className="font-danaDemibold lg:text-2xl text-[16px]">
          {props.title}
        </span>
        <p className="font-danaLight text-slate-500 lg:text-[15px] xl:text-lg xl:pl-5 pl-0 text-[12px] leading-4">
          {props.desc}
        </p>
      </div>
    </div>
  );
}
