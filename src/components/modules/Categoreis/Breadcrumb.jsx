import React from "react";
import "../../../css/ElementProprety/Breadcrumb.css";

export default function Breadcrumb({ links }) {
  return (
    <>
      <div className="breadcrumb">
        {links.map((link) => (
          <div className="breadcrumb__item" key={link.id}>
            <a href={link.to} className="breadcrumb__link">
              {link.title}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
