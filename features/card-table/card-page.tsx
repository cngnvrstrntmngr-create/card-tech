"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionButton from "../../components/buttons/action-button";
import { deleteCard } from "@/app/actions/cards/cards-action";
import { useRef, useState, ViewTransition } from "react";
import { CalculationCardType } from "../card/schema";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PrintButton from "@/components/buttons/print-button";
import { useHashParam } from "@/hooks/use-hash";
import { ca } from "zod/v4/locales";
import { CATEGORY } from "../card/constants";

export default function ProductsTable({
  data,
}: {
  data: CalculationCardType[];
}) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const [valueFilterCards] = useHashParam("filter-cards");

  const router = useRouter();

  const [itemSearch, setItemSearch] = useState<string>("");
  const [idSearch, setIdSearch] = useState<string>("");

  const componentRef = useRef<HTMLDivElement>(null);

  const normalizedSearch = itemSearch.trim().toLowerCase();

  const handleView = (id: string) => {
    router.push(`/card/${id}`);
  };
  return (
    <ViewTransition>
      <div ref={componentRef} className="overflow-auto h-[95vh]">
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
                (item) =>
                  valueFilterCards === "all" ||
                  item.category === valueFilterCards,
              )
              .filter((item) =>
                item.name.toLowerCase().includes(normalizedSearch),
              )
              .filter((item) => item.id.includes(idSearch))
              .sort((a, b) =>
                a.name.localeCompare(b.name, "ru", { sensitivity: "base" }),
              )
              .map((card, index) => (
                <TableRow key={card.id} className="[&>td]:py-1.5">
                  <TableCell className="w-6 text-xs px-2">
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className="truncate cursor-pointer text-blue-600 w-44 md:w-80 text-xs px-4"
                    onClick={() => handleView(card.id)}
                  >
                    {card.name}
                  </TableCell>
                  <TableCell className="text-xs">{card.weight}</TableCell>
                  <TableCell className="text-xs w-30 text-blue-600 font-bold">
                    {card.id}
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                    {CATEGORY.find((c) => c.value === card.category)?.label}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </ViewTransition>
  );
}
