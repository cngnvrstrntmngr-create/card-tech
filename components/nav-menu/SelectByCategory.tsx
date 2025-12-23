import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORY = [
  {
    name: "первое",
    value: "first",
  },
  {
    name: "второе",
    value: "second",
  },
  {
    name: "салат",
    value: "salad",
  },
  {
    name: "десерт",
    value: "dessert",
  },
  {
    name: "суп",
    value: "soup",
  },
  {
    name: "П/Ф",
    value: "pf",
  },
  {
    name: "персонал",
    value: "staff",
  },
  {
    name: "завтрак",
    value: "breakfast",
  },
  {
    name: "гарнир",
    value: "side",
  },
];

export default function SelectByMonthYear({
  category,
  setCategory,

  isLoading,
}: {
  category: string;
  setCategory: (value: string) => void;

  isLoading?: boolean;
}) {
  const classNameSelect = "w-28 h-8! rounded-md  [&>svg]:hidden justify-center";
  return (
    <div className="flex items-center ">
      <Select
        value={category}
        onValueChange={(value) => setCategory(value)}
        disabled={isLoading}
      >
        <SelectTrigger className={classNameSelect}>
          <SelectValue placeholder="category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORY.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
