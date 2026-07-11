import { getUserLocale } from "@/i18n/locale";
import { getKordBreachModifiers } from "@/features/kord-breach/api";
import { KordBreachPage } from "@/features/kord-breach/components/kord-breach-page";

export async function KordBreachRoute() {
  const [modifiers, locale] = await Promise.all([getKordBreachModifiers(), getUserLocale()]);
  return <KordBreachPage modifiers={modifiers} locale={locale} />;
}
