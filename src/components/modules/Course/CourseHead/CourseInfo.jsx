import React from "react";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FiBookOpen } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi2";

export default function CourseInfo({
  title,
  description,
  name,
  price,
  student,
  onClick,
  Discount,
}) {
  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const transformedNum = (num) => {
    // تبدیل عدد به 2/4
    const transformedNum = num / 100;
    return transformedNum.toString();
  };

  // محاسبه مبلغ با تخفیف
  const calculateDiscountedPrice = () => {
    const discountPrice = price * (1 - Discount / 100);
    return discountPrice;
  };

  return (
    <div className="flex flex-col justify-between order-2 lg:order-1">
      <div>
        <h1 className="font-danaDemibold text-[1.375rem]/8 sm:text-[1.625rem]/10 mb-4">
          {title}
        </h1>
        <p className="font-danaLight sm:text-lg line-clamp-4 sm:line-clamp-3">
          {description}
        </p>
      </div>
      <div className="space-y-4 lg:space-y-8 mt-4 lg:mt-4">
        <div className="flex justify-center xl:items-center lg:justify-between gap-5">
          {student === true ? (
            <>
              <a
                href={`/lesson/${name}-1:1`}
                className="button-2xl button-primary w-full mb-2 sm:w-auto font-danaMedium order-2"
              >
                <FiBookOpen className="text-[30px]" />
                مشاهده دوره
              </a>
              <div className="flex items-center justify-between gap-x-1 mb-1">
                <HiOutlineUser className="text-[30px] mb-1" />
                <p className="font-danaDemibold text-lg">
                  شما دانشجوی دوره هستید
                </p>
              </div>
            </>
          ) : (
            <>
              <button
                className="button-2xl button-primary w-full mb-2 sm:w-auto font-danaMedium"
                onClick={onClick}
              >
                <HiOutlineAcademicCap className="text-[30px]" />
                ثبت نام در دوره
              </button>
              <div className="flex items-center justify-between gap-x-2 mb-3">

                <div className="flex sm:flex-row flex-col gap-x-3">
                  {price == 0 ? null : (
                    <span className="hidden sm:flex items-center justify-center text-xl text-slate-500 dark:text-white/70 -mb-1 line-through font-IRANSNumber">
                      {addCommas(price)}{" "}
                    </span>
                  )}

                  {price === 0 ? (
                    <span className="text-green-500 font-danaDemibold text-2xl">
                      رایگان!{" "}
                    </span>
                  ) : (
                    <>
                      <span className="sm:flex text-green-500 font-IRANSNumber text-2xl mt-2 lg:mb-0">
                        {calculateDiscountedPrice() === 0
                          ? "رایگان!"
                          : addCommas(calculateDiscountedPrice())}{" "}
                        {calculateDiscountedPrice() !== 0 && (
                          <img
                            src="/toman.svg"
                            className="w-6 h-6 mr-1"
                            alt="toman-icon"
                          />
                        )}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
