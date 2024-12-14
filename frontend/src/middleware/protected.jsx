import { useDispatch, useSelector } from "react-redux";
import { CheckAuth } from "../toolkit/thunk/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated)
  const dispatch = useDispatch();

  if (isAuthenticated) {
    dispatch(CheckAuth());
    return children;
  }

  return <Navigate to="/admin/login" replace />;
};


export default ProtectedRoute;