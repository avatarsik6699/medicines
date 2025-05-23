import { useMemo } from "react";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import { Pagination } from "../pagination";
import type { FC } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationWithEllipsis: FC<Props> = (props) => {
  const paginationRange = useMemo(() => {
    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, props.currentPage - delta);
      i <= Math.min(props.totalPages - 1, props.currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (props.currentPage - delta > 2) {
      range.unshift("...");
    }
    if (props.currentPage + delta < props.totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (props.totalPages !== 1) {
      range.push(props.totalPages);
    }

    return range;
  }, [props.currentPage, props.totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => props.onPageChange(props.currentPage - 1)}
            className={
              props.currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {paginationRange.map((pageNumber, idx) => (
          <PaginationItem key={idx}>
            {pageNumber === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => props.onPageChange(pageNumber as number)}
                isActive={props.currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => props.onPageChange(props.currentPage + 1)}
            className={
              props.currentPage === props.totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export type { Props as PaginationWithEllipsisProps };
export default PaginationWithEllipsis;
