import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_BACKEND_API;
const Table = ({ Data, columns }) => {
  const navigate = useNavigate();
  const [editToggle, setEditToggle] = useState(false);
  const [editStudentData, setEditStudentData] = useState({
    studentName: "",
    studentFather: "",
    studentMother: "",
    totalFess: "",
    address: "",
    phone: "",
  });
  const HandlerForStudentDelete = async (id) => {
    const response = await axios.delete(
      `${API_URL}student/delete-student/${id}`,
      {
        withCredentials: true,
      }
    );
    navigate("/students", { replace: true });
    window.location.reload();
  };
  const editHandler = async (id) => {
    const response = await axios.get(`${API_URL}student/student/${id}`, {
      withCredentials: true,
    });
    setEditStudentData(response.data.data);
  };
  const HandlerForUpdate = async (e) => {
    e.preventDefault();
    const response = await axios.patch(
      `${API_URL}student/update-student/${editStudentData._id}
    `,
      editStudentData,
      {
        withCredentials: true,
      }
    );
    navigate("/students", { replace: true });
    window.location.reload();
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
            <th>Actions</th>
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
                    alt=" image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {el.studentName}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{el.studentFather}</td>
                <td className="px-6 py-4">{el.studentMother}</td>
                <td className="px-6 py-4">{el.totalFess}</td>
                <td className="px-6 py-4">{el.address}</td>
                <td className="px-6 py-4">{el.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        el.feesStatus ? "bg-green-500" : "bg-red-500"
                      } mr-2`}
                    ></span>
                    {el.feesStatus ? "Paid" : "Due"}
                  </div>
                </td>
                <td>
                  <button
                    className="w-[40%] bg-blue-500 h-5 text-black rounded-md"
                    onClick={(e) => (setEditToggle(true), editHandler(el._id))}
                  >
                    Edit
                  </button>
                  <button
                    className="w-[40%] bg-red-500 h-5 text-black rounded-md"
                    onClick={(e) => HandlerForStudentDelete(el._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {editToggle && (
        <>
          {/* component */}
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
            <section className=" p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-10">
              <h2 className="text-lg font-semibold  text-gray-700 capitalize dark:text-white">
                Student Record Update
              </h2>
              <form onSubmit={HandlerForUpdate}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="username"
                    >
                      studentName
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={editStudentData.studentName || ""}
                      onChange={(e) =>
                        setEditStudentData({
                          ...editStudentData,
                          studentName: e.target.value,
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
                      fatherName
                    </label>
                    <input
                      id="emailAddress"
                      type="text"
                      value={editStudentData.studentFather || ""}
                      onChange={(e) =>
                        setEditStudentData({
                          ...editStudentData,
                          studentFather: e.target.value,
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
                      motherName
                    </label>
                    <input
                      id="password"
                      type="text"
                      value={editStudentData.studentMother || ""}
                      onChange={(e) =>
                        setEditStudentData({
                          ...editStudentData,
                          studentMother: e.target.value,
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
                      totalFees
                    </label>
                    <input
                      id="totalFess"
                      type="text"
                      value={editStudentData.totalFess || ""}
                      onChange={(e) =>
                        setEditStudentData({
                          ...editStudentData,
                          totalFess: e.target.value,
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
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={editStudentData.address || ""}
                      onChange={(e) =>
                        setEditStudentData({
                          ...editStudentData,
                          address: e.target.value,
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
                      mobile Number
                    </label>
                    <input
                      id="number"
                      type="number"
                      value={editStudentData.phone || ""}
                      onChange={(e) =>
                        setEditStudentData({
                          ...editStudentData,
                          phone: e.target.value,
                        })
                      }
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
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
        </>
      )}
    </>
  );
};

export default Table;
