import React from 'react'
import ApiComponent from '../API/ApiComponent';
import { useQuery } from '@tanstack/react-query';

const useCamp = () => {

  const {getCampData} = ApiComponent();


  const {data: campData, isLoading, isError, error, refetch} = useQuery({
    queryKey: ['campData'],
    queryFn: getCampData,
  })

  return {campData, isLoading, isError, error, refetch};
}

export default useCamp