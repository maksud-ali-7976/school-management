import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CheckAuth } from "./toolkit/thunk/auth";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./pages/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Teachers from "./pages/Teachers";
import Notfound from "./pages/Notfound";
import Student from "./pages/Student";
import Vehicle from "./pages/Vehicle";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/auth/login";
import Register from "./pages/auth/Signup";
import { useEffect } from "react";
import PublicRoute from "./middleware/public";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      isAuthenticated &&
      window.location.pathname !==
        "https://school-management-beryl-zeta.vercel.app/admin/login" &&
      window.location.pathname !==
        "https://school-management-beryl-zeta.vercel.app/admin/register"
    ) {
      dispatch(CheckAuth());
    } else {
      navigate("/admin/login");
    }
  }, []);

  return (
    <>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="students" element={<Student />} />
            <Route path="driver" element={<Vehicle />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="/admin">
            <Route
              path="login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
