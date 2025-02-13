import { useQuery } from '@tanstack/react-query'
import ApiComponent from '../API/ApiComponent';
import { useFirebaseAuth } from './useAuth';

const useCart = () => {

    const {getCart} = ApiComponent();
    const {user} = useFirebaseAuth();
    const userEmail = user?.email;

    const {data, refetch, isLoading, isError} = useQuery({
        queryKey: ["cartItems", userEmail],
        queryFn: () => getCart(userEmail),
    })

    const totalPrice = data?.reduce((total, item)=> total + item.price, 0);


  return {data,totalPrice, refetch, isLoading, isError};
}

export default useCart