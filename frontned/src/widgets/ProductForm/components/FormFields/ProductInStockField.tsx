import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { Switch } from "@shared/ui/switch";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import type { ProductFormTypes } from "../../ProductForm.types";

const ProductInStockField: FC = () => {
  const form = useFormContext<ProductFormTypes.FormFieldValues>();

  return (
    <FormField
      control={form.control}
      name="inStock"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">В наличии</FormLabel>
            <FormDescription>Товар доступен для покупки</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default ProductInStockField;
