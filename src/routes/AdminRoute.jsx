// import React from 'react'

// const AdminRoute = () => {
//   return (
//     <div>AdminRoute</div>
//   )
// }

// export default AdminRoute






import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import useUserRole from "../hooks/useUserRole";
import { useFirebaseAuth } from "../hooks/useAuth";


const AdminRoute = ({ children }) => {

  const location = useLocation();
  const { user, loading } = useFirebaseAuth();
  const {isAdmin, adminLoading} = useUserRole();

  // Show a loading spinner while the authentication state is being resolved
  if (loading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#5544d9]"></div>
      </div>
    );
  }

  // Redirect to login if no user is authenticated, passing the current location in state
  if (!user && !isAdmin) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Render children if the user is authenticated
  return <>{children}</>;
};

export default AdminRoute;
