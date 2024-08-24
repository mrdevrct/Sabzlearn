import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Pagination({
  items,
  itemCount,
  pathname,
  setShowCountCourse,
}) {
  const [pageCount, setPageCount] = useState(null);
  const { page } = useParams();

  useEffect(() => {
    let endIndex = itemCount * page;
    let startIndex = endIndex - itemCount;
    let paginatedItems = items.slice(startIndex, endIndex);
    setShowCountCourse(paginatedItems);

    let pagesNumber = Math.ceil(items.length / itemCount);
    setPageCount(pagesNumber);
  }, [page, items]);

  return (
    <div className="flex justify-center space-x-1 mt-4 dark:text-gray-100">
      {Array.from({ length: pageCount }).map(( item, index) => (
        <span key={index}>
          {index + 1 === Number(page) ? (
            <Link
              to={`${pathname}/${index + 1}`}
              className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800"
            >
              {index + 1}
            </Link>
          ) : (
            <Link
              to={`${pathname}/${index + 1}`}
              className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800"
            >
              {index + 1}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
