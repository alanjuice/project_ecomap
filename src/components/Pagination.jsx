import React, { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => handlePageClick(page)}
        className={`px-3 py-1 rounded ${
          page === currentPage
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
        }`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4  mb-6">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-2">{renderPageNumbers()}</div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
