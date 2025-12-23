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
    <>
      <NavMenuHeader
        navItems={navItems}
        defaultPatch="products"
        resetButton={true}
      />
      {children}
    </>
  );
}
