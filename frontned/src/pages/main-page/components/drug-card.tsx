import type { FC } from "react";
import type { UseAvailableDrugListTypes } from "@shared/api/hooks/available-drug/use-available-drug-list";

type Props = UseAvailableDrugListTypes.Item;

const DrugCard: FC<Props> = (props) => {
  return (
    <div
      className="bg-white rounded shadow p-4 mb-4"
      tabIndex={0}
      aria-label={`Карточка: ${props.drugId}`}
    >
      <h3 className="font-bold text-lg mb-2">drugId: {props.drugId}</h3>
      <p className="text-gray-700">price: {props.price}</p>
      <p className="text-gray-700">quantity: {props.quantity}</p>
      <p className="text-gray-700">pharmacyId: {props.pharmacyId}</p>
    </div>
  );
};

export default DrugCard;
