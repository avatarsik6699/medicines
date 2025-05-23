import { useMetrosList } from "@shared/api/hooks/available-drug/filters/use-metros-list";
import { Combobox } from "@shared/ui/enhanced/combobox";
import { utils } from "@shared/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { FC } from "react";
import { useEffect, useState } from "react";

const Metros: FC = () => {
  const [value, setValue] = useState<string>();
  const navigate = useNavigate({ from: "/" });
  const search = useSearch({ from: "/" });

  const metros = useMetrosList({
    select: (response) =>
      utils.api.getFlatPaginationResponse(response).map((item, index) => ({
        id: index.toString(),
        label: item.name,
        value: item.name,
      })),
  });

  useEffect(() => {
    setValue(search.metro);
  }, [search.metro]);

  return (
    <Combobox
      placeholder="Выберите метро"
      items={metros.data ?? []}
      initialValue={search.metro}
      value={value}
      setValue={setValue}
      onSelect={(value) => {
        navigate({
          search: (prev) => ({ ...prev, metro: value }),
        });
      }}
    />
  );
};

export default Metros;
