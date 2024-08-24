import React from "react";
import Section_pattern from "../../../public/img/section-pattern.png";
import { IoIosArrowBack } from "react-icons/io";

export default function Banner() {
  return (
    <section className="sm:mt-[8rem] mt-[6rem]">
      <div className="container">
        <div
          className={`flex items-center flex-col md:flex-row justify-between gap-y-4 text-center md:text-right p-8 lg:px-14 md:h-40 lg:h-36 rounded-2xl`}
          style={{
            backgroundImage: `url(${Section_pattern}), linear-gradient(to right, #502ED6, #CD2F6A, #FFE354)`,
          }}
        >
          <div className="text-white space-y-4">
            <h5 className="font-danaExtrabold text-4xl leading-normal text-right">
              پیج اینستاگرام آکادمی سبزلرن
            </h5>
            <p className="font-danaMedium text-lg">
              اطلاع رسانی تخفیف ها، آموزش های رایگان و نکات کاربردی و لایو های
              هفتگی
            </p>
          </div>
          <a
            href="instagram://user?username=sabzlearn_"
            className="bg-white/30 text-[#fff] inline-flex items-center shrink-0 text-base h-12 px-4 gap-x-0.5 rounded-xl sm:text-[#502ED6] sm:bg-white border border-transparent hover:border-white hover:text-white hover:bg-transparent transition-colors"
          >
            <span className="font-danaMedium mt-1">دیدن پست ها</span>
            <IoIosArrowBack />
          </a>
        </div>
      </div>
    </section>
  );
}
