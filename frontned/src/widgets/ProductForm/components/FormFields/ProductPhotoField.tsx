import { FormField } from "@shared/ui/form";
import { FormLabel } from "@shared/ui/form";
import { FormControl, FormMessage } from "@shared/ui/form";
import { FormItem } from "@shared/ui/form";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import type { ProductFormTypes } from "../../ProductForm.types";
import ImageUploader from "@shared/ui/enhanced/ImageUploader/ImageUploader";

const ProductPhotoField: FC = () => {
  const form = useFormContext<ProductFormTypes.FormFieldValues>();

  return (
    <FormField
      control={form.control}
      name="photo"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3 h-full">
          <FormLabel>Изображение товара</FormLabel>
          <FormControl>
            <ImageUploader onChange={field.onChange} value={field.value} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductPhotoField;
