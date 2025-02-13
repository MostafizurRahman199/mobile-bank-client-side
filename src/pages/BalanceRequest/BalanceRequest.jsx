import React from 'react'

const BalanceRequest = () => {

    const { user } = useFirebaseAuth();
    const { data, refetch } = useGetUser();
    const [userPhone, setUserPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const api = useAxiosSecure();

  return (
    <div>BalanceRequest</div>
  )
}

export default BalanceRequest