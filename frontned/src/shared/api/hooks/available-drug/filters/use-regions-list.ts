import { httpClient } from "@shared/api/http-client";
import { endpoints } from "@shared/api/endpoints";
import { createInfiniteQuery } from "@shared/api/overrides";
import type { ApiTypes } from "@shared/api/types";

export namespace UseRegionsListTypes {
  export type Item = {
    name: string;
  };

  export type Response = ApiTypes.Pagination.Response<Item>;
  export type Variables = void;
}

export const useRegionsList = createInfiniteQuery<
  UseRegionsListTypes.Response,
  UseRegionsListTypes.Variables
>({
  queryKey: ["available-drug/filters/regions"],
  fetcher: async (_, ctx) => {
    const { data } = await httpClient.get<UseRegionsListTypes.Response>(
      endpoints.availableDrug.filters.regions,
      {
        signal: ctx.signal,
      },
    );

    return data;
  },
});
