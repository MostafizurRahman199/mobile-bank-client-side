// // import React from 'react'

// // const ManageItemManageItemModal = () => {
// //   return (
// //     <div>ManageItemManageItemModal</div>
// //   )
// // }

// // export default ManageItemManageItemModal


// import React from "react";
// import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

// const ManageItemModal = ({
//   isOpen,
//   onClose,
//   selectedItem,
//   onUpdate,
//   setSelectedItem,
// }) => {



// // this is data format update the modal , 
// //   {
// //     "_id": "678577aa2b7d12e2ad584084",
// //     "campName": "Covid Vaccine",
// //     "imageUrl": "https://i.ibb.co/ykZnK1T/m2.png",
// //     "campFees": 8,
// //     "dateTime": "1991-08-13T10:22",
// //     "location": "Dhaka",
// //     "healthcareProfessional": "Dr. Chumky",
// //     "participantCount": 0,
// //     "description": "The importance of medical camps is highlighted by the health services they provide to the low-income segment of society without imposing financial costs on them; therefore, they are considered... Community service It contributes to alleviating the suffering of patients who belong to the poorest groups in society, as they find it difficult to receive treatment due to their difficult living conditions. Medical camps also work to improve the health situation, especially for remote communities that lack health facilities.\nOrganizing medical camps has a profound positive impact on society, and re-establishes the centrality of goodness and charity in our lives, in a world dominated by materialism and where human values are diminishing to the point of extinction."
// // }





//   return (
//     <Dialog
//       open={isOpen}
//       handler={onClose}
//       animate={{
//         mount: { scale: 1, y: 0 },
//         unmount: { scale: 0.9, y: -100 },
//       }}
//       className="max-h-[calc(100vh-20px)] overflow-y-auto"
//     >
//       <DialogHeader>Update Item</DialogHeader>
//       <DialogBody>
//         {selectedItem && (
//           <div className="space-y-4">
//             {/* Name Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 value={selectedItem.name}
//                 onChange={(e) =>
//                   setSelectedItem((prev) => ({
//                     ...prev,
//                     name: e.target.value,
//                   }))
//                 }
//                 className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//               />
//             </div>

//             {/* Category Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <input
//                 type="text"
//                 value={selectedItem.category}
//                 onChange={(e) =>
//                   setSelectedItem((prev) => ({
//                     ...prev,
//                     category: e.target.value,
//                   }))
//                 }
//                 className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//               />
//             </div>

//             {/* Price Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Price
//               </label>
//               <input
//                 type="number"
//                 value={selectedItem.price}
//                 onChange={(e) =>
//                   setSelectedItem((prev) => ({
//                     ...prev,
//                     price: parseFloat(e.target.value),
//                   }))
//                 }
//                 className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//               />
//             </div>

//             {/* Single Image URL */}
//             {selectedItem.image && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Image URL
//                 </label>
//                 <input
//                   type="url"
//                   value={selectedItem.image}
//                   onChange={(e) =>
//                     setSelectedItem((prev) => ({
//                       ...prev,
//                       image: e.target.value,
//                     }))
//                   }
//                   className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//                 />
//               </div>
//             )}

//             {/* Recipe Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Recipe
//               </label>
//               <textarea
//                 value={selectedItem.recipe}
//                 onChange={(e) =>
//                   setSelectedItem((prev) => ({
//                     ...prev,
//                     recipe: e.target.value,
//                   }))
//                 }
//                 className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//               ></textarea>
//             </div>
//           </div>
//         )}
//       </DialogBody>

//       <DialogFooter className="gap-2">
//         <Button variant="gradient" color="red" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button variant="gradient" color="green" onClick={onUpdate}>
//           Update
//         </Button>
//       </DialogFooter>
//     </Dialog>
//   );
// };

// export default ManageItemModal;










// import React from "react";
// import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

// const ManageItemModal = ({
//   isOpen,
//   onClose,
//   selectedItem,
//   onUpdate,
//   setSelectedItem,
// }) => {
//   return (
//     <Dialog
//       open={isOpen}
//       handler={onClose}
//       animate={{
//         mount: { scale: 1, y: 0 },
//         unmount: { scale: 0.9, y: -100 },
//       }}
//       className="max-h-[calc(100vh-20px)] overflow-y-auto"
//     >
//       <DialogHeader>Update Item</DialogHeader>
//       <DialogBody>
//         {selectedItem && (
//           <div className="space-y-4">
//             {/* Camp Name Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Camp Name
//               </label>
//               <input
//                 type="text"
//                 value={selectedItem.campName}
//                 onChange={(e) =>
//                   setSelectedItem((prev) => ({
//                     ...prev,
//                     campName: e.target.value,
//                   }))
//                 }
//                 className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//               />
//             </div>

