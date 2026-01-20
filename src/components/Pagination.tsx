import { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages: initalTotalPages, onPageChange }: PaginationProps) => {
  const [ currentPage, setCurrentPage ] = useState(page);
  const [ totalPages, setTotalPages ] = useState(initalTotalPages)
  const [ pages, setPages ] = useState<any[]>([]);

  // Navigate to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1); // Pass the new page to the parent
    }
  };

  // Navigate to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1); // Pass the new page to the parent
    }
  };

  // Handle page number click
  const handlePageClick = (pageNum) => {
    if (pageNum !== '...') {
      setCurrentPage(pageNum);
      onPageChange(pageNum); // Pass the new page to the parent
    }
  };

  // Generate pages dynamically based on the current page and totalPages
  useEffect(() => {    
    const generatePages = () => {
      let pageNumbers: any[] = [];
      const maxPagesToShow = 5; // Maximum number of page links to display
      const range = Math.floor(maxPagesToShow / 2);

      let startPage = Math.max(currentPage - range, 1);
      let endPage = Math.min(currentPage + range, totalPages);

      // Ensure the total pages are displayed correctly
      if (startPage > 1) {
        pageNumbers.push(1); // Add the first page
        if (startPage > 2) pageNumbers.push('...'); // Add ellipsis if there's a gap
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...'); // Add ellipsis if there's a gap
        pageNumbers.push(totalPages); // Add the last page
      }

      setPages(pageNumbers);
    };

    generatePages();
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(page);
    setTotalPages(initalTotalPages);
  }, [initalTotalPages, page])

  return (
    <div className="mx-auto p-4 text-gray-600">
      <div className="hidden items-center justify-between text-sm md:flex">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-12" aria-label="Pagination">
          <ul className="flex items-center gap-1">
            {pages.map((item, idx) => (
              <li key={idx}>
                {item === '...' ? (
                  <div>{item}</div>
                ) : (
                  <a
                    href="javascript:void(0)"
                    aria-current={currentPage === item ? "page" : false}
                    className={`px-3 py-2 rounded-lg duration-150 hover:text-default hover:bg-yellow-300 ${
                      currentPage === item
                        ? "bg-yellow-500 text-default font-medium"
                        : ""
                    }`}
                    onClick={() => handlePageClick(item)}
                  >
                    {item}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="inline-flex items-center gap-4 text-[#344054] font-semibold">
          <div
            className="hover:text-yellow-600 border gap-2 w-24 p-2 inline-flex items-center justify-center rounded-md cursor-pointer"
            onClick={handlePrevPage}
          >
            <IoIosArrowRoundBack /> Previous
          </div>

          <div
            className="hover:text-yellow-600 border gap-2 w-24 p-2 inline-flex items-center justify-center rounded-md cursor-pointer"
            onClick={handleNextPage}
          >
            Next <IoIosArrowRoundForward />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;