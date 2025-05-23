export namespace ApiTypes {
  export namespace Pagination {
    export type Response<Item> = {
      items: Item[];
      total: number;
      page: number;
      limit: number;
    };

    export type Query = {
      limit: number;
    };
  }
}
