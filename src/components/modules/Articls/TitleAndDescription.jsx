import React from "react";

export default function TitleAndDescription({ title , description }) {
  return (
    <div className="relative pt-1.5">
      <h4 className="font-danaMedium max-h-12 line-clamp-2 text-zinc-700 dark:text-white mb-2.5">
        <a href="#">{title}</a>
      </h4>
      <p className="font-danaLight text-[14px] line-clamp-4 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}
