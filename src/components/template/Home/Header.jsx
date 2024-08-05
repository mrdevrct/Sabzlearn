import React from "react";
import { CiPlay1 } from "react-icons/ci";
import Typewriter from "typewriter-effect";
import Button from "../../modules/Button";

export default function Header() {
  return (
    <section className="lg:mt-12 relative" dir="ltr">
      <div className="container">
        <div className="flex items-center justify-center flex-wrap lg:flex-nowrap lg:justify-between gap-y-8 lg:text-right text-center">
          {/* text and btn header */}
          <div className="relative w-full sm:w-auto order-2 lg:order-2">
            {/* title header */}
            <h2 className="h-[5rem] sm:h-[8rem] font-danaExtrabold sm:font-danaExtrabold text-2xl sm:text-[2.625rem]/[70px] 3xl:text-5xl/normal leading-normal" dir="rtl">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`آکادمی آموزش`)
                    .typeString(`<br> برنامه نویسی سبزلرن`)
                    .pauseFor(2000)
                    .start()
                    .deleteAll();
                }}
                options={{
                  loop: true,
                }}
              />
            </h2>

            {/* description header */}
            <p className="sm:text-2xl font-danaMedium lg:mt-5 sm:mt-9 lg:max-w-[440px] xl:max-w-[470px] mt-2 leading-normal">
              با آکادمی خصوصی سبزلرن، علم برنامه نویسی رو با خیال راحت یاد بگیر
              و پیشرفت کن
            </p>
            {/* buttons header */}
            <div className="flex items-center justify-center flex-wrap lg:justify-end gap-4 sm:gap-6 mt-8 sm:mt-10">
              <a
                href=""
                className="flex items-center gap-x-2 group font-danaMedium cursor-pointer"
              >
                <span className="hidden sm:inline">دوره های رایگان</span>

                <Button
                  icon={<CiPlay1 />}
                  className="button-xl button-primary only-icon text-[20px]"
                />
              </a>

              <Button
                text="از این مسیر ها شروع کن"
                className="button-xl button-secondary"
              />
            </div>
            {/* items back in background */}
            <div className="hidden lg:block absolute -top-20 -right-17 w-[250px] h-[250px] bg-green-500 opacity-25 blur-[120px] -z-10 rounded-full"></div>
            <div className="hidden lg:block absolute -bottom-25 left-0 w-[250px] h-[250px] bg-sky-500 opacity-25 blur-[120px] -z-10 rounded-full"></div>
          </div>

          {/* image Header */}
          <div className="mt-8 lg:w-px order-1 lg:order-1 lg:h-[391px] xl:h-[530px] 3xl:h-[580px]">
            <img
              src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/svgs/hero-light.svg"
              className="lg:absolute left-0 right-0 lg:right-auto top-8 lg:top-0 mx-auto lg:w-[580px] xl:w-[946px]"
              alt="Sabzlearn"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
