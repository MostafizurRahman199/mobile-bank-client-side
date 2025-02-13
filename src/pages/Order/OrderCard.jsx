import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import ApiComponent from "../../API/ApiComponent";
import { useFirebaseAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";



const OrderCard = ({ foodData, currentPage=1, itemsPerPage=6 }) => {

  const {addToCart} = ApiComponent();
  const {user} = useFirebaseAuth();
  const userEmail = user?.email;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = foodData.slice(startIndex, startIndex + itemsPerPage);
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  console.log(pathname);
  const {data, refetch} = useCart();

const addToCartMutation = useMutation({
 mutationFn : (cartItem) => addToCart(cartItem),
  onSuccess: (data) => {


    // queryClient.invalidateQueries("cartItems");
    refetch();

    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Item added to Cart Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

   
  },
  onError: () => {
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Something went wrong. Try again!",
      showConfirmButton: false,
      timer: 1500,
    });
  },
})


  const handleAddToCart = (item) => {

    console.log(item)
    const cartItem ={
      Item_id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      userEmail: userEmail,
      category:item.category,
    }

    if(!user){
      Swal.fire({
        title: "Have to login to add item on cart",
        text: "Please login to add item to cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {state: {from: pathname}});
        }
      });
    }else{

      addToCartMutation.mutate(cartItem);
    }

  }


  // {"_id":"642c155b2c4774f05c36ee88","name":"Escalope de Veau","recipe":"Pan roasted haddock fillet wrapped in smoked French bacon with pea purée and tomato and chive vinaigrette","image":"https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg","category":"dessert","price":{"$numberDouble":"12.5"}}


  return (
    <div className={`w-11/12 md:w-10/12 mx-auto my-20`}>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {paginatedData.map((item, index) => (
          <div
            key={index}
            className=" h-[450px] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all flex flex-col justify-between duration-300"
          >
            <img
              src={item.image || item.imageUrls[0]}
              alt={item.name}
              className="flex-1 w-full h-1/2 object-cover "
            />
            <div className={`p-4 flex-1 flex flex-col justify-center`}>
              <h3 className="text-xl font-bold text-center">{item.name}</h3>
              <p className="text-sm mb-4 text-center">{item.recipe.slice(0,100)}</p>
              <div className="flex justify-center items-center">
                <button
                
                onClick={()=> handleAddToCart(item)}
                className="px-4 py-2 text-center text-[#D99904] border-b-2 border-[#D99904] rounded-lg bg-[#E8E8E8] hover:bg-[#1F2937] hover:border-[#1F2937] w-fit">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
