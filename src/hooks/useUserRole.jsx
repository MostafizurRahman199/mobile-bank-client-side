import React from "react";
import ApiComponent from "../API/ApiComponent";
import { useFirebaseAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { verifyAdmin } = ApiComponent();
  const { user } = useFirebaseAuth();

  const email = user?.email;

  console.log(email);

  const { data , isLoading:adminLoading } = useQuery({
    queryKey: ["verifyAdmin", email],
    queryFn: () => verifyAdmin(email),
    enabled: !!email,
  });

  const isAdmin = data?.role === "Admin" ? true : false;
  console.log(isAdmin);
  return {data, isAdmin, adminLoading};
};

export default useUserRole;
