import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, fetchUsers } from "../../../services/Redux/actions";
import Breadcrumb from "../../modules/Categoreis/Breadcrumb";
import { LuHome } from "react-icons/lu";
import apiRequest from "../../../services/Axios/config";
import "../../../css/ElementProprety/CourseParts.css";

// icon

import CourseInfo from "../../modules/Lesson/CourseInfo";
import CourseComment from "../../modules/Lesson/CourseComment";
import CourseDetailsBox from "../../modules/Lesson/CourseDetailsBox";
import CourseProgress from "../../modules/Lesson/CourseProgress";
import CourseTeacher from "../../modules/Lesson/CourseTeacher";
import CourseChapters from "../../modules/Lesson/CourseChapters";
import Cookies from "js-cookie";

export default function CourseParts() {
  // get the courses in redux
  const dispatch = useDispatch();
  const dataCourses = useSelector((state) => state.courses);
  const token = Cookies.get("Token");

  // params in page route
  const { courseInfo } = useParams();

  // validate the course
  const [course, setCourse] = useState([]);

  // validate the course chapters
  const [chapterCourse, setChapterCourse] = useState([]);

  // validate the course episodes
  const [episodeCourse, setEpisodeCourse] = useState([]);

  // validate the category path
  const [categoryPath, setCategoryPath] = useState(null);

  // وضعیت موقت برای نگهداری اطلاعات بارگیری
  const [isLoading, setIsLoading] = useState(true);
  // وضعیت موقت برای نگهداری اطلاعات کاربر
  const [userData, setUserData] = useState(null);

  // Fetch courses and user data on component mount
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      // بارگیری اطلاعات
      try {
        // درخواست اطلاعات کاربر از سرور
        const userDataResponse = await apiRequest(`/users/${token}`);
        if (userDataResponse && userDataResponse.data) {
          const userData = userDataResponse.data;
          setUserData(userData);
          // پیدا کردن دوره مورد نظر در داده‌های کاربر
          const courseInUsers = userData.courses.find(
            (course) => course.name === courseInfo.split("-")[0]
          );
          if (courseInUsers) {
            // پیدا کردن دوره مورد نظر در داده‌های Redux
            const foundCourse = dataCourses.find(
              (c) => c.name === courseInfo.split("-")[0]
            );
            if (foundCourse) {
              setCourse(foundCourse);
              setChapterCourse(foundCourse.session);
              const chapterId = parseInt(courseInfo.split("-")[1]);
              const foundChapter = foundCourse.session.find(
                (chap) => chap.id === chapterId
              );

              if (foundChapter) {
                const episodeId = parseInt(courseInfo.split(":")[1]);
                const foundEpisode = foundChapter.Episode.find(
                  (epsid) => epsid.id === episodeId
                );
                setEpisodeCourse(foundEpisode);
                // تغییر وضعیت به false بعد از بارگیری اطلاعات
                setIsLoading(false);
              }
            }
          } else {
            // اگر کاربر دوره را نداشت، به صفحه اصلی هدایت شود
            location.pathname = "/";
          }
        } else {
          location.pathname = "/";
          return <div>loading ...</div>;
        }
      } catch (error) {
        location.pathname = "/";
        return <div>loading ...</div>;
      }
    };
    fetchData();
  }, [dataCourses, courseInfo, token]);

  // Get Path Categoreis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest("/Categories");
        const category = response.data.find(
          (category) => course && course.category === category.title
        );
        setCategoryPath(category.path);
      } catch (error) {}
    };
    fetchData();
  }, [course]);

  // اگر در حالت بارگیری باشد، اطلاعات را نمایش نده
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // اگر کاربر دوره را داشته باشد، اطلاعات کاربری را نمایش دهید
  // در غیر این صورت، کاربر به صفحه اصلی هدایت شود
  if (userData && userData.courses.find((course) => course.name === courseInfo.split("-")[0])) {
    return (
      <section className="mx-auto overflow-x-hidden mt-8 sm:mt-10">
        <div className="container">
          {/* <!-- Breadcrumb --> */}
          <Breadcrumb
            links={[
              {
                id: 1,
                title: <LuHome className="text-[25px] text-gray-400 ml-2" />,
                to: "/",
              },
              {
                id: 2,
                title: "دوره ها",
                to: "/courses",
              },
              {
                id: 3,
                title: `${course.category}`,
                to: `/category/${categoryPath}`,
              },
              {
                id: 4,
                title: `${course.title}`,
                to: `/course/${course.name}`,
              },
            ]}
          />

          {/* <!-- Course Lesson --> */}
          <div className="aspect-video mt-8 sm:mt-10 overflow-hidden rounded-xl">
            <ReactPlayer
              url={episodeCourse.video}
              className="w-full h-full overflow-hidden rounded-xl"
              width="100%"
              height="100%"
              controls={true}
            />
          </div>

          <div className="grid grid-cols-12 gap-y-6 gap-x-5 lg:gap-x-7 mt-6 lg:mt-8 ">
            <div className="col-span-full order-last md:order-none md:col-span-7 xl:col-span-8">
              {/* !<-- info --> */}
              <CourseInfo courseData={course} episodeData={episodeCourse} />

              {/* !<-- Comment --> */}
              <CourseComment />
            </div>

            {/* !<-- Side --> */}
            <aside className="col-span-full order-first md:order-none md:col-span-5 xl:col-span-4">
              {/* Chapter */}
              <div className="bg-white border border-gray-100 pl-2 pr-5 sm:pr-5 py-5 sm:py-5 rounded-xl mt-6 lg:mt-0">
                {/* title Chapter */}
                <div className="flex items-center gap-x-2 mb-5 pb-5 border-b">
                  <span className="font-danaDemibold text-lg">
                    سرفصل های دوره
                  </span>
                </div>

                {/* Chapters */}
                <div className="overflow-y-scroll pl-2 max-h-[602px]">
                  <CourseChapters
                    chapterData={chapterCourse}
                    courseData={courseInfo}
                    course={course}
                  />
                </div>
              </div>

              {/* details box */}
              <CourseDetailsBox />

              {/* progress  */}
              <CourseProgress />

              {/* teacher */}
              <CourseTeacher courseData={course} />
            </aside>
          </div>
        </div>
      </section>
    );
  } else {
    location.pathname = "/";
    return null;
  }
}
