import NavMenuHeader from "@/components/nav-menu/NavMenuHeader";
import NotPermission from "@/components/page/NotPermission";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const navItems = [
  { title: "материалы", href: "products" },
  { title: "тех-карты", href: "cards" },
];

const ACCESS_ROLE = ["ADMIN", "CUCINA", "MNGR", "BAR"];

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <NotPermission email="" role="" />;
  }

  if (session.user && !ACCESS_ROLE.includes(session.user.role || "")) {
    return (
      <NotPermission
        email={session?.user.email || ""}
        role={session?.user.role || ""}
      />
    );
  }
  return (
    <div className="flex items-center flex-col h-full">
      <NavMenuHeader navItems={navItems} defaultPatch="cards" />
      {children}
    </div>
  );
}
