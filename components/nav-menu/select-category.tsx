import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const CATEGORY = [
  {
    label: "первое-фуршет",
    value: "first-furchet",
  },
  {
    label: "второе-фуршет",
    value: "second-furchet",
  },
  {
    label: "гарнир-фуршет",
    value: "side-furchet",
  },
  {
    label: "салат-фуршет",
    value: "salad-furchet",
  },
  {
    label: "десерт-фуршет",
    value: "dessert-furchet",
  },
  {
    label: "первое",
    value: "first",
  },
  {
    label: "второе",
    value: "second",
  },
  {
    label: "салат",
    value: "salad",
  },
  {
    label: "десерт",
    value: "dessert",
  },
  {
    label: "П/Ф",
    value: "pf",
  },
  {
    label: "персонал",
    value: "staff",
  },
  {
    label: "завтрак",
    value: "breakfast",
  },
  {
    label: "гарнир",
    value: "side",
  },
];

export default function SelectByMonthYear({
  options,
  category,
  setCategory,

  isLoading,
}: {
  options: { value: string; label: string }[];
  category: string;
  setCategory: (value: string) => void;

  isLoading?: boolean;
}) {
  const classNameSelect =
    "md:w-38 w-28 md:h-9! h-8! rounded-md  [&>svg]:hidden justify-center bg-black border-0 items-center";

  const resetParams = () => {
    setCategory("");
  };
  return (
    <Select
      value={category}
      onValueChange={(value) => setCategory(value)}
      disabled={isLoading}
    >
      <SelectTrigger className={cn(classNameSelect, "text-white! p-1")}>
        <SelectValue placeholder="категория" />
      </SelectTrigger>
      <SelectContent>
        {options.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            <span className="truncate block  font-bold w-36">
              {category.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
