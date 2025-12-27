"use client";

import { useEffect, useMemo, useState } from "react";
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
} from "./schema";
import { ProductType } from "../product/schema";

export default function CardForm({
  dataProduct,
}: {
  dataProduct: ProductType[];
}) {
  const [dataOptions, setDataOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const form = useForm<CalculationCardFormValues>({
    resolver: zodResolver(calculationCardSchema),
    defaultValues: calculationCardDefaultValues,
    mode: "onBlur",
  });

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
      const product = dataProduct.find((p) => p.id?.toString() === r?.name);

      const weight = Number(r?.quantity || 0);
      const coefficient = Number(product?.coefficient || 1);

      const neto = weight * coefficient;
      const bruto2 = weight * portion;
      const neto2 = weight * portion * coefficient;

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

  const onSubmit: SubmitHandler<CalculationCardFormValues> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (!dataProduct) return;

    setDataOptions(
      dataProduct.map((item) => ({
        label: item.name,
        value: item.id?.toString() ?? "",
      }))
    );
  }, [dataProduct]);

  useEffect(() => {
    if (RecipeArray.fields.length === 0) {
      RecipeArray.append({
        name: "",
        unit: "",
        quantity: "",
      });
    }
  }, [RecipeArray.fields.length, RecipeArray]);

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div>
        {" "}
        <NumericInput
          fieldLabel="Технологическая карта:"
          fieldName="cardId"
        />{" "}
        <TextInput
          fieldLabel="Наименование продукта:"
          fieldName="name"
          orientation="vertical"
          clasNameInput="h-8! border-0 shadow-none border-b rounded-none"
        />{" "}
        <TextInput
          fieldLabel="Срок хранения:"
          fieldName="expirationPeriod"
          orientation="vertical"
          clasNameInput="h-8! border-0 shadow-none border-b rounded-none"
        />{" "}
      </div>

      <Table className="mb-4">
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
                />
                порции
              </div>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>

          <TableRow>
            <TableHead className="w-6 border-r"></TableHead>
            <TableHead>продукт</TableHead>
            <TableHead className="text-start w-12 border-x">ед</TableHead>
            <TableHead className="text-center border-x w-20">брутто</TableHead>
            <TableHead className="text-center border-x w-20">нетто</TableHead>
            <TableHead className="text-center border-x w-20">брутто</TableHead>
            <TableHead className="text-center border-x w-20">нетто</TableHead>
            <TableHead className="text-center w-18"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {RecipeArray.fields.map((field, idx) => {
            const { neto, bruto2, neto2, product } =
              computedValues.values[idx] || {};

            const isLast = idx === RecipeArray.fields.length - 1;

            return (
              <TableRow key={field.id}>
                <TableCell className="p-1 border-r">{idx + 1}</TableCell>

                <TableCell className="p-0">
                  <SelectInput
                    options={dataOptions}
                    fieldName={`recipe.${idx}.name`}
                    onValueChange={(value) => {
                      const product = dataProduct.find(
                        (item) => item.id?.toString() === value
                      );

                      form.setValue(`recipe.${idx}.unit`, product?.unit ?? "");
                    }}
                  />
                </TableCell>

                <TableCell className="border-x p-0">
                  <input
                    {...form.register(`recipe.${idx}.unit`)}
                    className="text-center w-full"
                  />
                </TableCell>

                <TableCell className="border-x p-0">
                  <NumericInput
                    fieldName={`recipe.${idx}.quantity`}
                    className="border-0 shadow-none rounded-none w-full h-full"
                  />
                </TableCell>

                <TableCell className="border-x text-center">
                  {product && neto?.toFixed(2)}
                </TableCell>

                <TableCell className="border-x text-center">
                  {product && bruto2?.toFixed(2)}
                </TableCell>

                <TableCell className="text-center border">
                  {product && neto2?.toFixed(2)}
                </TableCell>

                <TableCell className="text-end">
                  <div className="flex justify-between gap-2">
                    <Trash2Icon
                      className="cursor-pointer w-4 h-4 text-red-700"
                      onClick={() => RecipeArray.remove(idx)}
                    />

                    {isLast && (
                      <PlusIcon
                        className="cursor-pointer w-4 h-4 text-green-700"
                        onClick={() =>
                          RecipeArray.append({
                            name: "",
                            unit: "",
                            quantity: "",
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
      <TextInput
        fieldLabel="Старший повар:"
        fieldName="key"
        orientation="vertical"
        clasNameInput=" border-0 shadow-none border-b rounded-none my-3"
        disabled
      />
    </FormWrapper>
  );
}
