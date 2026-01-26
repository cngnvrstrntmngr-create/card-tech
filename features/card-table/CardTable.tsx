"use client";
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
import { useState, ViewTransition } from "react";
import { CalculationCardType } from "../card/schema";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProductsTable({
  data,
}: {
  data: CalculationCardType[];
}) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const router = useRouter();

  const [itemSearch, setItemSearch] = useState<string>("");
  const normalizedSearch = itemSearch.trim().toLowerCase();

  const handleView = (id: string) => {
    router.push(`/card-view/${id}`);
  };
  return (
    <ViewTransition>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-10" />
            <TableHead className="w-70">
              <input
                type="text"
                placeholder="...search"
                onChange={(e) => setItemSearch(e.target.value)}
                className="p-1 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0"
              ></input>
            </TableHead>
            <TableHead className="hidden md:table-cell">категория</TableHead>
            <TableHead className="hidden md:table-cell">выход</TableHead>
            <TableHead className="hidden md:table-cell">id</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data
            .filter((item) =>
              item.name.toLowerCase().includes(normalizedSearch),
            )
            .sort((a, b) =>
              a.name.localeCompare(b.name, "ru", { sensitivity: "base" }),
            )
            .map((item: any, index: number) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell
                  className="truncate cursor-pointer hover:text-red-700"
                  onClick={() => handleView(item.id)}
                >
                  {item.name} <span className="pl-4">...</span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.category}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.weight}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.id}
                </TableCell>
                <TableCell>
                  {isAdmin && (
                    <ActionButton
                      id={item.id}
                      mainTag="card"
                      handleDelete={deleteCard}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </ViewTransition>
  );
}
