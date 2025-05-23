import { useDrugDosagesList } from "@shared/api/hooks/available-drug/filters/use-drug-dosages-list";
import { Combobox } from "@shared/ui/enhanced/combobox";
import { utils } from "@shared/utils";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

type Props = {
  selectedTradeNameId: number;
};

const Dosages: FC<Props> = ({ selectedTradeNameId }) => {
  const navigate = useNavigate({ from: "/" });
  const search = useSearch({ from: "/" });
  const [value, setValue] = useState<string>();

  const dosages = useDrugDosagesList({
    variables: {
      tradeNameId: selectedTradeNameId,
    },
    select: (response) =>
      utils.api.getFlatPaginationResponse(response).map((item, index) => ({
        id: index.toString(),
        label: item.name,
        value: item.name,
      })),
  });

  useEffect(() => {
    setValue(search.dosage);
  }, [search.dosage]);

  return (
    <Combobox
      placeholder="Выберите дозировку"
      items={dosages.data ?? []}
      initialValue={search.dosage}
      value={value}
      setValue={setValue}
      onSelect={(value) => {
        navigate({
          search: (prev) => ({ ...prev, dosage: value }),
        });
      }}
    />
  );
};

export default Dosages;
