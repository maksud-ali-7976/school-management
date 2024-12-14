import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "../components/admin/Table";
import { useDispatch, useSelector } from "react-redux";
import { studentDataFetch } from "../toolkit/DataReducer";
import { classData } from "../components/config/data";
const Student = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const limit = 2;
  useEffect(() => {
    dispatch(
      studentDataFetch({ page, limit, search, studentClass:selectedClass })
    );
  }, [dispatch, page]);
  const API_URL = import.meta.env.VITE_BACKEND_API;
  const navigate = useNavigate();
  const formData = new FormData();
  const students = useSelector((state) => state.data.students);
  const totalPage = useSelector((state) => state.data.totalStudentPage);
  const [StudentToggle, setStudentToggle] = useState(false);
  const [StudentData, setStudentData] = useState({
    studentName: "",
    studentFather: "",
    studentClass: "",
    totalFess: "",
    address: "",
    phone: "",
  });
  const [StudentImg, setStudentImg] = useState(null);

  const SubmitHandle = async (e) => {
    e.preventDefault();
    formData.append("image", StudentImg);

    formData.append("data", JSON.stringify(StudentData));

    const response = await axios.post(
      `${API_URL}student/add-student`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Include cookies
      }
    );
    navigate("/students", { replace: true });
    setStudentToggle(false);
    return response.data;
  };
  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      setPage(1);
      dispatch(studentDataFetch({ page: 1, limit, search,studentClass:selectedClass }));
    } catch (error) {
      throw error;
    }
  };
  const prevHandle = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  return (
    <>
      <div className="w-full p-4">
        <h1 className="text-start font-semibold font-mono text-lg md:text-2xl">
          Dashboard Teacher
        </h1>

        <div className="flex flex-col items-end mb-4">
          <button
            className="bg-orange-500 py-2 rounded-lg text-base md:text-xl font-semibold font-sans w-full md:w-[30vh] hover:shadow-lg"
            onClick={() => setStudentToggle(true)}
          >
            Add Students
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <input
            type="text"
            placeholder="Search Here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="py-3 w-full md:w-[35vh] rounded-lg text-left p-2 hover:shadow-xl shadow-md border-spacing-2"
          />
          <button
            onClick={searchHandler}
            className="bg-green-500 hover:cursor-pointer hover:shadow-md rounded-xl font-semibold text-base md:text-xl w-full md:w-[25vh]"
          >
            Search
          </button>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setPage(1);
                dispatch(
                  studentDataFetch({
                    page: 1,
                    limit,
                    search,
                    studentClass: e.target.value,
                  })
                );
              }}
              className="py-3  md:w-[35vh] rounded-lg text-left p-2 hover:shadow-xl shadow-md border-spacing-2"
            >
              <option value="">All Classes</option>
              {classData.map((item, i) => {
                return (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {StudentToggle && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
            <div className="p-4 bg-white rounded-lg w-[90vw] md:w-[60vw] lg:w-[35vw]">
              <form encType="multipart/form-data" onSubmit={SubmitHandle}>
                <h2 className="text-center text-lg text-black mb-4 font-semibold">
                  Add Students
                </h2>
                <div>
                  <label>Student's Name</label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full my-2 rounded-md p-2"
                    placeholder="Enter Name"
                    value={StudentData.studentName}
                    onChange={(e) =>
                      setStudentData({
                        ...StudentData,
                        studentName: e.target.value,
                      })
                    }
                  />
                  <label>fatherName</label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full my-2 rounded-md p-2"
                    placeholder="Enter Address"
                    value={StudentData.studentFather}
                    onChange={(e) =>
                      setStudentData({
                        ...StudentData,
                        studentFather: e.target.value,
                      })
                    }
                  />
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Class
                  </label>
                  <select
                    id="countries"
                    value={StudentData.studentClass}
                    onChange={(e) =>
                      setStudentData({
                        ...StudentData,
                        studentClass: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>Select Class</option>
                    {classData.map((item, i) => {
                      return (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <label>Phone</label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full my-2 rounded-md p-2"
                    placeholder="Enter Phone"
                    value={StudentData.phone}
                    onChange={(e) =>
                      setStudentData({ ...StudentData, phone: e.target.value })
                    }
                  />
                  <label>fees</label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full my-2 rounded-md p-2"
                    placeholder="Enter Salary"
                    value={StudentData.totalFess}
                    onChange={(e) =>
                      setStudentData({
                        ...StudentData,
                        totalFess: e.target.value,
                      })
                    }
                  />
                  <label>Address</label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full my-2 rounded-md p-2"
                    placeholder="Enter Phone"
                    value={StudentData.address}
                    onChange={(e) =>
                      setStudentData({
                        ...StudentData,
                        address: e.target.value,
                      })
                    }
                  />
                  <input
                    className="block w-full mb-5 text-xs text-gray-900 border rounded-lg cursor-pointer bg-gray-50"
                    name="image"
                    type="file"
                    onChange={(e) => setStudentImg(e.target.files[0])}
                  />
                </div>
                <div className="flex gap-4 justify-center mt-4">
                  <button className="p-2 bg-blue-600 text-white rounded w-1/2 hover:bg-blue-700">
                    Add
                  </button>
                  <button
                    className="p-2 bg-red-400 text-white rounded w-1/2 hover:bg-red-500"
                    onClick={() => setStudentToggle(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <Table
            Data={students}
            columns={[
              { key: "name", label: "studentName" },
              { key: "father", label: "fatherName" },
              { key: "class", label: "studentClass" },
              { key: "totalFess", label: "totalFess" },
              { key: "address", label: "Address" },
              { key: "phone", label: "Phone" },
            ]}
          />
        </div>
        <div className="flex items-center justify-between py-6">
          <button
            className="text-gray-600 hover:text-indigo-700"
            onClick={prevHandle}
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
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Student;
