// import React, { useEffect, useState } from "react";
// import Cover from "../../components/Cover/Cover";
// import banner2 from "../../../public/shop/banner2.jpg";
// import OrderCard from "./OrderCard";
// import { useParams } from "react-router-dom";
// import ApiComponent from "../../API/ApiComponent";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "../../components/Loading/Loading";
// import ErrorPage from "../ErrorPage";

// // Tabs array
// const tabs = ["Salad", "Pizza", "Soups", "Desserts", "Drinks"];

// const Order = () => {
//   const { getMenuData? } = ApiComponent();
//   const { category } = useParams();
//   // console.log(category)

//   // Default to "Salad" or the category from the URL
//   const [activeTab, setActiveTab] = useState(category || "Salad");

//   // Fetch menu data using TanStack Query
//   const { data: menuData? = [], isLoading, isError } = useQuery({
//     queryKey: ["menuData?"],
//     queryFn: getMenuData?,
//   });

//   // Update active tab only if `category` changes
//   // useEffect(() => {
   
      
//   // }, [category]);

//   useEffect(()=>{
//     if (category != ":category") {
//         setActiveTab(category);
//     }else{

//       setActiveTab("Salad")
//     }
//   },[])

//   // Filtered categories
//   const categorizedData = {
//     Salad: menuData?.filter((item) => item.category.toLowerCase() === "salad"),
//     Pizza: menuData?.filter((item) => item.category.toLowerCase() === "pizza"),
//     Soups: menuData?.filter((item) => item.category.toLowerCase() === "soup"),
//     Desserts: menuData?.filter((item) => item.category.toLowerCase() === "dessert"),
//     Drinks: menuData?.filter((item) => item.category.toLowerCase() === "drinks"),
//   };

//   // Handle loading and error states
//   if (isLoading) return <Loading />;
//   if (isError) return <ErrorPage />;

//   // Dynamic component rendering
//   const renderTabContent = () => {
//     console.log(activeTab);
//     const foodData = categorizedData[activeTab] || [];
//     return <OrderCard foodData={foodData} />;
//   };

//   return (
//     <div className="min-h-screen">
//       <Cover
//         image={banner2}
//         title1="Order Food"
//         title2="Craving something delicious? Order your favorite food now!"
//       />

//       {/* Tabs Section */}
//       <div className="mt-10">
//         <div className="flex justify-between flex-wrap px-2 gap-4 sm:gap-8 md:justify-center lg:space-x-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`text-base sm:text-lg font-semibold pb-1 ${
//                 activeTab === tab
//                   ? "text-[#BB8506] border-b-2 border-[#BB8506]"
//                   : "text-gray-700"
//               } hover:text-[#BB8506]`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="mt-8 px-4 sm:px-8 md:px-16 text-center">
//           <div className="mt-4">{renderTabContent()}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;




import React, { useEffect, useState } from "react";
import Cover from "../../components/Cover/Cover";
import banner2 from "../../../public/shop/banner2.jpg";
import OrderCard from "./OrderCard";

import { useParams } from "react-router-dom";
import ApiComponent from "../../API/ApiComponent";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../ErrorPage";
import Pagination from "../../components/Pagination/Pagination";
import useMenu from "../../hooks/useMenu";


// Tabs array
const tabs = ["Salad", "Pizza", "Soups", "Desserts", "Drinks"];

const Order = () => {

  const { category } = useParams();
  const [activeTab, setActiveTab] = useState(category || "Salad");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

//________________fetch menu data using custom hook

  const  {menuData, isLoading, isError, error} = useMenu();


  // Update active tab only if `category` changes
  useEffect(() => {
    if (category !== ":category") {
      setActiveTab(category);
    } else {
      setActiveTab("Salad");
    }
  }, [category]);

  // Filtered categories
  const categorizedData = {
    Salad: menuData?.filter((item) => item.category.toLowerCase() === "salad"),
    Pizza: menuData?.filter((item) => item.category.toLowerCase() === "pizza"),
    Soups: menuData?.filter((item) => item.category.toLowerCase() === "soup"),
    Desserts: menuData?.filter((item) => item.category.toLowerCase() === "dessert"),
    Drinks: menuData?.filter((item) => item.category.toLowerCase() === "drinks"),
  };

  // Handle loading and error states
  if (isLoading) return <Loading height="screen" />;
  if (isError) return <ErrorPage />;

  // Dynamic component rendering
  const renderTabContent = () => {
    const foodData = categorizedData[activeTab] || [];
    const totalPages = Math.ceil(foodData.length / itemsPerPage);

    return (
      <>
        <OrderCard
          foodData={foodData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen">
      <Cover
        image={banner2}
        title1="Order Food"
        title2="Craving something delicious? Order your favorite food now!"
      />

      {/* Tabs Section */}
      <div className="mt-10">
        <div className="flex justify-between flex-wrap px-2 gap-4 sm:gap-8 md:justify-center lg:space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1); // Reset to first page on tab change
              }}
              className={`text-base sm:text-lg font-semibold pb-1 ${
                activeTab === tab
                  ? "text-[#BB8506] border-b-2 border-[#BB8506]"
                  : "text-gray-700"
              } hover:text-[#BB8506]`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8 px-4 sm:px-8 md:px-16 text-center">
          <div className="mt-4">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Order;

