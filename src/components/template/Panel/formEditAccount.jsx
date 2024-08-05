import React, { useEffect, useState } from "react";
import Input from "../../modules/Input";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../services/Redux/actions";
import Cookies from "js-cookie";
import apiRequest from "../../../services/Axios/config";
import Swal from 'sweetalert2'
import '../../../css/ElementProprety/SwitAlert.css'

export default function FormEditAccount() {
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.users);
  const [user, setUser] = useState({});
  const token = Cookies.get("Token");
  const [currentPassword, setCurrentPassword] = useState(null);
  const [updatePassword, setUpdatePassword] = useState(null);
  const [updateUser, setUpdateUser] = useState({
    email: "",
    lastname: "",
    firstname: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (token && dataUsers.length > 0) {
        const userFound = await dataUsers.find((user) => user.id === token);
        setUser(userFound || {});
        setUpdateUser({
          email: userFound.email || "",
          firstname: userFound.firstname || "",
          lastname: userFound.lastname || "",
          phone: userFound.phone || "",
        });
      }
    };
    fetchData();
  }, [token, dataUsers]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };

  const updateUserHandler = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = {
        ...user,
        email: updateUser.email,
        firstname: updateUser.firstname,
        lastname: updateUser.lastname,
      };
  
      const response = await apiRequest.put(`/users/${user.id}`, updatedUser);
      console.log(response);
  
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          text: "اطلاعات با موفقیت اپدیت شد",
          customClass: {
            confirmButton: 'custom-confirm-button-green',
          }
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  const isEmailExists = dataUsers.some((existingUser) => existingUser.email === updateUser.email);
  
  if (!isEmailExists || user.email === updateUser.email) {
    // ایمیل جدید یا همان ایمیل قبلی کاربر منحصر به فرد است
    // انجام عملیات بروزرسانی اطلاعات
  } else {
    Swal.fire({
      icon: "error",
      title: "خطا!",
      text: "این ایمیل قبلاً استفاده شده است",
      customClass: {
        confirmButton: 'custom-confirm-button-red'
      }
    });
  }
  

  const updatePasswordHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentPassword === user.password) { // بررسی صحت رمز قدیمی
        const updatedPasswordUser = {
          ...user,
          password: updatePassword // بروزرسانی رمز جدید
        };
        const response = await apiRequest.put(`/users/${user.id}`, updatedPasswordUser);
  
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            text: "رمز شما با موفقیت تغییر کرد",
            customClass: {
              confirmButton: 'custom-confirm-button-green',
            }
          });
          
          
          setUpdatePassword('');
          setCurrentPassword('');
          setUser(updatedPasswordUser); // بروزرسانی اطلاعات کاربر با رمز جدید
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "خطا!",
          text: "رمز فعلی شما اشتباه است",
          customClass: {
            confirmButton: 'custom-confirm-button-red',
          }
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };
  

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      <div className="xl:col-span-2 bg-white dark:bg-gray-800 p-4.5 rounded-2xl">
        <div className="p-5 border-b border-b-gray-200 dark:border-b-slate-500">
          <span className="font-danaMedium md:text-xl text-zinc-700 dark:text-white">
            جزییات حساب کاربری
          </span>
        </div>
        <form action="" className="px-4 py-8">
          <div className="relative mb-11">
            <img
              src="https://secure.gravatar.com/avatar/528a5bf0557c32011fe9642f619f90d9?s=256&amp;d=mm&amp;r=g"
              className="w-32 md:w-44 h-32 md:h-44 rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                شماره موبایل
              </label>
              <Input
                name="phone"
                onChange={handleInputChange}
                value={updateUser.phone}
                disabled={true}
              />
            </div>

            <div className="hidden md:block"></div>

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                نام
              </label>
              <Input
                name="firstname"
                onChange={handleInputChange}
                value={updateUser.firstname}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                نام خانوادگی
              </label>
              <Input
                name="lastname"
                onChange={handleInputChange}
                value={updateUser.lastname}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="firstname"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                نام کاربری
              </label>
              <Input value={user.username} disabled={true} />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                ایمیل
              </label>
              <Input
                name="email"
                onChange={handleInputChange}
                value={updateUser.email}
              />
            </div>
          </div>

          <button
            type="submit"
            onClick={updateUserHandler}
            className="flex w-full h-[3.5rem] justify-center items-center gap-x-2 px-7 text-base mr-auto md:w-auto mt-10 bg-green-400 text-white rounded-[12px]"
          >
            ثبت اطلاعات
          </button>
        </form>
      </div>

      <div className="xl:col-span-1 bg-white dark:bg-gray-800 p-4.5 rounded-2xl">
        <div className="p-5 border-b border-b-gray-200 dark:border-b-slate-500">
          <span className="font-danaMedium md:text-xl text-zinc-700 dark:text-white">
            تغییر رمز عبور
          </span>
        </div>
        <form action="" className="p-4 pt-8">
          <div className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                پسورد فعلی
              </label>
              <Input
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                پسورد جدید
              </label>
              <Input
                onChange={(e) => setUpdatePassword(e.target.value)}
                value={updatePassword}
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex w-full h-[3.5rem] justify-center items-center gap-x-2 px-7 text-base mr-auto md:w-auto mt-10 bg-green-400 text-white rounded-[12px]"
            onClick={updatePasswordHandler}
          >
            ثبت اطلاعات
          </button>
        </form>
      </div>
    </div>
  );
}
