import { httpClient } from "@shared/api/http-client";
import { endpoints } from "@shared/api/endpoints";
import { createInfiniteQuery } from "@shared/api/overrides";
import type { ApiTypes } from "@shared/api/types";

export namespace UsePharmacyChainsListTypes {
  export type Item = {
    id: number;
    name: string;
  };

  export type Response = ApiTypes.Pagination.Response<Item>;
  export type Variables = void;
}

export const usePharmacyChainsList = createInfiniteQuery<
  UsePharmacyChainsListTypes.Response,
  UsePharmacyChainsListTypes.Variables
>({
  queryKey: ["available-drug/filters/pharmacy-chains"],
  fetcher: async (_, ctx) => {
    const { data } = await httpClient.get<UsePharmacyChainsListTypes.Response>(
      endpoints.availableDrug.filters.pharmacyChains,
      {
        signal: ctx.signal,
      },
    );

    return data;
  },
});
