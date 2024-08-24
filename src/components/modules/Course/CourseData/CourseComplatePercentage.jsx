import React from "react";
// Icons
import { HiUsers } from "react-icons/hi2";
import { IoIosStar } from "react-icons/io";

export default function CourseComplatePercentage({data}) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-5">
      <div className="flex gap-x-4">
        <div className="flex flex-col sm:flex-row items-center text-center md:text-right gap-y-1 gap-x-3 flex-grow pt-3.5 pb-3 sm:px-3.5 sm:py-2.5 bg-gray-100 rounded-xl">
          <HiUsers className="w-10 h-10 md:w-11 md:h-11 text-green-500" />
          <div>
            <span className="block font-bold text-sm md:text-base">
              {data.participants}
            </span>
            <span className="block text-sm opacity-70">دانشجو</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center text-center md:text-right gap-y-1 gap-x-3 flex-grow pt-3.5 pb-3 sm:px-3.5 sm:py-2.5 bg-gray-100 rounded-xl">
          <IoIosStar className="w-10 h-10 md:w-11 md:h-11 text-orange-400" />
          <div>
            <span className="block font-bold text-sm md:text-base">
              {data.satisfaction}
            </span>
            <span className="block text-sm opacity-70">رضایت</span>
          </div>
        </div>
      </div>

      {/* !<-- ProgressBar -->  */}
      <div className="mt-3 sm:mt-6">
        {/* !<-- Progressbar completion percentage --> */}
        <div className="flex items-center justify-between font-danaDemibold text-sm sm:text-base mb-3">
          <span>درصد تکمیل دوره</span>
          <span>%{data.complate}</span>
        </div>

        {/* !<-- Progress -->  */}
        <div
          className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
          dir="ltr"
        >
          <div
            className="flex flex-col justify-center rounded-full overflow-hidden bg-[#22c55e] text-xs text-white text-center whitespace-nowrap transition duration-500"
            style={{ width: `${data.complate}%`}}
          ></div>
        </div>
      </div>
    </div>
  );
}
