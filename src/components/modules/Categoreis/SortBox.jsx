import React from "react";
import "../../../css/ElementProprety/button.css";
import "../../../css/ElementProprety/FiltersMobile.css";

export default function SortBox({ platform, sortName, onSortChange, active ,onClick}) {
  return (
    <>
      {platform === "desktop" && (
        <button
          className={`sort-btn font-danaLight ${
            active ? "sort-btn--active" : ""
          }`}
          onClick={() => onSortChange(sortName)}
        >
          {sortName}
        </button>
      )}
      {platform === "mobile" && (
        <a
          className={`bottom-sheet__item ${ active ? "bottom-sheet__item--selected" : ''}`}
          onClick={() => onSortChange(sortName)}
        >
          <span onClick={onClick}>{sortName}</span>
        </a>
      )}
    </>
  );
}
