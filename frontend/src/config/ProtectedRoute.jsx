import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
  const token = JSON.parse(localStorage.getItem("user"));
  // console.log(token);
  return token ? children : <Navigate to="/auth-user" replace />;
}
