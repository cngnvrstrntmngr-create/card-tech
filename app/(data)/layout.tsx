import NavMenuHeader from "@/components/nav-menu/NavMenuHeader";

const navItems = [
  { title: "материалы", href: "products" },
  { title: "тех-карты", href: "cards" },
];

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full items-center">
      <NavMenuHeader
        navItems={navItems}
        defaultPatch="products"
        resetButton={true}
      />
      {children}
    </div>
  );
}
