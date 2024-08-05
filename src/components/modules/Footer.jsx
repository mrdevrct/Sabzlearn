import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaGithub } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="pt-8 lg:pt-16 mt-24 px-12 bg-white dark:bg-transparent dark:border-t border-t-gray-700 font-danaLight text-slate-500 dark:text-slate-400 text-base xl:text-lg">
      <div className="container">
        <div className="flex justify-between flex-wrap gap-y-5 gap-x-4 pb-5 border-b dark:border-b-gray-700">
          <div className="flex flex-col items-center sm:items-start gap-y-5 sm:flex-grow">
            <h4 className="font-danaMedium text-2xl text-zinc-700 dark:text-white">
              درباره ما
            </h4>
            <p className="sm:max-w-xs">
              سبزلرن یک اکادمی خصوصی آموزش برنامه نویسی هست که با هدف تحویل
              نیروی متخصص بر پایه تولید محتوای غیرسطحی فعالیت میکند
            </p>
          </div>
          <div className="flex flex-col gap-y-5 flex-grow">
            <h4 className="font-danaMedium text-2xl text-zinc-700 dark:text-white">
              دسترسی سریع
            </h4>
            <div className="flex flex-col items-start gap-y-3">
              <a href="/terms-conditions/">
                قوانین و مقررات
              </a>
              <a href="/my-account/tickets/">ارسال تیکت</a>
              <a href="/courses/">همه دوره ها</a>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 flex-grow">
            <h4 className="font-danaMedium text-2xl text-zinc-700 dark:text-white">
              لینک های مفید
            </h4>
            <div className="flex flex-col items-start gap-y-3">
              <a href="/course/java-script-zero-to-hero/">
                آموزش جاوااسکریپت
              </a>
              <a href="/course/python/">آموزش پایتون</a>
              <a href="/course/html-tutorial/">
                آموزش HTML
              </a>
              <a href="/course/css-tutorial/">آموزش CSS</a>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 flex-grow">
            <h4 className="font-danaMedium text-2xl text-zinc-700 dark:text-white">
              شبکه های اجتماعی
            </h4>
            <div className="flex flex-col items-start gap-y-3">
              <div className="flex items-center gap-x-4">
                <div className="flex items-center justify-center rounded-full w-8 h-8 bg-orange-600 text-white bg-gradient-to-tr from-[#FEDC15] via-[#F71F87] to-[#9000DC]">
                  <IoLogoInstagram className="text-[25px]"/>
                </div>
                <a
                  href=""
                  className="text-ltr text-hover font-danaDemibold"
                >
                  @Devrct
                </a>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="flex items-center justify-center rounded-full w-8 h-8 bg-blue-500 text-white bg-gradient-to-b from-blue-400 to-blue-600">
                  <FaTelegramPlane />
                </div>
                <a
                  href="https://t.me/DevrctFront"
                  className="text-left font-danaDemibold"
                >
                  @Devrct
                </a>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="flex items-center justify-center rounded-full w-8 h-8 bg-black text-white">
                  <FaGithub className="text-xl"/>
                </div>
                <a
                  href="https://github.com/Devrct-Front"
                  className="text-left font-danaDemibold"
                >
                  @Devrct
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center xs:justify-between flex-wrap gap-x-3 gap-y-2 py-5 text-base">
          <span dir="rtl">  ساخته شده توسط Devrct ❤️</span>

          <p className="text-ltr text-center">
            Copyright © 2019-2024 Sabzlearn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
