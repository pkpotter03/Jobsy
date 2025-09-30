// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/Loader";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/users/profile",{ withCredentials: true });
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        const role = res.data.user.role;
        

        if (allowedRoles.length === 0 || allowedRoles.includes(role)) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [allowedRoles]);

  if (isAuth === null)
    return <Loader size={150} message="Checking authentication..." />;

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
