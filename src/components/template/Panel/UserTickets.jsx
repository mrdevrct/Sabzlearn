import React, { useEffect, useState } from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";
import { HiOutlineTicket } from "react-icons/hi2";
import moment from 'moment-timezone';
import jalaliMoment from "jalali-moment"; // تغییر این خط

export default function UserTickets({ tickets }) {
  const [closedTickets, setClosedTickets] = useState();
  const [openTickets, setOpenTickets] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tickets) {
          const closedTickets = tickets.filter((ticket) => ticket.answer !== null).length;
          setClosedTickets(closedTickets)

          const openTickets = tickets.filter((ticket) => ticket.answer === null).length;
          setOpenTickets(openTickets)
        }
      } catch (err) {}
    };
    fetchData();
  }, [tickets]);


  const formatDate = (dateString) => {
    const date = moment.tz(dateString, "UTC").tz("Asia/Tehran");
    const formattedDate = jalaliMoment(date).format("jYYYY/jMM/jDD (HH:mm)");
    return formattedDate;
  };
  

  return (
    <>
      <div className="flex flex-wrap gap-x-3 gap-y-4 md:gap-x-10 mb-10">
        {/* 1 */}
        <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-amber-400 p-2 rounded-2xl">
          <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
            <HiOutlineTicket />
          </div>
          <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
            <span className="text-sm font-danaMedium">همه تیکت ها</span>
            <span className="font-IRANSNumber text-sm md:text-lg">
              {tickets.length} &nbsp;
              <span className="slms-price_symbol font-danaDemibold">عدد</span>
            </span>
          </div>
        </div>

        {/* 2 */}
        <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-sky-500 p-2 rounded-2xl">
          <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
            <HiOutlineEnvelopeOpen />
          </div>
          <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
            <span className="text-sm font-danaMedium">تیکت های باز</span>
            <span className="font-IRANSNumber text-sm md:text-lg">
              { tickets.length > 0 ? openTickets : '0'}&nbsp;
              <span className="slms-price_symbol font-danaDemibold">تیکت</span>
            </span>
          </div>
        </div>

        {/* 3 */}
        <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-pink-500 p-2 rounded-2xl">
          <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
            <HiOutlineChatBubbleLeftRight />
          </div>
          <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
            <span className="text-sm font-danaMedium">بسته شده</span>
            <span className="font-IRANSNumber text-sm md:text-lg">
              {tickets.length > 0 ? closedTickets : '0'} &nbsp;
              <span className="slms-price_symbol font-danaDemibold">تیکت</span>
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-3.5 md:p-4.5 rounded-2xl">
        <div className="flex justify-between items-center pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200">
          <span className="font-danaMedium md:text-xl text-zinc-700 dark:text-white">
            تیکت ها
          </span>
        </div>

        <div>
          {tickets.length > 0 &&
            tickets.map((ticket) => (
              <div
                className="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 rounded-xl transition-colors"
                key={ticket.id}
              >
                <div className="flex items-center">
                  <span className="block w-20 text-right font-danaMedium">
                    #{ticket.id}
                  </span>
                  <a
                    href=""
                    className="text-zinc-700 dark:text-white w-full font-danaMedium sm:max-w-md md:truncate"
                  >
                    {ticket.tickets}
                  </a>
                </div>
                <div className="flex items-center gap-5">
                  <span
                    className="text-xs text-slate-500 dark:text-slate-400"
                    dir="ltr"
                  >
                    {formatDate(ticket.timeCreated)}
                  </span>
                  <span className="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded">
                    {ticket.answer ? "پشتیبانی" : "انتظار پاسخ"}
                  </span>
                  {ticket.answer && (
                    <span className="text-xs py-1 px-1.5 text-green-500 bg-green-100 rounded-md">
                      پاسخ داده شده
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
