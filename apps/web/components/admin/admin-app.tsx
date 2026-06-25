"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, LogOut, ExternalLink, Loader2 } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";
import { AdminAuthProvider, useAdminAuth } from "./auth";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Leads", href: "/admin/leads", icon: Users, exact: false },
];

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-ink-200 bg-white p-4 lg:flex">
      <div className="px-2 py-2">
        <Logo />
      </div>
      <nav className="mt-6 space-y-1">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary-50 text-primary-700"
                  : "text-ink-600 hover:bg-ink-100 hover:text-navy-900",
              )}
            >
              <item.icon className="size-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Link
        href="/"
        className="mt-auto flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-500 hover:bg-ink-100"
      >
        <ExternalLink className="size-4" /> View site
      </Link>
    </aside>
  );
}

function Topbar() {
  const { user, logout } = useAdminAuth();
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white/80 px-5 backdrop-blur">
      <div className="lg:hidden">
        <Logo />
      </div>
      <div className="hidden text-sm text-ink-500 lg:block">
        Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm font-bold text-white">
              {user.name.charAt(0)}
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-tight text-navy-900">{user.name}</p>
              <p className="text-xs text-ink-500">{user.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-danger-500/40 hover:text-danger-500"
        >
          <LogOut className="size-4" /> Logout
        </button>
      </div>
    </header>
  );
}

function FullLoader() {
  return (
    <div className="grid min-h-dvh place-items-center bg-ink-50">
      <Loader2 className="size-7 animate-spin text-primary-600" />
    </div>
  );
}

function Guarded({ children }: { children: React.ReactNode }) {
  const { status } = useAdminAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "guest") router.replace("/admin/login");
  }, [status, router]);

  if (status !== "authed") return <FullLoader />;

  return (
    <div className="flex min-h-dvh bg-ink-50">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-x-hidden p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}

function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The login route renders standalone (no sidebar/guard).
  if (pathname === "/admin/login") return <>{children}</>;
  return <Guarded>{children}</Guarded>;
}

export function AdminApp({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <Chrome>{children}</Chrome>
    </AdminAuthProvider>
  );
}
