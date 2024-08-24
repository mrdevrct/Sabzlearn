import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <div className="lg:ml-7 lg:mr-6">
        <Link to="/" className="block">
          <img
            src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
            className="h-12"
            alt="Logo"
          />
        </Link>
      </div>
    </>
  );
}
