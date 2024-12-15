import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Vehicle } from "../config/data";
const API_URL = import.meta.env.VITE_BACKEND_API;
const DriverTable = ({ Data, columns }) => {
  const [editToggle, setEditToggle] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    vehicle: "",
    mobile: "",
    salary: "",
    route: "",
  });

  const editHandler = async (id) => {
    try {
      const response = await axios.get(`${API_URL}driver/driver/${id}`, {
        withCredentials: true,
      });
      setEditData(response.data.result);
    } catch (error) {
      throw error;
    }
  };
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}driver/delete-driver/${id}`,
        { withCredentials: true }
      );
      return <Navigate to="/driver" replace />;
    } catch (error) {
      throw error;
    }
  };
  const updateHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.patch(
        `${API_URL}driver/update-driver/${editData._id}`,
        editData,
        { withCredentials: true }
      );
      editToggle(false);
      return <Navigate to="/driver" replace />;
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((col) => {
              return (
                <th key={col.key} className="px-6 py-3">
                  {col.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Data &&
            Data.map((el, i) => (
              <tr key={el._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={el.profile}
                    alt="Jese image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">{el.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4">{el.vehicle}</td>
                <td className="px-6 py-4">{el.salary}</td>
                <td className="px-6 py-4">{el.route}</td>
                <td className="px-6 py-4">{el.mobile}</td>
                <td>
                  <button
                    onClick={(e) => (editHandler(el._id), setEditToggle(true))}
                    className="w-[40%] bg-blue-500 h-5 text-black rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => deleteHandler(el._id)}
                    className="w-[40%] bg-red-500 h-5 text-black rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {editToggle && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
          <section className=" p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-10">
            <h2 className="text-lg font-semibold  text-gray-700 capitalize dark:text-white">
              Teacher Record Update
            </h2>
            <form onSubmit={updateHandler}>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="username"
                  >
                    Driver Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={editData.name || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        name: t.target.value,
                      })
                    }
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="emailAddress"
                  >
                    Salary
                  </label>
                  <input
                    id="emailAddress"
                    type="text"
                    value={editData.salary || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        salary: e.target.value,
                      })
                    }
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="password"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    type="text"
                    value={editData.mobile || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        mobile: e.target.value,
                      })
                    }
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="passwordConfirmation"
                  >
                    Route
                  </label>
                  <input
                    id="salary"
                    type="text"
                    value={editData.route || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        route: e.target.value,
                      })
                    }
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select vehicle
                  </label>
                  <select
                    id="countries"
                    value={editData.vehicle || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        vehicle: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>Select Vehicle</option>
                    {Vehicle.map((item, i) => {
                      return (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex justify-start mt-6 gap-10 text-black">
                <button className="px-6 py-2 w-[45%] leading-5  transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-gray-600">
                  Update
                </button>
                <button
                  onClick={(e) => setEditToggle(false)}
                  className="px-6 py-2 w-[45%] leading-5  transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
};

export default DriverTable;
