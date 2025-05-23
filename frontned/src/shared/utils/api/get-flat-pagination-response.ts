import type { ApiTypes } from "@shared/api/types";
import type { Types } from "@shared/types";
import type { InfiniteData } from "@tanstack/react-query";

export const getFlatPaginationResponse = <Item extends Types.GenericObject>(
  response: InfiniteData<ApiTypes.Pagination.Response<Item>>,
) => {
  return response.pages.flatMap((page) => page.items);
};