//             {/* Image URL Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Image URL
//               </label>
//               <input
//                 type="url"
//                 value={selectedItem.imageUrl}
//                 onChange={(e) =>
//                   setSelectedItem((prev) => ({
//                     ...prev,
//                     imageUrl: e.target.value,
//                   }))
//                 }
//                 className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//               />
//             </div>

//             {/* Camp Fees Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Camp Fees
//               </label>
//               <input
//                 type="number"
//                 value={selectedItem.campFees}
//                 onChange={(e) =>
//                   setSelectedItem((prev) => ({
//                     ...prev,
//                     campFees: parseFloat(e.target.value),
//                   }))
//                 }
//                 className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//               />
//             </div>

//             {/* Date and Time Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Date & Time
//               </label>
//               <input
//                 type="datetime-local"
//                 value={selectedItem.dateTime}
//                 onChange={(e) =>
//                   setSelectedItem((prev) => ({
//                     ...prev,
//                     dateTime: e.target.value,
//                   }))
//                 }
//                 className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//               />
//             </div>

//             {/* Location Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 value={selectedItem.location}
//                 onChange={(e) =>
//                   setSelectedItem((prev) => ({
//                     ...prev,
//                     location: e.target.value,
//                   }))
//                 }
//                 className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//               />
//             </div>

//             {/* Healthcare Professional Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Healthcare Professional
//               </label>
//               <input
//                 type="text"
//                 value={selectedItem.healthcareProfessional}
//                 onChange={(e) =>
//                   setSelectedItem((prev) => ({
//                     ...prev,
//                     healthcareProfessional: e.target.value,
//                   }))
//                 }
//                 className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//               />
//             </div>

//             {/* Description Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Description
//               </label>
//               <textarea
//                 value={selectedItem.description}
//                 onChange={(e) =>
//                   setSelectedItem((prev) => ({
//                     ...prev,
//                     description: e.target.value,
//                   }))
//                 }
//                 className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
//               ></textarea>
//             </div>
//           </div>
//         )}
//       </DialogBody>

//       <DialogFooter className="gap-2">
//         <Button variant="gradient" color="red" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button variant="gradient" color="green" onClick={onUpdate}>
//           Update
//         </Button>
//       </DialogFooter>
//     </Dialog>
//   );
// };

// export default ManageItemModal;
import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { uploadToImageBB } from "../../../utils/imagebb";
import Spinner from "../../../components/Spinner/Spinner";
// Separate utility function for ImgBB upload

const ManageItemModal = ({
  isOpen,
  onClose,
  selectedItem,
  onUpdate,
  setSelectedItem,
}) => {

const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const imageUrl = await uploadToImageBB(file);
        setSelectedItem((prev) => ({
          ...prev,
          imageUrl,
        }));
        setLoading(false);
      } catch (error) {
        console.error("Image upload failed:", error);
        setLoading(false);
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="max-h-[calc(100vh-20px)] overflow-y-auto"
    >
      <DialogHeader>Update Camp</DialogHeader>
      <DialogBody>
        {selectedItem && (
          <div className="space-y-4">
            {/* Camp Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Camp Name
              </label>
              <input
                type="text"
                value={selectedItem.campName}
                onChange={(e) =>
                  setSelectedItem((prev) => ({
                    ...prev,
                    campName: e.target.value,
                  }))
                }
                className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
              />
            </div>

            {/* Image Upload Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Image </label>
              {
                  loading ? <>
                <Spinner></Spinner>
                </> : 
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
              />
              }
              {selectedItem.imageUrl && (
                <img
                  src={selectedItem.imageUrl}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-cover rounded-md"
                />
              )}
            </div>

            {/* Camp Fees Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Camp Fees
              </label>
              <input
                type="number"
                value={selectedItem.campFees}
                onChange={(e) =>
                  setSelectedItem((prev) => ({
                    ...prev,
                    campFees: parseFloat(e.target.value),
                  }))
                }
                className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
              />
            </div>

            {/* Date and Time Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={selectedItem.dateTime}
                onChange={(e) =>
                  setSelectedItem((prev) => ({
                    ...prev,
                    dateTime: e.target.value,
                  }))
                }
                className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
              />
            </div>

            {/* Location Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={selectedItem.location}
                onChange={(e) =>
                  setSelectedItem((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
              />
            </div>

            {/* Healthcare Professional Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Healthcare Professional
              </label>
              <input
                type="text"
                value={selectedItem.healthcareProfessional}
                onChange={(e) =>
                  setSelectedItem((prev) => ({
                    ...prev,
                    healthcareProfessional: e.target.value,
                  }))
                }
                className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={selectedItem.description}
                onChange={(e) =>
                  setSelectedItem((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
              ></textarea>
            </div>
          </div>
        )}
      </DialogBody>

      <DialogFooter className="gap-2">
        <Button variant="gradient" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={onUpdate}>
          Update
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ManageItemModal;
