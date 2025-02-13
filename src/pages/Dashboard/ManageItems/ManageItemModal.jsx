// import React from 'react'

// const ManageItemManageItemModal = () => {
//   return (
//     <div>ManageItemManageItemModal</div>
//   )
// }

// export default ManageItemManageItemModal


import React from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const ManageItemModal = ({
  isOpen,
  onClose,
  selectedItem,
  onUpdate,
  setSelectedItem,
}) => {
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
      <DialogHeader>Update Item</DialogHeader>
      <DialogBody>
        {selectedItem && (
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={selectedItem.name}
                onChange={(e) =>
                  setSelectedItem((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
              />
            </div>

            {/* Category Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={selectedItem.category}
                onChange={(e) =>
                  setSelectedItem((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
              />
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                value={selectedItem.price}
                onChange={(e) =>
                  setSelectedItem((prev) => ({
                    ...prev,
                    price: parseFloat(e.target.value),
                  }))
                }
                className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
              />
            </div>

            {/* Single Image URL */}
            {selectedItem.image && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  value={selectedItem.image}
                  onChange={(e) =>
                    setSelectedItem((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-2"
                />
              </div>
            )}

            {/* Recipe Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipe
              </label>
              <textarea
                value={selectedItem.recipe}
                onChange={(e) =>
                  setSelectedItem((prev) => ({
                    ...prev,
                    recipe: e.target.value,
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
