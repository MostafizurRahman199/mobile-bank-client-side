

import React from 'react';
import { FaCampground, FaUsers, FaMoneyBillAlt, FaPeopleCarry, FaMapMarkerAlt } from 'react-icons/fa';
import { Pie, Bar as ChartBar } from 'react-chartjs-2'; // Importing Bar for Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { XAxis, YAxis, Tooltip as RechartsTooltip, Legend as RechartsLegend, Bar, Cell } from 'recharts'; // Importing necessary Recharts components
import { useQuery } from '@tanstack/react-query';
import Aos from "aos";
import { useEffect } from 'react';

import useCamp from '../../../hooks/useCamp';
import useGetUser from '../../../hooks/useGetUSer';
import useJoinCamp from '../../../hooks/useJoinCamp';
import usePaymentHistory from '../../../hooks/usePaymentHistory';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import Loading from '../../../components/Loading/Loading';
import ErrorPage from '../../../components/Error.jsx/ErrorPage';
import ApiComponent from '../../../API/ApiComponent';
import { useFirebaseAuth } from '../../../hooks/useAuth';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminHome = () => {
  
  const { user } = useFirebaseAuth();
  const email = user?.email;
  const { getAllUsers,getAllPaymentHistory } = ApiComponent();
  
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);


  const { data: userdata, isLoading, isError, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });
// dataformat
console.log("alluser : ", userdata);

  const { data: paymentData ,  } = useQuery({
    queryKey: ['all-paymentHistory'],
    queryFn: getAllPaymentHistory,
   
  });
  // dataformat below


  console.log("Payment data : ",paymentData);


  const { campData } = useCamp();
  // dataformat below

  const { campData: registerCampData } = useJoinCamp();
  const totalRegisteredCamps = registerCampData?.length;
// dataformat below







  // Compute totals for display
  const paymentCount = paymentData?.filter(payment => payment.status === 'paid').length;
  const userCount = userdata?.length || 0;
  const campCount = campData?.length || 0;
  const TotalPayments = paymentData?.reduce((acc, item) => acc + item.campFees, 0) || 0;

  // Data for charts
  const locationCount = campData?.reduce((acc, camp) => {
    acc[camp.location] = (acc[camp?.location] || 0) + 1;
    return acc;
  }, {});

  const totalLocation = Object.keys(locationCount || {}).length || 0;


