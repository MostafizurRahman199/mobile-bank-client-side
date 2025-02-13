


import React, { useEffect } from "react";
import { FaCalendarAlt, FaUserShield, FaCreditCard, FaBell, FaChartBar, FaUserMd } from "react-icons/fa";
import { useDarkMode } from "../../../Context/DarkModeContext";
import Aos from "aos";
// Object containing the feature data
const featureData = [
  {
    id: 1,
    title: "Camp Creation",
    description:
      "Organizers can easily create new medical camps with all necessary details like date, time, location, healthcare professionals, and more.",
    icon: <FaCalendarAlt />,
  },
  {
    id: 2,
    title: "Participant Management",
    description:
      "Track registrations, confirm participation, and manage payments efficiently from a single dashboard.",
    icon: <FaUserShield />,
  },
  {
    id: 3,
    title: "Payment Gateway Integration",
    description:
      "Seamlessly integrate an online payment system for smooth and secure camp participation payments.",
    icon: <FaCreditCard />,
  },
  {
    id: 4,
    title: "Real-Time Updates",
    description:
      "Participants receive real-time notifications about upcoming camps, cancellations, and more to stay informed.",
    icon: <FaBell />,
  },
  {
    id: 5,
    title: "Reports and Analytics",
    description:
      "Access detailed insights into camp registration numbers, fees, and key metrics to make informed decisions.",
    icon: <FaChartBar />,
  },
  {
    id: 6,
    title: "Volunteer/Healthcare Professional Profiles",
    description:
      "Showcase the expertise and qualifications of healthcare professionals and volunteers involved in each camp.",
    icon: <FaUserMd />,
  },
];

const Features = () => {
  const { darkMode } = useDarkMode();



  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-full md:w-10/12 mx-auto py-12 p-2">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4335A7] mb-8">Key Features</h2>

      <div 
      data-aos="fade-down"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureData.map((feature) => (
          <div
            key={feature.id}
            className={`flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-2 
              ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`} // Dark mode condition
          >
            <div className="text-[#5544d9] text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;

