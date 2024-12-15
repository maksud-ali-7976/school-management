import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_BACKEND_API;
const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${API_URL}user/register`, userInfo, {
      headers: {
        "Content-Type": "application/json", // Data format
        "Access-Control-Allow-Origin":
          "https://school-management-beryl-zeta.vercel.app",
      },
      withCredentials: true,
    });
    console.log(response.data);
    // return response.data;
    navigate("/admin/login");
  };

  return (
    <>
      <main>
        <div className="flex items-center h-screen px-2 sm:px-0">
          <form
            className="bg-gray-100 w-full max-w-sm sm:max-w-xl mx-auto p-4 rounded-xl shadow-md"
            method="post"
            onSubmit={SubmitHandler}
          >
            <div className="px-4 m-4 text-center">
              <h2 className="text-xl font-bold">Create Your Account</h2>
            </div>
            <div className="inputs p-4 w-full">
              <div className="grid grid-cols-1 max-w-md mx-auto">
                <div className="form-group gap-2">
                  <label className="block my-2" htmlFor="username">
                    Username:{" "}
                  </label>
                  <input
                    className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    required
                    value={userInfo.username}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, username: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="block my-2" htmlFor="password">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                      type="text"
                      id="email"
                      name="email"
                      required
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-300"
                      aria-label="Show password"
                    ></button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="block my-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                      type="password"
                      id="password"
                      name="password"
                      required
                      value={userInfo.password}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-300"
                      aria-label="Show password"
                    ></button>
                  </div>
                  <Link className="text-sky-400 hover:text-sky-800"  to="/admin/login" >Do'nt Have a Account ? Signup</Link>
                </div>
                <button
                  className="w-full bg-blue-700 text-gray-50 rounded-md shadow-sm px-3 py-2 my-4 hover:bg-blue-600"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
