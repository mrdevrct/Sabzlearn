import React, { useEffect, useState } from "react";
import HeaderCategories from "../Categories/HeaderCategories";
import ArticlBox from "../../modules/Articls/ArticlBox";
import apiRequest from "../../../services/Axios/config";
import SearchBox from "../../modules/Categoreis/SearchBox";
import SortBox from "../../modules/Categoreis/SortBox";
import { LuArrowUpDown } from "react-icons/lu";
import { useLocation } from "react-router-dom";

export default function Articl() {
  const [articls, setArticls] = useState([]);
  const [defulte, setDefulte] = useState([]);
  const [active, setActive] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]); // استفاده از متغیر جدید برای ذخیره مقادیر فیلتر شده
  const location = useLocation();

  useEffect(() => {
    apiRequest("/articles").then((response) => {
      const articl = response.data;
      setArticls(articl);
      setDefulte(articl);
      setFilteredArticles(articl); // مقدار اولیه متغیر فیلتر شده
    });
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newSearchQuery = queryParams.get("s");
    setSearchValue(newSearchQuery || "");

    let newFilteredArticles = defulte;

    if (newSearchQuery) {
      newFilteredArticles = defulte.filter((articl) =>
        articl.title.toLowerCase().includes(newSearchQuery.toLowerCase())
      );
    }

    setFilteredArticles(newFilteredArticles);
  }, [location.search, defulte, setSearchValue]);

  const handleSortChange = (sortName) => {
    let sortedArticles = [...filteredArticles]; // استفاده از متغیر فیلتر شده برای مرتب سازی
    if (sortName === "جدیدترین") {
      sortedArticles.sort((a, b) => new Date(b.time) - new Date(a.time));
    } else if (sortName === "قدیمی ترین") {
      sortedArticles.sort((a, b) => new Date(a.time) - new Date(b.time));
    } else if (sortName === "پر نظر ها") {
      sortedArticles.sort((a, b) => b.participants - a.participants);
    } else {
      sortedArticles = defulte;
    }
    setArticls(sortedArticles);
    setActive(sortName);
  };

  return (
    <main className="mt-20">
      <div className="w-fit container">
        <HeaderCategories
          titlePage="مقاله ها"
          quantityCourses={filteredArticles.length} // تعداد مقالات باید بر اساس متغیر فیلتر شده باشد
        />

        <section className="grid grid-cols-12 gap-y-5 md:gap-x-7">
          <div className="col-span-full lg:col-span-4 xl:col-span-3 lg:sticky top-6 space-y-6">
            <form className="space-y-6">
              <SearchBox articles={"search Articles"} placeholder="جستجو بین مقالات" />
            </form>
          </div>

          <section className="col-span-full lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
            <div className="hidden lg:flex items-center gap-x-6 px-5 mb-8 h-16 bg-white shadow-normal rounded-xl">
              <div className="flex items-center shrink-0 gap-x-2 px-4">
                <LuArrowUpDown className="text-[25px]" />
                <span className="font-danaMedium">مرتب سازی بر اساس :</span>
              </div>
              <div className="flex items-center font-danaLight gap-x-2 lg:gap-x-8 h-full">
                <SortBox sortName="عادی" onSortChange={handleSortChange} active={active === "عادی"} />
                <SortBox sortName="جدیدترین" onSortChange={handleSortChange} active={active === "جدیدترین"} />
                <SortBox sortName="قدیمی ترین" onSortChange={handleSortChange} active={active === "قدیمی ترین"} />
                <SortBox sortName="پر نظر ها" onSortChange={handleSortChange} active={active === "پر نظر ها"} />
              </div>
            </div>

            <div className="posts_wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 sm:px-0 px-2">
              {filteredArticles.map((articl) => (
                <ArticlBox key={articl.id} {...articl} />
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
