import Search from "@widgets/search";
import type { FC } from "react";
import { useState } from "react";
import AvailableDrugsList from "./components/available-drugs-list";
import QueryStatusWrapper from "@shared/ui/enhanced/query-status-wrapper";
import { useTradeNameSuggestionsList } from "@shared/api/hooks/trade-name/use-suggestions-list";
import { Filters } from "./components/filters";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@shared/ui/button";

const MainPage: FC = () => {
  const navigate = useNavigate({ from: "/" });
  const [search, setSearch] = useState("");
  const [selectedTradeNameId, setSelectedTradeNameId] = useState<number | null>(
    null,
  );

  const suggestions = useTradeNameSuggestionsList({
    enabled: search.length > 0,
    variables: {
      tradeName: search,
    },
  });

  return (
    <div className="flex flex-row gap-4 w-full">
      <Filters.Root>
        <Filters.Districts />
        <Filters.Metros />
        <Filters.PharmacyChains />
        {selectedTradeNameId && (
          <Filters.Dosages selectedTradeNameId={selectedTradeNameId} />
        )}
        <Button
          onClick={() => {
            navigate({
              search: () => ({}),
            });
          }}
        >
          Очистить фильтры
        </Button>
      </Filters.Root>
      <Link to="/about">about</Link>
      <section className="w-8/12 min-w-2xs space-y-4">
        <Search
          status={suggestions.status}
          items={suggestions.data?.items ?? []}
          onSelect={setSelectedTradeNameId}
          search={{
            value: search,
            onChange: setSearch,
          }}
        />
        {selectedTradeNameId && (
          <QueryStatusWrapper>
            <AvailableDrugsList selectedTradeNameId={selectedTradeNameId} />
          </QueryStatusWrapper>
        )}
      </section>
    </div>
  );
};

export default MainPage;
