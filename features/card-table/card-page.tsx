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

export default function ProductsTable({
  data,
}: {
  data: CalculationCardType[];
}) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const router = useRouter();

  const [itemSearch, setItemSearch] = useState<string>("");

  const componentRef = useRef<HTMLDivElement>(null);

  const normalizedSearch = itemSearch.trim().toLowerCase();

  const handleView = (id: string) => {
    router.push(`/card-view/${id}`);
  };
  return (
    <ViewTransition>
      <div ref={componentRef} className="w-full">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-6">
                <PrintButton componentRef={componentRef} className="" />
              </TableHead>
              <TableHead className="md:w-52 w-30">
                <input
                  type="text"
                  placeholder="...search"
                  onChange={(e) => setItemSearch(e.target.value)}
                  className="p-1 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 print:hidden"
                ></input>
              </TableHead>
              <TableHead className="w-42 hidden md:table-cell" />
              <TableHead className="md:w-20 w-16" />
              <TableHead className="w-10 text-muted-foreground">id</TableHead>
              <TableHead className="w-12" />
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
                    {item.name} <span className="pl-2">...</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.category}
                  </TableCell>
                  <TableCell>{item.weight}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="print:hidden">
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
      </div>
    </ViewTransition>
  );
}
