import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@shared/ui/form";
import { useFormContext } from "react-hook-form";
import type { ProductFormTypes } from "../../ProductForm.types";
import { Textarea } from "@shared/ui/textarea";
import type { FC } from "react";

const ProductDescriptionField: FC = () => {
  const form = useFormContext<ProductFormTypes.FormFieldValues>();

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Описание</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Введите описание товара"
              className="min-h-[120px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductDescriptionField;
