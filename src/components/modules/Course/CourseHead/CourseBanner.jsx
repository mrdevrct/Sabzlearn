import React from "react";

export default function CourseVideo({ srcVideo, posterVideo }) {
  return (
    <div className="overflow-hidden rounded-2xl order-1 lg:order-2 xl:h-[370px]">
      <video
        src={srcVideo}
        poster={posterVideo}
        className="w-full h-full object-cover"
        alt="آموزش جامع webpack"
        controls
      ></video>
    </div>
  );
}
