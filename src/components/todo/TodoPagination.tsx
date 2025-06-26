import React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface TodoPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const TodoPagination: React.FC<TodoPaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className={`${
            currentPage === 1 ? 'pointer-events-none opacity-50' : ''
          } text-white`}
        />
      </PaginationItem>

      {[...Array(totalPages)].map((_, idx) => (
        <PaginationItem key={idx}>
          <Button
            variant={currentPage === idx + 1 ? 'default' : 'outline'}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 ${
              currentPage === idx + 1
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700'
            }`}
          >
            {idx + 1}
          </Button>
        </PaginationItem>
      ))}

      <PaginationItem>
        <PaginationNext
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          className={`${
            currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
          } text-white`}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

export default TodoPagination;