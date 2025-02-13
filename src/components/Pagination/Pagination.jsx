


import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const generatePaginationButtons = () => {
    const buttons = [];

    // Add "Previous" button
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          className="mx-1 px-4 py-2 border hover:bg-[#4335a7] hover:text-white text-[#4335a7]"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      );
    }

    // Add page buttons
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`mx-1 px-4 py-2 border ${
            currentPage === i
              ? 'bg-[#4335a7] text-white'
              : 'hover:bg-[#4335a7] hover:text-white text-[#4335a7]'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Add "Next" button
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          className="mx-1 px-4 py-2 border hover:bg-[#4335a7] hover:text-white text-[#4335a7]"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  return <div className="flex justify-center mt-6">{generatePaginationButtons()}</div>;
};

export default Pagination;


