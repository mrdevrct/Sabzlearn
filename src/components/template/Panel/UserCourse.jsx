import React, { useState, useEffect } from "react";
import CourseBox from "../../modules/CourseBox";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

export default function UserCourse({ userData }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (userData && userData.courses) {
      setCourses(userData.courses);
      console.log(userData.courses);
    }
  }, [userData]);

  const freeCoursesCount = courses.filter(
    (course) => course.price === 0
  ).length;

  const priceCoursesCount = courses.filter(
    (course) => course.price !== 0
  ).length;

  return (
    <>
      <div className="flex flex-wrap gap-x-3 gap-y-4 md:gap-x-10 mb-10">
        {/* 1 */}
        <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-amber-400 p-2 rounded-2xl">
          <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
            <HiOutlineCreditCard />
          </div>
          <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
            <span className="text-sm font-danaMedium">
              دوره های ثبت نام شده
            </span>
            <span className="font-IRANSNumber text-sm md:text-lg">
              {courses.length} &nbsp;
              <span className="slms-price_symbol font-danaDemibold">دوره</span>
            </span>
          </div>
        </div>

        {/* 2 */}
        <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-sky-500 p-2 rounded-2xl">
          <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
            <HiOutlineCurrencyDollar />
          </div>
          <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
            <span className="text-sm font-danaMedium">دوره های نقدی</span>
            <span className="font-IRANSNumber text-sm md:text-lg">
              {priceCoursesCount} &nbsp;
              <span className="slms-price_symbol font-danaDemibold">دوره</span>
            </span>
          </div>
        </div>

        {/* 3 */}
        <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-primary p-2 rounded-2xl">
          <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
            <HiOutlineRocketLaunch />
          </div>
          <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
            <span className="text-sm font-danaMedium">دوره های رایگان</span>
            <span className="font-IRANSNumber text-sm md:text-lg">
              {freeCoursesCount} &nbsp;
              <span className="slms-price_symbol font-danaDemibold">دوره</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-rows-2 xs:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {courses.map((course) => (
          <CourseBox key={course.id} {...course} />
        ))}
      </div>
    </>
  );
}
