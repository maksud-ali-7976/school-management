import React from "react";
import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/admin/Navbar";

const AdminLayout = () => {
  return (
    <>
      <div>
        <Navbar />
        </div>
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 p-3 text-black bg-white">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full h-full md:w-4/5 p-5 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
