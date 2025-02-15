


import React from "react";
import { useFirebaseAuth } from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";
import UserHomePage from "./UserHomePage";
import AgentHomePage from "./AgentHomePage";
import AdminHomePage from "./AdminHomePage";

const HomePage = () => {
  const { data } = useGetUser();

  return (
    <>
      {data?.accountType === "User" && <UserHomePage data={data} /> }
      {data?.accountType ==="Agent" && <AgentHomePage data={data} />}
      {data?.accountType ==="Admin" && <AdminHomePage></AdminHomePage>}
    </>
  );
};

export default HomePage;

