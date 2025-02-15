import { createBrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import AdminRoute from "./AdminRoute";
import Support from "../pages/Support/Support";
import HomePage from "../pages/Home/HomePage";
import SendMoney from "../pages/SendMoney/SendMoney";
import CashOut from "../pages/CashOut/CashOut";
import Transactions from "../pages/Transactions/transactions";
import AgentRoute from "./AgentRoute";
import CashInUser from "../pages/CashInUser/CashInUser";
import BalanceRequest from "../pages/BalanceRequest/BalanceRequest";
import WithdrawRequest from "../pages/WithdrawRequest/WithdrawRequest";
import AllUsers from "../pages/AllUsers/AllUsers";
import SingleUserTransaction from "../pages/AllUsers/SingleUserTransaction";
import AllAgent from "../pages/AIIAgent/AllAgent";
import SingleAgent from "../pages/AIIAgent/SingleAgent";
import AdminBalanceRequest from "../pages/AdminBalanceRequest/AdminBalanceRequest";
import AdminWithdrawRequest from "../pages/AdminWithdrawRequest/AdminWithdrawRequest";
import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile";
import ReplyMessage from "../pages/ReplyMessage/ReplyMessage";
import Message from "../pages/Message/Message";

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
            <Login></Login>
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
        path: "/homePage",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Contact</title>
            </Helmet>
            <PrivateRoute>
            <HomePage></HomePage>
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "/user-transactions/:email",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Camp Details</title>
            </Helmet>
            <AdminRoute>
              <SingleUserTransaction></SingleUserTransaction>
            </AdminRoute>
          </>
        ),
      },
      {
        path: "/agent-transactions/:email",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Camp Details</title>
            </Helmet>
            <AdminRoute>
              <SingleAgent></SingleAgent>
            </AdminRoute>
          </>
        ),
      },
      {
        path: "/all-agents",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - All Agent</title>
            </Helmet>
            <AdminRoute>
              <AllAgent></AllAgent>
            </AdminRoute>
          </>
        ),
      },
      {
        path: "/balance-requests",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Balance Request</title>
            </Helmet>
            <AdminRoute>
              <AdminBalanceRequest></AdminBalanceRequest>
            </AdminRoute>
          </>
        ),
      },
      {
        path: "/withdraw-requests",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Withdraw Request</title>
            </Helmet>
            <AdminRoute>
              <AdminWithdrawRequest></AdminWithdrawRequest>
            </AdminRoute>
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
        path: "/send-money",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Send Money</title>
            </Helmet>
            <PrivateRoute>
              <SendMoney></SendMoney>
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "/cash-out",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Cash Out</title>
            </Helmet>
            <PrivateRoute>
              <CashOut></CashOut>
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "/transactions",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Transactions</title>
            </Helmet>
            <PrivateRoute>
              <Transactions></Transactions>
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "/cash-in-user",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Transactions</title>
            </Helmet>
            <AgentRoute>
              <CashInUser></CashInUser>
            </AgentRoute>
          </>
        ),
      },
      {
        path: "/balance-request",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Balance Request</title>
            </Helmet>
            <AgentRoute>
              <BalanceRequest></BalanceRequest>
            </AgentRoute>
          </>
        ),
      },
      {
        path: "/withdraw-request",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Withdraw Request</title>
            </Helmet>
            <AgentRoute>
              <WithdrawRequest></WithdrawRequest>
            </AgentRoute>
          </>
        ),
      },
      {
        path: "/all-users",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Withdraw Request</title>
            </Helmet>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
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
        path: "/profile",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Login</title>
            </Helmet>
            <PrivateRoute>
              <Profile></Profile>
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Login</title>
            </Helmet>
            <PrivateRoute>
              <UpdateProfile></UpdateProfile>
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "/get-reply-message",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Login</title>
            </Helmet>
            <PrivateRoute>
              <ReplyMessage></ReplyMessage>
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "/get-message",
        element: (
          <>
            <Helmet>
              <title>Be Healthy - Login</title>
            </Helmet>
            <AdminRoute>
              <Message></Message>
            </AdminRoute>
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


