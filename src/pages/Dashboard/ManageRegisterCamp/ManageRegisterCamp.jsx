


import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ApiComponent from '../../../API/ApiComponent';
import Loading from '../../../components/Loading/Loading';
import ErrorPage from '../../../components/Error.jsx/ErrorPage';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import Pagination from '../../../components/Pagination/Pagination';

const ManageRegisterCamp = () => {
  const { getJoinCamp, updateConfirmationStatus, deleteFromJoinCamp, } = ApiComponent();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState('');

  const { data: campData, isLoading, isError, refetch } = useQuery({
    queryKey: ['join-camps'],
    queryFn: getJoinCamp,
  });

  console.log(campData);

  const confirmPaymentMutation = useMutation({
    mutationFn: ({id, status}) => updateConfirmationStatus(id, status),
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: 'success',
        title: 'Status Changed',
        text: `Status has been changed successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to Change. Please try again.',
      });
    },
  });

  const cancelCampMutation = useMutation({
    mutationFn: ({id, campId}) => deleteFromJoinCamp(id, campId),
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: 'success',
        title: 'Cancelled!',
        text: 'The camp registration has been cancelled.',
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to cancel the camp. Please try again.',
      });
    },
  });

  const handleConfirm = (id, status) => {

    console.log(id, status);
    confirmPaymentMutation.mutate({id, status});
    refetch();
  };

  const handleCancel = (id, campId) => {

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
          cancelCampMutation.mutate({id, campId});
        }
      });
  };

  if (isLoading) {
    return <Loading height="screen" />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  // Filter and paginate camps
  const filteredCamps = campData.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  if(campData?.length == 0){
    return  <NotFound title='No one register yet' link='/dashboard/add-a-camp' buttonText='Add Camp'></NotFound>
  }
  


  return (
    <div className="w-full md:w-11/12 mx-auto">
      <SectionHeading title1={"---Manage Camps---"} title2={"Registered Camps"} />

      <div className="w-full bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Total Registered: {filteredCamps.length}</h2>
          <input
            type="text"
            placeholder="Search by name or participant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4"
          />
        </div>

        <div className="hidden md:block overflow-x-auto min-h-[400px] ">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#4335a7] text-white font-normal">
                <th className="py-2 px-4 text-center">Camp Name</th>
                <th className="py-2 px-4 text-center">Participant Name</th>
                <th className="py-2 px-4 text-center">Fees</th>
                <th className="py-2 px-4 text-center">Payment Status</th>
                <th className="py-2 px-4 text-center">Confirmation Status</th>
                <th className="py-2 px-4 text-center">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCamps.map((camp) => (
                <tr key={camp._id} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-4 text-center">{camp.campName}</td>
                  <td className="py-4 px-4 text-center">{camp.participantName}</td>
                  <td className="py-4 px-4 text-center">{camp.campFees}</td>
                  <td className="py-4 px-4 text-center">{camp.paymentStatus}</td>
                  <td className="py-4 px-4 text-center">
                    <select
                      className={`border rounded-lg p-2 bg-gray-100  
                        ${camp.confirmationStatus === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                        ${camp.confirmationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${camp.confirmationStatus === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                      `}

                      value={camp.confirmationStatus}
                      onChange={(e) => handleConfirm(camp._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleCancel(camp._id, camp.campId)}
                      disabled={camp.paymentStatus === 'paid' && camp.confirmationStatus === 'confirmed'}
                      className="bg-red-500 btn hover:bg-red-800 disabled:opacity-50"
                    >
                      <FaTrashAlt size={18} className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block md:hidden">
          {paginatedCamps.map((item, index) => (
            <div key={index} className="flex flex-col bg-gray-100 p-4 mb-4 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex sm:flex-row gap-4 items-center mb-4">
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 text-center">{item.campName}</h3>
                  <p className="text-gray-600 text-center">{item.participantName}</p>
                  <p className="text-gray-600 text-center">{item.campFees}</p>
                  <p className="text-gray-600 text-center">{item.paymentStatus}</p>
                  <select
                  className={`border rounded-lg p-2 
                    ${item.confirmationStatus === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                    ${item.confirmationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${item.confirmationStatus === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                  `}
                    value={item.confirmationStatus}
                    onChange={(e) => handleConfirm(item._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCancel(item._id)}
                    disabled={item.paymentStatus === 'paid' && item.confirmationStatus === 'confirmed'}
                    className="bg-red-500 p-3 rounded-lg hover:bg-red-800"
                  >
                    <FaTrashAlt size={18} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageRegisterCamp;






