import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteProduct,
  ProductsGetData,
} from "@/app/actions/products/products-actions";
import { CATEGORY_PRODUCT, CATEGORY_UNIT } from "../product/constants";
import ActionButton from "@/components/buttons/ActionButton";
import { ViewTransition } from "react";

interface ProductsTableProps {
  data: ProductsGetData[];
}

export default function ProductsTable({ data }: ProductsTableProps) {
  return (
    <ViewTransition>
      <Table>
        <TableHeader className="hidden md:table-header-group">
          <TableRow>
            <TableHead />
            <TableHead>продукт</TableHead>
            <TableHead />
            <TableHead>коэффициент</TableHead>
            <TableHead>категория</TableHead>
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {CATEGORY_UNIT.find((u) => u.value === product.unit)?.label}
              </TableCell>
              <TableCell>{product.coefficient}</TableCell>
              <TableCell className="hidden md:table-cell">
                {
                  CATEGORY_PRODUCT.find((c) => c.value === product.category)
                    ?.label
                }
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {product.key || "-"}
              </TableCell>
              <TableCell>
                <ActionButton
                  id={+product?.id!}
                  mainTag="product"
                  handleDelete={deleteProduct}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ViewTransition>
  );
}
