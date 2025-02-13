import React from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error.jsx/ErrorPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiComponent from "../../API/ApiComponent";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const MyCart = () => {
  const { deleteFromCart } = ApiComponent();
  const { data, refetch, isError, isLoading } = useCart();
  const queryClient = useQueryClient();
  // console.log(data);

  // Dummy data for testing

  const cartData = data;

  const deleteCartItem = useMutation({
    mutationFn: (id) => deleteFromCart(id),
    onSuccess: () => {
      refetch(); // Refetch cart data after successful deletion
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The item has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the item. Please try again.",
      });
    },
  });


  // const showMessage = ()=>{
  //   Swal.fire({
  //     icon: "warning",
  //     title: "Cart is Empty",
  //     text: "Please first add items to Cart then pay.",
  //     timer: 1500,
  //     showConfirmButton: false,
  //   });
  // }


  const handleDelete = (id) => {
    // console.log("hello");
    // SweetAlert2 Confirmation Dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCartItem.mutate(id); // Trigger deletion if confirmed
      }
    });
  };

  if (isLoading) {
    return <Loading height="screen"></Loading>;
  }

  if (isError) {
    return <ErrorPage></ErrorPage>;
  }

  if (cartData?.length === 0 || cartData === false) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <FaShoppingCart className="text-gray-400 text-6xl mb-4" />
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            No orders added yet!
          </p>
          <Link to={"/order/:category"}
            className="mt-4 px-6 py-2 bg-[#D1A054] text-white rounded-lg shadow-md font-semibold hover:bg-[#b5853a] transition-all"
            onClick={() => console.log("Redirect to shop")}
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-10/12 mx-auto  md:max-h-[calc(100vh-50px)]   bg-white shadow-lg rounded-lg p-6 ">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Total Added: {cartData?.length}
          </h2>
          <h2 className="text-xl font-semibold text-gray-800">
            Total Price: $
            {cartData
              ?.reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </h2>
        </div>
       {
        cartData?.length > 0 ? <Link to={"/dashboard/payment"} className="bg-[#D1A054] text-white px-6 py-2 rounded-lg  shadow-md hover:bg-[#b5853a]">
        Pay
      </Link> : <Button onClick={showMessage} className="bg-[#D1A054] text-white px-6 py-2 rounded-lg  shadow-md hover:bg-[#b5853a]">
        Pay
      </Button>
       }
      </div>

      {/* Table for medium and large devices */}
      <div className="hidden md:block overflow-x-auto   max-h-[calc(100vh-200px)] overflow-auto ">
        <table className="table-auto w-full text-left border-collapse ">
          <thead>
            <tr className="bg-[#D1A054] text-white font-normal">
              <th className="py-2 px-4 text-center">ITEM IMAGE</th>
              <th className="py-2 px-4 text-center">QUANTITY</th>
              <th className="py-2 px-4 text-center">CATEGORY</th>
              <th className="py-2 px-4 text-center">PRICE</th>
              <th className="py-2 px-4 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="">
            {cartData?.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-4 px-4 text-center flex justify-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                </td>
                <td className="py-4 px-4 text-center">{item.quantity}</td>
                <td className="py-4 px-4 text-center">{item.category}</td>
                <td className="py-4 px-4 text-center">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700 btn btn-circle"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card format for small devices */}
      <div className="block md:hidden">
        {cartData?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-100 p-4 mb-4 rounded-lg shadow-sm"
          >
            <div className="flex flex-col sm:flex sm:flex-row gap-4 items-center mb-4">
              <div className="w-24 h-24 bg-gray-300 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600">Category: {item.category}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right text-lg font-semibold text-gray-800">
                Price: ${item.price.toFixed(2)}
              </div>
              <div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCart;
