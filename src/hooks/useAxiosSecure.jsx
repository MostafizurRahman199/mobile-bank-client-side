import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  useFirebaseAuth } from './useAuth';




const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });


const useAxiosSecure = () => {
   return api;
}

export default useAxiosSecure