import { getUserLocale } from "@/i18n/locale";
import { getItemInfo } from "@/features/item-info/api";
import { ItemInfoPage } from "@/features/item-info/components/item-info-page";

export async function ItemInfoRoute({
  itemId,
}: {
  itemId: string;
}) {
  const [locale, item] = await Promise.all([getUserLocale(), getItemInfo(itemId)]);

  return <ItemInfoPage item={item} locale={locale} />;
}
