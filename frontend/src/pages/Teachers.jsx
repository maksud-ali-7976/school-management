import React, { useEffect, useState } from "react";
import TeacherTable from "../components/admin/TeacherTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { teachersData } from "../toolkit/DataReducer";
import { useDispatch, useSelector } from "react-redux";
import { Subject } from "../components/config/data";
const API_URL = import.meta.env.VITE_BACKEND_API;
function Teachers() {
  const navigate = useNavigate();
  const teachers = useSelector((state) => state.data.teachers);
  const totalPage = useSelector((state) => state.data.totalTeacherPage);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const limit = 5;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(teachersData({ page, limit, search, subject: selectedSubject }));
  }, [page, limit, dispatch]);
  const [teacherToggle, setTeacherToggle] = useState(false);
  const [teacherData, setTeacherData] = useState({
    teacherName: "",
    address: "",
    salary: "",
    subject: "",
    mobile: "",
  });
  const [file, setFile] = useState();
  const teacherAddHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", file);
      formData.append("data", JSON.stringify(teacherData));

      const response = await axios.post(
        `${API_URL}teacher/add-teacher`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      navigate("/teachers", { replace: true });
    } catch (error) {
      throw error;
    }
  };
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setPage(1);
      dispatch(
        teachersData({ page: 1, limit, search, subject: selectedSubject })
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="w-full px-4 md:px-8">
        {/* Dashboard Title */}
        <h1 className="text-start font-semibold font-mono text-lg md:text-2xl">
          Dashboard Teacher
        </h1>

        {/* Add Teacher Button */}
        <div className="flex flex-col items-end mt-4">
          <button
            className="bg-orange-500 py-2 rounded-lg text-base md:text-xl font-semibold font-sans w-full md:w-[30vh]"
            onClick={() => setTeacherToggle(true)}
          >
            Add Teacher
          </button>
        </div>

        {/* Search Section */}
        <div className="flex flex-wrap gap-4 mt-[2vh] justify-center md:justify-start">
          <input
            type="text"
            placeholder="Search Here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="py-3 w-full md:w-[35vh] rounded-lg text-left p-2 hover:shadow-xl shadow-md border-spacing-2"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 hover:cursor-pointer hover:shadow-md rounded-xl font-semibold text-base md:text-xl w-full md:w-[25vh]"
          >
            Search
          </button>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setPage(1);
                dispatch(
                  teachersData({
                    page: 1,
                    limit,
                    search,
                    subject: e.target.value,
                  })
                );
              }}
              className="py-3  md:w-[35vh] rounded-lg text-left p-2 hover:shadow-xl shadow-md border-spacing-2"
            >
              <option value="">All Subject</option>
              {Subject.map((item, i) => {
                return (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Modal for Adding Teachers */}
        {teacherToggle && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
            <section className=" p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-10">
              <h2 className="text-lg font-semibold  text-gray-700 capitalize dark:text-white">
                Teacher Form
              </h2>
              <form encType="multipart/form-data" onSubmit={teacherAddHandler}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="username"
                    >
                      Teacher Name
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={teacherData.teacherName}
                      onChange={(e) =>
                        setTeacherData({
                          ...teacherData,
                          teacherName: e.target.value,
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
                      Teacher Address
                    </label>
                    <input
                      id="Address"
                      type="text"
                      value={teacherData.address}
                      onChange={(e) =>
                        setTeacherData({
                          ...teacherData,
                          address: e.target.value,
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
                      value={teacherData.mobile}
                      onChange={(e) =>
                        setTeacherData({
                          ...teacherData,
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
                      Salary
                    </label>
                    <input
                      id="salary"
                      type="text"
                      value={teacherData.salary}
                      onChange={(e) =>
                        setTeacherData({
                          ...teacherData,
                          salary: e.target.value,
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
                      Select Class
                    </label>
                    <select
                      id="countries"
                      value={teacherData.subject}
                      onChange={(e) =>
                        setTeacherData({
                          ...teacherData,
                          subject: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>Select Class</option>
                      {Subject.map((item, i) => {
                        return (
                          <option key={i} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <input
                    className="block w-full mb-5 text-xs text-gray-900 border rounded-lg cursor-pointer bg-gray-50"
                    name="image"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="flex justify-start mt-6 gap-10 text-black">
                  <button className="px-6 py-2 w-[45%] leading-5  transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-gray-600">
                    Add
                  </button>
                  <button
                    onClick={(e) => setTeacherToggle(false)}
                    className="px-6 py-2 w-[45%] leading-5  transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}

        {/* Table Section */}
        {/* Table Section */}
        <div className="relative overflow-x-auto sm:rounded-lg mt-4">
          <TeacherTable
            Data={teachers}
            columns={[
              { key: "name", label: "TeacherName" },
              { key: "phone", label: "Mobile Number" },
              { key: "address", label: "Address" },
              { key: "salary", label: "Salary" },
              { key: "status", label: "salary Status" },
              { key: "subject", label: "subject" },
              { key: "action", label: "action" },
            ]}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between py-6">
          <button
            className="text-gray-600 hover:text-indigo-700"
            onClick={() => prevPage()}
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPage }, (_, index) => (
              <span key={index + 1} className="page-number">
                {index + 1}
              </span>
            ))}
          </div>
          <button
            className="text-gray-600 hover:text-indigo-700"
            onClick={() => nextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Teachers;
