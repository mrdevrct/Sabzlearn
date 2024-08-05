import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";

export default function button() {
  return (
    <>
        <a
          href="#"
          className="flex items-center text-zinc-700 dark:text-white hover:text-[#6cdc5e] font-danaMedium transition-colors"
        >
          <div className="flex items-center">
            <IoArrowBackCircle className="order-2 mb-1 text-[25px]"/>
            <span className="ml-1 order-1">مطالعه مقاله</span>
          </div>    
        </a>
    </>
  );
}
