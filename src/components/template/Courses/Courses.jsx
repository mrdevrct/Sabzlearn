import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

// get data in redux
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";

// components
import CourseBox from "../../modules/CourseBox";
import HeaderCategories from "../Categories/HeaderCategories";
import SortBox from "../../modules/Categoreis/SortBox";
import FilterBox from "../../modules/Categoreis/FilterBox";
import SearchBox from "../../modules/Categoreis/SearchBox";

// icon
import { LuArrowUpDown } from "react-icons/lu";
import { HiOutlineFunnel } from "react-icons/hi2";
import { BiXCircle } from "react-icons/bi";
import { CiTrash } from "react-icons/ci";

export default function Courses() {
  // get data courses in redux
  const dispatch = useDispatch();
  const dataCourses = useSelector((state) => state.courses);

  // validate courses
  const [coursesInfo, setCoursesInfo] = useState([]);

  // validate filter and sort mobile
  const [isFilterMobile, setIsFilterMobile] = useState(false);
  const [isSortMobile, setIsSortMobile] = useState(false);

  // validate active sort 
  const [active, setActive] = useState(null);

  // get params in page route
  const { categoryName } = useParams();

  // validate search
  const location = useLocation();
  const [searchValue, setSearchValue] = useState(""); // افزودن متغیر searchQuery
  
  // filter mobile
  const [freeCoursesOnly, setFreeCoursesOnly] = useState(false);
  const [preSaleCoursesOnly, setPreSaleCoursesOnly] = useState(false);
  const [purchasedCoursesOnly, setPurchasedCoursesOnly] = useState(false);

  // Fetch courses on component mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Update courseInfo when courses or params change
  useEffect(() => {
    setCoursesInfo(dataCourses);
  }, [dataCourses]);

  // search for courses
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newSearchQuery = queryParams.get("s");

    setSearchValue(newSearchQuery || ""); // تنظیم مقدار جدید برای searchQuery

    let filteredCourses = dataCourses;

    if (newSearchQuery) {
      filteredCourses = dataCourses.filter((course) =>
        course.title.toLowerCase().includes(newSearchQuery.toLowerCase())
      );
    }

    if (categoryName) {
      filteredCourses = filteredCourses.filter(
        (course) => course.category.toLowerCase() === categoryName.toLowerCase()
      );
    }

    setCoursesInfo(filteredCourses);
  }, [location.search, dataCourses, categoryName]);

  // function handler sort by courses
  const handleSortChange = (sortName) => {
    let sortedCourses = [...dataCourses];
    if (sortName === "ارزان ترین") {
      sortedCourses.sort((a, b) => a.price - b.price);
    } else if (sortName === "گران ترین") {
      sortedCourses.sort((a, b) => b.price - a.price);
    } else if (sortName === "پر مخاطب ها") {
      sortedCourses.sort((a, b) => b.participants - a.participants);
    } else {
      sortedCourses = dataCourses;
    }
    setCoursesInfo(sortedCourses);
    setActive(sortName);
  };

  // function handler filter the courses
  const handleFilterChange = (event, operator) => {
    let sortedCourses = [...coursesInfo];
    if (event.target.checked === true) {
      if (operator === "دوره های رایگان") {
        sortedCourses = sortedCourses.filter((course) => course.price === 0);
      }
    } else {
      sortedCourses = dataCourses;
    }
    setCoursesInfo(sortedCourses);
  };

  // function handler open menu filter mobile
  const openFilterMobile = () => {
    setIsFilterMobile(!isFilterMobile);
  };

  // function handler open menu sort mobile
  const openSortMobile = () => {
    setIsSortMobile(!isSortMobile);
  };

  // handel filter course to  mobile
  const handleFilterSubmit = () => {
    let filteredCourses = dataCourses;

    if (freeCoursesOnly) {
      filteredCourses = filteredCourses.filter((course) => course.price === 0);
    }

    setCoursesInfo(filteredCourses);
    openFilterMobile()
  };
  // remove handel filter course to  mobile
  const handleFilterClear = () => {
    setFreeCoursesOnly(false);
    setPreSaleCoursesOnly(false);
    setPurchasedCoursesOnly(false);
  
    setCoursesInfo(dataCourses)
  };

  // search for course in categories
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchParamValue = searchParams.get("s");
    setSearchValue(searchParamValue || "");

    let filteredCourses = dataCourses;

    if (searchParamValue) {
      filteredCourses = dataCourses.filter((course) => course.title.toLowerCase().includes(searchParamValue.toLowerCase()));
    } 

    setCoursesInfo(filteredCourses);
  }, [location.search, dataCourses, categoryName]);


  return (
    <main className="mt-20">
      <div className="w-fit container">
        {/* <!-- title page --> */}
        {searchValue ? (
          <HeaderCategories
            titlePage={`جستجو : ${searchValue}`}
            quantityCourses={coursesInfo.length}
          />
        ) : (
          <HeaderCategories
            titlePage="همه دوره ها"
            quantityCourses={coursesInfo.length}
          />
        )}

        {/* <!-- content --> */}
        <section className="grid grid-cols-12 gap-y-5 md:gap-x-7">
          {/* <!-- search and filters --> */}
          <div className="col-span-full lg:col-span-4 xl:col-span-3 lg:sticky top-6 space-y-6 px-2 md:px-0">
            <form className="space-y-6">
              {/* <!-- search box --> */}
              <SearchBox
                courses='search courses'
                placeholder="جستجو بین دورها"
              />

              {/* <!-- toggle filters --> */}
              <FilterBox
                operator="دوره های رایگان"
                onFilterChange={handleFilterChange}
              />
              <FilterBox
                operator="دوره های پیش فروش"
                onFilterChange={handleFilterChange}
              />
              <FilterBox
                operator="دوره های خریداری شده "
                onFilterChange={handleFilterChange}
              />
            </form>
          </div>

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

            {/* mobile sort and filter */}
            <div className="flex md:hidden items-center gap-6 mb-8">
              <div
                className="flex cursor-pointer items-center rounded-full justify-center font-danaMedium h-[52px] px-4 text-lg gap-x-3 bg-white text-black w-1/2"
                onClick={openFilterMobile}
              >
                <HiOutlineFunnel className="text-[24px]" />
                <span>فیلتر</span>
              </div>
              <div
                className="flex cursor-pointer items-center rounded-full justify-center font-danaMedium h-[52px] px-4 text-lg gap-x-3 bg-white text-black w-1/2"
                onClick={openSortMobile}
              >
                <LuArrowUpDown className="text-[24px]" />
                <span>همه دوره ها</span>
              </div>
            </div>

            {/* <!-- courses --> */}
            <div className="posts_wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 sm:px-0 px-2">
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

      {/* filter mobile */}
      <div className={` filter ${isFilterMobile ? "filter--open" : ""}`}>
        <div className="filter__header">
          <div className="flex items-center gap-x-2">
            <button
              className="filter__close-btn flex items-center justify-center mb-1"
              onClick={openFilterMobile}
            >
              <BiXCircle className="text-[25px]" />
            </button>
            <span className="font-danaDemibold text-lg">فیلترها</span>
          </div>
          <button className="filter__clean-btn font-danaDemibold" onClick={handleFilterClear}>
            حذف فیلتر ها
            <CiTrash className="text-[25px] mb-1" />
          </button>
        </div>

        <form className="filter__body">
          <label className="toggle w-full flex items-center justify-between py-5">
            <span className="font-danaMedium select-none">
              فقط دوره های رایگان
            </span>
            <input type="checkbox" className="toggle__input" checked={freeCoursesOnly} onChange={(e) => setFreeCoursesOnly(e.target.checked)} />
            <span className="toggle__marker"></span>
          </label>
          <label className="toggle w-full flex items-center justify-between py-5 border-t border-t-gray-200">
            <span className="font-danaMedium select-none">
              فقط دوره های رایگان
            </span>
            <input type="checkbox" className="toggle__input" onChange={(e) => setFreeCoursesOnly(e.target.checked)}/>
            <span className="toggle__marker"></span>
          </label>
        </form>

        <div className="filter__footer">
          <button
            className="filter__submit-btn button-lg button-primary w-full"
            onClick={handleFilterSubmit}
          >
            اعمال فیلتر
          </button>
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
