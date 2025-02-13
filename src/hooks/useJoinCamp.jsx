
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import ApiComponent from '../API/ApiComponent';

const useJoinCamp = () => {

  const {getJoinCamp, } = ApiComponent();


  const {data: campData, isLoading, isError, error, refetch} = useQuery({
    queryKey: ['joinCampData'],
    queryFn: getJoinCamp,
  })


  return {campData, isLoading, isError, error, refetch};
}

export default useJoinCamp