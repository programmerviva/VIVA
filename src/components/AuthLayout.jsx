/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { login } from "../store/authSlice";
import authService from "../appwrite/auth";
// Update the import path to match your component structure
import Loading from "./Loading"; // If Loading.jsx is in the same folder
// OR
// import Loading from "./components/Loading"; // If Loading.jsx is in a components subfolder
// todo here
// ? go there
export default function AuthLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate, dispatch]);

  return loading ? <Loading /> : <Outlet />;
}
