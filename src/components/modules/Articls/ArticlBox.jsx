import React from "react";
import Caver from './CoverImg'
import LinkBtn from './Link'
import Icon from './icon'
import '../../../css/ElementProprety/Blog-Banner.css'
import TitleAndDescription from "./TitleAndDescription";

export default function ArticlBox(props) {
  return (
    <>
      <div className="flex flex-col w-[20rem] overflow-hidden bg-white dark:bg-gray-800 shadow-light dark:shadow-none dark:border border-gray-700 rounded-2xl">
        <Caver img={props.img}/>
        
        <div className="flex flex-col gap-y-8 flex-grow px-5">
            <TitleAndDescription
            title={props.title}
            description={props.desc}
            />
          <div className="mt-auto space-y-2">
            <Icon data={props}/>
            <hr className="text-[#647488]"/>

          <div className="flex justify-center pt-[12px] pb-[25px]">
            <LinkBtn/>
          </div>

          </div>
        </div>
      </div>
    </>
  );
}
