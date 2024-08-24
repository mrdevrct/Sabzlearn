import React from "react";

export default function HeaderCategories({  titlePage , quantityCourses }) {
  return (
    // {* <!-- header categories --> *}
    <div className="flex flex-col sm:flex-row gap-y-2 items-center justify-between mb-8 lg:mb-15 font-danaMedium">
      <div className="flex gap-2.5 items-center">
        <span className="hidden sm:inline-block w-4 h-4 bg-amber-400 rounded-sm"></span>
        {/* title */}
        <h2 className="text-center text-2xl lg:text-3xl font-bold mr-2 mt-1">
          {" "}
          {titlePage}
        </h2>
      </div>
      <span className="sm:text-xl font-danaMedium text-slate-500">
        {/* quntity */}
        <span id="count_item_archive">{quantityCourses}</span> عنوان آموزشی{" "}
      </span>
    </div>
  );
}

