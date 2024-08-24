import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";


export default function CourseChapters({ chapterData , courseData , course }) {
  const [openChapters, setOpenChapters] = useState([]);

  const toggleChapter = (chapterId) => {
    setOpenChapters((prevState) => {
      if (prevState.includes(chapterId)) {
        return prevState.filter((id) => id !== chapterId);
      } else {
        return [...prevState, chapterId];
      }
    });
  };

  return (
    <div className="chapters">
      {chapterData.map((chapter) => (
        <div className="chapter my-4" key={chapter.id}>
          <div
            className={`chapter__head ${
              openChapters.includes(chapter.id) ? "chapter__head--active" : ""
            }`}
            onClick={() => toggleChapter(chapter.id)}
          >
            <span className="font-danaMedium truncate">{chapter.name}</span>
            <MdKeyboardArrowDown
              className={`${
                openChapters.includes(chapter.id) ? "rotate-180" : ""
              }`}
            />
          </div>
          {openChapters.includes(chapter.id) &&
            chapter.Episode.map((episode) => (
              <div className="chapter__lessons" key={episode.id}>
                <div
                  className={`lesson ${
                    chapter.id === parseInt(courseData.split("-")[1]) &&
                    episode.id === parseInt(courseData.split(":")[1])
                      ? "lesson--watching"
                      : ""
                  }`}
                >
                  <a
                    href={`/lesson/${course.name}-${chapter.id}:${episode.id}`}
                    className="block line-clamp-2"
                  >
                    {episode.name}
                  </a>
                  <div className="flex items-center justify-between mt-3 sm:mt-2">
                    <div className="lesson__status text-[20px] text-green-500">
                      <MdOutlineRadioButtonUnchecked />
                    </div>
                    <div className="min-w-18 button-xs button-primary button-outline font-IRANSNumber">
                      11:30{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
