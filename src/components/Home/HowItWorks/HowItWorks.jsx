


import React, { useEffect } from "react";
import { FaCalendarAlt, FaUsers, FaDollarSign, FaSignInAlt } from "react-icons/fa";
import { useDarkMode } from "../../../Context/DarkModeContext";
import Aos from "aos";

// Step data for Organizers and Participants
const stepsData = {
  organizerSteps: [
    {
      id: 1,
      title: "Create a Camp",
      description:
        "Easily set up a camp with all the necessary details like name, fees, date, and healthcare professional.",
      icon: <FaCalendarAlt />,
    },
    {
      id: 2,
      title: "Set Schedules",
      description:
        "Manage camp schedules and times for smooth organization and communication with participants.",
      icon: <FaSignInAlt />,
    },
    {
      id: 3,
      title: "Manage Participants",
      description:
        "Track registrations, confirm participation, and manage information seamlessly.",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "Track Payments",
      description:
        "Monitor and confirm payments for each participant with integrated payment systems.",
      icon: <FaDollarSign />,
    },
  ],
  participantSteps: [
    {
      id: 5,
      title: "Browse Camps",
      description:
        "Explore available medical camps based on your location, health needs, and schedule.",
      icon: <FaSignInAlt />,
    },
    {
      id: 6,
      title: "Sign Up for Camps",
      description:
        "Register for camps you're interested in with just a few clicks.",
      icon: <FaUsers />,
    },
    {
      id: 7,
      title: "Pay for Participation",
      description:
        "Pay securely through integrated payment options for a smooth experience.",
      icon: <FaDollarSign />,
    },
    {
      id: 8,
      title: "Get Reminders",
      description:
        "Receive timely notifications and reminders about your upcoming camps.",
      icon: <FaCalendarAlt />,
    },
  ],
};

const HowItWorks = () => {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-full md:w-10/12 mx-auto py-12">
      <h2 className="text-3xl font-bold text-center text-[#4335A7] mb-8">How It Works</h2>

      {/* Organizers Steps */}
      <div
    
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stepsData.organizerSteps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center text-center p-6 rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:bg-gradient-to-b hover:from-[#4335A7] hover:to-[#5544d9] hover:text-white ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`} // Dark mode condition
          >
            <div className="text-[#5544d9]  text-5xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="mb-4">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Participants Steps */}
      <div className="text-center mt-12">
        <h2 className="text-3xl font-bold text-center text-[#4335A7] mb-8">For Participants</h2>
      </div>

      <div 
      data-aos="fade-up"
     data-aos-anchor-placement="top-bottom"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stepsData.participantSteps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center text-center p-6 rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:bg-gradient-to-b hover:from-[#4335A7] hover:to-[#5544d9] hover:text-white ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`} // Dark mode condition
          >
            <div className="text-[#5544d9] text-5xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="mb-4">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
