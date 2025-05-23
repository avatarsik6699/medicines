export const endpoints = {
  pharmacy: {
    list: "/pharmacy",
    one: (id: number) => `/pharmacy/${id}`,
    remove: (id: number) => `/pharmacy/${id}`,
    create: "/pharmacy",
    update: (id: number) => `/pharmacy/${id}`,
  },
  tradeName: {
    list: "/trade-name",
    one: (id: number) => `/trade-name/${id}`,
    remove: (id: number) => `/trade-name/${id}`,
    create: "/trade-name",
    update: (id: number) => `/trade-name/${id}`,
    suggestions: (tradeName: string) => `/trade-name/suggestions/${tradeName}`,
  },
  availableDrug: {
    list: (tradeNameId: number) => `/available-drug/${tradeNameId}`,
    one: (id: number) => `/available-drug/${id}`,
    remove: (id: number) => `/available-drug/${id}`,
    create: "/available-drug",
    update: (id: number) => `/available-drug/${id}`,
    filters: {
      pharmacyChains: "/available-drug-filters/pharmacy-chains",
      regions: "/available-drug-filters/regions",
      metros: "/available-drug-filters/metros",
      districts: "/available-drug-filters/districts",
      dosages: (tradeNameId: number) =>
        `/available-drug-filters/dosages/${tradeNameId}`,
    },
  },
};
