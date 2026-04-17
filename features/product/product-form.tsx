"use client";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/app/actions/products/products-actions";
import SelectInput from "@/components/input/select-input";
import TextInput from "@/components/input/text-input";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { CATEGORY_PRODUCT, CATEGORY_UNIT } from "./constants";
import { toast } from "sonner";
import { productDefaultValues, productSchema, ProductType } from "./schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SaveIcon, SaveOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ActionButton from "@/components/buttons/action-button";

export default function ProductForm({
  data,
  disabled = false,
  isCreate = false,
}: {
  data?: ProductType;
  disabled?: boolean;
  isCreate?: boolean;
}) {
  const router = useRouter();
  const session = useSession();
  const isAdmin = session.data?.user?.role === "ADMIN";
  const id = data?.id;

  const [isEdit, setIsEdit] = useState(isCreate);

  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: productDefaultValues,
    mode: "onChange",
  });
  const url = "/home#tab=products";
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

    router.push(url);
  };

  useEffect(() => {
    if (!data) return;
    form.reset(data);
  }, [data]);

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-8">
        {isAdmin && (
          <div className="flex w-full justify-between items-center">
            {id && <ActionButton id={id} handleDelete={deleteProduct} />}

            <button
              type="button"
              onClick={() => isAdmin && setIsEdit((prev) => !prev)}
              className="flex  cursor-pointer"
            >
              {isEdit ? (
                <div className="text-rd flex gap-4 justify-center items-center">
                  <SaveIcon className="h-4 w-4 text-blue-600" />
                  save mode
                </div>
              ) : (
                <div className="text-rd flex gap-4 justify-center items-center">
                  <SaveOff className="h-4 w-4 text-red-600" />
                  view mode
                </div>
              )}
            </button>
          </div>
        )}
        <TextInput
          fieldLabel="продукт"
          fieldName="name"
          disabled={disabled || !isEdit}
        />
        <TextInput
          fieldLabel="коэффициент"
          fieldName="coefficient"
          disabled={disabled || !isEdit}
        />
        <SelectInput
          fieldLabel="единица"
          fieldName="unit"
          options={CATEGORY_UNIT}
          disabled={disabled || !isEdit}
        />
        <SelectInput
          fieldLabel="категория"
          fieldName="category"
          options={CATEGORY_PRODUCT}
          disabled={disabled || !isEdit}
        />
        <TextInput
          fieldLabel="номер id"
          fieldName="id"
          disabled={disabled || !isEdit}
        />
        <Button
          type="button"
          variant="ghost"
          className={cn(
            "w-24 cursor-pointer text-red-600",
            disabled && "hidden",
          )}
          onClick={() => form.reset(productDefaultValues)}
          disabled={disabled || !isEdit}
        >
          очистить
        </Button>
      </div>
    </FormWrapper>
  );
}
