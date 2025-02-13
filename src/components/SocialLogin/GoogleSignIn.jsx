import React from "react";
import { useFirebaseAuth } from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ApiComponent from "../../API/ApiComponent";
import { useMutation } from "@tanstack/react-query";



const GoogleSignIn = ({ title, from }) => {


  const { googleSignIn } = useFirebaseAuth();
  const { createUser } = ApiComponent();
  const navigate = useNavigate();
  console.log(from);




  const createUserMutation = useMutation({
    mutationFn: (userInfo) => createUser(userInfo),
    onSuccess: (data) => {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `${title} Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(data);
      // await registeredUser.reload();
      navigate(from, { replace: true });
    },
    onError: () => {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Something went wrong. Try again!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });




  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      console.log(result);

      const userInfo = {
        email: result.email,
        name: result.displayName,
        photoURL: result.photoURL,
        createAt: new Date(),
        role:"Member",
      };

      createUserMutation.mutate(userInfo);
    } catch (error) {
      //   showError(error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Something error, Try again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };




  return (
    <>
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 px-4 py-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </button>
    </>
  );
};

export default GoogleSignIn;
