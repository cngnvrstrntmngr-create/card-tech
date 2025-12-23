"use client";
import { createProduct } from "@/app/actions/products/products-actions";
import TextInput from "@/components/input/TextInput";
import { FormWrapper } from "@/components/wrapper/FormWrapper";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ProductForm() {
  const form = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    createProduct(data);
  };
  return (
    <FormWrapper form={form} className="gap-8">
      <TextInput fieldLabel="продукт" fieldName="name" />
      <TextInput fieldLabel="коэффициент" fieldName="coefficient" />
      <TextInput fieldLabel="единица" fieldName="unit" />
      <TextInput fieldLabel="номер id" fieldName="productId" type="number" />
    </FormWrapper>
  );
}
