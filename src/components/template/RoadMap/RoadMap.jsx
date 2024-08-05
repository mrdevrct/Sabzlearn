import React from "react";
// component
import SectionHeader from "../../modules/Home/SectionHeader";

// validate items roadmap
const roadmap = [
  {
    id: 1,
    name: "فرانت اند",
    img: "/front.svg",
    url: "",
    style:
      "block w-full h-full flex justify-center items-center relative bg-gradient-to-r from-[#FFB535] to-[#F2295B] group",
  },
  {
    id: 2,
    name: " امنیت ",
    img: "/security.svg",
    url: "",
    style:
      "block w-full h-full flex justify-center items-center relative bg-gradient-to-r from-[#30C4E5] to-[#27E55C] group",
  },
  {
    id: 3,
    name: "پایتون ",
    img: "/python.svg",
    url: "",
    style:
      "block w-full h-full flex justify-center items-center relative bg-gradient-to-r from-[#9C33F7] to-[#2B9FFF] group",
  },
  {
    id: 4,
    name: "مهارت های نرم ",
    img: "/soft.svg",
    url: "",
    style:
      "block w-full h-full flex justify-center items-center relative bg-gradient-to-r from-[#FF3571] to-[#870075] group",
  },
];

export default function articl() {
  return (
    <section className="sm:mt-[8rem] mt-[6rem]">
      <div className="w-full container relative">
        {/* title page  */}
        <SectionHeader
          title="نقشه راه ها"
          desc="نقشه های راه برای شروع اصولی یادگیری"
          path=""
          btnTitle=""
          spanColor="bg-red-500"
        />

        {/* boxs roadmap */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 sm:px-0 px-2">
          {roadmap.map((roadmap) => (
            <div
              className="overflow-hidden rounded-2xl sm:h-[12rem] h-[8rem]"
              key={roadmap.id}
            >
              <a
                href={roadmap.url}
                className={roadmap.style}
                title={roadmap.name}
              >
                <div className="text-white text-center">
                  <img
                    src={roadmap.img}
                    className="mx-auto w-10 sm:w-12 sm:h-12"
                  />

                  <span className="font-danaDemibold lg:text-2xl text-[14px] mt-2 block">
                    {roadmap.name}
                  </span>
                  <p className="py-2 font-danaLight lg:text-[18px] text-[12px]">دوره 6</p>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* bg gradient in background */}
        <div className="hidden lg:block absolute right-0 top-0 translate-x-2/3 -translate-y-[60%] w-60 h-60 bg-red-500 opacity-25 blur-[125px] -z-10 rounded-full"></div>

      </div>
    </section>
  );
}