console.log("LocationWise : ", locationCount);


  const categoryWiseTotalPayments = campData?.reduce((acc, camp) => {
    acc[camp?.location] = (acc[camp?.location] || 0) + camp?.campFees;
    return acc;
  }, {});

  const campNameTotalPayments = paymentData?.reduce((acc, camp) => {
    acc[camp?.campName] = (acc[camp?.campName] || 0) + camp?.campFees;
    return acc;
  }, {});

  console.log(campNameTotalPayments);


  const TotalPaymentsData2 = Object.keys(categoryWiseTotalPayments || {}).map((category) => ({
    category,
    totalTotalPayments: categoryWiseTotalPayments[category],
  }));

  // Data for charts
  const categoryData = {
    labels: Object.keys(locationCount || {}),
    datasets: [
      {
        label: 'Category Wise Count',
        data: Object.values(locationCount || {}),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'],
        borderWidth: 1,
      },
    ],
  };

  const TotalPaymentsData = {
    labels: Object.keys(campNameTotalPayments || {}),
    datasets: [
      {
        label: 'Category Wise TotalPayments ($)',
        data: Object.values(campNameTotalPayments || {}),
        backgroundColor: [ '#0d0872', '#8f710e', '#5c8907',  '#cc3310', '#0da228', '#0f2caf'],
        borderWidth: 1,
      },
    ],
  };




  const overallData = {
    labels: ['Payments', 'Users', 'Camps',  'Registered User'],
    datasets: [
      {
        label: 'Overall Stats',
        data: [paymentCount, userCount, campCount, totalRegisteredCamps],
        backgroundColor: ['#980626', '#095283', '#956e0d', '#370798'],
        borderWidth: 1,
      },
    ],
  };

  // if (!campData || !paymentData || !userdata) {
  //   return <Loading height="screen" />;
  // }

  return (
    <div className="admin-home-container w-10/12 mx-auto">
      <SectionHeading title1={""} title2={"Admin Stats"} />
   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Card 1: Total Camps */}
        <div 
        data-aos="flip-right"
        className="card bg-blue-100 shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaCampground className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Camps</h2>
            <p className="text-2xl font-bold text-center">{campData?.length}</p>
          </div>
        </div>

        {/* Card 2: Total Users */}
        <div 
        data-aos="flip-right"
        className="card bg-green-100 shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaUsers className="text-green-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold text-center">{userCount}</p>
          </div>
        </div>

        {/* Card 3: Total Payments */}
        <div 
        data-aos="flip-right"
        className="card bg-yellow-100 shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaMoneyBillAlt className="text-yellow-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Payments</h2>
            <p className="text-2xl font-bold text-center">${TotalPayments.toFixed(2)}</p>
          </div>
        </div>

        {/* Card 4: Total Registered People */}
        <div 
        data-aos="flip-right"
        className="card bg-teal-100 shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaPeopleCarry className="text-teal-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Registered People</h2>
            <p className="text-2xl font-bold text-center">{registerCampData?.length}</p>
          </div>
        </div>

        {/* Card 5: Pending Payments */}
        <div 
        data-aos="flip-right"
        className="card bg-purple-100 shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaMoneyBillAlt className="text-purple-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Pending Payments</h2>
            <p className="text-2xl font-bold text-center">
              {registerCampData?.filter(payment => payment.paymentStatus === 'unpaid')?.length}
            </p>
          </div>
        </div>

        <div 
        data-aos="flip-right"
        className="card bg-brown-100 shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaMoneyBillAlt className="text-brown-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Paid Payments</h2>
            <p className="text-2xl font-bold text-center">
              {registerCampData?.filter(payment => payment.paymentStatus === 'paid')?.length}
            </p>
          </div>
        </div>

        {/* Card 6: Total Confirmed Requests */}
        <div 
        data-aos="flip-right"
        className="card bg-green-100 shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaUsers className="text-green-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Confirmed Requests</h2>
            <p className="text-2xl font-bold text-center">
              {registerCampData?.filter(camp => camp.confirmationStatus === 'confirmed').length}
            </p>
          </div>
        </div>
        <div 
        data-aos="flip-right"
        className="card bg-red-100 shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaUsers className="text-red-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Rejected Requests</h2>
            <p className="text-2xl font-bold text-center">
              {registerCampData?.filter(camp => camp.confirmationStatus === 'rejected').length}
            </p>
          </div>
        </div>

        {/* Card 7: Total Locations */}
        <div 
        data-aos="flip-right"
        className="card bg-lime-100 shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaMapMarkerAlt className="text-lime-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Locations</h2>
            <p className="text-2xl font-bold text-center">{totalLocation}</p>
          </div>
        </div>
        
      </div>

      {/* Charts Section */}
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center justify-items-center my-12">

        {/* Chart: Location-wise Camps */}
        <div className="mt-8 flex flex-col justify-center items-center">
          <h3 className="text-xl font-bold text-center">Location Wise Camps</h3>
          <Pie data={categoryData} />
        </div>

        {/* Chart: Payment Stats */}

        {/* Chart: Camps Registration Data */}
        <div className="mt-8 h-full w-full flex flex-col justify-center items-center">
          <h3 className="text-xl font-bold text-center">Camps Stats</h3>
          <ChartBar data={overallData} options={{ responsive: true }} />
        </div>

      </div>
       
        <div className="mt-8 h-full w-full flex flex-col justify-center items-center">
          <h3 className="text-xl font-bold text-center">Payment Status</h3>
          <ChartBar data={TotalPaymentsData} options={{ responsive: true }} />
        </div>
    </div>
 
  );
};

export default AdminHome;
