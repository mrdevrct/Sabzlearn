import React from "react";
import { HiOutlineClipboardDocument } from "react-icons/hi2";

export default function CourseShortLink() {
  return (
    <div className="hidden lg:block bg-white dark:bg-darker rounded-2xl py-6 px-8 text-center">
      <span className="font-danaDemibold text-lg">لینک کوتاه آموزش</span>
      <div className="flex items-center justify-between gap-x-3 py-5 px-6 mt-5 bg-sky-50 text-sky-500 border border-dashed border-sky-500 rounded-lg">
        <button>
          <HiOutlineClipboardDocument className="text-[30px]" />
        </button>
        <span className="font-danaMedium text-lg w-64 text-ltr text-left truncate">
          https://sabzlearn.ir/?p=84
        </span>
      </div>
    </div>
  );
}
