import React from "react";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { Data } from "../config/SidebarData";
import { useNavigate } from "react-router-dom";
import { ClearLogin } from "../../toolkit/AuthReducer";
import { useDispatch } from "react-redux";

import axios from "axios";
function Sidebar() {
  const [sideBar, setSideBar] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {sideBar ? (
        <>
          <div className="text-center flex flex-col justify-between ">
            <div className=" text-xl">
              <div className="p-2.5 mt-1 flex items-center">
                <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600" />
                <h1 className="font-bold  text-[12px] ml-3">
                  School Management
                </h1>
                <i
                  className="bi bi-x cursor-pointer ml-28 lg:hidden md:mt-40 "
                  onClick={(e) => setSideBar(false)}
                >
                  {" "}
                  <MdOutlineCancel />
                </i>
              </div>
              <div className="my-2 bg-gray-600 h-[1px]" />
            </div>
            <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
              <i className="bi bi-search text-sm" />
              <input
                type="text"
                placeholder="Search"
                className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
              />
            </div>
            {Data.map((data, i) => {
              return (
                <div key={i}>
                  <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 "
                    onClick={() => navigate(data.path)}
                  >
                    <i className="bi bi-house-door-fill">{data.logo}</i>
                    <span className="text-[15px] ml-4 font-bold">
                      {data.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <span
            className=" text-black text-3xl top-5 left-4 cursor-pointer lg:hidden md:mt-1000"
            onClick={(e) => setSideBar(true)}
          >
            <i className="bi bi-filter-left  rounded-md">
              <CiMenuFries />
            </i>
          </span>
        </>
      )}
    </>
  );
}

export default Sidebar;
