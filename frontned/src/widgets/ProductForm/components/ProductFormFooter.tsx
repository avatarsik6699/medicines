import { Button } from "@shared/ui/button";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import type { ProductFormTypes } from "../ProductForm.types";

type Props = {
  isDisabled: boolean;
};

const ProductFormFooter: FC<Props> = (props) => {
  const { formState, reset } =
    useFormContext<ProductFormTypes.FormFieldValues>();

  return (
    <div className="flex justify-end gap-x-4">
      {formState.isDirty && (
        <Button
          type="reset"
          onClick={() => reset()}
          variant="secondary"
          disabled={props.isDisabled}
        >
          Сбросить
        </Button>
      )}

      <Button type="submit" disabled={props.isDisabled}>
        Сохранить
      </Button>
    </div>
  );
};

export default ProductFormFooter;
