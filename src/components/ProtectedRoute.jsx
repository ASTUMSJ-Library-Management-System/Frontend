import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute = ({ children, requireAdmin }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin === true && !isAdmin()) {
    return (
      <Navigate
        to="/dashboard"
        state={{ from: location, message: "Admins only" }}
        replace
      />
    );
  }

  if (requireAdmin === false && isAdmin()) {
    return (
      <Navigate
        to="/admin/dashboard"
        state={{ from: location, message: "Students only" }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
