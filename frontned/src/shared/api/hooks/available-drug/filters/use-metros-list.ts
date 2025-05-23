import { httpClient } from "@shared/api/http-client";
import { endpoints } from "@shared/api/endpoints";
import { createInfiniteQuery } from "@shared/api/overrides";
import type { ApiTypes } from "@shared/api/types";

export namespace UseMetrosListTypes {
  export type Item = {
    name: string;
  };

  export type Response = ApiTypes.Pagination.Response<Item>;
  export type Variables = void;
}

export const useMetrosList = createInfiniteQuery<
  UseMetrosListTypes.Response,
  UseMetrosListTypes.Variables
>({
  queryKey: ["available-drug/filters/metros"],
  fetcher: async (_, ctx) => {
    const { data } = await httpClient.get<UseMetrosListTypes.Response>(
      endpoints.availableDrug.filters.metros,
      {
        signal: ctx.signal,
      },
    );

    return data;
  },
});
