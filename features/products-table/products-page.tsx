"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProduct } from "@/app/actions/products/products-actions";
import { CATEGORY_PRODUCT, CATEGORY_UNIT } from "../product/constants";
import ActionButton from "@/components/buttons/action-button";
import { useState, ViewTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductType } from "../product/schema";
import { useHashParam } from "@/hooks/use-hash";

interface ProductsTableProps {
  data: ProductType[];
}

export default function ProductsTable({ data }: ProductsTableProps) {
  const router = useRouter();

  const [valueFilterProducts] = useHashParam("filter-products");

  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const [itemSearch, setItemSearch] = useState<string>("");
  const [idSearch, setIdSearch] = useState<string>("");
  const normalizedSearch = itemSearch.trim().toLowerCase();

  const handleView = (id: string) => {
    router.push(`/product/${id}#tab=products`);
  };

  return (
    <div className="overflow-auto h-[95vh]">
      <div className="sticky top-0 grid-cols-2  grid bg-background z-10 h-10">
        <input
          type="text"
          placeholder="...search"
          onChange={(e) => setItemSearch(e.target.value)}
          className="p-2 pl-6 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 text-xs"
        />

        <input
          type="text"
          placeholder="...id"
          onChange={(e) => setIdSearch(e.target.value)}
          className="p-2 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 text-xs"
        />
      </div>
      <Table className="table-fixed">
        <TableBody>
          {data
            .filter(
              (product) =>
                valueFilterProducts === "all" ||
                product.category === valueFilterProducts,
            )
            .filter((product) =>
              product.name.toLowerCase().includes(normalizedSearch),
            )
            .filter((product) => product.id?.toString().includes(idSearch))
            .sort((a, b) =>
              a.name.localeCompare(b.name, "ru", { sensitivity: "base" }),
            )
            .map((product, index) => (
              <TableRow key={product.id} className="[&>td]:py-1.5">
                <TableCell className="w-6 text-xs px-2">{index + 1}</TableCell>
                <TableCell
                  className="truncate cursor-pointer text-blue-600 w-44 text-xs px-4"
                  onClick={() => handleView(product.id?.toString()!)}
                >
                  {product.name}
                </TableCell>
                <TableCell className="text-xs hidden md:table-cell">
                  {CATEGORY_UNIT.find((u) => u.value === product.unit)?.label}
                </TableCell>
                <TableCell className="text-xs w-30 text-blue-600 font-bold">
                  {product.id || "-"}
                </TableCell>
                <TableCell className="text-xs font-bold">
                  {product.coefficient}
                </TableCell>
                <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                  {
                    CATEGORY_PRODUCT.find((c) => c.value === product.category)
                      ?.label
                  }
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
