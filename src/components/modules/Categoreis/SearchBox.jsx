import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Navigate, useNavigate } from "react-router-dom";

export default function SearchBox({
  courses,
  category,
  categoryPath,
  articles,
  placeholder,
}) {
  // search values
  const [searchValues, setSearchValues] = useState(null);
  const navigate = useNavigate();

  const searchHandler = (event) => {
    if (event.keyCode === 13) {
      if (category) {
        if (searchValues.trim()) {
          event.preventDefault(); // جلوگیری از رفتار پیش‌فرض
          navigate(`/category/${categoryPath}/?s=${searchValues}`);
        }
      } else if (articles) {
        if (searchValues.trim()) {
          event.preventDefault(); // جلوگیری از رفتار پیش‌فرض
          navigate(`/articles/?s=${searchValues}`);
        }
      } else if (courses) {
        event.preventDefault(); // جلوگیری از رفتار پیش‌فرض
        navigate(`/courses/?s=${searchValues}`);
      }
    }
  };

  return (
    <div className="h-17 bg-white rounded-xl p-4 md:p-5">
      <div className="flex justify-between gap-x-6 h-full text-slate-500">
        <input
          type="text"
          name="s"
          className="md:font-danaMedium placeholder-slate-500 bg-transparent flex-grow"
          placeholder={placeholder}
          onChange={() => setSearchValues(event.target.value)}
          onKeyDown={searchHandler}
        />
        <button>
          <CiSearch className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
