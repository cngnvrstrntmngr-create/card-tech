import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { PageNavType } from "./NavMenuHeader";

export default function SelectTabsByPatch({
  patch,
  setPatch,
  isPending,
  navItems,
  classNamePatch,
}: {
  patch: string;
  setPatch: (value: string) => void;
  isPending: boolean;
  navItems: PageNavType[];
  classNamePatch?: string;
}) {
  return (
    <Tabs value={patch} onValueChange={(value) => setPatch(value)}>
      <TabsList className="flex gap-2 h-9">
        {navItems.map((page) => (
          <TabsTrigger
            key={page.title}
            value={page.href}
            disabled={isPending}
            className={cn(
              "md:w-26 w-18 cursor-pointer",
              isPending && "opacity-50",
              classNamePatch
            )}
          >
            <span className="truncate block w-full">{page.title}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
