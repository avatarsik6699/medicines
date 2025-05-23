import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import type { ProductFormTypes } from "../../ProductForm.types";

const ProductSkuField: FC = () => {
  const form = useFormContext<ProductFormTypes.FormFieldValues>();

  return (
    <FormField
      control={form.control}
      name="sku"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Артикул</FormLabel>
          <FormControl>
            <Input placeholder="Введите артикул..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductSkuField;
