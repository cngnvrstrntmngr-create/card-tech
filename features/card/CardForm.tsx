"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon, PlusIcon } from "lucide-react";

import TextInput from "@/components/input/TextInput";
import NumericInput from "@/components/input/NumericInput";
import SelectInput from "@/components/input/SelectInput";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { FormWrapper } from "@/components/wrapper/FormWrapper";

import {
  calculationCardDefaultValues,
  CalculationCardFormValues,
  calculationCardSchema,
  CalculationCardType,
} from "./schema";
import { ProductType } from "../product/schema";
import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { CATEGORY } from "@/components/nav-menu/SelectByCategory";
import { createCard, updateCard } from "@/app/actions/cards/cards-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SelectFieldWithSearch from "@/components/input/SelectWithSearch";
import PrintButton from "@/components/buttons/PrintButton";
import { cn } from "@/lib/utils";

export default function CardForm({
  dataProduct,
  dataCard,
  disabled = false,
}: {
  dataProduct: ProductType[];
  dataCard?: CalculationCardType;
  disabled?: boolean;
}) {
  const router = useRouter();
  const id = dataCard && dataCard?.id?.toString();
  const STORAGE_KEY = "add-card";

  const componentRef = useRef<HTMLDivElement>(null);

  const [dataOptions, setDataOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const form = useForm<CalculationCardFormValues>({
    resolver: zodResolver(calculationCardSchema),
    defaultValues: calculationCardDefaultValues,
    mode: "onBlur",
  });

  const { isLoaded, resetForm } = useLocalStorageForm(form, STORAGE_KEY);

  const portion =
    useWatch({
      control: form.control,
      name: "portion",
    }) || 1;

  const recipe =
    useWatch({
      control: form.control,
      name: "recipe",
    }) || [];

  const RecipeArray = useFieldArray({
    control: form.control,
    name: "recipe",
  });

  const computedValues = useMemo(() => {
    let totalNeto = 0;
    let totalBruto = 0;
    let totalBruto_2 = 0;
    let totalNeto_2 = 0;

    const values = recipe.map((r) => {
      const product = dataProduct.find((p) => p.id?.toString() === r.nameId);

      const weight = Number(r.quantity || 0);
      const coefficient = Number(product?.coefficient || 1);

      const neto = weight * coefficient;
      const bruto2 = weight * +portion;
      const neto2 = weight * +portion * coefficient;

      totalBruto += weight;
      totalNeto += neto;
      totalBruto_2 += bruto2;
      totalNeto_2 += neto2;

      return { neto, bruto2, neto2, product };
    });

    return {
      values,
      totals: { totalNeto, totalBruto, totalNeto_2, totalBruto_2 },
    };
  }, [recipe, portion, dataProduct]);

  const onSubmit: SubmitHandler<CalculationCardType> = async (data) => {
    try {
      if (id) {
        await updateCard(+id, data);
        toast.success("Продукт успешно обновлен");
      } else {
        await createCard(data);
        toast.success("Продукт успешно создан");
      }

      resetForm(calculationCardDefaultValues);
      router.push("/cards");
    } catch (error) {
      if (error instanceof Error && error.message === "CARD_ID_EXISTS") {
        toast.error("Карта с таким номером уже существует");

        form.setError("cardId", {
          type: "manual",
          message: "Этот номер карты уже используется",
        });

        return;
      }

      toast.error("Ошибка сохранения продукта");
    }
  };

  useEffect(() => {
    if (!dataProduct) return;

    setDataOptions(
      dataProduct.map((item) => ({
        label: item.name,
        value: item.id?.toString() || "",
      }))
    );
  }, [dataProduct]);

  useEffect(() => {
    if (dataCard) {
      form.reset(dataCard);
      RecipeArray.replace(dataCard.recipe);
    }
  }, [dataCard]);
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        ...loading
      </div>
    );
  }

  const reset = () => {
    resetForm(calculationCardDefaultValues);
  };

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      resetForm={reset}
      disabled={disabled}
    >
      <div ref={componentRef}>
        <PrintButton componentRef={componentRef} className="" />

        <div className="mb-3">
          <NumericInput
            fieldLabel="Технологическая карта:"
            fieldName="cardId"
            className="border-0 border-b  font-bold  rounded-none shadow-none h-9 w-full"
            disabled={disabled}
          />
        </div>

        <SelectInput
          fieldLabel="Категория продукта:"
          fieldName="category"
          orientation="horizontal"
          options={CATEGORY}
          classNameSelect="border-0 shadow-none border-b rounded-none text-black! h-9!"
          disabled={disabled}
        />

        <TextInput
          fieldLabel="Наименование продукта:"
          fieldName="name"
          orientation="horizontal"
          classNameInput="h-9! border-0 shadow-none border-b rounded-none"
          disabled={disabled}
        />

        <TextInput
          fieldLabel="Срок хранения:"
          fieldName="expirationPeriod"
          orientation="horizontal"
          classNameInput="h-9! border-0 shadow-none border-b rounded-none"
          disabled={disabled}
        />

        <TextInput
          fieldLabel="Вес:"
          fieldName="weight"
          orientation="horizontal"
          classNameInput="h-9! border-0 shadow-none border-b rounded-none"
          disabled={disabled}
        />

        <Table className="my-4">
          <TableHeader>
            <TableRow>
              <TableHead colSpan={3}></TableHead>
              <TableHead colSpan={2} className="text-center">
                1 порция
              </TableHead>
              <TableHead colSpan={2} className="text-center">
                <div className="flex justify-center items-center gap-3">
                  <NumericInput
                    fieldName="portion"
                    className="w-full h-full border-0 shadow-none border-b rounded-none"
                    disabled={disabled}
                  />
                  порции
                </div>
              </TableHead>
              <TableHead></TableHead>
            </TableRow>

            <TableRow>
              <TableHead className="w-10 border-r"></TableHead>
              <TableHead>продукт</TableHead>
              <TableHead className="border-x w-16">ед</TableHead>
              <TableHead className="border-x w-30 text-center">
                брутто
              </TableHead>
              <TableHead className="border-x w-30 text-center">нетто</TableHead>
              <TableHead className="border-x w-30 text-center">
                брутто
              </TableHead>
              <TableHead className="border-x w-30 text-center">нетто</TableHead>
              <TableHead className="w-18" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {RecipeArray.fields.map((field, idx) => {
              const { neto, bruto2, neto2, product } =
                computedValues.values[idx] || {};

              const isLast = idx === RecipeArray.fields.length - 1;
              const isOnlyOne = RecipeArray.fields.length === 1;

              return (
                <TableRow key={field.id}>
                  <TableCell className="border-r">{idx + 1}</TableCell>

                  <TableCell className="py-0">
                    <SelectFieldWithSearch
                      options={dataOptions}
                      fieldName={`recipe.${idx}.nameId`}
                      onValueChange={(value) => {
                        const product = dataProduct.find(
                          (item) => item.id?.toString() === value
                        );

                        form.setValue(
                          `recipe.${idx}.name`,
                          product?.name ?? ""
                        );
                        form.setValue(
                          `recipe.${idx}.unit`,
                          product?.unit ?? ""
                        );
                      }}
                      className="border-0"
                      disabled={disabled}
                    />
                  </TableCell>

                  <TableCell className="border-x p-0">
                    <input
                      {...form.register(`recipe.${idx}.unit`)}
                      className="text-center w-full"
                      disabled={disabled}
                    />
                  </TableCell>

                  <TableCell className="border-x p-0">
                    <NumericInput
                      fieldName={`recipe.${idx}.quantity`}
                      className="border-0 shadow-none rounded-none w-full h-8"
                      disabled={disabled}
                    />
                  </TableCell>

                  <TableCell className="border-x text-center">
                    {product && neto?.toFixed(4)}
                  </TableCell>

                  <TableCell className="border-x text-center">
                    {product && bruto2?.toFixed(4)}
                  </TableCell>

                  <TableCell className="border-x text-center">
                    {product && neto2?.toFixed(4)}
                  </TableCell>

                  <TableCell
                    className={cn(
                      "text-end print:hidden",
                      disabled && "hidden"
                    )}
                  >
                    <div className="flex justify-between gap-2">
                      <Trash2Icon
                        className="cursor-pointer w-4 h-4 text-red-700"
                        onClick={() =>
                          isOnlyOne
                            ? RecipeArray.replace({
                                nameId: "",
                                name: "",
                                unit: "",
                                quantity: "",
                                coefficient: "1",
                              })
                            : RecipeArray.remove(idx)
                        }
                      />

                      {isLast && (
                        <PlusIcon
                          className="cursor-pointer w-4 h-4 text-green-700"
                          onClick={() =>
                            RecipeArray.append({
                              nameId: "",
                              name: "",
                              unit: "",
                              quantity: "",
                              coefficient: "1",
                            })
                          }
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow className="font-semibold">
              <TableCell colSpan={3}>Итого, кг</TableCell>
              <TableCell className="text-center">
                {computedValues.totals.totalBruto.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                {computedValues.totals.totalNeto.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                {computedValues.totals.totalBruto_2.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                {computedValues.totals.totalNeto_2.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Label className="my-3">Технология приготовления:</Label>
        <Textarea
          className="my-4 resize-none"
          {...form.register("description")}
        />
      </div>
    </FormWrapper>
  );
}
