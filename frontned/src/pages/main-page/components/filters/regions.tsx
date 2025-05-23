import { useRegionsList } from "@shared/api/hooks/available-drug/filters/use-regions-list";
import { Combobox } from "@shared/ui/enhanced/combobox";
import { utils } from "@shared/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { FC } from "react";
import { useEffect, useState } from "react";
const Regions: FC = () => {
  const navigate = useNavigate({ from: "/" });
  const search = useSearch({ from: "/" });

  const regions = useRegionsList({
    select: (response) =>
      utils.api.getFlatPaginationResponse(response).map((item, index) => ({
        id: index.toString(),
        label: item.name,
        value: item.name,
      })),
  });

  const [value, setValue] = useState<string>();

  useEffect(() => {
    setValue(search.region);
  }, [search.region]);

  return (
    <Combobox
      placeholder="Выберите регион"
      items={regions.data ?? []}
      initialValue={search.region}
      value={value}
      setValue={setValue}
      onSelect={(value) => {
        navigate({
          search: (prev) => ({ ...prev, region: value }),
        });
      }}
    />
  );
};

export default Regions;
