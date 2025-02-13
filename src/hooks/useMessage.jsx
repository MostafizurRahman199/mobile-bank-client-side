

import { useQuery } from '@tanstack/react-query'
import ApiComponent from '../API/ApiComponent';
import { useFirebaseAuth } from './useAuth';

const useMessage = () => {

    const {getMessage} = ApiComponent();

    const {data, refetch, isLoading, isError} = useQuery({
        queryKey: ["getMessage"],
        queryFn: getMessage,
    })

 


  return {data, refetch, isLoading, isError};
}

export default useMessage