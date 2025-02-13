import React, { useState } from "react";
import { FaTrashAlt, FaComment, FaCreditCard } from "react-icons/fa";
import useRegisterCamp from "../../hooks/useRegisterCamp";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Pagination from "../../components/Pagination/Pagination";
import PaymentModal from "./PaymentModal";
import FeedbackModal from "./FeedbackModal";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error.jsx/ErrorPage";
import { GiCancel } from "react-icons/gi";
import { useMutation } from "@tanstack/react-query";
import ApiComponent from "../../API/ApiComponent";
import Swal from "sweetalert2";
import NotFound from "../../components/NotFound/NotFound";

const RegisteredCamps = () => {

    const {deleteFromJoinCamp} = ApiComponent();

  const { data: registeredCamps, refetch, isLoading, isError } = useRegisterCamp();
  console.log(registeredCamps);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const [selectedCamp, setSelectedCamp] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);





  const deleteCampMutation = useMutation({
    mutationFn: ({id, campId}) => deleteFromJoinCamp(id, campId),
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



  
  const handleDelete = (id, campId) => {
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
        deleteCampMutation.mutate({id, campId}); // Trigger deletion if confirmed
      }
    });
  };



  if (isLoading) {
    return <Loading height="screen"></Loading>;
  }

  if (isError) {
    return <ErrorPage></ErrorPage>;
  }

  const openPaymentModal = (camp) => {
    setSelectedCamp(camp);
    setIsPaymentModalOpen(true);
  };

  const openFeedbackModal = (camp) => {
    setSelectedCamp(camp);
    setIsFeedbackModalOpen(true);
  };

  // Search functionality
  const filteredCamps = registeredCamps.filter((camp) =>
    camp.campName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

if(registeredCamps?.length == 0){
  return <NotFound title='Not Yet Register' link='/available-camps' buttonText='Get Register'></NotFound>
}


  return (
    <div className="w-11/12 mx-auto">
      <SectionHeading title2="My Registered Camps" />

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search camps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 w-full"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px] ">
        <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-[#4335A7] text-white">
              <th className="py-2 px-4">No.</th>
              <th className="py-2 px-4">Camp Name</th>
              <th className="py-2 px-4">Camp Fees</th>
              <th className="py-2 px-4">Participant Name</th>
              <th className="py-2 px-4">Payment Status</th>
              <th className="py-2 px-4">Conformation Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.map((camp, index) => (
              <tr key={camp._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-2 px-4 text-center">{camp.campName}</td>
                <td className="py-2 px-4 text-center">{camp.campFees} BDT</td>
                <td className="py-2 px-4 text-center">{camp.participantName}</td>
                <td className="py-2 px-4 text-center">
                  {camp.paymentStatus === "paid" ? (
                    <span className="text-green-800 bg-green-100 p-2 rounded-lg font-semibold">Paid</span>
                  ) : (
                    <button
                      className="bg-[#4335A7] text-white py-1 px-2 rounded-md hover:bg-[#5544d9]"
                      onClick={() => openPaymentModal(camp)}
                    >
                      <FaCreditCard className="inline-block mr-1" />
                      Pay
                    </button>
                  )}
                </td>
                <td className="py-2 px-4 text-center">
                  {camp.confirmationStatus === "confirmed" ? (
                    <span className="text-green-800 bg-green-100 p-2 rounded-lg">Confirmed</span>
                  ) : camp.confirmationStatus === "pending" ? (
                    <span className="text-yellow-800 bg-yellow-100 p-2 rounded-lg">Pending</span>
                  ) : (
                    <span className="text-red-800 bg-red-100 p-2 rounded-lg">Rejected</span>
                  )}
                </td>

                <td className="py-2 px-4 text-center ">
                  
                 <div className="flex flex-col   gap-2">
             
                      <button
                        disabled={camp.paymentStatus === "paid" ? false : true}
                        className={`flex items-center ${ camp.paymentStatus === "unpaid"
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-[#4335A7] text-white hover:bg-[#5544d9]"} py-1 px-2 rounded-md`}
                 
                        onClick={() => openFeedbackModal(camp)}
                      >
                        <FaComment className="inline-block mr-1" />
                       <span> Feedback</span>
                      </button>

                      <button
                    className={`py-1 px-2 rounded-md ${
                      camp.paymentStatus === "paid"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-700"
                    }`}
                    onClick={() => handleDelete(camp._id, camp.campId)}
                    disabled={camp.paymentStatus === "paid"}
                  >
                 
                   <GiCancel className="inline-block mr-1" /> Cancel
                  </button>
                 </div>
                 
                   
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modals */}
      {selectedCamp && (
        <>
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => {setIsPaymentModalOpen(false)
                refetch()
            }}
            camp={selectedCamp}
            onPaymentSuccess={refetch}
          />
          <FeedbackModal
            isOpen={isFeedbackModalOpen}
            onClose={() => {setIsFeedbackModalOpen(false)
                refetch();
            }}
            camp={selectedCamp}
          />
        </>
      )}
    </div>
  );
};

export default RegisteredCamps;

