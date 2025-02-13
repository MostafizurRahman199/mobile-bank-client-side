import React from 'react'
import ApiComponent from '../API/ApiComponent';
import { useFirebaseAuth } from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useGetUser = () => {

    const { checkUserApproved} = ApiComponent();
      const { user } = useFirebaseAuth();

  const email = user?.email;

    const { data , isLoading, refetch } = useQuery({
        queryKey: ["checkUserApproved", email],
        queryFn: () => checkUserApproved(email),
        enabled: !!email,
      });

  return {data, isLoading, refetch};
}

export default useGetUser