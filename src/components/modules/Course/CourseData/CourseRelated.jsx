import React from "react";
import { HiSparkles } from "react-icons/hi2";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import HeaderTitle from "./HeaderTitle";

export default function CourseRelated({ relatedCourse }) {
  return (
    <div className="hidden lg:block bg-white rounded-2xl p-5 sm:p-5 mt-8">
      {/* !<-- Header Title --> */}
      <HeaderTitle
        title="دوره های مرتبط"
        icon={<HiSparkles />}
        iconColor="text-amber-400"
        spanColor="bg-amber-400"
      />

      {/* Related Items */}
      <div className="space-y-4 md:space-y-5">
        {/* items */}
        {relatedCourse.map((related) => (
          <div
            className="flex items-center justify-between flex-wrap bg-gray-100 dark:bg-dark rounded-lg py-2 pr-2 pl-4"
            key={related.id}
          >
            <div className="flex items-center gap-x-4 w-4/5">
              <img
                className="w-24 rounded-md aspect-video"
                src={related.img}
                alt={related.title}
              />
              <a
                href={`/course/${related.name}`}
                className="font-danaMedium line-clamp-2"
              >
                {related.title}
              </a>
            </div>
            <a
              href={`/course/${related.name}`}
              className="flex gap-x-1 items-center justify-between sm:justify-normal text-sky-500 font-danaDemiBold text-sm"
            >
              مشاهده
              <BsArrowLeftCircleFill className="text-[20px] mr-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
