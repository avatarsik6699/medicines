import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { useFormContext } from "react-hook-form";
import type { ProductFormTypes } from "../../ProductForm.types";

const ProductNameField = () => {
  const form = useFormContext<ProductFormTypes.FormFieldValues>();

  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Название товара</FormLabel>
          <FormControl>
            <Input placeholder="Принтер, коньки..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductNameField;
