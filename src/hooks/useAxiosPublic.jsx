import axios from 'axios';
import React from 'react'

const useAxiosPublic = () => {


    const apiPublic = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
      });


    return apiPublic;
  
}

export default useAxiosPublic