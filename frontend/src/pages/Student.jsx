import React, { useEffect, useState } from "react";
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";
import Table from "../components/admin/Table";

const Student = () => {
  const navigate = useNavigate();
  const formData = new FormData();
  const [studentRecords, setStudentRecords] = useState(null);
  const [StudentToggle, setStudentToggle] = useState(false);
  const [StudentData, setStudentData] = useState({
    studentName: "",
    studentFather: "",
    studentMother: "",
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
      "http://localhost:5000/student/add-student",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Include cookies
      }
    );
    console.log(response.data);
    navigate("/students", { replace: true });
    window.location.reload();
    setStudentToggle(false);
  };
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:5000/student/all-student",
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Include cookies
        }
      );

      setStudentRecords(response.data.result);
    }
    fetchData();
  }, []);

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
            className="py-3 w-full md:w-[35vh] rounded-lg text-left p-2 hover:shadow-xl shadow-md border-spacing-2"
          />
          <button className="bg-green-500 hover:cursor-pointer hover:shadow-md rounded-xl font-semibold text-base md:text-xl w-full md:w-[25vh]">
            Search
          </button>
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
                  <label>motherName</label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full my-2 rounded-md p-2"
                    placeholder="Enter Phone"
                    value={StudentData.studentMother}
                    onChange={(e) =>
                      setStudentData({
                        ...StudentData,
                        studentMother: e.target.value,
                      })
                    }
                  />
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
            Data={studentRecords}
            columns={[
              { key: "name", label: "studentName" },
              { key: "father", label: "fatherName" },
              { key: "mother", label: "motherName" },
              { key: "totalFess", label: "totalFess" },
              { key: "address", label: "Address" },
              { key: "phone", label: "Phone" },
              {key:'feesStatus',label:"fessStatus"}
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Student;
