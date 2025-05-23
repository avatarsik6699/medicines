import { httpClient } from "@shared/api/http-client";
import { endpoints } from "@shared/api/endpoints";
import { createInfiniteQuery } from "@shared/api/overrides";
import type { ApiTypes } from "@shared/api/types";

export namespace UseDrugDosagesListTypes {
  export type Item = {
    name: string;
  };

  export type Response = ApiTypes.Pagination.Response<Item>;
  export type Variables = {
    tradeNameId: number;
  };
}

export const useDrugDosagesList = createInfiniteQuery<
  UseDrugDosagesListTypes.Response,
  UseDrugDosagesListTypes.Variables
>({
  queryKey: ["available-drug/filters/dosages"],
  fetcher: async (args, ctx) => {
    const { data } = await httpClient.get<UseDrugDosagesListTypes.Response>(
      endpoints.availableDrug.filters.dosages(args.tradeNameId),
      {
        signal: ctx.signal,
      },
    );

    return data;
  },
});
