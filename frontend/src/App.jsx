import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLayout from "./pages/AdminLayout";
import Teachers from "./pages/Teachers";
import Notfound from "./pages/Notfound";
import Student from "./pages/Student";
import Vehicle from "./pages/Vehicle";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/auth/login";
import Register from "./pages/auth/Signup";
import ProtectedRoute from "./middleware/protected";

function App() {
  return (
    <>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="teachers"
              element={
                <ProtectedRoute>
                  <Teachers />
                </ProtectedRoute>
              }
            />
            <Route
              path="students"
              element={
                <ProtectedRoute>
                  <Student />
                </ProtectedRoute>
              }
            />
            <Route
              path="driver"
              element={
                <ProtectedRoute>
                  <Vehicle />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/admin">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
