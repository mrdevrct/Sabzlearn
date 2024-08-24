import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SortBox from "../../modules/Categoreis/SortBox";
import apiRequest from "../../../services/Axios/config";
import "../../../css/ElementProprety/Input.css";
import { LuArrowUpDown } from "react-icons/lu";
import Button from "../../modules/Button";
import CourseBox from "../../modules/CourseBox";

// icons
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { BiXCircle } from "react-icons/bi";

export default function Category() {
  // get params page route 
  const { teacherName } = useParams();

  // validate courses teacher
  const [courses, setCourses] = useState([]);
  
  // validate backup Courses teacher
  const [backupCourses, setBackupCourses] = useState([]);
  const [isSortMobile, setIsSortMobile] = useState(false);
  const [active, setActive] = useState([]);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const teacherResponse = await apiRequest("/teachers");
        const foundTeacher = teacherResponse.data.find((teacher) => teacher.name === teacherName);
        if (foundTeacher) {
          setTeacher(foundTeacher);
          setCourses(foundTeacher.courses);
          setBackupCourses(foundTeacher.courses);
        }
      } catch (error) {}
    };

    fetchTeacher();
  }, [teacherName]);

  // function handler sort Courses
  const handleSortChange = (sortName) => {
    let sortedCourses = [...courses];

    if (sortName === "ارزان ترین") {
      sortedCourses.sort((a, b) => a.price - b.price);
    } else if (sortName === "گران ترین") {
      sortedCourses.sort((a, b) => b.price - a.price);
    } else if (sortName === "پر مخاطب ها") {
      sortedCourses.sort((a, b) => b.participants - a.participants);
    } else {
      sortedCourses = backupCourses;
    }

    setCourses(sortedCourses);
    setActive(sortName);
  };

  // teacher is valid
  if (!teacher) {
    return <div>Loading...</div>;
  }

  // function handler open menu sort mobile
  const openSortMobile = () => {
    setIsSortMobile(!isSortMobile);
  };

  return (
    // section categories
    <main className="mt-20">
      <div className="w-fit container">
        {/* content */}
        <section className="grid grid-cols-12 gap-y-5 md:gap-x-7">
          {/* search and filters */}
          <aside className="col-span-full lg:col-span-4 xl:col-span-3 lg:sticky top-6 space-y-6">
            <div className="bg-white dark:bg-darker p-5 rounded-xl">
              {/* teacher Info */}
              <div className="text-center mb-5">
                {/* teacher img */}
                <img
                  className="size-28 mx-auto object-cover rounded-full"
                  src={teacher.img}
                  alt={teacher.name}
                />

                {/* teacher name */}
                <h5 className="font-danaDemibold text-lg mt-5 mb-2">
                  {teacher.name}
                </h5>

                {/* teacher description */}
                <p className="text-sm">{teacher.description}</p>

                {/* teacher social */}
                <div className="flex justify-center gap-3 mt-4">
                  {teacher.social.map((social, index) =>
                    social.name === "instagram" ? (
                      <Button
                        key={index}
                        icon={<FaInstagram />}
                        className="button-primary button-xl button-outline only-icon"
                      />
                    ) : (
                      <Button
                        key={index}
                        icon={<FaTelegramPlane />}
                        className="button-primary button-xl button-outline only-icon"
                      />
                    )
                  )}
                </div>
              </div>

              {/* teacher skills */}
              <div className="space-y-4">
                {teacher.skills.map((skills) => (
                  <div
                    className="flex items-center justify-between px-3 h-12 bg-gray-100 select-none rounded-md"
                    key={skills.id}
                  >
                    <span className="text-slate-500 dark:text-white">
                      {skills.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* content sort and courses */}
          <section className="col-span-full lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
            {/* <!-- sort in courses --> */}
            <div className="hidden lg:flex items-center gap-x-6 px-5 mb-8 h-16 bg-white shadow-normal rounded-xl">
              <div className="flex items-center shrink-0 gap-x-2 px-4">
                <LuArrowUpDown className="text-[25px]" />
                <span className="font-danaMedium">مرتب سازی بر اساس :</span>
              </div>
              <div className="flex items-center font-danaLight gap-x-2 lg:gap-x-8 h-full">
                <SortBox
                  platform="desktop"
                  sortName="همه دورها"
                  onSortChange={handleSortChange}
                  active={active === "همه دورها"}
                />
                <SortBox
                  platform="desktop"
                  sortName="ارزان ترین"
                  onSortChange={handleSortChange}
                  active={active === "ارزان ترین"}
                />
                <SortBox
                  platform="desktop"
                  sortName="گران ترین"
                  onSortChange={handleSortChange}
                  active={active === "گران ترین"}
                />
                <SortBox
                  platform="desktop"
                  sortName="پر مخاطب ها"
                  onSortChange={handleSortChange}
                  active={active === "پر مخاطب ها"}
                />
              </div>
            </div>

            {/* mobile sort */}
            <div className="flex md:hidden items-center gap-6 mb-8">
              <div
                className="w-full bg-white text-black h-[52px] px-4 gap-x-2.5 text-base flex cursor-pointer items-center rounded-full font-danaMedium justify-center"
                onClick={openSortMobile}
              >
                <LuArrowUpDown className="text-[24px]" />
                <span>همه دوره ها</span>
              </div>
            </div>

            {/* <!-- courses --> */}
            <div className="posts_wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 sm:px-0 px-2">
              {courses.map((course) => (
                <CourseBox key={course.id} {...course} />
              ))}
            </div>
          </section>
        </section>
      </div>

      {/* sort Mobile */}
      <div
        className={`bottom-sheet ${isSortMobile ? "bottom-sheet--open" : ""}`}
      >
        <div className="bottom-sheet__header">
          <span className="bottom-sheet__name font-danaDemibold">
            مرتب سازی بر اساس
          </span>
          <button className="bottom-sheet__close-btn" onClick={openSortMobile}>
            <BiXCircle className="text-[25px]" />
          </button>
        </div>

        <div className="bottom-sheet__body font-danaMedium">
        <SortBox
            platform="mobile"
            sortName="همه دورها"
            onSortChange={handleSortChange}
            active={active === "همه دورها"}
            onClick={openSortMobile}
          />
          <SortBox
            platform="mobile"
            sortName="ارزان ترین"
            onSortChange={handleSortChange}
            active={active === "ارزان ترین"}
            onClick={openSortMobile}
          />
          <SortBox
            platform="mobile"
            sortName="گران ترین"
            onSortChange={handleSortChange}
            active={active === "گران ترین"}
            onClick={openSortMobile}
          />
          <SortBox
            platform="mobile"
            sortName="پر مخاطب ها"
            onSortChange={handleSortChange}
            active={active === "پر مخاطب ها"}
            onClick={openSortMobile}
          />
        </div>
      </div>

      {/* bg shadow */}
      {isSortMobile && (
        <div
          className="overlay fixed w-full h-full top-0 left-0 bg-black/40 z-40 transition-all"
          onClick={openSortMobile}
        ></div>
      )}
    </main>
  );
}
