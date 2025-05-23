import { httpClient } from "@shared/api/http-client";
import { endpoints } from "@shared/api/endpoints";
import type { ApiTypes } from "@shared/api/types";
import { createSuspenseInfiniteQuery } from "@shared/api/overrides/createSuspenseInfiniteQuery";

export namespace UseAvailableDrugListTypes {
  export type Item = {
    id: number;
    price: number;
    quantity: number;
    pharmacyId: number;
    drugId: number;
  };

  export type Variables = Query & {
    tradeNameId: number;
  };

  export type Response = ApiTypes.Pagination.Response<Item>;

  type Query = Partial<ApiTypes.Pagination.Query> & {
    pharmacyChainId?: number;
    regionName?: string;
    metroName?: string;
    districtName?: string;
    dosage?: string;
  };
}

export const useAvailableDrugList = createSuspenseInfiniteQuery<
  UseAvailableDrugListTypes.Response,
  UseAvailableDrugListTypes.Variables
>({
  queryKey: ["available-drug/list"],
  fetcher: async (args, ctx) => {
    const { data } = await httpClient.get<UseAvailableDrugListTypes.Response>(
      endpoints.availableDrug.list(args.tradeNameId),
      {
        signal: ctx.signal,
        params: {
          page: ctx.pageParam,
          limit: args.limit,
          pharmacyChainId: args.pharmacyChainId,
          regionName: args.regionName,
          metroName: args.metroName,
          districtName: args.districtName,
          dosage: args.dosage,
        },
      },
    );

    return data;
  },
});
