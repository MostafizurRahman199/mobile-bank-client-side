// src/components/CaptchaComponent.js
//npm i react-simple-captcha


import React, { useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const CaptchaComponent = ({ onCaptchaValidated }) => {
  
  // Initialize captcha when the component is mounted
  useEffect(() => {
    loadCaptchaEnginge(6);  // 6 characters captcha
  }, []);

  // Function to handle captcha validation
  const handleValidation = () => {
    const userCaptchaValue = document.getElementById('user_captcha_input').value;
    if (validateCaptcha(userCaptchaValue)) {
      onCaptchaValidated(true);
    } else {
      onCaptchaValidated(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-center">
        <LoadCanvasTemplate />
      </div>
      <div className="mt-2">
        <input
          type="text"
          id="user_captcha_input"
          className="w-full px-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          placeholder="Enter captcha"
        />
      </div>
    </div>
  );
};

export default CaptchaComponent;
