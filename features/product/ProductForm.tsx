"use client";
import { createProduct } from "@/app/actions/products/products-actions";
import SelectInput from "@/components/input/SelectInput";
import TextInput from "@/components/input/TextInput";
import { FormWrapper } from "@/components/wrapper/FormWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { CATEGORY_PRODUCT, CATEGORY_UNIT } from "./constants";

export default function ProductForm() {
  const form = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    createProduct(data);
    form.reset();
  };
  return (
    <FormWrapper form={form} onSubmit={onSubmit} className="gap-8">
      <TextInput fieldLabel="продукт" fieldName="name" />
      <TextInput fieldLabel="коэффициент" fieldName="coefficient" />
      <SelectInput
        fieldLabel="единица"
        fieldName="unit"
        options={CATEGORY_UNIT}
      />
      <SelectInput
        fieldLabel="категория"
        fieldName="category"
        options={CATEGORY_PRODUCT}
      />
      <TextInput fieldLabel="номер id" fieldName="key" />
    </FormWrapper>
  );
}
