import React from "react";
import Link from "../Link";

export default function SectionHeader({
  desc,
  title,
  linkTitle,
  path,
  spanColor,
}) {
  return (
    <div className="flex items-center justify-center sm:justify-between flex-wrap flex-col mb-7 sm:mb-10 sm:flex-row gap-x-4 gap-y-7">
      <div className="space-y-2 sm:space-y-3 sm:self-start">
        <div className="flex items-center justify-center sm:justify-start gap-x-2.5">
          <span className={`hidden sm:inline-block w-4 h-4 ${spanColor} rounded-sm`}></span>
          <h3 className="font-danaDemibold text-2xl sm:text-2.5xl">{title}</h3>
        </div>
        <p className="text-slate-500 font-danaMedium sm:text-lg text-center sm:text-right">
          {desc}
        </p>
      </div>
      {linkTitle ? <Link title={linkTitle} path={path} /> : null}
    </div>
  );
}
