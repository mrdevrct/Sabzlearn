import React from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

export default function Button({ title, path , className}) {
  return (
    <>
      {title && (
        <Link
          to={path}
          className={ className || 'flex items-center gap-x-2 sm:px-4 sm:py-3.5 text-green-500 sm:hover:bg-green-500 sm:hover:text-white rounded-full transition-colors'}
        >
          <span className="font-danaMedium">{title}</span>
          <GoArrowLeft />
        </Link>
      )}
    </>
  );
}
