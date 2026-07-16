import { authClient } from "@/lib/auth/client";
import { authorizedOnlyPlugin } from "@/lib/auth/plugins";
import { getDashboardStatsQuery } from "@/lib/dashboard/api";
import { Link, navigate, NavLink } from "@/lib/navigation";
import { root } from "@/lib/root";
import { cn } from "@/lib/utils";
import { useIsNavigating, useLocation } from "@point0/core/navigation";

import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Package,
} from "lucide-react";

const navItems = [
  { to: "dashboardHome", label: "نمای کلی", icon: LayoutDashboard },
  { to: "dashboardUsers", label: "کاربران", icon: Users },
  { to: "dashboardContent", label: "محتوا", icon: Package },
  { to: "dashboardSettings", label: "تنظیمات", icon: Settings },
] as const;

export const generalLayout = root
  .lets("layout", "generalLayout")
  .use(authorizedOnlyPlugin)
  .layout(({ children, props: { me } }) => {
    const location = useLocation();

    const signOut = async () => {
      await authClient.signOut();
      await navigate("signIn");
    };

    return (
      <div className="flex min-h-screen bg-slate-50" dir="rtl">
        {/* سایدبار */}
        <aside className="flex w-64 flex-col border-l border-slate-200 bg-white">
          <div className="flex items-center gap-2 px-6 py-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-mono text-xs font-bold text-white">
              A
            </div>
            <span className="font-semibold text-slate-900">پنل ادمین</span>
          </div>

          <nav className="flex-1 space-y-1 px-3">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = location.route === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 p-3">
            <button
              onClick={signOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              خروج از حساب
            </button>
          </div>
        </aside>

        {/* محتوا */}
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
            <div className="text-sm text-slate-500">
              {new Date().toLocaleDateString("fa-IR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </div>
            <div className="flex items-center gap-3">
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900">
                  {me.user.name}
                </p>
                <p className="text-xs text-slate-500">{me.user.email}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-600">
                {me.user.name.slice(0, 1)}
              </div>
            </div>
          </header>

          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    );
  });
