import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import apiRequest from "../../../services/Axios/config";
import { useDispatch, useSelector } from "react-redux";
import { setOpenMenu } from "../../../services/Redux/actions";
import SearchBox from './search'
import MenuNav from "./menuNav";

export default function MobileMenu() {
  // open menu
  const dispatch = useDispatch();
  const openMenu = useSelector((state) => state.OpenMenu);

  const toggleMenu = () => {
    dispatch(setOpenMenu(!openMenu)); // تغییر وضعیت منو
  };

  return (
    <>
      <div
        className={`navigation lg:hidden bg-white dark:bg-darker w-64 overflow-y-auto fixed top-0 bottom-0 right-0 z-50 p-4 transition-all ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* icon close and logo site */}
        <div className="flex justify-between relative pb-6">
          <img
            src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
            className="h-12"
            alt="سبز لرن"
          />
          <div className="flex gap-x-3">
            <div className="navigation__close-btn button-lg only-icon bg-gray-100 text-slate-500">
              <GrClose onClick={toggleMenu} />
            </div>
          </div>
        </div>
        <hr />
        {/* search box */}
        <SearchBox platform='mobile'/>

        {/* list Menu item */}
        <div className="mt-6">
        <MenuNav platform='mobile'/>
        </div>
      </div>
    </>
  );
}
