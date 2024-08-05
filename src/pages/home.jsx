import React from "react";
import Header from "../components/template/Home/Header";
import LastCourses from "../components/template/Courses/LastCourses";
import AboutUs from "../components/template/AboutUs/AboutUs"
import PopularCourses from "../components/template/Courses/PopularCourses";
import PresellCourses from "../components/template/Courses/PresellCourses";
import LastArticls from "../components/template/Articls/LastArticl";
import RoadMap from "../components/template/RoadMap/RoadMap"
import Banner from "../components/modules/Banner"


export default function home() {
  return (
    <>
      <Header />
      <LastCourses/>
      <RoadMap />
      <AboutUs />
      <PopularCourses />
      <LastArticls />
      <Banner />
      <PresellCourses />
    </>
  );
}
