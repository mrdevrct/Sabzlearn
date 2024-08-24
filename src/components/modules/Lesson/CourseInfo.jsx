import React from "react";
import HeaderTitle from "../Course/CourseData/HeaderTitle";
import Button from "../Button";

export default function CourseInfo({courseData , episodeData}) {
  return (
    <div className="block bg-white dark:bg-darker rounded-2xl p-5 sm:p-5">
      {/* !<-- course title */}
      <HeaderTitle title={courseData.title} spanColor="bg-sky-500" />

      {/* course Lesson title */}
      <div className="flex py-5 sm:py-4 my-5 border-b border-b-gray-200">
        <div className="inline-flex items-center shrink-0 h-7 bg-sky-50 text-sky-500 dark:bg-sky-500/10 text-sm px-1 ml-2.5 font-IRANSNumber rounded">
          {episodeData.id}
        </div>
        <h4 className="font-danaMedium sm:text-lg">{episodeData.name}</h4>
      </div>

      {/* course CTA buttons */}
      <div className="flex justify-between gap-3.5 flex-wrap">
        <Button
          text="سوال دارم!"
          className="w-full sm:w-36 p-2 button-lg button-gray font-danaMedium"
        />

        <div className="flex gap-y-3.5 gap-x-4 justify-end flex-grow flex-wrap">
          <Button
            text="دانلود ویدیو"
            className="w-full sm:w-36 p-2 button-lg button-primary font-danaMedium"
          />
        </div>
      </div>
    </div>
  );
}
