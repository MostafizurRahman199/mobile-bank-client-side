import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import logo from "../../public/mobile_banking.png"; // Replace with your banking logo
import { useDarkMode } from "../Context/DarkModeContext";

const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <div>
      {/* Logo Section */}
      <div className={`w-full flex justify-center p-6 ${darkMode ? 'bg-[#1A202C] text-white' : 'text-[#f9fafb] bg-[#1A237E]'}`}>
        <img src={logo} className="w-40 h-22" alt="Bank Logo" />
      </div>

      {/* Main Footer Section */}
      <footer className={`w-full p-6 ${darkMode ? 'bg-[#1A202C] text-white' : 'text-[#f9fafb] bg-[#1A237E]'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Contact Us Section */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-2xl font-semibold">Contact Us</h3>
            <p className="text-center">
              456 Finance Avenue, Business City <br />
              +123 456 7890 <br />
              Support: 24/7 <br />
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h6 className="text-2xl font-semibold">Follow Us</h6>
            <p>Connect with us on social media</p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:scale-105">
                <FaFacebookF className="text-2xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                <FaInstagram className="text-2xl text-white hover:scale-105" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                <FaLinkedinIn className="text-2xl text-white hover:scale-105" />
              </a>
            </div>
          </div>

          {/* Customer Support Information */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h6 className="text-2xl font-semibold">Customer Support</h6>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-lg" />
              <p>Finance Hub, Global City</p>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2 text-lg" />
              <p>+123 456 7890</p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-lg" />
              <p>support@mobilebanking.com</p>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h6 className="text-2xl font-semibold">Stay Updated</h6>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md w-60 text-[#1A237E] focus:text-[#1A237E]"
            />
            <button className="text-white py-2 px-6 rounded-md border-2 border-transparent hover:border-white bg-[#1A237E] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </footer>

      {/* Footer Bottom Section */}
      <footer className={`footer-center p-4 ${darkMode ? 'bg-[#1A202C] text-white' : 'text-[#f9fafb] bg-[#1A237E]'}`}>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by Mobile Banking Inc.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
