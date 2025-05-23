import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@shared/ui/form";
import { useFormContext } from "react-hook-form";
import type { ProductFormTypes } from "../../ProductForm.types";
import { Input } from "@shared/ui/input";
import type { FC } from "react";

const ProductPriceField: FC = () => {
  const form = useFormContext<ProductFormTypes.FormFieldValues>();

  return (
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Цена (₽)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Введите цену..."
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductPriceField;
