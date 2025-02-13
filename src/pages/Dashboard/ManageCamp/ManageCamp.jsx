// import React from 'react'

// const ManageCamp = () => {
//   return (
//     <div>ManageCamp</div>
//   )
// }

// export default ManageCamp







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
import useCamp from "../../../hooks/useCamp";


const ManageCamp = () => {

  const {deleteCampItem, updateCampItem } = ApiComponent();

  const {campData, isLoading, isError, error, refetch} = useCamp();


  console.log(campData);

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
    console.log(selectedItem);
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
    mutationFn: (id) => deleteCampItem(id),
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
    mutationFn: (selectedItem) => updateCampItem(selectedItem),
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





  if (isLoading) {
    return <Loading height="screen" />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="w-full md:w-11/12 mx-auto">

{/*Hading Section   */}

      <SectionHeading
        title2={"Manage All Camps"}
      ></SectionHeading>

{/* Modal */}
      <ManageItemModal  isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedItem={selectedItem}
        onUpdate={handleUpdate}
        setSelectedItem={setSelectedItem}></ManageItemModal>

{/* MenuItemTable */}
      <ItemTable  campData={campData}
        handleModalOpen={handleModalOpen}
        handleDelete={handleDelete}></ItemTable>
    
    </div>
  );
};

export default ManageCamp;

