import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import apiRequset from "../../../services/Axios/config.js";
import "../../../css/ElementProprety/button.css";

//icon
import { HiMiniArrowRightOnRectangle } from "react-icons/hi2";
import { BiHome } from "react-icons/bi";
import { HiOutlineFolderOpen } from "react-icons/hi2";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { CiPower } from "react-icons/ci";

// get data in redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setUsers } from "../../../services/Redux/actions.js";

export default function UserProfile({bgColor}) {
  // get users in redux
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.users);
  const [users, SetUsers] = useState([]);

  // get token
  const Token = Cookies.get("Token");

  // validate is open profile
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Fetch courses on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Update courseInfo when courses or params change
  useEffect(() => {
    if (Token && dataUsers.length > 0) {
      const userFind = dataUsers.find(user => user.id === Token)
      SetUsers(userFind);
    }
  }, [dataUsers]);

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const LogoutHandler = () => {
    Cookies.remove("Token", { domain: "sabzlearn-best.liara.run" }); // حذف توکن از کوکی‌ها با توجه به دامنه مشخص شده
    setIsProfileOpen(false);
  };
  
  const addCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "0";
    }
  };

  return (
    <>
      <div className="relative group">
        <div className="container">
          <div
            className={`relative group ${
              isProfileOpen ? "z-50" : ""
            } cursor-pointer`}
          >
            {Token ? (
              <button
                className={`user-profile button-xl only-icon ${bgColor || 'bg-gray-100 sm:bg-gray-100'} text-slate-500`}
                onClick={handleProfileToggle}
              >
                <HiOutlineUser className="text-[20px]" />
              </button>
            ) : (
              <>
                {/* mobile btn login */}
                <Link
                  to="/login"
                  className={`flex lg:hidden button-xl only-icon bg-gray-100 text-slate-500`}
                >
                  <HiMiniArrowRightOnRectangle className="text-[24px]" />
                </Link>
                {/* desktop btn login */}
                <Link
                  to="/login"
                  className="hidden lg:flex button-xl button-secondary hover:text-white hover:bg-sky-600 font-danaMedium"
                >
                  ورود | عضویت
                  <HiOutlineUser className="text-[18px]" />
                </Link>
              </>
            )}
          </div>

          {isProfileOpen && (
            <div
              className="absolute left-0 top-full pt-4 z-50 transition-all show"
              dir="rtl"
            >
              <div className="w-[278px] bg-white dark:bg-darker border border-neutral-100 dark:border-0 p-5 pb-3.5 rounded-xl">
                <div className="flex items-center border-b border-b-gray-300 pb-5 mb-2">
                  <a href="" className="shrink-0">
                    <img
                      src="https://secure.gravatar.com/avatar/528a5bf0557c32011fe9642f619f90d9?s=96&d=mm&r=g"
                      className="object-cover w-14 h-14 rounded-full inline-block"
                      alt="avatar-user"
                    />
                  </a>
                  <div className="mr-3.5 flex flex-col gap-y-3 overflow-hidden">
                    <h3 className="font-danaDemibold inline-block truncate">
                      {users.username}
                    </h3>
                    <p className="text-sm text-green-500 inline-block font-IRANSNumber">
                      موجودی : {addCommas(users.wallet)} تومان
                    </p>
                  </div>
                </div>

                {/* 1 */}
                <a
                  href="/my-account/"
                  className="flex items-center justify-between px-2.5 h-12 rounded-lg hover:text-white hover:bg-green-500 transition-colors"
                >
                  <span className="flex items-center gap-x-2">
                    <BiHome className="text-[24px]" />
                    پیشخوان
                  </span>
                </a>

                {/* 2 */}
                <a
                  href="/my-account/courses/"
                  className="flex items-center justify-between px-2.5 h-12 rounded-lg hover:text-white hover:bg-green-500 transition-colors"
                >
                  <span className="flex items-center gap-x-2">
                    <HiOutlineFolderOpen className="text-[24px]" />
                    دوره های من
                  </span>
                </a>

                {/* 3 */}
                <a
                  href="/my-account/tickets/"
                  className="flex items-center justify-between px-2.5 h-12 rounded-lg hover:text-white hover:bg-green-500 transition-colors"
                >
                  <span className="flex items-center gap-x-2">
                    <HiOutlineChatBubbleLeftRight className="text-[24px]" />
                    تیکت های پشتیبانی
                  </span>
                </a>

                {/* 4 */}
                <a
                  href="/my-account/edit-account/"
                  className="flex items-center justify-between px-2.5 h-12 rounded-lg hover:text-white hover:bg-green-500 transition-colors"
                >
                  <span className="flex items-center gap-x-2">
                    <HiOutlineUser className="text-[24px] " />
                    جزئیات حساب
                  </span>
                </a>

                <div className="mt-2 pt-2 border-t border-t-gray-300">
                  <a
                    href="/"
                    className="flex items-center justify-between px-2.5 h-12 rounded-lg hover:text-white hover:bg-red-500 transition-colors"
                    onClick={LogoutHandler}
                  >
                    <span className="flex items-center gap-x-2">
                      <CiPower className="text-[24px]" />
                      خروج
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        {isProfileOpen && (
          <div
            className="overlay fixed w-full h-full top-0 left-0 bg-black/40 z-40 transition-all"
            onClick={handleProfileToggle}
          ></div>
        )}
      </div>
    </>
  );
}
