// components/Pagination/Pagination.jsx
import React from "react";
import "./pagination.scss";

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const generatePages = () => {
        const pages = [];

        if (totalPages <= 1) return pages;

        if (currentPage <= 5) {
            for (let i = 1; i <= Math.min(5, totalPages); i++) {
                pages.push(i);
            }
            if (totalPages > 5) pages.push("...");
            if (totalPages > 6) pages.push(totalPages);
        } else if (currentPage > 5 && currentPage < totalPages - 4) {
            pages.push(1, 2, "...");
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pages.push(i);
            }
            pages.push("...", totalPages);
        } else {
            pages.push(1, 2, "...");
            for (let i = totalPages - 4; i <= totalPages; i++) {
                pages.push(i);
            }
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
