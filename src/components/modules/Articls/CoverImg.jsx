import React from "react";

export default function cover({img}) {
  return (
    <>
        <div className="blog__banner relative h-[182px]  overflow-hidden">
          <img
            src={img}
            className="block w-full h-full object-cover"
            loading="lazy"
          />
        </div>
    </>
  );
}
