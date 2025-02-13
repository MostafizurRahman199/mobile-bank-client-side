




import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ApiComponent from "../../../API/ApiComponent";
import Loading from "../../../components/Loading/Loading";
import ErrorPage from "../../../components/Error.jsx/ErrorPage";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import useMenu from "../../../hooks/useMenu";
import ManageItemModal from "./ManageItemModal";
import ItemTable from "./ItemTable";


const ManageItems = () => {

  const {deleteMenuItem, updateMenuItem } = ApiComponent();

  const {menuData, isLoading, isError, error, refetch} = useMenu();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleModalOpen = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  
  // console.log(selectedItem);
  const handleModalClose = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };


// console.log(selectedItem);

  const handleUpdate = () => {
    // Add your update logic here (e.g., API call to update item)
    // console.log(selectedItem);
    updateItemMutation.mutate(selectedItem);


    // console.log(updatedData)
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "The item has been updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
    handleModalClose();
    refetch(); // Refetch menu data
  };



    const deleteUserMutation = useMutation({
    mutationFn: (id) => deleteMenuItem(id),
    onSuccess: () => {
      refetch(); 
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The item has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the item. Please try again.",
      });
    },
  });





  const updateItemMutation = useMutation({
    mutationFn: (selectedItem) => updateMenuItem(selectedItem),
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Item Updated!",
        text: "The user role has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update the user role. Please try again.",
      });
    },
  });




    const handleDelete = (id) => {
    // console.log("hello");
    // SweetAlert2 Confirmation Dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(id); // Trigger deletion if confirmed
      }
    });
  };






//   {
//     "_id": "642c155b2c4774f05c36ee7e",
//     "name": "Fish Parmentier",
//     "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
//     "image": "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-5-370x247.jpg",
//     "category": "popular",
//     "price": 14.5
// }


//   {
//     "_id": "677d3f401932dfe6d821aa11",
//     "name": "Pizza special",
//     "category": "pizza",
//     "price": 556,
//     "recipe": "I've made this several times, and we really like it. However, I like it much better as a thicker crust - I don't think it works well as a thin crust. Don't split the dough into two lumps, just spread the whole thing over the pizza pan. I didn't change the cooking time, and it was great.",
//     "imageUrls": [
//         "https://i.ibb.co/JkX8pk9/83804355.webp"
//     ],
//     "createdAt": "2025-01-07T14:50:40.288Z"
// }


  if (isLoading) {
    return <Loading height="screen" />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="w-full md:w-10/12 mx-auto">

{/*Hading Section   */}

      <SectionHeading
        title1={"---How many??---"}
        title2={"MANAGE ALL USERS"}
      ></SectionHeading>

{/* Modal */}
      <ManageItemModal  isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedItem={selectedItem}
        onUpdate={handleUpdate}
        setSelectedItem={setSelectedItem}></ManageItemModal>

{/* MenuItemTable */}
      <ItemTable  menuData={menuData}
        handleModalOpen={handleModalOpen}
        handleDelete={handleDelete}></ItemTable>
    
    </div>
  );
};

export default ManageItems;

