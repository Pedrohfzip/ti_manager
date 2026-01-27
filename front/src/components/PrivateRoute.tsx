import { Navigate, Outlet } from "react-router";
import { Layout } from "./Layout";
export function PrivateRoute() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Layout/>;
}
    