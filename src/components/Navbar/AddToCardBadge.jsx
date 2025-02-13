
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";

const CustomBadge = ({ count, children }) => {
  return (
    <div className="relative inline-block">
      {children}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};




const AddToCardBadge = () => {
   
// _______fetch cart data using custom hook

const {data} = useCart();

  return (
    <Link to={"/dashboard/my-cart"} className="flex items-center gap-8">
      <CustomBadge count={data?.length}>
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <FaCartShopping  className="text-xl text-black" />
        </button>
      </CustomBadge>
    </Link>
  );
};

export default AddToCardBadge;
