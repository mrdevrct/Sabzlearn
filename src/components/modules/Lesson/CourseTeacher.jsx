import React from "react";
import { CgArrowLeftO } from "react-icons/cg";

export default function CourseTeacher({courseData}) {
  return (
    <div className="bg-white border border-gray-100 p-5 sm:p-5 rounded-xl mt-6 lg:mt-8">
      {/* img */}
      <img
        src="https://secure.gravatar.com/avatar/50db59beddbfed36a1646dae99ca7b2d?s=96&amp;d=mm&amp;r=g"
        className="mx-auto rounded-full object-cover"
        width="90"
        height="90"
        alt="محمدامین سعیدی راد"
      />
      {/* name */}
      <p className="font-danaDemibold text-lg my-5 text-center">
        {courseData.teacher} | مدرس دوره
      </p>
      {/* profile */}
      <a
        href={`/teacher/${courseData.teacher}`}
        className="flex items-center justify-center gap-x-2.5 text-green-500 font-danaMedium"
      >
        مشاهده پروفایل من
        <CgArrowLeftO />
      </a>
    </div>
  );
}
