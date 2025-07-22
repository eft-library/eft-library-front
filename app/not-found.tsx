import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { notFoundI18N } from "@/lib/consts/i18nConsts";

export default function NotFound() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4 p-4">
        <h1 className="text-6xl font-bold tracking-tight sm:text-8xl">404</h1>
        <p className="text-xl sm:text-2xl text-muted-foreground">
          {notFoundI18N.notFoundTitle[localeKey]}
        </p>
        <p className="text-base sm:text-lg max-w-md mx-auto">
          {notFoundI18N.notFoundMessage[localeKey]}
        </p>
        <Link href="/" passHref>
          <Button className="mt-6 cursor-pointer">
            {notFoundI18N.goHome[localeKey]}
          </Button>
        </Link>
      </div>
    </div>
  );
}
