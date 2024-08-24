import React, { useEffect, useState } from "react";
import SectionHeader from "../../modules/Home/SectionHeader";
import ArticlBox from "../../modules/Articls/ArticlBox";
import apiRequest from "../../../services/Axios/config";

export default function LastArticl() {
  const [articl, setArticl] = useState([]);
  useEffect(() => {
    apiRequest("/articles").then((response) => {
      const articl = response.data;
      setArticl(articl);
    });
  }, []);

  return (
    <section className="sm:mt-[8rem] mt-[6rem]">
      <div className="w-fit container relative">
        {/* title articl */}
        <SectionHeader
          title="مقاله ها"
          desc="پیش به سوی ارتقای مهارت ها"
          linkTitle="مشاهده همه مقالات"
          path='/articles'
          spanColor="bg-yellow-500"
        />

        {/* articl boxs */}
        <div className="w-fit grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 sm:px-0 px-2">
          {articl.map((articl) => (
            <ArticlBox key={articl.id} {...articl} />
          ))}
        </div>

        {/* bg gradient background */}
        <div className="hidden lg:block absolute right-0 top-0 translate-x-2/3 -translate-y-[60%] w-60 h-60 bg-amber-400 opacity-25 blur-[125px] -z-10 rounded-full"></div>

      </div>
    </section>
  );
}
