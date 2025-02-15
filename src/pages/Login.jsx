import React, { useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useFirebaseAuth } from '../Auth/AuthProvider';

import { FcGoogle } from 'react-icons/fc'; 
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Aos from 'aos';
import { useEffect } from 'react';

import Swal from 'sweetalert2';

import loginAnimation from "../../public/loginBlueTheme.json";
import Lottie from 'lottie-react';
import { useFirebaseAuth } from '../hooks/useAuth';
import authenticationImage from "../../public/others/authentication2.png";
import CaptchaComponent from '../components/Capcha/CaptchaComponent';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import GoogleSignIn from '../components/SocialLogin/GoogleSignIn';
import ApiComponent from '../API/ApiComponent';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, googleSignIn } = useFirebaseAuth();
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const{checkUserApproved} = ApiComponent();




  const navigate = useNavigate();
  const location = useLocation();

    // // Access the "from" value safely
    const from = location.state?.from || "/homePage";

    
    // console.log(location);
    // console.log(from);



  const lottieRef = useRef(null);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);


  useEffect(() => {
    
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5); // Adjust speed (e.g., 0.5 for half speed)
    }
  }, []);


  useEffect(() => {
    loadCaptchaEnginge(6);  // 6 characters captcha
  }, []);


  const style = {
    height: 400,
  };
  




  const showError = (error) => {
    if(error.code === 'auth/invalid-credential'){
      toast.error('Invalid credentials');
      // sweetAlert("Invalid credentials", 'error');
    }
    else if(error.code === 'auth/user-not-found'){
      toast.error('User not found');
      // sweetAlert("User not found", 'error');
    }
    else if(error.code === 'auth/wrong-password'){
      toast.error('Wrong password');
      // sweetAlert("Wrong password", 'error');
    }
    else if(error.code === 'auth/invalid-email'){
      toast.error('Invalid email');
      // sweetAlert("Invalid email", 'error');
    }
    else if(error.code === 'auth/too-many-requests'){
      toast.error('Too many requests');
      // sweetAlert("Too many requests", 'error');
    }
    else if(error.code === 'auth/email-already-in-use'){
      toast.error('Email already in use');
      // sweetAlert("Email already in use", 'error');
    }
    else{
      toast.error("Something went wrong");
      // sweetAlert("Something went wrong", 'error');
    }
  }


// _________________________________jwt token validation


      
    
    const handleCapcha = (e) => {
     
      if (validateCaptcha(e.target.value)) {
        setIsCaptchaValid(true);
      } else {
        setIsCaptchaValid(false);
        toast.error("Captch is not valid");
      }
    }



  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {


      // ______________validate captcha

       const userCaptchaValue = document.getElementById('user_captcha_input').value;
  
     
    //  ________call login function in AuthProvider

      
    const check = await checkUserApproved(email)
    console.log(check)
      
    if(check.success){

      loginUser(email, password);
        // console.log(result.email)
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from, { replace: true });
    }
    else{
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "This account is not Active now, Need Admin Permission",
        showConfirmButton: false,
        timer: 1500
      });
    }
     

    
    } catch (error) {
      showError(error);

    }
  };
   



  const handleForgotPassword = () => {
    navigate('/forgot-password', { state: { email } });
  };

  return (
    <div className="md:w-10/12 min-h-screen mx-auto  flex items-center justify-center  py-20 px-4 sm:px-6 lg:px-8">
      <div className=" w-full flex flex-col md:flex md:flex-row justify-center items-center gap-4  space-y-4 sm:shadow-2xl p-8  rounded-2xl bg-gray-100" data-aos="zoom-in">
       <div className='flex-1'>
       <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#4335a7]">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <input
                type="email"
                required
                className="appearance-none  relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none  relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-black focus:border-black sm:text-sm pr-10"
                placeholder="Pin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                    <FaEye className="h-5 w-5 text-gray-400" />
                ) : (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

         

          <div className="mt-4 ">
            <div className="flex items-center justify-center py-2 rounded-xl border-2 bg-white">
              <LoadCanvasTemplate />
            </div>
            <div className="mt-2">
              <input
                onBlur={handleCapcha}
                type="text"
                id="user_captcha_input"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter captcha"
              />
            </div>
        </div>

          <div>
            <button
             disabled={!isCaptchaValid}
              type="submit"
              className={`${isCaptchaValid === false?  "bg-gray-400" : "bg-[#4335a7] hover:bg-[#5544d9]"}  group relative w-full flex justify-center  border border-transparent text-sm   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black px-8 py-3 rounded-xl text-white font-bold transition-transform hover:scale-105 shadow-2xl`}
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between my-2">
            <div className="text-sm">
              <button
                onClick={handleForgotPassword}
                className="font-medium text-[#4335a7] hover:text-[#5544d9]"
              >
                Forgot your password?
              </button>
            </div>
          </div>

     

        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[#4335a7] hover:text-[#5544d9]">
            Register here
          </Link>
        </p>
       </div>

       <div className='flex-1'>
        <Lottie  lottieRef={lottieRef}
      animationData={loginAnimation}
      style={style}
      loop={true} />
      </div>
       {/* <div className='flex-1'>
          <img src={authenticationImage} alt="" />
      </div> */}
      </div>


      
    </div>
  );
};

export default Login;