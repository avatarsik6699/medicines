import { FormField, FormLabel } from "@shared/ui/form";
import { FormControl, FormItem, FormMessage } from "@shared/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import type { ProductFormTypes } from "../../ProductForm.types";

const ProductCategoryField: FC = () => {
  const form = useFormContext<ProductFormTypes.FormFieldValues>();

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Категория</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Электроника">Электроника</SelectItem>
              <SelectItem value="Одежда">Одежда</SelectItem>
              <SelectItem value="Продукты">Продукты</SelectItem>
              <SelectItem value="Книги">Книги</SelectItem>
              <SelectItem value="Мебель">Мебель</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductCategoryField;
