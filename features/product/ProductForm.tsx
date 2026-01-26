"use client";
import {
  createProduct,
  updateProduct,
} from "@/app/actions/products/products-actions";
import SelectInput from "@/components/input/SelectInput";
import TextInput from "@/components/input/TextInput";
import { FormWrapper } from "@/components/wrapper/FormWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { CATEGORY_PRODUCT, CATEGORY_UNIT } from "./constants";
import { toast } from "sonner";
import { productDefaultValues, productSchema, ProductType } from "./schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm({
  data,
  disabled = false,
}: {
  data?: ProductType;
  disabled?: boolean;
}) {
  const router = useRouter();
  const id = data?.id;
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: productDefaultValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      if (!id) {
        await createProduct(data);
        toast.success("Продукт успешно создан");
      } else {
        const { id, ...formattedData } = data;
        await updateProduct(id, formattedData);
        toast.success("Продукт успешно обновлен");
      }

      form.reset(productDefaultValues);
      router.back();
    } catch (error) {
      if (error instanceof Error && error.message === "KEY_EXISTS") {
        toast.error("Продукт с таким key уже существует");

        form.setError("id", {
          type: "manual",
          message: "Такой key уже используется",
        });

        return;
      }

      toast.error("Ошибка сохранения продукта");
    }
  };

  useEffect(() => {
    if (!data) return;
    form.reset(data);
  }, [data]);
  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      className="gap-8"
      disabled={disabled}
    >
      <TextInput fieldLabel="продукт" fieldName="name" disabled={disabled} />
      <TextInput
        fieldLabel="коэффициент"
        fieldName="coefficient"
        disabled={disabled}
      />
      <SelectInput
        fieldLabel="единица"
        fieldName="unit"
        options={CATEGORY_UNIT}
        disabled={disabled}
      />
      <SelectInput
        fieldLabel="категория"
        fieldName="category"
        options={CATEGORY_PRODUCT}
        disabled={disabled}
      />
      <TextInput fieldLabel="номер id" fieldName="id" disabled={disabled} />
    </FormWrapper>
  );
}
