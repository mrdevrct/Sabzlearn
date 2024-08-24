import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { PiTimer } from "react-icons/pi";
import { HiOutlineVideoCamera } from "react-icons/hi2";

export default function CourseDetailsBox() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4 lg:mt-5 items-center">
      <div className="text-center pb-4 sm:pb-3 pt-4 sm:3.5 bg-white rounded-xl flex flex-col items-center">
        <BsInfoCircle className="block mb-2 text-green-500 text-[40px]" />
        <div>
          <h3 className="block font-danaDemibold text-sm sm:text-base mb-1 sm:mb-0">
            وضعیت دوره
          </h3>
          <p className="opacity-70 text-sm">تکمیل شده</p>
        </div>
      </div>
      <div className="text-center pb-4 sm:pb-3 pt-4 sm:3.5 bg-white rounded-xl flex flex-col items-center">
        <PiTimer className="block mb-2 text-green-500 text-[40px]" />
        <div>
          <h3 className="block font-danaDemibold text-sm sm:text-base mb-1 sm:mb-0">
            زمان دوره
          </h3>
          <p className="opacity-70 text-sm">56:34</p>
        </div>
      </div>
      <div className="text-center pb-4 sm:pb-3 pt-4 sm:3.5 bg-white rounded-xl flex flex-col items-center">
        <HiOutlineVideoCamera className="block mb-2 text-green-500 text-[40px]" />
        <div>
          <h3 className="block font-danaDemibold text-sm sm:text-base mb-1 sm:mb-0">
            وضعیت دوره
          </h3>
          <p className="opacity-70 text-sm">تکمیل شده</p>
        </div>
      </div>
    </div>
  );
}
