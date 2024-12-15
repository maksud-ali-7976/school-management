import React, { useEffect, useState } from "react";
import DriverTable from "../components/admin/DriverTable";
import { useDispatch, useSelector } from "react-redux";
import { driversFetch } from "../toolkit/DataReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Vehicle } from "../components/config/data";
const API_URL = import.meta.env.VITE_BACKEND_API;
const Student = () => {
  const [driverToggle, setDriverToggle] = useState(false);
  const navigate = useNavigate();
  const drivers = useSelector((state) => state.data.drivers);
  const totalPage = useSelector((state) => state.data.totalDriverPage);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 5;
  const [route, setRoute] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(driversFetch({ page, limit, search, route: route }));
  }, [dispatch, page, limit, search]);
  const [driverData, setDriverData] = useState({
    name: "",
    salary: "",
    vehicle: "",
    route: "",
    mobile: "",
  });
  const [image, setImage] = useState("");
  const driverAddHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("data", JSON.stringify(driverData));
      const response = await axios.post(
        `${API_URL}driver/add-driver`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin":
              "https://school-management-beryl-zeta.vercel.app",
          },
          withCredentials: true,
        }
      );
      return navigate("/driver", { replace: true });
      // return response.data;
    } catch (error) {
      throw error;
    }
  };
  const prevPage = async () => {
    try {
      if (page > 1) {
        setPage(page - 1);
      }
    } catch (error) {
      throw error;
    }
  };
  const nextPage = async () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  return (
    <>
      <div className="w-full p-4">
        <h1 className="text-start font-semibold font-mono text-lg md:text-2xl">
          Dashboard Driver
        </h1>

        <div className="flex flex-col items-end mb-4">
          <button
            className="bg-orange-500 py-2 rounded-lg text-base md:text-xl font-semibold font-sans w-full md:w-[30vh] hover:shadow-lg"
            onClick={() => setDriverToggle(true)}
          >
            Add Vehicle
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
          <button className="bg-green-500 hover:cursor-pointer hover:shadow-md rounded-xl font-semibold text-base md:text-xl w-full md:w-[25vh]">
            Search
          </button>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <select
              value={route}
              onChange={(e) => {
                setRoute(e.target.value);
                setPage(1);
                dispatch(
                  driversFetch({
                    page: 1,
                    limit,
                    search,
                    route: e.target.value,
                  })
                );
              }}
              className="py-3  md:w-[35vh] rounded-lg text-left p-2 hover:shadow-xl shadow-md border-spacing-2"
            >
              <option value="">All Classes</option>
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

        {driverToggle && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
            <section className=" p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-10">
              <h2 className="text-lg font-semibold  text-gray-700 capitalize dark:text-white">
                Drivers Form
              </h2>
              <form encType="multipart/form-data" onSubmit={driverAddHandler}>
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
                      value={driverData.name}
                      onChange={(e) =>
                        setDriverData({
                          ...driverData,
                          name: e.target.value,
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
                      type="number"
                      value={driverData.mobile}
                      onChange={(e) =>
                        setDriverData({
                          ...driverData,
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
                      value={driverData.salary}
                      onChange={(e) =>
                        setDriverData({
                          ...driverData,
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
                      Select vehicle
                    </label>
                    <select
                      id="countries"
                      value={driverData.vehicle}
                      onChange={(e) =>
                        setDriverData({
                          ...driverData,
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
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="password"
                    >
                      Route
                    </label>
                    <input
                      id="route"
                      type="text"
                      value={driverData.route}
                      onChange={(e) =>
                        setDriverData({
                          ...driverData,
                          route: e.target.value,
                        })
                      }
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <input
                    className="block w-full mb-5 text-xs text-gray-900 border rounded-lg cursor-pointer bg-gray-50"
                    name="image"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="flex justify-start mt-6 gap-10 text-black">
                  <button className="px-6 py-2 w-[45%] leading-5  transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-gray-600">
                    Add
                  </button>
                  <button
                    onClick={(e) => setDriverToggle(false)}
                    className="px-6 py-2 w-[45%] leading-5  transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
        <div className="relative overflow-x-auto sm:rounded-lg mt-4">
          <DriverTable
            Data={drivers}
            columns={[
              { key: "name", label: "Driver Name" },
              { key: "vehicle", label: "Vehicle" },
              { key: "salary", label: "Salary" },
              { key: "route", label: "Routes" },
              { key: "number", label: "Mobile Number" },
              { key: "action", label: "Actions" },
            ]}
          />
        </div>
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
};

export default Student;
