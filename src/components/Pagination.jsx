import React, { useState } from "react";

export default function Pagination({ totalPages = 6, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(2);

  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      if (onPageChange) onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-3 mt-8">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-9 h-9 flex items-center justify-center rounded-full font-medium transition
          ${
            currentPage === 1
              ? "bg-green-100 text-green-400 cursor-not-allowed"
              : "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
          }`}
      >
        ←
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 text-gray-600">...</span>
        ) : (
          <button
            key={idx}
            onClick={() => handlePageClick(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-full font-medium transition
              ${
                page === currentPage
                  ? "bg-green-600 text-white cursor-default"
                  : "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
              }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-9 h-9 flex items-center justify-center rounded-full font-medium transition
          ${
            currentPage === totalPages
              ? "bg-green-100 text-green-400 cursor-not-allowed"
              : "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
          }`}
      >
        →
      </button>
    </div>
  );
}
