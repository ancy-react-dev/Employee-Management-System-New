
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = sessionStorage.getItem("authToken");

 if (!token) {
  return <Navigate to="/signup" replace />;
}

  return <Outlet />;
}

export default ProtectedRoute;
