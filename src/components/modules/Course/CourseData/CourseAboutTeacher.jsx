import React from "react";

export default function CourseTeacher({data}) {
  return (
    <div className="bg-white dark:bg-darker rounded-2xl pt-6 px-5 pb-5 sm:py-8 md:px-5 text-center">
      <img
        className="block mb-4 mx-auto object-cover rounded-full"
        width="90"
        height="90"
        src="https://secure.gravatar.com/avatar/5872841a47b10069777793cbce83eacf?s=96&amp;d=mm&amp;r=g"
        alt={data.teacher}
      />
      <span className="font-danaDemibold text-lg">
        {data.teacher} | مدرس دوره
      </span>
      <p className="mt-2"></p>
      <a
        href={`/teacher/${data.teacher}`}
        className="button-primary button-lg button-outline mx-auto my-4 py-2"
      >
        مشاهده پروفایل من
      </a>
    </div>
  );
}
