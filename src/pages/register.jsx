import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../services/Axios/config";
import { v4 as uuidv4 } from "uuid";

// get data in redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../services/Redux/actions";

// alert toastify
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Input from "../components/modules/Input";

// icon
import { HiOutlineUser } from "react-icons/hi2";
import { LuPhone } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import Cookies from "js-cookie";
import Button from "../components/modules/Button";

export default function Login() {
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    username: "",
    lastname: "",
    firstname: "",
    phone: "",
    email: "",
    password: "",
    role: "USER",
    createdAccount: "",
    updatedAccount: "",
    wallet: 0,
    paid: 0,
    courses: [],
  });

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // set form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString();

    try {
      // Checking if email is a duplicate
      const emailCheck = await apiRequest(`/users?email=${formData.email}`);

      if (emailCheck.data.length > 0) {
        toast.error("این ایمیل قبلا استفاده شده است.", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          rtl: true,
          transition: Bounce,
        });
        return;
      }

      // post new user data
      const response = await apiRequest.post("/users", {
        ...formData,
        createdAccount: currentDate,
      });

      console.log(response);

      if (response.status === 201) {
        // Set token in cookie
        window.location.pathname = "/";
        Cookies.set("Token", response.data.id, {
          expires: 7,
          domain: "sabzlearn-best.liara.run",
          httpOnly: false,
        });        
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center flex-col relative px-4 py-6 min-h-screen">
        <Link to="/" className="flex items-center gap-x-3 sm:mb-10 mb-4">
          <img
            src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
            alt="logo"
            className="h-[62px]"
          />
          <div className="w-[138px] h-[62px] sm:mb-3 sm:mt-0 mt-10">
            <h2 className="sm:text-[30px] text-[20px] font-danaDemibold">
              سبزلرن
            </h2>
            <h2 className="sm:text-[18px] text-[12px] font-danaLight">
              S a b z l e a r n . i r
            </h2>
          </div>
        </Link>

        <div className="max-w-[330px] w-full pt-5 pb-6 px-6 text-center bg-white rounded-2xl">
          <h4 className="font-danaMedium text-xl mb-4 sm:mb-5">عضویت</h4>
          <p className="mb-5">
            قبلا ثبت نام کرده اید؟{" "}
            <Link to="/login" className="font-danaDemibold text-green-500 ">
              وارد شوید
            </Link>
          </p>

          <form className="form-data space-y-5">
            {/* username */}
            <Input
              type="text"
              name="username"
              placeholder="نام کاربری"
              icon={HiOutlineUser}
              onChange={handleInputChange}
              minLength={3}
              maxLength={20}
            />

            {/* phone number */}
            <Input
              type="text"
              name="phone"
              placeholder="شماره موبایل"
              icon={LuPhone}
              onChange={handleInputChange}
              minLength={11}
              maxLength={11}
            />

            {/* email */}
            <Input
              type="email"
              name="email"
              placeholder="ادرس ایمیل"
              icon={FaRegEnvelope}
              onChange={handleInputChange}
            />

            {/* password */}
            <Input
              type="password"
              name="password"
              placeholder="رمز عبور"
              icon={FiLock}
              onChange={handleInputChange}
              minLength={3}
              maxLength={12}
            />

            <Button text="ادامه" onClick={handleSubmit} />
          </form>
        </div>

        <div className="max-w-[330px] w-full mx-auto text-center mt-7 sm:mt-8 font-danaMedium">
          با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمت
          <Link to="/" className="text-green-500">
            {" "}
            سبزلرن{" "}
          </Link>{" "}
          را پذیرفته اید.
        </div>

        <div className="hidden lg:block absolute top-0 left-0 w-[300px] h-[300px] bg-sky-500 opacity-20 blur-[120px] rounded-full"></div>
        <div className="hidden lg:block absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-400 opacity-20 blur-[120px] rounded-full"></div>

        <ToastContainer />
      </section>
    </>
  );
}
