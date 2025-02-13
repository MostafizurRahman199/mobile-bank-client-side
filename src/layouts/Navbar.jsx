
import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
// import { useFirebaseAuth } from '../Auth/AuthProvider';
import { FaHome,  FaUser, FaUserPlus, FaSignInAlt, } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';
import { VscOpenPreview } from 'react-icons/vsc';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { FiSave } from "react-icons/fi";
import { useFirebaseAuth } from '../hooks/useAuth';
import { useDarkMode } from '../Context/DarkModeContext';
import { RiUserReceivedLine } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";
import humanityLogo from "../../public/humanity.png";
import DarkModeToggle from '../components/Navbar/DarkModeToggle';
import { MdMenuBook } from "react-icons/md";
import AddToCardBadge from '../components/Navbar/AddToCardBadge';
import useUserRole from '../hooks/useUserRole';
import { GrGallery } from "react-icons/gr";
import { FiMessageCircle } from "react-icons/fi";
import { MdCampaign } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";
import medicalLogo from "../../public/beHealthy.png";
import { MdOutlineSupportAgent } from "react-icons/md";

import { RxDashboard } from "react-icons/rx";

const Navbar = () => {

  
  // ___________________________hooks
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState(location.pathname);
  const { user, logOut, loading } = useFirebaseAuth();
  const {isAdmin} = useUserRole();
  const navigate = useNavigate();
  const {darkMode} = useDarkMode()



  // ____________start for dropdown

   // State to control dropdown visibility
   const [isOpen, setIsOpen] = useState(false);

   // Refs to the dropdown menu and profile image for detecting clicks outside
   const dropdownRef = useRef(null);
   const profileImageRef = useRef(null);
 
   // Function to toggle dropdown visibility when image is clicked
   const toggleDropdown = () => setIsOpen((prevState) => !prevState);
 
   // Close the dropdown when clicking outside of the menu or image
   useEffect(() => {
     const handleClickOutside = (event) => {
       if (
         dropdownRef.current && !dropdownRef.current.contains(event.target) &&
         profileImageRef.current && !profileImageRef.current.contains(event.target)
       ) {
         setIsOpen(false); // Close the dropdown if clicked outside
       }
     };
 
     document.addEventListener("mousedown", handleClickOutside); // Listen for click events
 
     return () => {
       document.removeEventListener("mousedown", handleClickOutside); // Clean up the event listener on unmount
     };
   }, []);


  // ___________end drop down 

  // ___________________________useEffect update activeLink

  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);




  // ___________________________loading check

  if (loading) {
    return <div className="h-16" />; 
  }




    const getLinkStyle = (path) => `
    relative px-2 py-2 text-sm font-bold  font_header transition-colors duration-200
    ${activeLink === path ? 'text-white' : `${darkMode == true ? "text-white" : "text-white"} hover:text-white`}
    before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 
    before:bg-white before:transform before:scale-x-0 before:transition-transform
    before:duration-300 hover:before:scale-x-100
    ${activeLink === path ? 'before:scale-x-100' : ''}
  `;



 

  // Check if the current route falls under the "My Profile" section
  const isProfileActive = ["/my-profile", "/post-for-volunteer", "/ManageMyPostRequest"].includes(activeLink);




  // ___________________________logout handler


  const handleLogout = async () => {
    try {
      await logOut();
   
      // toast.success('Logout successful!');
      navigate('/');
     
    } catch (error) {
      console.error('Logout error:', error);
    }
  };





  // ___________________________getProfileImage helper function

  const getProfileImage = (user) => {
    if (user.photoURL) {
        return user?.photoURL || user.photoURL;
    }
    
    if (user.providerData) {
        for (const provider of user.providerData) {
            if (provider.photoURL) {
                return provider?.photoURL;
            }
        }
    }
    
    return 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
  };








  // ___________________________ProfileImage component

  const ProfileImage =  ({ user }) => {


    const [imageError, setImageError] = React.useState(false);
    // const [imageUrl, setImageUrl] = React.useState(null);

    const imageUrl = !imageError ? getProfileImage(user) : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    // console.log(imageUrl);





    return (

    
      <>
        <img
            className="h-8 w-8 rounded-full object-cover border border-gray-200 cursor-pointer hover:scale-110 transition-transform duration-200"
            src={imageUrl}
            alt={user.displayName || 'Profile'}
           
            onError={() => setImageError(true)}
            />
            </>
       
    );
  };



  return (
    <nav className={` mx-auto font_header ${darkMode == true ? "bg-black text-white" : "bg-[#4335A7] text-white"} backdrop-blur-md fixed  shadow-lg w-full top-0 z-50`}>
      <div className="w-11/12 mx-auto px-2 sm:px-2 lg:px-2">
        <div className="flex justify-between items-center h-16">
       
          <div className="flex flex-shrink-0 items-center  gap-1 sm:gap-4">
            <Link to="/" className="flex items-center  space-x-1">
             
             
              <span className="new_heading_font text-3xl sm:text-3xl md:text-xl lg:text-3xl text-md font-bold bg-gradient-to-r from-white to-[#2b2557] bg-clip-text text-transparent truncate">
                <div className='flex flex-wrap gap-2 items-center'>
                  <div>
                  <img src={medicalLogo} className='w-40 h-14' alt="" />
                  </div>
                 
                </div>
              </span>
            </Link>

            <div className='md:hidden '>
             <DarkModeToggle></DarkModeToggle>
          </div>

          </div>

        


          {/* Navigation Links - Center */}
         <div className='flex items-center gap-4'>
         <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          
          <Link to="/" className={getLinkStyle('/')} onClick={() => setActiveLink('/')}>
            <FaHome className="lg:inline-block mr-1" /> Home
          </Link>
          
        
          <Link to="/available-camps" className={getLinkStyle('/available-camps')} onClick={() => setActiveLink('/available-camps')}>
         
            <MdCampaign  className="lg:inline-block mr-1"/>
             Available Camps
          </Link>
        
          <Link to="/gallery" className={getLinkStyle('/gallery')} onClick={() => setActiveLink('/gallery')}>
        
          <GrGallery  className="lg:inline-block mr-1"/>
             Gallery
          </Link>


          <Link to="/article" className={getLinkStyle('/article')} onClick={() => setActiveLink('/article')}>
        
          <RiArticleLine  className="lg:inline-block mr-1"/>
             Article
          </Link>

        {
          user && isAdmin && <>
             <Link to="/get-message" className={getLinkStyle('/get-message')} onClick={() => setActiveLink('/get-message')}>
           
          <FiMessageCircle className="lg:inline-block mr-1" />
             Message
          </Link>
          </>
        }
        {
          user && !isAdmin && <>
             <Link to="/get-reply-message" className={getLinkStyle('/get-reply-message')} onClick={() => setActiveLink('/get-reply-message')}>
             <FiMessageCircle className="lg:inline-block mr-1" />
             Message
          </Link>
          </>
        }
        
          <Link to="/contact" className={getLinkStyle('/contact')} onClick={() => setActiveLink('/contact')}>
           
            <MdOutlineSupportAgent className="lg:inline-block mr-1"  />
             Support
          </Link>

        
          {
            !user && <>
             <Link to="/login" className={getLinkStyle('/login')} onClick={() => setActiveLink('/login')}>
             <FaSignInAlt className="lg:inline-block mr-1" /> Join US
           </Link>
            
            </>

          }

   
          <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Change Mode"
          data-tooltip-place="top"
          >
          <DarkModeToggle></DarkModeToggle>

        </a>
        <ReactTooltip id="my-tooltip">This is a tooltip</ReactTooltip>

        </div>




        {/* User Profile/Login Button - Updated for mobile */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {user ? (
            <div className="flex items-center gap-2 lg:gap-4">
            
              <Link to="/my-profile" className='flex flex-col lg:flex lg:flex-row items-center justify-center lg:gap-2'>
              </Link>


       


              <div className="relative inline-block">
      {/* Profile Image */}
      <div
        tabIndex={0}
        role="button"
        className="btn-circle mt-4 cursor-pointer"
        ref={profileImageRef} // Attach ref to the profile image
        onClick={toggleDropdown} // Toggle the dropdown on image click
      >
        <ProfileImage user={user} />
      </div>

      {/* Dropdown Menu */}
      <ul
        ref={dropdownRef} // Attach ref to the dropdown menu
        className={`absolute  w-52 text-black rounded-lg shadow-md p-2 z-10 transition-all duration-300 ease-linear ${
          isOpen ? "opacity-100 translate-y-0  right-0 mt-2" : "right-0 -top-40 mt-2  translate-y-[-20px]"
        } ${darkMode ? "text-white bg-black" : "text-white bg-[#4335A7]"}`}
      >
        {/* Non-clickable user name */}
        <li className="cursor-default py-2 px-4 text-lg font-semibold">
          <span>{user.displayName || "User"}</span>
        </li>

        {/* Dashboard links */}
        {user && isAdmin && (
          <li className={`py-2 px-4 rounded-lg ${darkMode ? 'text-white bg-black hover:bg-gray-800' : 'text-white hover:bg-[#5544d9]'}`}>
            <Link to="/dashboard/admin-home" className="block">
              Dashboard
            </Link>
          </li>
        )}

        {user && !isAdmin && (
          <li className={`py-2 px-4 rounded-lg ${darkMode ? 'text-white bg-black hover:bg-gray-800' : 'text-white hover:bg-[#5544d9]'}`}>
            <Link to="/dashboard/analytics" className="block">
              Dashboard
            </Link>
          </li>
        )}

        {/* Logout Button */}
        <li className={`py-2 px-4 rounded-lg ${darkMode ? 'text-white bg-black hover:bg-gray-800' : 'text-white hover:bg-[#5544d9]'}`}>
          <button onClick={handleLogout} className="w-full text-left text-white rounded-lg">
            Logout
          </button>
        </li>
      </ul>
    </div>



            </div>
          ) : (
            <>
           
            </>
          )}
       </div>
         </div>
                
                 


          {/* Mobile menu button - Updated styling */}
          <div className="md:hidden flex items-center ml-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-1 rounded-md text-white hover:text-white  focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>




   
      <div 
        className={`${darkMode == true ? "bg-black text-white" : "bg-[#4335A7] text-white"}  md:hidden fixed  top-16 shadow-lg
          transform transition-all duration-300 ease-in-out z-100
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}
        `}
      >
      
        <div className="absolute inset-0 " />
        
      
        <div className="relative px-4 pt-2 pb-3 space-y-2">

        { user && <div className="flex justify-center"><ProfileImage user={user} /></div>} 

          <Link 
            to="/" 
            className={`block ${getLinkStyle('/')}`}
            onClick={() => {
              setActiveLink('/');
              setIsMobileMenuOpen(false);
            }}
          >
           
           <FaHome className="inline-block mr-1" /> Home
           
          </Link>

         



          <Link 
            to="/available-camps" 
            className={`block ${getLinkStyle('/available-camps')}`}
            onClick={() => {
              setActiveLink('/available-camps');
              setIsMobileMenuOpen(false);
            }}
          >
             <MdCampaign className="inline-block mr-1" /> Available Camps
          </Link>


          <Link 
            to="/gallery" 
            className={`block ${getLinkStyle('/gallery')}`}
            onClick={() => {
              setActiveLink('/gallery');
              setIsMobileMenuOpen(false);
            }}
          >
             <GrGallery className="inline-block mr-1" />Gallery
          </Link>


          <Link 
            to="/article" 
            className={`block ${getLinkStyle('/article')}`}
            onClick={() => {
              setActiveLink('/article');
              setIsMobileMenuOpen(false);
            }}
          >
             <RiArticleLine className="inline-block mr-1" />Article
          </Link>


        
         

       { user && isAdmin && <>
         <Link 
            to="/dashboard/admin-home" 
            className={`block ${getLinkStyle('/dashboard/admin-home')}`}
            onClick={() => {
              setActiveLink('/dashboard/admin-home');
              setIsMobileMenuOpen(false);
            }}
          >
        
            <RxDashboard className="inline-block mr-1" />Dashboard
          </Link>
        </> }


       { user && !isAdmin && <>
         <Link 
            to="/dashboard/analytics" 
            className={`block ${getLinkStyle('/dashboard/analytics')}`}
            onClick={() => {
              setActiveLink('/dashboard/analytics');
              setIsMobileMenuOpen(false);
            }}
          >
            <RxDashboard className="inline-block mr-1" />Dashboard
          </Link>
        </> }


       { user && isAdmin && <>
         <Link 
            to="/get-message" 
            className={`block ${getLinkStyle('/get-message')}`}
            onClick={() => {
              setActiveLink('/get-message');
              setIsMobileMenuOpen(false);
            }}
          >
            <FiMessageCircle className="inline-block mr-1" /> Message
          </Link>
        </> }


       { user && !isAdmin && <>
         <Link 
            to="/get-reply-message" 
            className={`block ${getLinkStyle('/get-reply-message')}`}
            onClick={() => {
              setActiveLink('/get-reply-message');
              setIsMobileMenuOpen(false);
            }}
          >
            <FiMessageCircle className="inline-block mr-1" /> Message
          </Link>
        </> }


        <Link 
            to="/contact" 
            className={`block ${getLinkStyle('/contact')}`}
            onClick={() => {
              setActiveLink('/contact');
              setIsMobileMenuOpen(false);
            }}
          >
             <MdOutlineSupportAgent className="inline-block mr-1" />Support
          </Link>

  

          {
            user && (
              <button
              onClick={handleLogout}
              className="  px-4 py-1 rounded-2xl  font-semibold transition-transform hover:scale-105 shadow-2xl bg-white text-black"
            >
              Logout
            </button>
            )
          }
          
          {/* Add login button for mobile */}
          {!user && (
            <Link 
            to="/login" 
            className={`block ${getLinkStyle('/login')}`}
            onClick={() => {
              setActiveLink('/login');
              setIsMobileMenuOpen(false);
            }}
          >
            <FaSignInAlt className="inline-block mr-1" /> Login
          </Link>
          )}

          {!user && (
             <Link 
             to="/register" 
             className={`block ${getLinkStyle('/register')}`}
             onClick={() => {
               setActiveLink('/register');
               setIsMobileMenuOpen(false);
             }}
           >
             <FaUserPlus className="inline-block mr-1" /> Register
           </Link>
          )}
        </div>
      </div>

    </nav>
  )
}

export default Navbar





