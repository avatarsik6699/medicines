import type {
  CompatibleError,
  CreateSuspenseInfiniteQueryOptions as Options,
  SuspenseInfiniteQueryHook,
} from "react-query-kit";
import { createSuspenseInfiniteQuery as createSuspenseInfiniteQueryOriginal } from "react-query-kit";
import type { ApiTypes } from "../types";

export const createSuspenseInfiniteQuery = <
  PaginationResponse extends ApiTypes.Pagination.Response<unknown>,
  Args = void,
  E = CompatibleError,
  PP = number,
>(
  options: Omit<
    Options<PaginationResponse, Args, E, PP>,
    "initialPageParam" | "getNextPageParam"
  >,
): SuspenseInfiniteQueryHook<PaginationResponse, Args, E, PP> => {
  return createSuspenseInfiniteQueryOriginal<PaginationResponse, Args, E, PP>({
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
