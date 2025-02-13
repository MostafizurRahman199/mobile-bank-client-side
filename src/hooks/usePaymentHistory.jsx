import React from 'react'
import { useFirebaseAuth } from './useAuth';
import ApiComponent from '../API/ApiComponent';
import { useQuery } from '@tanstack/react-query';

const usePaymentHistory = () => {



    const { user } = useFirebaseAuth();
    const email = user?.email;
    const { getPaymentHistory } = ApiComponent();
  
    const { data: paymentData, isLoading, isError, refetch } = useQuery({
      queryKey: ['paymentHistory', email],
      queryFn: () => getPaymentHistory(email),
      enabled: !!email, // Prevent query from running if email is falsy
    });


  return{ paymentData, isLoading, isError, refetch  }
}

export default usePaymentHistory