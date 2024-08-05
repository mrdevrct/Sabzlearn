import React, { useEffect, useState } from "react";
import { HiChatBubbleLeftRight, HiUser } from "react-icons/hi2";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import HeaderTitle from "./HeaderTitle";
import apiRequest from "../../../../services/Axios/config";
import moment from "jalali-moment";
import { fetchUsers } from "../../../../services/Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function CourseComments({ course, setCourse }) {
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.users);
  const [openCommentForm, setOpenCommentForm] = useState(false);
  const [comments, setComments] = useState(course.comment);
  const [user, setUser] = useState({});
  const token = Cookies.get("Token");

  useEffect(() => {
    dispatch(fetchUsers());
    if (token && dataUsers.length > 0) {
      const currentUser = dataUsers.find((user) => user.id === token);
      setUser(currentUser);
    }
  }, [dispatch, dataUsers, token]);

  useEffect(() => {
    if (user.id && user.role && user.username) {
      setFormComment(prevState => ({
        ...prevState,
        userId: user.id,
        userRole: user.role,
        fullName: user.username
      }));
    }
  }, [user]);

  const openComment = () => {
    setOpenCommentForm(!openCommentForm);
  };

  const [formComment, setFormComment] = useState({
    id: course.comment.length + 1, 
    userId: "",
    userRole: "",
    fullName: "",
    adminId: 1,
    comment: "",
    timeCreated: "",
    answar: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormComment({
      ...formComment,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const jDate = moment().format("jYYYY/jM/jD");
      const timeCreated = moment(jDate, "jYYYY/jM/jD")
        .locale("fa")
        .format("jYYYY/jM/jD");

      let updatedCourseData = {
        ...course,
        comment: [...course.comment, { ...formComment, timeCreated }],
      };

      await apiRequest.put(`/courses/${course.id}`, updatedCourseData);
      setCourse(updatedCourseData);

      const newCommentList = [
        ...comments,
        {
          ...formComment,
          timeCreated: timeCreated,
        },
      ];
      setComments(newCommentList);
      openComment();

      setFormComment({
        ...formComment,
        id: course.comment.length + 1,
        comment: "",
        timeCreated: "",
        answar: "",
      });
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
    if (!openCommentForm) {
      setFormComment({
        ...formComment,
        id: course.comment.length + 1,
        comment: "",
        timeCreated: "",
        answar: "",
      });
    }
  }, [openCommentForm]);
  
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-5 mt-8">
      <div className="flex items-center justify-between mb-6 sm:mb-7">
        <HeaderTitle
          title="نظرات"
          icon={<HiChatBubbleLeftRight />}
          iconColor="text-red-500"
          spanColor="bg-red-500"
        />

        <button
          className="button-primary sm:h-[40px] sm:px-[1rem] mb-5 h-[35px] px-[8px] sm:text-[16px] font-danaMedium text-[14px]"
          onClick={token ? openComment : ()=> alert('لطفا برای ایجاد کامنت به حساب خود وارد شوید')}
        >
          ایجاد نظر جدید
          <HiOutlineChatBubbleBottomCenterText className="mr-1" />
        </button>

      </div>

      <div className="mb-8 sm:mb-12 w-full">
        <div className={`comment ${openCommentForm ? "block" : "hidden"}`}>
          <div className="flex gap-x-3.5 mb-5 sm:mb-5">
            <div className="flex items-center justify-center p-2 border border-gray-100 rounded-full">
              <div className="flex items-center justify-center w-11 sm:w-12 h-11 sm:h-12 bg-gray-100 rounded-full">
                <HiUser className="text-[18px] text-gray-600" />
              </div>
            </div>
            <div className="flex justify-center flex-col gap-2">
              <span className="font-danaMedium">{user.username}</span>
              <span className="text-sm opacity-70" id="comment-to">
                ثبت نظر جدید
              </span>
            </div>
          </div>
          <textarea
            id="comment"
            name="comment"
            rows="6"
            className="w-full block p-5 md:p-4 bg-gray-100 text-gray-900  placeholder:text-slate-500/70 font-danaMedium text-sm rounded-xl outline-none"
            placeholder="نظر خود را بنویسید ..."
            onChange={handleInputChange}
            value={formComment.comment}
          ></textarea>

          <div className="flex gap-x-4 justify-end mt-5 sm:mt-6">
            <button
              className="flex-grow sm:grow-0 sm:w-36 button-lg button-primary button-outline font-danaMedium"
              onClick={openComment}
            >
              لغو
            </button>
            <button
              className="flex-grow sm:grow-0 sm:w-36 button-lg button-primary font-danaMedium"
              onClick={handleSubmit}
            >
              ارسال
            </button>
          </div>
        </div>

        <div className="comments_wrap space-y-5 sm:space-y-5 mt-[2rem]">
          {comments.map((comment, index) => (
            <div
              className="p-5 md:p-5 bg-gray-100 dark:bg-dark rounded-xl"
              key={index}
            >
              <div className="comment-head flex items-center gap-x-3.5">
                <div className="border-[1px] border-yellow-500 p-1 rounded-full">
                  <img
                    src="https://secure.gravatar.com/avatar/ebc9c654aaf436ca8c07e14c6c16c34d?s=96&d=mm&r=g"
                    alt="user-img"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-x-1 ">
                    <span className="font-danaLight text-sm opacity-70">
                      {comment.fullName}{" "}
                    </span>
                    <span className="font-danaMedium text-lg opacity-70">
                      | {comment.userRole === "USER" ? "کاربر" : ""}
                    </span>
                  </div>
                  <span className="font-IRANSNumber text-[14px]">
                    {comment.timeCreated}
                  </span>
                </div>
              </div>
              <div className="comment mt-4 border-t py-4">
                <p>{comment.comment}</p>

                {comment.answar.length > 0 && (
                  <div className="mt-5 p-4 border rounded-[10px]">
                    <div className="answer-head flex items-center gap-x-4">
                      <div className="p-1 rounded-full border-[1px] border-yellow-500">
                        <img
                          src="https://secure.gravatar.com/avatar/ebc9c654aaf436ca8c07e14c6c16c34d?s=96&d=mm&r=g"
                          alt="user-img"
                          className="w-12 h-12 rounded-full"
                        />
                      </div>
                      <span className="font-sans text-lg">Admin</span>
                    </div>
                    <div className="answar mt-4 border-t py-4 px-4">
                      <p>{comment.answar}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
