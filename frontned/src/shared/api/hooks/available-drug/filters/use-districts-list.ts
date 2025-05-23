import { httpClient } from "@shared/api/http-client";
import { endpoints } from "@shared/api/endpoints";
import { createInfiniteQuery } from "@shared/api/overrides";
import type { ApiTypes } from "@shared/api/types";

export namespace UseDistrictsListTypes {
  export type Item = {
    name: string;
  };

  export type Response = ApiTypes.Pagination.Response<Item>;
  export type Variables = void;
}

export const useDistrictsList = createInfiniteQuery<
  UseDistrictsListTypes.Response,
  UseDistrictsListTypes.Variables
>({
  queryKey: ["available-drug/filters/districts"],
  fetcher: async (_, ctx) => {
    const { data } = await httpClient.get<UseDistrictsListTypes.Response>(
      endpoints.availableDrug.filters.districts,
      {
        signal: ctx.signal,
      },
    );

    return data;
  },
});
