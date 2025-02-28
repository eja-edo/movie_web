import React from "react";
import "./pagination.scss";

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const generatePages = () => {
        const pages = [];

        if (totalPages <= 1) return [1];

        if (totalPages <= 7) {
            // Show all pages if totalPages is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        if (currentPage <= 4) {
            for (let i = 1; i <= 5; i++) {
                pages.push(i);
            }
            pages.push("...");
            pages.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
            pages.push(1, "...");
            for (let i = totalPages - 4; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // General case for the middle pages
            pages.push(1, "...");
            pages.push(currentPage - 1);
            pages.push(currentPage);
            pages.push(currentPage + 1);
            pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="pagination">
            {currentPage > 1 && <button onClick={() => onPageChange(currentPage - 1)}>&lt;</button>}
            {generatePages().map((page, index) => (
                <button key={index} className={page === currentPage ? "active" : ""} onClick={() => page !== "..." && onPageChange(page)} disabled={page === "..."}>
                    {page}
                </button>
            ))}
            {currentPage < totalPages && <button onClick={() => onPageChange(currentPage + 1)}>&gt;</button>}
        </div>
    );
};

export default Pagination;
