import { Card } from "@/components/ui/card";
import { dashboardLayout } from "@/layouts/dashboard";
import { authorizedOnlyPlugin } from "@/lib/auth/plugins";
import { getDashboardStatsQuery } from "@/lib/dashboard/api";
import { Users, UserPlus, Activity } from "lucide-react";

const statCards = [
  {
    key: "totalUsers",
    label: "کل کاربران",
    icon: Users,
    tone: "text-indigo-600 bg-indigo-50",
  },
  {
    key: "newThisWeek",
    label: "کاربر جدید (۷ روز اخیر)",
    icon: UserPlus,
    tone: "text-emerald-600 bg-emerald-50",
  },
  {
    key: "activeSessions",
    label: "سشن فعال",
    icon: Activity,
    tone: "text-amber-600 bg-amber-50",
  },
] as const;

export const dashboardHomePage = dashboardLayout
  .lets("page", "Dashboard", "/dashboard")
  .use(authorizedOnlyPlugin)
  .with(getDashboardStatsQuery)
  .page(({ props: { me } }) => {
    const { data } = getDashboardStatsQuery.useQuery();

    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">نمای کلی</h1>
          <p className="mt-1 text-sm text-slate-500">
            خوش اومدی، {me.user.name.split(" ")[0]}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {statCards.map(({ key, label, icon: Icon, tone }) => (
            <Card key={key}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">{label}</span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 font-mono text-3xl font-semibold text-slate-900">
                {data.stats[key].toLocaleString("fa-IR")}
              </p>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <h2 className="text-sm font-semibold text-slate-900">فعالیت اخیر</h2>
          <p className="mt-2 text-sm text-slate-500">
            برای اتصال این بخش به لاگ واقعی رویدادها (ثبت‌نام، ورود، تغییرات
            محتوا)، یک جدول
            <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
              activity_log
            </code>
            به schema اضافه کن و اینجا آخرین ردیف‌هاش رو کوئری بگیر.
          </p>
        </Card>
      </div>
    );
  });
