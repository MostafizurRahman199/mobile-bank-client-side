


import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useFirebaseAuth } from "../hooks/useAuth";
// import { useFirebaseAuth } from "../Auth/AuthProvider";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useFirebaseAuth();

  // Show a loading spinner while the authentication state is being resolved
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#5544d9]"></div>
      </div>
    );
  }

  // Redirect to login if no user is authenticated, passing the current location in state
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Render children if the user is authenticated
  return <>{children}</>;
};

export default PrivateRoute;
