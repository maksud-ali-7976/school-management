import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PublicRoute = async ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
