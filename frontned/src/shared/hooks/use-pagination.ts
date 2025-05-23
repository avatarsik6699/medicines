import { useCallback } from "react";
import { useRouter, useSearch } from "@tanstack/react-router";
import { DEFAULT_LIMIT } from "@shared/constants";

interface UsePaginationWithUrlProps {
  totalItems: number;
  defaultPageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
}

export function usePagination({
  totalItems,
  defaultPageSize = 10,
  onPageChange,
}: UsePaginationWithUrlProps) {
  const router = useRouter();
  const search = useSearch({
    from: "/",
    select: (state) => ({
      page: state.page,
      limit: state.limit,
    }),
  });

  // Update URL and trigger callback
  const updatePagination = useCallback(
    async (newPage: number, newLimit: number = search.limit) => {
      // Ensure page is within bounds
      const validPage = Math.max(
        1,
        Math.min(newPage, Math.ceil(totalItems / newLimit)),
      );

      // Prepare new search params
      const newSearch = { ...search };

      // Update or remove page parameter
      if (validPage === 1) {
        delete newSearch.page;
      } else {
        newSearch.page = validPage;
      }

      // Update or remove size parameter
      if (newLimit === DEFAULT_LIMIT) {
        delete newSearch.limit;
      } else {
        newSearch.limit = newLimit;
      }

      // Update URL
      await router.navigate({
        search: (prev) => newSearch,
      });

      // Call callback if provided
      onPageChange?.(validPage, newPageSize);
    },
    [router, search, totalItems, onPageChange],
  );

  return {
    pagination: {
      ...search,
      reset: useCallback(() => {
        updatePagination(1, defaultPageSize);
      }, [updatePagination, defaultPageSize]),
    },
  };
}
