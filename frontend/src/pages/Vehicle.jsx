import React, { useEffect, useState } from "react";
import DriverTable from "../components/admin/DriverTable";
import { useDispatch, useSelector } from "react-redux";
import { driversFetch } from "../toolkit/DataReducer";
const Student = () => {
  const [VehicleToggle, setVehicleToggle] = useState(false);
  const drivers = useSelector((state) => state.data.drivers);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 5;
  const [route, setRoute] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(driversFetch({ page, limit, search, route }));
  }, [dispatch, page, limit, search]);

  return (
    <>
      <div className="w-full p-4">
        <h1 className="text-start font-semibold font-mono text-lg md:text-2xl">
          Dashboard Driver
        </h1>

        <div className="flex flex-col items-end mb-4">
          <button
            className="bg-orange-500 py-2 rounded-lg text-base md:text-xl font-semibold font-sans w-full md:w-[30vh] hover:shadow-lg"
            onClick={() => setVehicleToggle(true)}
          >
            Add Vehicle
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <input
            type="text"
            placeholder="Search Here"
            className="py-3 w-full md:w-[35vh] rounded-lg text-left p-2 hover:shadow-xl shadow-md border-spacing-2"
          />
          <button className="bg-green-500 hover:cursor-pointer hover:shadow-md rounded-xl font-semibold text-base md:text-xl w-full md:w-[25vh]">
            Search
          </button>
        </div>

        {VehicleToggle && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
            <div className="p-4 bg-white rounded-lg w-[90vw] md:w-[60vw] lg:w-[35vw]">
              <h2 className="text-center text-lg text-black mb-4 font-semibold">
                Add Vehicle
              </h2>
              <div>
                <label>Driver Name</label>
                <input
                  type="text"
                  className="bg-gray-100 w-full my-2 rounded-md p-2"
                  placeholder="Enter Name"
                />
                <label>Vehicle Type</label>
                <input
                  type="text"
                  className="bg-gray-100 w-full my-2 rounded-md p-2"
                  placeholder="Enter Address"
                />
                <label>Phone</label>
                <input
                  type="text"
                  className="bg-gray-100 w-full my-2 rounded-md p-2"
                  placeholder="Enter Phone"
                />
                <label>Salary</label>
                <input
                  type="text"
                  className="bg-gray-100 w-full my-2 rounded-md p-2"
                  placeholder="Enter Salary"
                />
                <input
                  className="block w-full mb-5 text-xs text-gray-900 border rounded-lg cursor-pointer bg-gray-50"
                  type="file"
                />
              </div>
              <div className="flex gap-4 justify-center mt-4">
                <button className="p-2 bg-blue-600 text-white rounded w-1/2 hover:bg-blue-700">
                  Add
                </button>
                <button
                  className="p-2 bg-red-400 text-white rounded w-1/2 hover:bg-red-500"
                  onClick={() => setVehicleToggle(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <DriverTable
          Data={drivers}
          columns={[
            { key: "name", label: "Driver Name" },
            { key: "vehicle", label: "Vehicle" },
            { key: "salary", label: "Salary" },
            { key: "route", label: "Routes" },
          ]}
        />
      </div>
    </>
  );
};

export default Student;
