import React from "react";
import { useSelector } from "react-redux";
function Dashboard() {
  const teachers = useSelector((state) => state.data.teachers);
  const students = useSelector((state) => state.data.students);
  const drivers = useSelector((state) => state.data.drivers);
  return (
    <div className="w-full p-5">
      {/* Header */}
      <h1 className="flex font-serif text-black font-bold hover:underline text-lg md:text-2xl">
        Dashboard / Admin
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
        {/* Card 1 */}
        <div className="hover:shadow-2xl rounded-lg bg-red-500 w-full h-40 flex flex-col items-center justify-center text-white">
          <h1 className="font-semibold font-serif text-center">
            Total Teachers
          </h1>
          <span className="text-3xl font-semibold">
            {teachers && teachers.length}
          </span>
        </div>

        {/* Card 2 */}
        <div className="hover:shadow-2xl rounded-lg bg-green-400 w-full h-40 flex flex-col items-center justify-center text-white">
          <h1 className="font-semibold font-serif text-center">
            Total Students
          </h1>
          <span className="text-3xl font-semibold">
            {students && students.length}
          </span>
        </div>

        {/* Card 3 */}
        <div className="hover:shadow-2xl rounded-lg bg-blue-400 w-full h-40 flex flex-col items-center justify-center text-white">
          <h1 className="font-semibold font-serif text-center">
            Total Drivers
          </h1>
          <span className="text-3xl font-semibold">
            {drivers && drivers.length}
          </span>
        </div>

        {/* Card 4 */}
        <div className="hover:shadow-2xl rounded-lg bg-yellow-200 w-full h-40 flex flex-col items-center justify-center text-black">
          <h1 className="font-semibold font-serif text-center">
            Total Classes
          </h1>
          <span className="text-3xl font-semibold">13</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
