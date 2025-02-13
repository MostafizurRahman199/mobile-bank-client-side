import React, { useState, useEffect } from 'react';
// import { useFirebaseAuth } from '../Auth/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import Aos from 'aos';
import { useFirebaseAuth } from '../hooks/useAuth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { resetPassword, logOut } = useFirebaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

 
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);


  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      await logOut(); 
      window.location.href = 'https://mail.google.com'; 
    //   toast.success('Password reset email sent!');
    } catch (error) {
      toast.error('Failed to send password reset email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 sm:shadow-lg shadow-[#5544d9] p-8 rounded-2xl" data-aos="fade-up">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#5544d9]">
          Reset Password
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#5544d9] focus:border-[#5544d9] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='flex flex-col justify-between items-center gap-4 '>
            <button
              onClick={handleResetPassword}
            //   type="submit"
              className="group relative w-full flex justify-center border border-transparent text-sm bg-[#5544d9] hover:bg-[#151515] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5544d9] px-8 py-3 rounded-md text-white font-bold transition-transform hover:scale-105 shadow-2xl"
            >
              Reset Password
            </button>
            <button
              onClick={() => navigate('/login')}
            //   type="submit"
              className="group relative w-full flex justify-center border border-transparent text-sm bg-[#5544d9] hover:bg-[#151515] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5544d9] px-8 py-3 rounded-md text-white font-bold transition-transform hover:scale-105 shadow-2xl"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;