import { usePharmacyChainsList } from "@shared/api/hooks/available-drug/filters/use-pharmacy-chains-list";
import { Combobox } from "@shared/ui/enhanced/combobox";
import { utils } from "@shared/utils";
import type { FC } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
const PharmacyChains: FC = () => {
  const navigate = useNavigate({ from: "/" });
  const search = useSearch({ from: "/" });

  const pharmacyChains = usePharmacyChainsList({
    select: (response) =>
      utils.api.getFlatPaginationResponse(response).map((item) => ({
        id: item.id.toString(),
        value: item.id.toString(),
        label: item.name,
      })),
  });

  const [value, setValue] = useState<string>();

  useEffect(() => {
    setValue(search.pharmacyChain);
  }, [search.pharmacyChain]);

  return (
    <Combobox
      placeholder="Выберите аптечную сеть"
      items={pharmacyChains.data ?? []}
      initialValue={search.pharmacyChain}
      value={value}
      setValue={setValue}
      onSelect={(value) => {
        navigate({
          search: (prev) => ({ ...prev, pharmacyChain: value }),
        });
      }}
    />
  );
};

export default PharmacyChains;
