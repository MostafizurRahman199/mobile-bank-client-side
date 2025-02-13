


import { useQuery } from '@tanstack/react-query'
import ApiComponent from '../API/ApiComponent';
import { useFirebaseAuth } from './useAuth';

const useRegisterCamp = () => {

    const {getRegisterCamp} = ApiComponent();
    const {user} = useFirebaseAuth();
    const userEmail = user?.email;

    const {data, refetch, isLoading, isError} = useQuery({
        queryKey: ["register-camps", userEmail],
        queryFn: () => getRegisterCamp(userEmail),
    })

    const totalPrice = data?.reduce((total, item)=> total + item.campFees, 0);


  return {data,totalPrice, refetch, isLoading, isError};
}

export default useRegisterCamp