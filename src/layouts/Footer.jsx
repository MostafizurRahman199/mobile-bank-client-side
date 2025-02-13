

// import React from "react";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaPhone,
// } from "react-icons/fa";
// import jobLogo from "../../public/humanity.png";
// import { useDarkMode } from "../Context/DarkModeContext";

// const Footer = () => {
//   const { darkMode } = useDarkMode();

//   return (
//     <div>
//       <footer className={ `  text-white   grid grid-cols-1 md:grid md:grid-cols-2 `}>
//         <div className="w-full bg-[#1F2937]  flex flex-col items-center justify-center p-10 gap-4">
//           <h3 className="text-2xl">Contact Us</h3>
//           <p className="text-center">
//             123 ABS Street, Uni 21, Bangladesh <br />
//             +88 123456789 <br />
//             Mon - Fri: 08:00 - 22:00 <br />
//             Sat - Sun: 10:00 - 23:00 <br />
//           </p>
//         </div>
//         <div className="w-full bg-[#111827]  flex flex-col items-center justify-center gap-4 p-10">
//           <h6 className="text-2xl">Follow Us</h6>
//           <p>Join us on social media</p>
//           <div className="grid grid-flow-col gap-4">
//             <a>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 className="fill-current"
//               >
//                 <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
//               </svg>
//             </a>
//             <a>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 className="fill-current"
//               >
//                 <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
//               </svg>
//             </a>
//             <a>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 className="fill-current"
//               >
//                 <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
//               </svg>
//             </a>
//           </div>
//         </div>
//       </footer>
//       <footer className="footer footer-center bg-[#151515] text-white p-4">
//         <aside>
//           <p>
//             Copyright © {new Date().getFullYear()} - All right reserved by ACME
//             Industries Ltd
//           </p>
//         </aside>
//       </footer>
//     </div>
//   );
// };

// export default Footer;



import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import logo from "../../public/beHealthy.png"; // Add your logo path here
import { useDarkMode } from "../Context/DarkModeContext";

const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <div>

      <div className={`w-full  flex justify-center p-6 ${darkMode ? 'bg-[#1A202C] text-white' : 'text-[#f9fafb] bg-[#4335A7]'}`}>
        <img src={logo} className="w-40 h-22" alt="" />
      </div>

      {/* Main Footer Section */}
      <footer className={`w-full p-6 ${darkMode ? 'bg-[#1A202C] text-white' : 'text-[#f9fafb] bg-[#4335A7]'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Contact Us Section */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-2xl font-semibold">Contact Us</h3>
            <p className="text-center">
              123 ABS Street, Uni 21, Bangladesh <br />
              +88 123456789 <br />
              Mon - Fri: 08:00 AM - 10:00 PM <br />
              Sat - Sun: 10:00 AM - 11:00 PM <br />
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h6 className="text-2xl font-semibold">Follow Us</h6>
            <p>Join us on social media</p>
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

          {/* Support Information */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h6 className="text-2xl font-semibold">Support</h6>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-lg" />
              <p>Medical City, Bangladesh</p>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2 text-lg" />
              <p>+88 123456789</p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-lg" />
              <p>support@healthcamp.com</p>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h6 className="text-2xl font-semibold">Subscribe to Our Newsletter</h6>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md w-60 text-[#5544d9] focus:text-[#5544d9]"
            />
            <button className=" text-white py-2 px-6 rounded-md border-2 border-transparent hover:border-white bg-[#5544d9] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </footer>

      {/* Footer Bottom Section */}
      <footer className={`footer-center p-4 ${darkMode ? 'bg-[#1A202C] text-white' : 'text-[#f9fafb] bg-[#4335A7]'}`}>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by BeHealthy.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
