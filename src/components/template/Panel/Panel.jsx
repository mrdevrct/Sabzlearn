import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { BiHome } from "react-icons/bi";
import { HiOutlineFolderOpen } from "react-icons/hi2";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { CiPower } from "react-icons/ci";
import { HiOutlineBell } from "react-icons/hi2";
import { IoMoonOutline } from "react-icons/io5";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { HiOutlineTicket } from "react-icons/hi2";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";
import Profile from "../../modules/Navbar/userProfile";
import FormEditAccount from "./formEditAccount";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../services/Redux/actions";
import UserCourse from "./UserCourse";
import UserTickets from "./UserTickets";
import CourseBox from "../../modules/CourseBox";
import moment from "jalali-moment";
import apiRequest from "../../../services/Axios/config";

export default function dashboard() {
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.users);
  const [user, setUser] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [courses, setCourses] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const token = Cookies.get("Token");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (token && dataUsers.length > 0) {
        const userFound = dataUsers.find((user) => user.id === token);
        setUser(userFound);

        const ticketFind = await apiRequest(
          `/tickets/?userId=${userFound.id}`
        );
        const sortedTickets = ticketFind.data.sort(
          (a, b) => new Date(b.timeCreated) - new Date(a.timeCreated)
        );
        setTickets(sortedTickets);

        const sortedCourses = userFound.courses.sort(
          (a, b) => new Date(b.lastTimeAdded) - new Date(a.lastTimeAdded)
        );
        setCourses(sortedCourses);
      }
    };
    fetchData();
  }, [dataUsers, token]);

  if (!token) {
    location.pathname = "/login";
    return <div>loading ... </div>;
  }

  const logout = (event) => {
    event.preventDefault();
    Cookies.remove("Token", { domain: ".sabzlearn-best.liara.run" });
    location.pathname = "/";
  };  

  const addCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "0";
    }
  };

  const [lastRoute, setLastRoute] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    const parts = currentPath.split("/");
    const lastPart = parts[parts.length - 2];
    setLastRoute(lastPart);
    console.log(lastPart);
  }, []);

  const formatDate = (dateString) => {
    const date = moment(dateString, "YYYY-MM-DD").format("jYYYY/jMM/jDD");
    return date;
  };

  const openMenuHandler = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <main className="md:bg-white flex gap-x-10 2xl:gap-x-14 lg:px-8 xl:px-14 2xl:px-25 lg:py-7">
      <aside
        className={`sidebar fixed top-0 bottom-0 ${
          openMenu === true ? "right-0 z-50" : "-right-64"
        } lg:static bg-white flex flex-col w-64 lg:w-56 lg:mt-10 px-7 py-5 lg:px-0 lg:py-0 shrink-0 lg:min-h-[calc(100vh-68px)] transition-all lg:transition-none`}
      >
        <div className="flex items-center justify-between pb-5 mb-7 border-b md:border-none border-b-gray-200">
          <a href="/" className="flex items-center gap-x-1.5 md:gap-x-2.5">
            <img
              src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
              className="h-10 md:h-14"
              alt="سبز لرن"
            />
            <div className="w-[86px] md:w-32 h-10 md:h-[57px]">
              <h1 className="font-danaDemibold text-4xl">سبزلرن</h1>
              <span className="lg:text-sm md:text-[12px] sm:text-[10px] text-[10px]">
                S a b z l e a r n . i r
              </span>
            </div>
          </a>
        </div>
        <div className="space-y-2 text-zinc-700 font-danaMedium">
          {/* 1 */}
          <a
            href="/my-account/"
            className={`flex items-center gap-x-2.5 h-12 px-3 rounded-lg ${
              lastRoute === "my-account"
                ? "bg-green-500 text-white"
                : "hover:bg-gray-100 text-black"
            } `}
          >
            <BiHome className="text-[24px]" />
            پیشخوان{" "}
          </a>

          {/* 2 */}
          <a
            href="/my-account/courses/"
            className={`flex items-center gap-x-2.5 h-12 px-3 rounded-lg ${
              lastRoute === "courses" ? "bg-green-500 text-white" : "hover:bg-gray-100 text-black"
            }`}
          >
            <HiOutlineFolderOpen className="text-[24px]" />
            دوره های من{" "}
          </a>

          {/* 3 */}
          <a
            href="/my-account/tickets/"
            className={`flex items-center gap-x-2.5 h-12 px-3 rounded-lg ${
              lastRoute === "tickets" ? "bg-green-500 text-white" : "hover:bg-gray-100 text-black"
            } `}
          >
            <HiOutlineChatBubbleLeftRight className="text-[24px]" />
            تیکت های پشتیبانی{" "}
          </a>

          {/* 4 */}
          <a
            href="/my-account/edit-account/"
            className={`flex items-center gap-x-2.5 h-12 px-3 rounded-lg ${
              lastRoute === "edit-account"
                ? "bg-green-500 text-white"
                : "hover:bg-gray-100 text-black"
            } `}
          >
            <HiOutlineUser className="text-[24px]" />
            جزئیات حساب{" "}
          </a>

          {/* 5 */}
          <a
            href=""
            className="flex items-center gap-x-2.5 h-12 px-3 rounded-lg  text-black hover:bg-red-500 hover:text-white"
            onClick={logout}
          >
            <CiPower className="text-[25px]" />
            خروج{" "}
          </a>
        </div>
      </aside>
      {/* section */}
      <div className="w-full max-w-[1432px] mx-auto bg-gray-100 dark:bg-gray md:p-10 lg:rounded-3xl">
        <header className="flex items-center justify-between bg-white dark:bg-gray md:bg-transparent md:border-none border-b-gray-700 mb-6 md:mb-14 p-5 md:p-0">
          <h3 className="hidden md:block font-danaDemiBold text-2xl text-zinc-700 dark:text-white">
            {user.username} عزیز؛ خوش اومدی 🙌
          </h3>

          <div
            className="sidebar__open-btn flex gap-x-1 md:hidden font-danaMedium text-zinc-700"
            onClick={openMenuHandler}
          >
            <HiOutlineBars3BottomRight className="text-2xl" />
            {" "}
            {lastRoute === 'courses' ? (
              <>دوره های من</>
            ) : lastRoute === "tickets" ? (
              <>تیکت ها</>
            ) : lastRoute === "edit-account" ? (
              <>جزئیات حساب</>
            ) : (
              <>پیشخوان</>
            )}
          </div>

          <div className="flex gap-x-3.5 md:gap-x-7">
            <div className="notifications flex items-center justify-center w-14 h-14 bg-gray-100 md:bg-white  text-slate-500  rounded-full cursor-pointer text-2xl">
              <HiOutlineBell />
            </div>

            <div className="toggle-theme flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 md:bg-white text-slate-500 cursor-pointer transition-colors text-2xl">
              <IoMoonOutline />
            </div>

            <Profile bgColor="md:bg-white bg-gray-100" />
          </div>
        </header>

        <div className="px-5 md:px-0">
          {lastRoute === "courses" ? (
            <>
              <UserCourse userData={user} />
            </>
          ) : lastRoute === "tickets" ? (
            <>
              <UserTickets tickets={tickets} />
            </>
          ) : lastRoute === "edit-account" ? (
            <>
              <FormEditAccount />
            </>
          ) : (
            <>
              <div className="flex flex-wrap gap-x-3 gap-y-4 md:gap-x-10 mb-10">
                {/* 1 */}
                <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-amber-400 p-2 rounded-2xl">
                  <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
                    <HiOutlineCreditCard />
                  </div>
                  <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
                    <span className="text-sm font-danaMedium">
                      مجموع پرداخت ها
                    </span>
                    <span className="font-IRANSNumber text-sm md:text-lg">
                      {addCommas(user.paid)} &nbsp;
                      <span className="slms-price_symbol font-danaDemibold">
                        تومان
                      </span>
                    </span>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-sky-500 p-2 rounded-2xl">
                  <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
                    <HiOutlineRocketLaunch />
                  </div>
                  <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
                    <span className="text-sm font-danaMedium">دوره های من</span>
                    <span className="font-IRANSNumber text-sm md:text-lg">
                      {user && user.courses && user.courses.length > 0 ? (
                        <>
                          {user.courses.length}
                          <span className="slms-price_symbol font-danaDemibold">
                            {" "}
                            دوره{" "}
                          </span>
                        </>
                      ) : (
                        "0 دوره"
                      )}
                    </span>
                  </div>
                </div>

                {/* 3 */}
                <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-pink-500 p-2 rounded-2xl">
                  <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
                    <HiOutlineTicket />
                  </div>
                  <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
                    <span className="text-sm font-danaMedium">
                      مجموع تیکت ها{" "}
                    </span>
                    <span className="font-IRANSNumber text-sm md:text-lg">
                      <span className="slms-price_symbol font-IRANSNumber">
                        {tickets.length > 0 ? (
                          <>{tickets.length} تیکت</>
                        ) : (
                          <>تیکت 0</>
                        )}
                      </span>
                    </span>
                  </div>
                </div>

                {/* 4 */}
                <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-primary p-2 rounded-2xl">
                  <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
                    <HiOutlineCurrencyDollar />
                  </div>
                  <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
                    <span className="text-sm font-danaMedium">موجودی حساب</span>
                    <span className="font-IRANSNumber text-sm md:text-lg">
                      {addCommas(user.wallet)} &nbsp;
                      <span className="slms-price_symbol font-danaDemibold">
                        تومان
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-7 items-start">
                <div>
                  <div className="flex justify-between items-center bg-white px-4 py-3 md:p-5 mb-4 md:mb-5 rounded-2xl">
                    <span className="font-danaMedium md:text-xl text-zinc-700">
                      اخیرا مشاهده شده
                    </span>
                    <a
                      href="/my-account/courses/"
                      className="flex justify-center items-center max-w-fit cursor-pointer px-3.5 gap-x-1.5 h-[2.25rem] text-sm rounded-xl bg-sky-100 text-sky-500"
                    >
                      همه دوره های ثبت نام شده
                      <IoArrowBack />
                    </a>
                  </div>
                  <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-4">
                    {courses.map((course) => (
                      <CourseBox key={course.id} {...course} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-white p-3.5 md:p-4.5 rounded-2xl">
                    <div className="flex justify-between items-center pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200">
                      <span className="font-danaMedium md:text-xl text-zinc-700">
                        تیکت های اخیر
                      </span>
                      <a
                        href="/my-account/tickets/"
                        className="flex items-center gap-x-1.5 text-sky-500 text-sm"
                      >
                        همه تیکت ها
                        <IoArrowBack />
                      </a>
                    </div>
                    <div>
                      {tickets.map((ticket) => (
                        <div
                          className="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 rounded-xl transition-colors"
                          key={ticket.id}
                        >
                          <a
                            href=""
                            className="text-zinc-700 w-full sm:max-w-sm sm:truncate"
                          >
                            {ticket.tickets}
                          </a>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-500">
                              {formatDate(ticket.timeCreated)}
                            </span>
                            {ticket.answer ? (
                              <span className="text-xs py-1 px-1.5 text-green-500 bg-green-100 rounded">
                                پاسخ داده شده
                              </span>
                            ) : (
                              <span className="text-xs py-1 px-1.5 text-slate-500 bg-slate-500/10  rounded">
                                در انتظار پاسخ
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-3.5 md:p-4.5 rounded-2xl mt-7">
                    <div className="flex justify-between items-center pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200 dark:border-b-gray-700">
                      <span className="font-danaMedium md:text-xl text-zinc-700">
                        پرسش های اخیر
                      </span>
                    </div>
                    <div>
                      <div className="text-zinc-700 font-danaLight mt-7 mb-2 leading-7 text-center">
                        تا به الان پرسشی ارسال نکرده‌اید!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {openMenu && (
          <div
            className="overlay fixed w-full h-full top-0 left-0 bg-black/40 z-40 transition-all"
            onClick={openMenuHandler}
          ></div>
        )}
      </div>
    </main>
  );
}
