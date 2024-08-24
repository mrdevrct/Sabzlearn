import React, { useEffect, useState } from "react";
import SectionHeader from "../../modules/Home/SectionHeader";
import CourseBox from "../../modules/CourseBox";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, setCourses } from "../../../services/Redux/actions";

export default function PopularCourses() {
  // get the courses in redux
  const dispatch = useDispatch();
  const dataCourses = useSelector((state) => state.courses);
  
  // validate the courses
  const [coursesInfo, setCoursesInfo] = useState([]);

  // Fetch courses on component mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Update courseInfo when courses or params change
  useEffect(() => {
    setCoursesInfo(dataCourses);
  }, [dataCourses]);

  // filters course in participants
  useEffect(() => {
    let filteredCourses = dataCourses;

    filteredCourses = filteredCourses
      .filter((item) => item.participants)
      .sort((a, b) => b.participants - a.participants)
      .slice(0, 4);

    setCoursesInfo(filteredCourses);
  }, [dataCourses]);

  return (
    <section className="sm:mt-[8rem] mt-[6rem]">
      <div className="w-fit container relative">
        {/* <!-- title page --> */}
        <SectionHeader
          title="دوره های پیش فروش"
          desc=" دورهای پیش فروش  بر اساس امتیاز دانشجو ها"
          spanColor="bg-yellow-500"
        />

        {/* <!-- courses --> */}
        <div className="w-fit grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 sm:px-0 px-2">
          {coursesInfo.length > 0 ? (
            coursesInfo.map((course) => (
              <CourseBox key={course.id} {...course} />
            ))
          ) : (
            <Link to="/courses">
              <button>برگشت به صفحه محصولاتی</button>
            </Link>
          )}
        </div>

        {/* <!-- bg gradient background --> */}
        <div className="hidden lg:block absolute left-0 top-0 -translate-x-44 -translate-y-[64%] w-60 h-60 bg-sky-500 opacity-25 blur-[125px] -z-10 rounded-full"></div>
      </div>
    </section>
  );
}
