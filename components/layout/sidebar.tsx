import Link from "next/link";
import {
  LayoutDashboard,
  Ticket,
  ScanLine,
  Users,
  UserCircle,
} from "lucide-react";

import { getCurrentUser } from "@/lib/auth-helpers";
import { LogoutButton } from "@/components/layout/logout-button";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    adminOnly: false,
  },
  {
    label: "Tickets",
    href: "/tickets",
    icon: Ticket,
    adminOnly: false,
  },
  {
    label: "Scanner",
    href: "/scanner",
    icon: ScanLine,
    adminOnly: false,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
    adminOnly: true,
  },
];

export async function Sidebar() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const visibleNavigation = navigation.filter(
    (item) => !item.adminOnly || user.role === "ADMIN",
  );

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-zinc-800 bg-zinc-950 md:block">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center border-b border-zinc-800 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
              <Ticket className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="font-semibold text-white">Event Tickets</p>

              <p className="text-xs text-zinc-500">Management System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {visibleNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-zinc-800 px-4 pt-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-zinc-900/70 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800">
              <UserCircle className="h-5 w-5 text-zinc-400" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {user.name}
              </p>

              <p className="truncate text-xs text-zinc-500">
                {user.role === "ADMIN"
                  ? "Administrator"
                  : (user.categoryName ?? "Category Staff")}
              </p>
            </div>
          </div>

          <LogoutButton />

          <p className="py-4 text-xs text-zinc-600">Event Ticket System</p>
        </div>
      </div>
    </aside>
  );
}
