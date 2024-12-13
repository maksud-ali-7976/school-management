import React from "react";

const DriverTable = ({ Data, columns }) => {
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
                <td className="px-6 py-4">{el.number}</td>
                <td>
                  <button className="w-[40%] bg-blue-500 h-5 text-black rounded-md">
                    Edit
                  </button>
                  <button className="w-[40%] bg-red-500 h-5 text-black rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default DriverTable;
