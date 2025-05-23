import type {
  CompatibleError,
  CreateInfiniteQueryOptions as Options,
  InfiniteQueryHook,
} from "react-query-kit";
import { createInfiniteQuery as createInfiniteQueryOriginal } from "react-query-kit";
import type { ApiTypes } from "../types";

export const createInfiniteQuery = <
  PaginationResponse extends ApiTypes.Pagination.Response<unknown>,
  Args = void,
  E = CompatibleError,
  PP = number,
>(
  options: Omit<
    Options<PaginationResponse, Args, E, PP>,
    "initialPageParam" | "getNextPageParam"
  >,
): InfiniteQueryHook<PaginationResponse, Args, E, PP> => {
  return createInfiniteQueryOriginal<PaginationResponse, Args, E, PP>({
    ...options,
    initialPageParam: 1 as PP,
    getNextPageParam: (last) => {
      const totalPages = Math.ceil(last.total / last.limit);
      const hasNextPage = last.page < totalPages;
      if (!hasNextPage) {
        return null;
      }

      return (last.page + 1) as PP;
    },
  });
};
