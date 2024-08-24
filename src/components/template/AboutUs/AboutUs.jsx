import React from "react";
import AboutUsBox from "../../modules/AboutUsBox";
import SectionHeader from "../../modules/Home/SectionHeader";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { PiBookOpenBold } from "react-icons/pi";
import { BsBarChart } from "react-icons/bs";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

export default function AboutUs() {
  const AboutUs = [
    {
      id: 1,
      title: "دوره های اختصاصی",
      desc: "با پشتیبانی و کیفیت بالا ارائه میده. چون خوش نام بودن نام برند و منافع مشتری و حفظ شان دیگر همکارانش براش مهمه",
      icon: <PiBookOpenBold />,
      style: "text-sky-500",
      bg: "bg-sky-50 dark:bg-sky-600/20",
    },
    {
      id: 2,
      title: "اجازه تدریس",
      desc: "به هر مدرسی رو نمیده و فقط فقط با مدرسای سینیور و مید لول وارد همکاری میشه چون کیفیت براش مهمه",
      icon: <HiOutlineChatBubbleLeftRight />,
      style: "text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-600/20",
    },
    {
      id: 3,
      title: "دوره پولی یا رایگان",
      desc: "براش مهم نیست. به مدرسینش بهترین مزایا و دستمزد رو میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده",
      icon: <BsBarChart />,
      style: "text-green-500",
      bg: "bg-green-50 dark:bg-green-600/20",
    },
    {
      id: 4,
      title: " اولویت بندی به ترتیب منافع",
      desc: "در سبزلرن اولویت اول با مدرس هست چون اون قراره دل بسوزونه. اولویت دوم با کاربره چون باید کمکش کرد و درنهایت اولویت آخر با سبزلرنه",
      icon: <HiOutlineClipboardDocumentCheck />,
      style: "text-red-500 ",
      bg: "bg-red-50 dark:bg-red-600/20",
    },
  ];

  return (
    <section className="sm:mt-[8rem] mt-[6rem]">
      <div className="w-fit container">
        {/* title page */}
        <SectionHeader
          title="ما چه کمکی بهتون میکنیم؟"
          desc="از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست"
          spanColor="bg-sky-500"
        />

        {/* about us box */}
        <div className="container">
          <div className="w-fit grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-7 cursor-default sm:px-0 px-2">
            {AboutUs.map((value) => (
              <AboutUsBox key={value.id} {...value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
