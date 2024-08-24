import React, { useEffect, useState } from "react";
import { BsChatText } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../services/Redux/actions";
import Cookies from "js-cookie";
import apiRequest from "../../services/Axios/config";
import "../../css/ElementProprety/tickets.css";

export default function Tickets() {
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.users);
  const [users, setUsers] = useState({});
  const Token = Cookies.get("Token");
  const [tickets, setTickets] = useState([]);
  const [openTickets, setOpenTickets] = useState(false);
  const [newTickets, setNewTickets] = useState({
    userId: "",
    userRole: "",
    fullName: "",
    adminId: 1,
    tickets: "",
    timeCreated: "",
    answer: null,
  });

  // گرفتن دیتا های یوزر با استفاده از ریداکس
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // گرفتن دیتا شخص با استفاده از توکن و گرفتن تیکت های کاربر
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Token && dataUsers.length > 0) {
          const userFind = await dataUsers.find((user) => user.id === Token);
          setUsers(userFind);
          const ticketFind = await apiRequest(
            `/tickets/?userId=${userFind.id}`
          );
          setTickets(ticketFind.data);
        }
      } catch (e) {}
    };
    fetchData();
  }, [Token, dataUsers]);

  // قرار دادن ایدی و مشخصات کاربر در فرم تیکت
  useEffect(() => {
    if (users.id && users.role && users.username) {
      setNewTickets((prevState) => ({
        ...prevState,
        userId: users.id,
        userRole: users.role,
        fullName: users.username,
      }));
    }
  }, [users]);

  // در صورت لاگین نبودن کاربر نیکت ها نمایش داده نمیشود
  if (!Token) {
    return <div></div>;
  }

  // قرار دادن ولی اینپوت
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTickets({
      ...newTickets,
      [name]: value,
    });
  };

  // اد کردن تیکت جدید به دیتا تیکت ها
  const ticketsHandler = async (event) => {
    try {
      if (event.key === "Enter") {
        const response = await apiRequest.post(`/tickets`, {
          ...newTickets,
          timeCreated: new Date(), // افزودن زمان ایجاد به تیکت
        });
        const newTicket = response.data;
        setTickets((prevTickets) => [...prevTickets, newTicket]);
        setNewTickets({
          ...newTickets,
          tickets: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // باز بسته کردن فرم تیکت
  const openTicketsHandler = () => {
    setOpenTickets(!openTickets);
  };

  return (
    <>
      <div className="fixed bottom-5 left-5 flex items-center justify-center rounded-full bg-sky-500 h-[60px] w-[60px] text-white z-10">
        <button className="text-[28px]" onClick={openTicketsHandler}>
          {openTickets === true ? <IoClose /> : <BsChatText className="mb-1" />}
        </button>
      </div>
      {openTickets === true ? (
        <div className="sb-chat fixed w-[360px] h-[650px] sm:bottom-[6rem] sm:left-10 left-4 bottom-4 text-black bg-white rounded-[18px]">
          <div className="relative">
            <div className="flex items-center justify-center h-[12rem] bg-sky-500 text-white rounded-[18px_18px_0_0]">
              <div className="content text-center">
                <div className="title text-[28px]">
                  <h1>چت انلاین</h1>
                </div>
                <div className="text text-[12px]">
                  لطفا در صورتی که مشکل فنی یا در خصوص پیشیبانی دوره دارید، در
                  بخش پرسش پاسخ خود دوره ارسال کنید.
                </div>
              </div>
            </div>

            <div className="overflow-y-scroll h-[400px]">
              {tickets.length > 0 && (
                tickets.map((ticket) => (
                  <p
                    className="px-4 my-2 mr-2 w-fit rounded-full bg-green-200"
                    key={ticket.id}
                  >
                    {ticket.tickets}
                  </p>
                ))
              )}
            </div>

            <div className="editor sticky bottom-0 w-full h-12 bg-white border-t border-gray-300">
              <input
                name="tickets"
                placeholder="یک پیغام بنویسید..."
                className="h-12 w-full outline-none px-2"
                onChange={handleInputChange}
                onKeyDown={ticketsHandler}
                value={newTickets.tickets}
              ></input>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

