import React from "react";
import Logo from "./Navbar/logo";
import Profile from "./Navbar/userProfile";
import SearchBox from "./Navbar/search";
import MenuNav from "./Navbar/menuNav";
import Theme from "./Navbar/theme";
import { HiBars3 } from "react-icons/hi2";
import NavigationMenu from './Navbar/MobileMenu'
import { useDispatch, useSelector } from "react-redux";
import { setOpenMenu } from '../../services/Redux/actions'; 


export default function Header() {
  // open menu in redux
  const dispatch = useDispatch();
  const openMenu = useSelector((state) => state.OpenMenu);

  const toggleMenu = () => { 
    dispatch(setOpenMenu(!openMenu)); // تغییر وضعیت منو
  };

  

  return (
    <>
      <div className="bg-white flex items-center justify-between mx-auto w-full h-[84px] md:h-[6rem] px-4 lg:px-12">
        <div className="navigation__open-btn button-lg bg-gray-100 dark:bg-white/5 only-icon lg:hidden">
          <HiBars3
            className="w-5 h-5 text-slate-500 dark:text-white cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        <nav className="flex items-center h-13">
          {/* Logo Navbar */}
          <Logo />

          {/* Navigation Navbar */}
          <NavigationMenu />

          {/* Menu Navbar */}
          <MenuNav platform='desktop'/>
        </nav>

        <div dir="ltr" className="flex items-center gap-x-5 h-13">
          {/* Profile User */}
          <Profile />
          {/* mode theme */}
          <Theme />
          {/* Search */}
          <SearchBox platform='desktop'/>

        </div>
        {openMenu  && (
          <div
            className="overlay fixed w-full h-screen top-0 left-0 bg-black/40 z-40 transition-all"
            onClick={toggleMenu}
          ></div>
        )}
      </div>
    </>
  );
}