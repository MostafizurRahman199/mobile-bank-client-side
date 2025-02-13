import React, { useState } from 'react';
import { useFirebaseAuth } from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import ApiComponent from '../../../API/ApiComponent';
import { Link } from 'react-router-dom';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import { FaShoppingCart } from 'react-icons/fa';
import Loading from '../../../components/Loading/Loading';
import ErrorPage from '../../../components/Error.jsx/ErrorPage';
import Pagination from '../../../components/Pagination/Pagination'; // Pagination Component
import usePaymentHistory from '../../../hooks/usePaymentHistory';
import NotFound from '../../../components/NotFound/NotFound';

const PaymentHistory = () => {

  const {paymentData, isLoading, isError, refetch} = usePaymentHistory();



  // Pagination and Search States
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  if (isLoading) {
    return <Loading height="screen" />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (paymentData?.length === 0 || paymentData === false) {
    return (
      <NotFound title='No Payment History' link='/dashboard/registered-camps' buttonText='Pay Now'></NotFound>
    );
  }

  // Filter the payment data based on the search query
  const filteredData = paymentData.filter(
    (item) =>
      item?.campName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.transactionId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full md:w-10/12 mx-auto md:max-h-[calc(100vh-50px)] sm:p-6">
      {/* Header */}
      <SectionHeading title1={"---Your payment--"} title2={"Payment History"} />
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Total Payment: {filteredData.length}
            </h2>
            <h2 className="text-xl font-semibold text-gray-800">
              Total Amount: $
              {filteredData
                ?.reduce((total, item) => total + item.campFees, 0)
                .toFixed(2)}
            </h2>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4"
          />
        </div>

        {/* Table for medium and large devices */}
        <div className="hidden md:block overflow-x-auto max-h-[calc(100vh-200px)] overflow-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#4335A7] text-white font-normal">
                <th className="py-2 px-4 text-center">Camp Name</th>
                <th className="py-2 px-4 text-center">Date</th>
                <th className="py-2 px-4 text-center">Transaction Id</th>
                <th className="py-2 px-4 text-center">Camp Fees</th>
                <th className="py-2 px-4 text-center">Status</th>
                <th className="py-2 px-4 text-center">Confirmation Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-4 text-center">
                    <p>{item.campName}</p>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <p>{new Date(item.date).toLocaleDateString()}</p>
                    <p>{new Date(item.date).toLocaleTimeString()}</p>
                  </td>
                  <td className="py-4 px-4 text-center">{item.transactionId}</td>
                  <td className="py-4 px-4 text-center">{item.campFees}</td>
                  <td className="py-4 px-4 text-center">
                    {item.status === "paid" ? (
                      <span className="text-green-800 bg-green-100 p-2 rounded-lg">Paid</span>
                    ) : item.status === "unpaid" ? (
                      <span className="text-yellow-800 bg-yellow-100 p-2 rounded-lg">Unpaid</span>
                    ) : (
                      item.status // Fallback for other statuses
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                  {item.confirmationStatus === "confirmed" ? (
                    <span className="text-green-800 bg-green-100 p-2 rounded-lg">Confirmed</span>
                  ) : item.confirmationStatus === "pending" ? (
                    <span className="text-yellow-800 bg-yellow-100 p-2 rounded-lg">Pending</span>
                  ) : (
                    <span className="text-red-800 bg-red-100 p-2 rounded-lg">Rejected</span>
                  )}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card format for small devices */}
        <div className="block md:hidden">
          {paginatedData?.map((item, index) => (
            <div key={index} className="flex flex-col bg-gray-100 sm:p-4 mb-4 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex sm:flex-row gap-4 items-center mb-4">
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.campName}</h3>
                  <p className="text-gray-600">Date: {new Date(item.date).toLocaleDateString()}</p>
                  <p className="text-gray-600 text-sm">TranID: {item.transactionId}</p>
                </div>
                <div className="text-right text-lg font-semibold text-gray-800">
                  Amount: {item.campFees}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PaymentHistory;
