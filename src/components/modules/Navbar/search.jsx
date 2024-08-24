import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setOpenMenu } from "../../../services/Redux/actions";

export default function Input({ platform }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openMenu = useSelector((state) => state.OpenMenu);

  const toggleMenu = () => {
    dispatch(setOpenMenu(!openMenu));
  };

  const searchHandler = (event) => {
    if (event.keyCode === 13) {
      if (search.trim()) {
        navigate(`/courses/?s=${search}`);
        if (platform === "mobile") {
          toggleMenu();
        }
      } else if (!search.trim()) {
        navigate(`/courses`);
        if (platform === "mobile") {
          toggleMenu();
        }
      }
    }
  };

  const searchBtnHandler = () => {
    if (search.trim()) {
      navigate(`/courses/?s=${search}`);
      if (platform === "mobile") {
        toggleMenu();
      }
    } else if (!search.trim()) {
      navigate(`/courses`);
      if (platform === "mobile") {
        toggleMenu();
      }
    }
  };

  return (
    <>
      {/* search box in desktop */}
      {platform === "desktop" && (
        <div className="relative group hidden lg:block">
          <div className="hidden xl:block">
            <label className="relative h-[52px] block">
              <input
                type="text"
                className="bg-gray-100 text-slate-500 text-sm font-danaMedium rounded-full xl:w-80 h-full text-right"
                placeholder="چیو میخوای یاد بگیری؟"
                onKeyDown={searchHandler}
                onChange={() => setSearch(event.target.value)}
                style={{ paddingRight: "1rem"}}
              />
              <button
                className="absolute left-3 top-0 bottom-2 w-6 h-6 my-auto text-slate-500"
                onClick={searchBtnHandler}
              >
                <CiSearch className="text-[30px]" />
              </button>
            </label>
          </div>
        </div>
      )}

      {/* search box in mobile */}
      {platform === "mobile" && (
        <div className="relative h-13 block mt-4">
          <input
            className="bg-gray-100 text-slate-500 text-sm font-danaMedium rounded-full w-full h-[40px] text-right"
            type="text"
            placeholder="چیو میخوای یاد بگیری؟"
            onKeyDown={searchHandler}
            onChange={(event) => setSearch(event.target.value)}
            style={{ paddingRight: "1rem", paddingLeft: "3rem" }}
          />

          <button
            className="absolute left-2 top-0 bottom-0 w-7 h-7 my-auto text-slate-500"
            onClick={searchBtnHandler}
          >
            <CiSearch className="text-[26px] mb-1" />
          </button>
        </div>
      )}
    </>
  );
}
