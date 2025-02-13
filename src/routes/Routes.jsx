import { createBrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import Register from "../pages/Register";
import Login from "../pages/Login";

import ForgetPassword from "../pages/ForgetPassword";
import MainLayout from "../layouts/MainLayout";

import Profile from "../pages/Profile";

import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../pages/UpdateProfile";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import MenuPage from "../pages/Menus/MenuPage";
import Order from "../pages/Order/Order";
import Contact from "../pages/Contact/Contact";
import Dashboard from "../layouts/Dashboard";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import MyCart from "../pages/Dashboard/MyCart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddMenuItem from "../pages/Dashboard/AddMenu/AddMenuItem";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AddReview from "../pages/Dashboard/AddReview/AddReview";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import AddACamp from "../pages/Dashboard/AddACamp/AddACamp";
import ManageCamp from "../pages/Dashboard/ManageCamp/ManageCamp";
import CampDetails from "../pages/AvailableCamps/CampDetails";
import RegisteredCamps from "../pages/Dashboard/RegisteredCamps";
import UserAnalytics from "../pages/Dashboard/UserAnalytics/UserAnalytics";
import ManageRegisterCamp from "../pages/Dashboard/ManageRegisterCamp/ManageRegisterCamp";
import Message from "../pages/Message/Message";
import ReplyMessage from "../pages/ReplyMessage/ReplyMessage";
import UploadPhotos from "../pages/Dashboard/UploadPhotos/UploadPhotos";
import CreatePost from "../pages/Dashboard/CreatePost/CreatePost";
import Gallery from "../pages/Gallery/Gallery";
import Article from "../pages/Article/Article";
import Support from "../pages/Support/Support";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Home</title>
            </Helmet>
            <Home></Home>
          </>
        ),
      },
      {
        path: "/menu",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Menu</title>
            </Helmet>
            <MenuPage></MenuPage>
          </>
        ),
      },
      {
        path: "/available-camps",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Available Camps</title>
            </Helmet>
            <AvailableCamps></AvailableCamps>
          </>
        ),
      },
      {
        path: "/contact",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Contact</title>
            </Helmet>
            <Support></Support>
          </>
        ),
      },
      {
        path: "/gallery",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Gallery</title>
            </Helmet>
            <Gallery></Gallery>
          </>
        ),
      },
      {
        path: "/article",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Article</title>
            </Helmet>
            <Article></Article>
          </>
        ),
      },
      {
        path: "/order/:category",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Order Food</title>
            </Helmet>
            <Order></Order>
          </>
        ),
      },
      {
        path: "/camp-details/:id",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Camp Details</title>
            </Helmet>
            <CampDetails></CampDetails>
          </>
        ),
      },

      {
        path: "/register",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Register</title>
            </Helmet>
            <Register />
          </>
        ),
      },

      {
        path: "/get-message",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Message</title>
            </Helmet>
            <AdminRoute>
              <Message></Message>
            </AdminRoute>
          </>
        ),
      },
      {
        path: "/get-reply-message",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Message</title>
            </Helmet>
            <PrivateRoute>
              <ReplyMessage></ReplyMessage>
            </PrivateRoute>
          </>
        ),
      },

      {
        path: "/login",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Login</title>
            </Helmet>
            <Login />
          </>
        ),
      },

      {
        path: "/forgot-password",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Forgot Password</title>
            </Helmet>
            <ForgetPassword />
          </>
        ),
      },
     

    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
    
      {
        path: "payment",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Payment</title>
            </Helmet>
            <PrivateRoute>
              <Payment></Payment>
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "user-home",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - User Home</title>
            </Helmet>
            <PrivateRoute>
              <UserHome></UserHome>
            </PrivateRoute>
          </>
        ), // Explicit route for /dashboard/user-home
      },
      {
        path: "admin-home",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Admin Home</title>
            </Helmet>
            <AdminRoute>
              <AdminHome></AdminHome>
            </AdminRoute>
          </>
        ), // Explicit route for /dashboard/user-home
      },
      {
        path: "upload-photos",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Upload Photos</title>
            </Helmet>
            <AdminRoute>
              <UploadPhotos></UploadPhotos>
            </AdminRoute>
          </>
        ), 
      },
      {
        path: "create-post",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Create Post</title>
            </Helmet>
            <AdminRoute>
              <CreatePost></CreatePost>
            </AdminRoute>
          </>
        ), 
      },
      {
        path: "reservation",
        element: <div>Reservation Page</div>, // Replace with your actual component, e.g., <Reservation />
      },
      {
        path: "payment-history",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Payment History</title>
            </Helmet>
            <PrivateRoute>
            <PaymentHistory></PaymentHistory>
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "analytics",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - User Analytics</title>
            </Helmet>
            <PrivateRoute>
              <UserAnalytics></UserAnalytics>
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "registered-camps",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Register Camps</title>
            </Helmet>
            <PrivateRoute>
            <RegisteredCamps></RegisteredCamps>
            </PrivateRoute>
          </>
        ),
      },
     
      {
        path: "add-review",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Add Review</title>
            </Helmet>
            <PrivateRoute>
              <AddReview></AddReview>
            </PrivateRoute>
          </>
        ), // Explicit route for /dashboard/user-home
      },
      {
        path: "my-booking",
        element: <div>My Booking Page</div>, // Replace with your actual component, e.g., <MyBooking />
      },
      {
        path: "all-users",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - All Users</title>
            </Helmet>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </>
        ),
      },
      {
        path: "add-a-camp",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Add A Camp</title>
            </Helmet>
            <AdminRoute>
              <AddACamp></AddACamp>
            </AdminRoute>
          </>
        ),
      },
      {
        path: "manage-camp",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Manage Camps</title>
            </Helmet>
            <AdminRoute>
              <ManageCamp></ManageCamp>
            </AdminRoute>
          </>
        ),
      },
      {
        path: "manage-register-camp",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Manage Register Camps</title>
            </Helmet>
            <AdminRoute>
              <ManageRegisterCamp></ManageRegisterCamp>
            </AdminRoute>
          </>
        ),
      },
      {
        path: "my-profile",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - My Profile</title>
            </Helmet>
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          </>
        ),
      },
      
      {
        path: "update-profile",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Update Profile</title>
            </Helmet>
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          </>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <>
        <Helmet>
          <title>Be Healthy - Error</title>
        </Helmet>
        <ErrorPage />
      </>
    ),
  },
]);

export default router;


