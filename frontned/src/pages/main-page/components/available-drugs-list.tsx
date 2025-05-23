import type { FC } from "react";
import DrugCard from "./drug-card";
import { useInView } from "react-intersection-observer";
import { ScrollArea } from "@shared/ui/scroll-area";
import { useAvailableDrugList } from "@shared/api/hooks/available-drug/use-available-drug-list";
import { useSearch } from "@tanstack/react-router";

type Props = {
  selectedTradeNameId: number | null;
};

const AvailableDrugsList: FC<Props> = ({ selectedTradeNameId }) => {
  const search = useSearch({ from: "/" });
  const availableDrugs = useAvailableDrugList({
    variables: {
      tradeNameId: selectedTradeNameId!,
      districtName: search.district,
      regionName: search.region,
      metroName: search.metro,
      dosage: search.dosage,
      pharmacyChainId: search.pharmacyChain
        ? parseInt(search.pharmacyChain)
        : undefined,
    },
  });

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (
        inView &&
        availableDrugs.hasNextPage &&
        !availableDrugs.isFetchingNextPage
      ) {
        availableDrugs.fetchNextPage();
      }
    },
  });

  return (
    <ScrollArea className="h-[calc(100vh-15rem)]">
      <div className="flex flex-wrap gap-4">
        {availableDrugs.data.pages.flatMap((page) =>
          page.items.map((drug) => (
            <div key={drug.id} className="min-w-2xs w-full">
              <DrugCard {...drug} />
            </div>
          )),
        )}
        <div ref={ref} />
        {availableDrugs.isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <span
              className="inline-block animate-spin w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full"
              aria-label="Загрузка..."
            />
          </div>
        )}
        {!availableDrugs.hasNextPage && (
          <div className="text-center text-gray-400 py-4">
            Больше карточек нет
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default AvailableDrugsList;
