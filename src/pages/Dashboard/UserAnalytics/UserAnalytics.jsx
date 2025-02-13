// import React from 'react';
// import { Pie, Bar as BarChartJS } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
// import { FaDollarSign, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
// import { BarChart, Bar as RechartsBar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend as RechartsLegend, Cell } from 'recharts';
// import Loading from '../../../components/Loading/Loading';
// import ErrorPage from '../../../components/Error.jsx/ErrorPage';
// import { useFirebaseAuth } from '../../../hooks/useAuth';
// import useRegisterCamp from '../../../hooks/useRegisterCamp';
// import usePaymentHistory from '../../../hooks/usePaymentHistory';
// import SectionHeading from '../../../components/SectionHeading/SectionHeading';

// // Register ChartJS components
// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// const UserAnalytics = () => {
//   const { user } = useFirebaseAuth();
//   const { data: campsData } = useRegisterCamp();
//   const { paymentData } = usePaymentHistory();

//   // If data is not yet available, show loading state
//   if (!campsData || !paymentData) {
//     return <Loading height="screen" />;
//   }

//   // Prepare the data for charts
//   const campNames = campsData.map((camp) => camp.campName);
//   const campFees = campsData.map((camp) => camp.campFees);
//   const paymentStatus = campsData.map((payment) => payment.paymentStatus);

//   const paymentCount = paymentStatus.reduce((acc, status) => {
//     acc[status] = (acc[status] || 0) + 1;
//     return acc;
//   }, { paid: 0, unpaid: 0 });

// //   console.log(paymentCount);

//   const confirmationStatus = campsData.reduce((acc, camp) => {
//     acc[camp.confirmationStatus] = (acc[camp.confirmationStatus] || 0) + 1;
//     return acc;
//   }, { pending: 0, confirmed: 0, rejected:0 });

//   console.log(confirmationStatus);

//   const locations = campsData.map((camp) => camp.location);
//   const locationCount = locations.reduce((acc, location) => {
//     acc[location] = (acc[location] || 0) + 1;
//     return acc;
//   }, {});

//   // Prepare chart data
//   const barChartData = {
//     labels: campNames,
//     datasets: [
//       {
//         label: 'Camp Fees',
//         data: campFees,
//         backgroundColor: '#4335A7',
//         borderColor: '#5544d9',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const paymentStatusPieData = {
//     labels: ['Paid', 'Unpaid'],
//     datasets: [
//       {
//         data: [paymentCount.paid, paymentCount.unpaid],
//         backgroundColor: ['#4335A7', '#D1A054'],
//       },
//     ],
//   };

//   const confirmationStatusPieData = {
//     labels: ['Confirmed', 'Pending', 'Rejected'],
//     datasets: [
//       {
//         data: [confirmationStatus.confirmed, confirmationStatus.pending, confirmationStatus.rejected],
//         backgroundColor: ['#36A2EB', '#FF9F40', '#FF6384'],
//       },
//     ],
//   };



//   const locationBarChartData = {
//     labels: Object.keys(locationCount),
//     datasets: [
//       {
//         label: 'Camps per Location',
//         data: Object.values(locationCount),
//         backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F9A3A4'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="w-full md:w-10/12 mx-auto p-6">
//       <SectionHeading title1={"---Your Analytics--"} title2={"User Analytics Dashboard"} />

//       {/* Information Cards */}
//       <div className="flex justify-around mb-8">
//         <div className="bg-[#4335A7] text-white p-6 rounded-lg w-1/3 text-center">
//           <h3 className="text-xl">Total Camps</h3>
//           <p className="text-2xl font-bold">{campsData.length}</p>
//         </div>
//         <div className="bg-[#D1A054] text-white p-6 rounded-lg w-1/3 text-center">
//           <h3 className="text-xl">Total Payments</h3>
//           <p className="text-2xl font-bold">{paymentData.reduce((total, item) => total + item.campFees, 0)} BDT</p>
//         </div>
//         <div className="bg-[#5544d9] text-white p-6 rounded-lg w-1/3 text-center">
//           <h3 className="text-xl">Total Confirmed</h3>
//           <p className="text-2xl font-bold">{confirmationStatus.Confirmed}</p>
//         </div>
//       </div>

//       {/* Bar Chart for Camp Fees vs Payments */}
//       <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
//         <h3 className="text-xl font-bold text-[#4335A7] mb-4">Camp Fees vs Payments</h3>
//         <BarChartJS data={barChartData} options={{ responsive: true }} />
//       </div>

//       {/* Pie Chart for Payment Status */}
//       <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
//         <h3 className="text-xl font-bold text-[#4335A7] mb-4">Payment Status</h3>
//         <Pie data={paymentStatusPieData} options={{ responsive: true }} />
//       </div>

//       {/* Pie Chart for Confirmation Status */}
//       <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
//         <h3 className="text-xl font-bold text-[#4335A7] mb-4">Confirmation Status</h3>
//         <Pie data={confirmationStatusPieData} options={{ responsive: true }} />
//       </div>

