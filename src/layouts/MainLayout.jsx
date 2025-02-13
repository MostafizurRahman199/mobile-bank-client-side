import React from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useFirebaseAuth } from "../Auth/AuthProvider";
import { FaSpinner } from "react-icons/fa";
import { ThemeProvider } from "../Auth/ThemeContext";
import ApiComponent from "../API/ApiComponent";
import { useFirebaseAuth } from "../hooks/useAuth";


const MainLayout = () => {
  const { user, loading } = useFirebaseAuth();
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="font_poppins min-h-screen">
      <ToastContainer />

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <FaSpinner className="animate-spin text-4xl text-[#5544d9]" />
        </div>
      ) : (
        <>
          {pathname !== "/login" &&
          pathname !== "/register" &&
          pathname !== "/forgot-password" &&
          pathname !== "/reset-password" ? (
            <>
              <Navbar />
              <div className={`min-h-screen py-16}`}>
                <Outlet />
              </div>
              <Footer />{" "}
            </>
          ) : (
           <>
            <Navbar />
            <Outlet />
           </>
          )}
        </>
      )}
    </div>
  );
};

export default MainLayout;
