import { authClient } from "@/lib/auth/client";
import { getMeQuery } from "@/lib/auth/api";
import { redirectAuthorizedPlugin } from "@/lib/auth/plugins";
import { navigate, Link } from "@/lib/navigation";
import { root } from "@/lib/root";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { routes } from "@/generated/point0/routes";

export const signInPage = root.lets
  .page("/sign-in")
  .use(redirectAuthorizedPlugin) // اگه لاگین بود، مستقیم بره داشبورد
  .page(() => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      const { error } = await authClient.signIn.email({ email, password });
      setLoading(false);
      if (error) return setError(error.message ?? "ایمیل یا رمز عبور اشتباهه");
      await getMeQuery.refetchQuery();
      await navigate("dashboardHome");
    };

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 font-mono text-sm font-bold text-white">
              A
            </div>
            <h1 className="text-xl font-semibold text-slate-900">
              ورود به پنل ادمین
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              برای ادامه، وارد حسابت شو
            </p>
          </div>

          <form
            onSubmit={submit}
            className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
          >
            <Input
              id="email"
              type="email"
              label="ایمیل"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <Input
              id="password"
              type="password"
              label="رمز عبور"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            <Button type="submit" loading={loading} className="w-full">
              ورود
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            حساب نداری؟{" "}
            <Link
              route="signUp"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              ثبت‌نام کن
            </Link>
          </p>
        </div>
      </div>
    );
  });
