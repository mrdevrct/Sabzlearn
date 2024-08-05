import React from "react";

export default function CourseProgress() {
  return (
    <div className="bg-white border border-gray-100 p-5 sm:p-5 rounded-xl mt-4 lg:mt-6">
      <p className="text-sm mb-4">
        وقتی 70 درصد یک ویدیو را بصورت آنلاین تماشا میکنید، میزان پیشرفت شما
        بصورت خودکار بروزرسانی میشود.
      </p>
      <div className="flex items-center justify-between mb-5 font-danaDemibold text-green-500">
        <span>میزان پیشرفت شما</span>
        <span>0%</span>
      </div>
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
          style={{ width: "20%" }}
        ></div>
      </div>
    </div>
  );
}
