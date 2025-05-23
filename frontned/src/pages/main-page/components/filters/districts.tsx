import { useDistrictsList } from "@shared/api/hooks/available-drug/filters/use-districts-list";
import { Combobox } from "@shared/ui/enhanced/combobox";
import { utils } from "@shared/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const Districts = () => {
  const navigate = useNavigate({ from: "/" });
  const search = useSearch({ from: "/" });

  const districts = useDistrictsList({
    select: (response) =>
      utils.api.getFlatPaginationResponse(response).map((item, index) => ({
        id: index.toString(),
        label: item.name,
        value: item.name,
      })),
  });

  const [value, setValue] = useState<string>();

  useEffect(() => {
    setValue(search.district);
  }, [search.district]);

  return (
    <Combobox
      placeholder="Выберите район"
      items={districts.data ?? []}
      initialValue={search.district}
      value={value}
      setValue={setValue}
      onSelect={(value) =>
        navigate({
          search: (prev) => ({ ...prev, district: value }),
        })
      }
    />
  );
};

export default Districts;
