import { FormProvider } from "@shared/ui/form";
import type { FC } from "react";
import ProductCategoryField from "./components/FormFields/ProductCategoryField";
import ProductDescriptionField from "./components/FormFields/ProductDescriptionField";
import ProductDiscountField from "./components/FormFields/ProductDiscountField";
import ProductInStockField from "./components/FormFields/ProductInStockField";
import ProductNameField from "./components/FormFields/ProductNameField";
import ProductPhotoField from "./components/FormFields/ProductPhotoField";
import ProductPriceField from "./components/FormFields/ProductPriceField";
import ProductSkuField from "./components/FormFields/ProductSkuField";
import type { ProductFormTypes } from "./ProductForm.types";

type Props = {
  Footer: React.ReactNode;

  form: ProductFormTypes.Form & {
    onSubmit: (formData: ProductFormTypes.FormFieldValues) => void;
  };
};

const ProductForm: FC<Props> = ({ form, Footer }) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(form.onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-4">
            <ProductNameField />

            <div className="flex gap-x-4 w-full *:w-1/2">
              <ProductPriceField />
              <ProductDiscountField />
            </div>
            <div className="flex gap-x-4 w-full *:w-1/2">
              <ProductCategoryField />
              <ProductSkuField />
            </div>

            <ProductInStockField />
          </div>

          <ProductPhotoField />
        </div>

        <ProductDescriptionField />
        {Footer}
      </form>
    </FormProvider>
  );
};

export default ProductForm;
