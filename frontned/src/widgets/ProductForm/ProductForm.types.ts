import type { UseFormReturn } from "react-hook-form";

export namespace ProductFormTypes {
  export type Form = UseFormReturn<FormFieldValues>;

  export type FormFieldValues = {
    name: string;
    description: string;
    price: number;
    discount: number;
    photo: File | undefined;
    sku: string;
    category: string;
    inStock: boolean;
  };
}
