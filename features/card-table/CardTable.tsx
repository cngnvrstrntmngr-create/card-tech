import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import ActionButton from "../../components/buttons/ActionButton";
import { deleteCard } from "@/app/actions/cards/cards-action";
import { ViewTransition } from "react";
import { CalculationCardType } from "../card/schema";

export default function ProductsTable({
  data,
}: {
  data: CalculationCardType[];
}) {
  return (
    <ViewTransition>
      <Table>
        <TableHeader className="hidden ma:table-header-group">
          <TableRow>
            <TableHead />
            <TableHead>карты</TableHead>
            <TableHead>категория</TableHead>
            <TableHead>выход</TableHead>
            <TableHead>id</TableHead>
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((item: any, index: number) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="hidden md:table-cell">
                {item.category}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {item.weight}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {item.cardId}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {format(new Date(item.createdAt), "dd.MM.yyyy")}
              </TableCell>
              <TableCell>
                <ActionButton
                  id={item.id}
                  mainTag="card"
                  handleDelete={deleteCard}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ViewTransition>
  );
}
