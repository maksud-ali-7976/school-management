import React, { useState } from "react";

import { LoginThunk } from "../../toolkit/thunk/auth";
import { useDispatch } from "react-redux";
import { Navigate,Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const LoginHandler = async (e) => {
    try {
      e.preventDefault();
      if (loginInfo.email == "" && loginInfo.password == "") {
        alert("All Field Required");
      }

      dispatch(LoginThunk(loginInfo));
      <Navigate to="/" replace />;
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <main>
        <div className="flex items-center h-screen px-2 sm:px-0">
          <form
            className="bg-gray-100 w-full max-w-sm sm:max-w-xl mx-auto p-4 rounded-xl shadow-md"
            onSubmit={LoginHandler}
          >
            <div className="px-4 m-4 text-center">
              <h2 className="text-xl font-bold">Login to your account</h2>
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
                    id="email"
                    name="email"
                    placeholder="Enter your Email"
                    required
                    value={loginInfo.email}
                    onChange={(e) =>
                      setLoginInfo({ ...loginInfo, email: e.target.value })
                    }
                  />
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
                      value={loginInfo.password}
                      onChange={(e) =>
                        setLoginInfo({ ...loginInfo, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-300"
                      aria-label="Show password"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      <svg
                        className="hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    </button>
                  </div>
                  <Link className="text-sky-400 hover:text-sky-800"  to="/admin/register" >Do'nt Have a Account ? Signup</Link>
                </div>
                <button
                  className="w-full bg-blue-700 text-gray-50 rounded-md shadow-sm px-3 py-2 my-4 hover:bg-blue-600"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
