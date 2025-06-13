import React from "react";
import "./Pagination.css"; // Import your CSS file for styling
const Pagination = ({ name,totalPages, currentPage, onPageChange, total }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        if (currentPage <= 3) {
            pages.push(1, 2, 3, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="pagination">
        <span>Tổng {total} {name}</span>

        <button disabled={currentPage === 1} onClick={() => onPageChange(1)}>⏮</button>
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>◀</button>

        {pages.map((page, index) =>
            page === "..." ? (
            <span key={index} className="dots">...</span>
            ) : (
            <button
                key={index}
                className={page === currentPage ? "active" : ""}
                onClick={() => onPageChange(page)}
            >
                {page}
            </button>
            )
        )}

        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>▶</button>
        <button disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>⏭</button>
    </div>
  );
};

export default Pagination;