//       {/* Bar Chart for Camps per Location */}
//       <div className="bg-white shadow-lg rounded-lg p-8">
//         <h3 className="text-xl font-bold text-[#4335A7] mb-4">Camps per Location</h3>
//         <BarChartJS data={locationBarChartData} options={{ responsive: true }} />
//       </div>


//     </div>
//   );
// };

// export default UserAnalytics;

import React from 'react';
import { Pie, Bar as BarChartJS } from 'react-chartjs-2';  // Renaming the Bar chart import from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { FaDollarSign, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { BarChart, Bar as RechartsBar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend as RechartsLegend, Cell } from 'recharts'; // Renaming the Bar from Recharts
import Loading from '../../../components/Loading/Loading';
import ErrorPage from '../../../components/Error.jsx/ErrorPage';
import { useFirebaseAuth } from '../../../hooks/useAuth';
import useRegisterCamp from '../../../hooks/useRegisterCamp';
import usePaymentHistory from '../../../hooks/usePaymentHistory';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const UserAnalytics = () => {
  const { user } = useFirebaseAuth();
  const { data: campsData } = useRegisterCamp();
  const { paymentData } = usePaymentHistory();

  // If data is not yet available, show loading state
  if (!campsData || !paymentData) {
    return <Loading height="screen" />;
  }

  // Prepare the data for charts
  const campNames = campsData.map((camp) => camp.campName);
  const campFees = campsData.map((camp) => camp.campFees);
  const paymentStatus = campsData.map((payment) => payment.paymentStatus);

  const paymentCount = paymentStatus.reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, { paid: 0, unpaid: 0 });

  const confirmationStatus = campsData.reduce((acc, camp) => {
    acc[camp.confirmationStatus] = (acc[camp.confirmationStatus] || 0) + 1;
    return acc;
  }, { pending: 0, confirmed: 0, rejected: 0 });

  const locations = campsData.map((camp) => camp.location);
  const locationCount = locations.reduce((acc, location) => {
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});


  
  const locationBarChartData = {
    labels: Object.keys(locationCount),
    datasets: [
      {
        label: 'Camps per Location',
        data: Object.values(locationCount),
        backgroundColor: ['#D1A054', '#062c0d', '#1237dc', '#390809'],
        borderWidth: 1,
      },
    ],
  };

  // Prepare chart data
  const barChartData = {
    labels: campNames,
    datasets: [
      {
        label: 'Camp Fees',
        data: campFees,
        backgroundColor: '#4335A7',
        borderColor: '#5544d9',
        borderWidth: 1,
      },
    ],
  };

  const paymentStatusPieData = {
    labels: ['Paid', 'Unpaid'],
    datasets: [
      {
        data: [paymentCount.paid, paymentCount.unpaid],
        backgroundColor: ['#4335A7', '#D1A054'],
      },
    ],
  };

  const confirmationStatusPieData = {
    labels: ['Confirmed', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [confirmationStatus.confirmed, confirmationStatus.pending, confirmationStatus.rejected],
        backgroundColor: ['#36A2EB', '#FF9F40', '#FF6384'],
      },
    ],
  };



  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F9A3A4']; // Custom color set for each bar

  return (
    <div className="w-full md:w-10/12 mx-auto p-6">
      <SectionHeading title1={"---Your Analytics--"} title2={"User Analytics Dashboard"} />

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-2  mb-8">
        <div className="bg-[#4335A7] text-white p-6 rounded-lg text-center">
          <h3 className="text-xl">Total Camps</h3>
          <p className="text-2xl font-bold">{campsData.length}</p>
        </div>
        <div className="bg-[#D1A054] text-white p-6 rounded-lg  text-center">
          <h3 className="text-xl">Total Payments</h3>
          <p className="text-2xl font-bold">{paymentData.reduce((total, item) => total + item.campFees, 0)} BDT</p>
        </div>
        <div className="bg-[#5544d9] text-white p-6 rounded-lg  text-center">
          <h3 className="text-xl">Total Confirmed</h3>
          <p className="text-2xl font-bold">{confirmationStatus.confirmed}</p>
        </div>
      </div>

        <div className="bg-white shadow-lg  rounded-lg p-8 mb-8">
        <h3 className="text-xl font-bold text-[#4335A7] mb-4">Camp Fees vs Payments</h3>
        <BarChartJS data={barChartData} options={{ responsive: true }} />
      </div>
      {/* Bar Chart for Camp Fees vs Payments */}
     <div className='grid grid-cols-1  md:grid md:grid-cols-2 gap-2'>
       

      {/* Pie Chart for Payment Status */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-xl font-bold text-[#4335A7] mb-4">Payment Status</h3>
        <Pie data={paymentStatusPieData} options={{ responsive: true }} />
      </div>

      {/* Pie Chart for Confirmation Status */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-xl font-bold text-[#4335A7] mb-4">Confirmation Status</h3>
        <Pie data={confirmationStatusPieData} options={{ responsive: true }} />
      </div>

             {/* Bar Chart for Camps per Location */}
     </div>

       <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-xl font-bold text-[#4335A7] mb-4">Camps per Location</h3>
        <BarChartJS data={locationBarChartData} options={{ responsive: true }} />
       </div>
    
    </div>
  );
};

export default UserAnalytics;
