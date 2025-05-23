import { endpoints } from "@shared/api/endpoints";
import { httpClient } from "@shared/api/http-client";
import type { ApiTypes } from "@shared/api/types";
import { createQuery } from "react-query-kit";

export namespace UseTradeNameSuggestionsList {
  export type Item = {
    id: number;
    name: string;
    description: string;
    originCountry: string;
    isOriginal: boolean;
  };

  export type Variables = Partial<ApiTypes.Pagination.Query> & {
    tradeName: string;
  };

  export type Response = Pick<
    ApiTypes.Pagination.Response<Item>,
    "items" | "total"
  >;
}

export const useTradeNameSuggestionsList = createQuery({
  queryKey: ["trade-name/suggestions"],
  fetcher: async (params: UseTradeNameSuggestionsList.Variables, ctx) => {
    const { data } = await httpClient.get<UseTradeNameSuggestionsList.Response>(
      endpoints.tradeName.suggestions(params.tradeName),
      {
        signal: ctx.signal,
        params: {
          limit: params.limit,
        },
      },
    );

    return data;
  },
});
