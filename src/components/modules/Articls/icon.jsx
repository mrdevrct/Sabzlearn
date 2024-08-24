import React from "react";
import moment from "jalali-moment";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi2";

function formatDate(isoString) {
  const dateObject = new Date(isoString);
  const jalaliDate = moment(dateObject).locale("fa").format("YYYY/MM/DD");
  return jalaliDate;
}

export default function Icon({ data }) {
  const formattedDate = formatDate(data.time);

  return (
    <>
      <div className="flex justify-between gap-2 flex-wrap text-slate-500 dark:text-slate-400 text-[12px] font-danaMedium">
        <div className="flex items-center gap-x-1 cursor-pointer">
          <HiOutlineUser className="text-[18px]" />
          <a
            href="https://sabzlearn.ir/blog/author/m-rahmani12/"
            className="mt-2 text-[15px] font-danaLight"
          >
            {data.teacher}
          </a>
        </div>
        <div className="flex items-center gap-x-1 mt-1">
          <CiCalendar className="text-[24px] mt-1" />
          <span className="text-[15px] font-IRANSNumber mt-2">
            {formattedDate}
          </span>
        </div>
      </div>
    </>
  );
}
