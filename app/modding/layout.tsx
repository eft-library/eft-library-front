import { Suspense, type ReactNode } from "react";
import { getUserLocale } from "@/i18n/locale";
import { BuildsProvider } from "@/features/modding/builds/provider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-96 animate-pulse rounded-2xl bg-surface" />
      }
    >
      <LocalizedLayout>{children}</LocalizedLayout>
    </Suspense>
  );
}
async function LocalizedLayout({ children }: { children: ReactNode }) {
  const locale = await getUserLocale();
  return <BuildsProvider locale={locale}>{children}</BuildsProvider>;
}
